# aurae-fashion-e-commerce-app


# AURAÉ — Fashion E-Commerce

> **Everyday, elevated.**

AURAÉ is a polished mini fashion e-commerce website built as an internship technical assessment. The project demonstrates a complete full-stack workflow using React, Node.js, Express.js, and MySQL.

The focus of the project is not the number of features, but delivering a small, complete, responsive, and maintainable e-commerce experience.

---

## Overview

AURAÉ provides a premium fashion-store experience where users can:

* Browse fashion products
* Search products by name
* Filter products by category and price
* Sort products
* View product details
* Select size and quantity
* Add products to cart
* Update or remove cart items
* Persist the cart using localStorage

The project also includes a basic admin interface for:

* Viewing products
* Adding products
* Editing products
* Deleting products

Products are stored in MySQL and accessed through REST APIs built with Express.js.

---

## Assessment Objective

The project was developed according to the internship assessment requirement:

> Build a small but complete, high-quality fashion e-commerce experience demonstrating frontend skills, usability, backend integration, and practical problem-solving.

The implementation prioritizes:

* UI/UX
* Core functionality
* Backend/SQL integration
* Code quality
* Documentation
* Responsive design

---

## Features

### Product Catalog

* Fashion product catalog powered by MySQL
* Product image
* Product name
* Category
* Price
* Stock status
* Featured products

### Search

Search products by product name.

Example:

```text
Linen
```

### Filters

Multiple filters can be combined:

* Category
* Minimum price
* Maximum price

Example:

```text
Search: Linen
Category: Bottoms
Maximum price: ₹2000
```

This produces a backend request such as:

```text
GET /api/products?search=Linen&category=Bottoms&maxPrice=2000
```

### Sorting

Available sorting options:

* Recommended
* Price: Low to High
* Price: High to Low
* Newest Arrivals

### Product Details

Users can:

* View product information
* Select available size
* Select quantity
* View stock status
* Add products to cart

### Shopping Cart

The cart supports:

* Add product
* Increase quantity
* Decrease quantity
* Remove item
* Clear cart
* Calculate subtotal
* Calculate total
* Stock-based quantity limits
* Same product + same size quantity merging
* Different sizes as separate cart items
* localStorage persistence

### Admin Product Management

The admin page supports:

* Product listing
* Product search
* Category filtering
* Create product
* Edit product
* Delete product
* Form validation
* Delete confirmation
* Success/error feedback

Authentication is intentionally omitted because it is outside the scope of the internship assessment.

---

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MySQL
* mysql2

### Development

* Nodemon
* Git
* GitHub

---

## Architecture

The application follows a simple full-stack architecture:

```text
React Frontend
      │
      ▼
Axios API Service
      │
      ▼
Express REST API
      │
      ▼
Product Controller
      │
      ▼
MySQL Connection Pool
      │
      ▼
MySQL Database
```

### Frontend Flow

```text
Page / Component
       ↓
React state / Context
       ↓
api.js
       ↓
Axios
       ↓
Express API
```

### Backend Flow

```text
Express Route
      ↓
Controller
      ↓
Parameterized SQL Query
      ↓
MySQL
      ↓
JSON Response
```

---

## Project Structure

```text
aurae-fashion/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   ├── QuantitySelector.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── seed/
│   │   ├── schema.sql
│   │   ├── seed.sql
│   │   └── setup.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

---

## Prerequisites

Install the following before running the project:

* Node.js
* npm
* MySQL
* Git

Recommended Node.js version: a recent LTS release.

---

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd aurae-fashion
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Install frontend dependencies

```bash
cd ../client
npm install
```

Return to the project root when setup is complete.

---

## Environment Variables

Create:

```text
server/.env
```

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=fashion_store
PORT=5000
NODE_ENV=development
```

For the frontend, create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Do not commit `.env` files.

---

## MySQL Database Setup

The project uses:

```text
Database: fashion_store
Table: products
```

### Automatic setup

From the project root:

```bash
npm run db:setup
```

This executes the database schema and seed data.

### Manual setup

Create the database:

```sql
CREATE DATABASE fashion_store;
```

Then execute:

```text
server/seed/schema.sql
server/seed/seed.sql
```

---

## Running the Application

The frontend and backend should run in separate terminals.

### Backend

From the project root:

```bash
npm run server:dev
```

Or from the `server` folder:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### Frontend

From the project root:

```bash
npm run client
```

The Vite development server will display the local frontend URL.

---

## API Documentation

### Health Check

```http
GET /api/health
```

Returns API health information.

---

### Get Products

```http
GET /api/products
```

Returns all products.

### Search

```http
GET /api/products?search=Linen
```

### Category Filter

```http
GET /api/products?category=Bottoms
```

### Price Filter

```http
GET /api/products?minPrice=1000&maxPrice=2000
```

### Combined Search and Filters

```http
GET /api/products?search=Linen&category=Bottoms&maxPrice=2000
```

### Sorting

```http
GET /api/products?sort=price_asc
```

Supported values:

```text
recommended
price_asc
price_desc
newest
```

---

### Get One Product

```http
GET /api/products/:id
```

Example:

```http
GET /api/products/11
```

---

### Create Product

```http
POST /api/products
```

Example body:

```json
{
  "name": "Linen Trouser",
  "description": "Relaxed fit linen trousers",
  "price": 1799,
  "category": "Bottoms",
  "image": "https://example.com/image.jpg",
  "sizes": ["S", "M", "L"],
  "stock": 10,
  "featured": false
}
```

---

### Update Product

```http
PUT /api/products/:id
```

---

### Delete Product

```http
DELETE /api/products/:id
```

---

## API Response Format

Successful collection response:

```json
{
  "success": true,
  "count": 10,
  "data": []
}
```

