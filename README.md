# project-zombieland-back

Welcome to the ZombieLand backend project, a post-apocalyptic themed amusement park. This backend is responsible for managing REST APIs, user authentication, handling attraction data, reservations, and communicating with the front-end.

## **Technologies Used**

- **Node.js**: A server-side JavaScript runtime environment used to build robust and high-performance backend applications.
  
- **Express**: A minimal web framework for Node.js, used to create web applications and RESTful APIs simply and effectively.

- **cors**: Middleware for Express.js that manages Cross-Origin Resource Sharing (CORS) permissions. It is used to secure requests from different origins.

- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`. It is used for configuring sensitive variables like JWT secrets and database connections.

- **eslint**: A linting tool for JavaScript and TypeScript that helps maintain clean and consistent code by detecting errors and enforcing coding style rules.

- **pg**: A PostgreSQL client for Node.js, used to interact with a PostgreSQL database, execute SQL queries, and manage database connections.

- **pg-hstore**: An extension for PostgreSQL, used with Sequelize to manage hstore data types in PostgreSQL. It allows reading and writing hstore data.

- **prettier**: A code formatter that ensures consistency in code style throughout the project. It helps automate code formatting, improving readability and maintenance.

- **sequelize**: An Object-Relational Mapping (ORM) tool for Node.js that supports PostgreSQL. It simplifies working with relational databases by providing a programming interface for SQL database interactions.

- **express-session**: A module to manage user sessions in an Express.js application, essential for maintaining browsing sessions and managing authenticated users.

- **zod**: A schema validation library for TypeScript and JavaScript. It is used for robustly validating input data and handling errors.

- **EJS**: A templating engine for Node.js that allows generating HTML pages with embedded JavaScript. It is used to create dynamic server-side views with data from the database.

## **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/zombieland-backend.git
    cd zombieland-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file** and configure the necessary environment variables:

    ```
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. **Start the development server**:

    ```bash
    npm run dev
    ```

The backend is now running at `http://localhost:3000`.

## **Available Scripts**

- `npm run dev`: Starts the application in development mode (hot reload).
