# Blog Platform API

A simple backend API for managing blogs, built with Node.js, Express, and MongoDB.

## Features
- Create, read, update, and delete blog posts
- Add comments and tags to blogs
- Search and sort blogs
- Category support for blogs
- Input validation using Zod
- Simple authentication middleware (token-based)

## How to Run
1. Make sure MongoDB is running locally (`mongodb://localhost:27017/blog_platform`).
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node src/app.js
   ```
4. Use Postman or curl to interact with the API endpoints.

## Authentication
- Some routes can be protected using the middleware in `src/middleware/auth.js`.
- To access protected routes, add the header:
  ```
  Authorization: Bearer mysecrettoken
  ```

## API Endpoints
- `POST   /api/blogs`           - Create a new blog
- `GET    /api/blogs`           - Get all blogs 
- `GET    /api/blogs/:id`       - Get a single blog
- `PUT    /api/blogs/:id`       - Update a blog
- `DELETE /api/blogs/:id`       - Delete a blog
- `POST   /api/blogs/:id/comments` - Add a comment
- `PATCH  /api/blogs/:id/tags`  - Update tags
- `GET    /api/blogs/docs`      - API documentation

## Dependencies
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **zod**: Input validation
- **dotenv**: Environment variable management
- **cors**: Enable CORS for API
- **nodemon** (dev): Auto-restart server on changes

## Notes
- All data is stored in MongoDB under the `blog_platform` database.
- See `src/testDbCrud.js` for a script to test database CRUD operations directly.
