# Mini Node.js Framework

This is my first project where I try to build a minimal web framework using pure **Node.js** — without Express or any other routing library.

## 🎯 Project Goal

The purpose of this project is to better understand how HTTP servers, routing, middleware, and request handling work under the hood. By building everything from scratch, I’m learning how frameworks like Express function internally.

## 🔧 What it can do

- Handle HTTP routing (GET, POST, PUT, PATCH, DELETE)
- Use middleware (global and per-route)
- Basic error handling with custom messages
- Parse `application/json` request bodies
- Handle dynamic route endpoints like `/users/123/post/321`

## 📁 Project Structure
```
├── server.js              # Main entry point
├── app.js                 # Core App class
├── middleware/            
│   ├── runner.js          # Main logic core of middlewares
│   ├── logger.js
│   ├── requestTime.js
│   ├── bodyParser.js   
│   ├── errorHandler.js
│   └── errorMiddleware.js
```
## 🚀 How to Run

1. Make sure you have Node.js 18+ installed.
2. Start the server:
   ```bash
   node server.js
3. Visit http://localhost:8080 in your browser or use curl to test endpoints.

## 📌 Note
This is a purely educational project — the goal is not to create a production-ready framework, but to learn how a basic HTTP server can be built from the ground up.

