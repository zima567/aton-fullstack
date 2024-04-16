import express from "express";
import bodyParser from "body-parser";
import authMiddleware from "./src/middlewares/auth"
import authRouter from "./src/routers/auth";
import clientRouter from "./src/routers/clients";

// Create an Express application
const app = express();

//Define middlewares
app.use(bodyParser.json());

//Serve static files
app.use('/frontend', express.static('public'))

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to ATON!');
});

//Api routing
app.use('/api/auth', authRouter);
app.use('/api', authMiddleware, clientRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});