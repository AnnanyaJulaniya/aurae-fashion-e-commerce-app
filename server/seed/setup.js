const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

function parseSqlStatements(rawSql) {
  // Remove UTF-8 BOM if present
  let cleanSql = rawSql.replace(/^\uFEFF/, "");

  //  Remove SQL comments 
  cleanSql = cleanSql.replace(/^--.*$/gm, "");
  cleanSql = cleanSql.replace(/\/\*[\s\S]*?\*\//g, "");

  const statements = [];
  let currentStmt = "";
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < cleanSql.length; i++) {
    const char = cleanSql[i];
    const prevChar = i > 0 ? cleanSql[i - 1] : "";

    if (char === "'" && prevChar !== "\\" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '"' && prevChar !== "\\" && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    }

    if (char === ";" && !inSingleQuote && !inDoubleQuote) {
      const trimmed = currentStmt.trim();
      if (trimmed.length > 0) {
        statements.push(trimmed);
      }
      currentStmt = "";
    } else {
      currentStmt += char;
    }
  }

  const trailing = currentStmt.trim();
  if (trailing.length > 0) {
    statements.push(trailing);
  }

  return statements;
}

async function executeSqlFile(connection, filePath) {
  const fileName = path.basename(filePath);
  const rawSql = fs.readFileSync(filePath, "utf8");
  const statements = parseSqlStatements(rawSql);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await connection.query(stmt);
    } catch (err) {
      console.error(`\n❌ Error executing statement #${i + 1} from ${fileName}:`);
      console.error(stmt);
      throw err;
    }
  }
}

async function setupDatabase() {
  const host = process.env.DB_HOST || "localhost";
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const dbName = process.env.DB_NAME || "fashion_store";
  const port = Number(process.env.DB_PORT) || 3306;

  let connection;
 try {
    console.log("==========================================");
    console.log(" AURAÉ Database Setup");
    console.log("==========================================");
    console.log(`Connecting to MySQL at ${host}:${port}...`);

    // Connect to MySQL server
    connection = await mysql.createConnection({
      host,
      user,
      password,
      port,
    });

    console.log("✓ Connected to MySQL server.");

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);

    await connection.query(`USE \`${dbName}\`;`);

     console.log(`✓ Database "${dbName}" is ready.`);

    // Run schema.sql
    const schemaPath = path.join(__dirname, "schema.sql");
    console.log("Executing schema.sql...");
    await executeSqlFile(connection, schemaPath);
    console.log("✓ Schema created / verified.");

    // Run seed.sql
    const seedPath = path.join(__dirname, "seed.sql");
    console.log("Executing seed.sql...");
    await executeSqlFile(connection, seedPath);
    console.log("✓ Seed data inserted.");

    // Verification query
    const [rows] = await connection.query("SELECT COUNT(*) AS count FROM products");
    console.log(`✓ Verification: ${rows[0].count} products are ready in the database.`);

    const [sample] = await connection.query(
      "SELECT id, name, category, price, stock FROM products LIMIT 5"
    );
    console.log("\nSample seeded products:");
    console.table(sample);

    console.log("\nDatabase initialization complete! You can now start the server with: npm start\n");
  } catch (err) {
    console.error("\n❌ Database setup error:", err.message);
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Access denied! Please check your DB_USER and DB_PASSWORD in server/.env");
    } else if (err.code === "ECONNREFUSED") {
      console.error("Could not connect to MySQL server. Ensure MySQL is running on port " + port);
    }
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

setupDatabase();