Error response:

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## Cart Architecture

The cart uses React Context API.

Main functions include:

```text
addToCart()
removeFromCart()
increaseQuantity()
decreaseQuantity()
clearCart()
getCartTotal()
getCartItemCount()
```

Cart data is persisted using:

```text
localStorage
```

Storage key:

```text
aurae_cart_v1
```

Cart identity is based on:

```text
product ID + selected size
```

Therefore:

```text
Linen Trouser + M
```

and:

```text
Linen Trouser + L
```

are treated as different cart items.

---

## Search and Filter Architecture

Shop filters are handled through URL query parameters.

Example:

```text
/shop?search=Linen&category=Bottoms&maxPrice=2000
```

The frontend sends those values to the backend.

The backend performs filtering through SQL.

This avoids loading the entire database into the browser just to perform filtering.

---

## Validation

The project includes basic validation for:

### Admin Product Form

* Product name required
* Description required
* Price greater than zero
* Category required
* Image URL required
* At least one size
* Stock cannot be negative

### Product Details

* Size selection
* Quantity minimum
* Quantity maximum based on stock
* Out-of-stock prevention

### Newsletter

* Basic email format validation

---

## Loading, Empty, and Error States

The application provides dedicated states for:

* Loading
* Empty results
* Empty cart
* API errors
* Product not found
* Admin CRUD failures

This prevents blank screens and provides useful feedback to users.

---

## Responsive Design

The UI is designed for:

* Mobile
* Tablet
* Laptop
* Desktop
* Large desktop screens

Special attention was given to:

* responsive navigation
* mobile filter drawer
* product grids
* product details layout
* cart layout
* admin interface
* responsive modal behavior

---

## Assessment Requirement Mapping

| Assessment Requirement                  | Implementation                     |
| --------------------------------------- | ---------------------------------- |
| Product Catalog                         | MySQL + Express API + React        |
| At least 6 products                     | 10+ seeded fashion products        |
| Product image/name/price/category/stock | Product catalog                    |
| Product-name search                     | Backend GET query                  |
| Category filter                         | Backend GET query                  |
| Price filter                            | Backend GET query                  |
| Product Details                         | React product route                |
| Size selection                          | Product details                    |
| Quantity selection                      | Product details + cart             |
| Add to Cart                             | Cart Context                       |
| Update Cart                             | Cart Context                       |
| Remove Cart Items                       | Cart Context                       |
| Calculate Total                         | Cart Context                       |
| SQL Database                            | MySQL                              |
| Backend API                             | Node.js + Express                  |
| Product Management                      | Admin CRUD                         |
| Responsive UI                           | Tailwind CSS                       |
| Loading States                          | Reusable components                |
| Empty States                            | Reusable components                |
| Error States                            | Reusable components                |
| Validation                              | Frontend + backend                 |
| Reusable Code                           | Components + Context + API service |

---

## Completed Work

The following assessment requirements have been implemented:

* Premium AURAÉ fashion-store interface
* Responsive frontend
* MySQL-backed product catalog
* Product search
* Category filtering
* Price filtering
* Combined search and filter functionality
* Product sorting
* Product details
* Size and quantity selection
* Shopping cart
* localStorage cart persistence
* Admin CRUD
* REST APIs
* Server-side validation
* Parameterized SQL queries
* Loading states
* Empty states
* Error handling
* Responsive mobile filter drawer
* Project documentation

---

## Limitations

The project intentionally does not include:

* User authentication
* Admin authentication
* Real payment gateway
* Order management
* Customer accounts
* Persistent user-specific wishlist
* Real newsletter storage
* Production image upload

These features were excluded to keep the implementation focused on the assessment's required scope.

---

## Future Improvements

Possible future enhancements include:

* Admin authentication
* User authentication
* Checkout flow
* Payment gateway integration
* Order management
* Wishlist
* Product reviews and ratings
* Product image upload
* Pagination
* Advanced inventory management
* Customer accounts

---

## Demo

### Live URL

```text
<add-live-url-here>
```

### Demo Video

```text
<add-demo-video-link-here>
```

---

## Technical Explanation

### React Architecture

React is responsible for:

* UI rendering
* routing
* local component state
* cart state
* user interactions

Reusable components reduce duplication.

### API Flow

The frontend uses Axios through a centralized API service:

```text
React
 ↓
api.js
 ↓
Axios
 ↓
Express
 ↓
Controller
 ↓
MySQL
```

### Express

Express handles:

* REST routes
* request validation
* controller execution
* error handling
* JSON responses

### MySQL

MySQL stores the product catalog.

Queries are parameterized to avoid unsafe SQL construction.

### Cart

Cart state is managed using React Context and persisted with localStorage so refreshing the browser does not remove cart items.

### Admin CRUD

The Admin page communicates with:

```text
POST
PUT
DELETE
GET
```

endpoints to manage MySQL product records.

### Search and Filtering

Search and filters are sent to the backend through URL query parameters.

Example:

```text
/shop?search=Linen&category=Bottoms&maxPrice=2000
```

The Express controller converts those parameters into parameterized SQL conditions.

---

## Important Files to Understand

For technical interviews, the most important files are:

```text
client/src/pages/Shop.jsx
client/src/pages/ProductDetails.jsx
client/src/pages/Cart.jsx
client/src/pages/Admin.jsx
client/src/context/CartContext.jsx
client/src/services/api.js
client/src/components/FilterSidebar.jsx
client/src/components/ProductCard.jsx

server/routes/productRoutes.js
server/controllers/productController.js
server/config/db.js
server/middleware/errorMiddleware.js
server/seed/schema.sql
server/seed/seed.sql
```

---

## License

This project was created as an internship technical assessment and portfolio project.