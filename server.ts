// Entry point for the application
// Load .env into process.env before anything else runs
import "dotenv/config";
import express from "express";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/authRoutes";

// Create the Express application instance
const app = express();

// Log every incoming request to the console
app.use(loggerMiddleware);

// Parse incoming requests with a JSON body
app.use(express.json());

// Mount todo CRUD endpoints
app.use("/todos", todoRoutes);

// Mount auth endpoints
app.use("/auth", authRoutes);

// Start server Read PORT from .env
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});