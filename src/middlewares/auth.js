import jwt from "jsonwebtoken";
import params from "../config/params";

// Define the middleware function
function verifyToken(req, res, next) {
    // Check if the Authorization header contains a Bearer token
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== "undefined") {
      try {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        
        //add a new attribute user to the request object
        req.authUser = jwt.verify(token, params.jwt_secret)
      } catch (error) {
        req.authUser = {};
        console.warn("Invalid token");
      }
    } else {
      // If no Bearer token is found
      req.authUser = {};
    }

    // Proceed to the next middleware or route handler
    next();
}
  
// Export the middleware function
module.exports = verifyToken;