import authRouters from "./auth";
import clientRouters from "./clients";
import authMiddleware from "../middlewares/auth";

// Load all routers
const loadRouters = (app) => {
    // Welcome route
    app.get('/', (req, res) => {
        res.send('Welcome to ATON!');
    });
    // API routes
    app.use('/api/auth', authRouters);
    app.use('/api', authMiddleware, clientRouters);
}

module.exports = loadRouters;