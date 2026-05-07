# EcommerceAPI

> 🌐 [English version below](#english-version)

---

## 🇦🇷 Versión en Español

REST API para gestión de e-commerce desarrollada con Node.js y Express.

## Funcionalidades
- Registro e inicio de sesión de usuarios con autenticación JWT
- CRUD completo de productos (crear, leer, actualizar, eliminar)
- Gestión de carrito de compras
- Creación de órdenes desde el carrito
- Encriptación de contraseñas con bcrypt
- Base de datos SQLite local

## Tecnologías
- **Node.js + Express** — servidor
- **SQLite + better-sqlite3** — base de datos
- **JWT** — autenticación
- **bcrypt** — encriptación de contraseñas

## Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | /api/users/register | No | Registrar usuario |
| POST | /api/users/login | No | Iniciar sesión y obtener token |
| GET | /api/products | No | Listar todos los productos |
| GET | /api/products/:id | No | Obtener producto por id |
| POST | /api/products | Sí | Crear producto |
| PUT | /api/products/:id | Sí | Actualizar producto |
| DELETE | /api/products/:id | Sí | Eliminar producto |
| GET | /api/cart | Sí | Ver carrito del usuario |
| POST | /api/cart | Sí | Agregar producto al carrito |
| DELETE | /api/cart | Sí | Vaciar carrito |
| POST | /api/orders | Sí | Crear orden desde el carrito |
| GET | /api/orders | Sí | Ver órdenes del usuario |

## Cómo ejecutarlo
1. Instalar dependencias: `npm install`
2. Crear archivo `.env`:
```
PORT=3000
JWT_SECRET=tu_clave_secreta
```
3. Iniciar servidor: `npm run dev`

## Autor
Desarrollado por [Alan Cardozo] — [github.com/cardozoal](https://github.com/cardozoal)

---

## 🇺🇸 English Version

REST API for e-commerce management built with Node.js and Express.

## Features
- User registration and login with JWT authentication
- Full product CRUD (create, read, update, delete)
- Shopping cart management
- Order creation from cart
- Password encryption with bcrypt
- SQLite local database

## Tech Stack
- **Node.js + Express** — server
- **SQLite + better-sqlite3** — database
- **JWT** — authentication
- **bcrypt** — password encryption

## Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/users/register | No | Register user |
| POST | /api/users/login | No | Login and get token |
| GET | /api/products | No | List all products |
| GET | /api/products/:id | No | Get product by id |
| POST | /api/products | Yes | Create product |
| PUT | /api/products/:id | Yes | Update product |
| DELETE | /api/products/:id | Yes | Delete product |
| GET | /api/cart | Yes | Get user cart |
| POST | /api/cart | Yes | Add item to cart |
| DELETE | /api/cart | Yes | Clear cart |
| POST | /api/orders | Yes | Create order from cart |
| GET | /api/orders | Yes | Get user orders |

## How to run
1. Install dependencies: `npm install`
2. Create `.env` file:
```
PORT=3000
JWT_SECRET=your_secret_key
```
3. Start server: `npm run dev`

## Author
Made by [Alan Cardozo] — [github.com/cardozoal](https://github.com/cardozoal)
