import express from "express";
import bodyParser from "body-parser";
import loadRouters from "./src/routers/index";

// Create an Express application
const app = express();

// Define middlewares
app.use(bodyParser.json());

// Serve static files
app.use('/frontend', express.static('public'))

// Load routers
loadRouters(app);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
