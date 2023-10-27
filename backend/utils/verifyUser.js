import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next)=> {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler (401, "unauthorized"));
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return next(errorHandler(403, "Fobidden"));
        // Get the user id and send it during this session
        req.user = user;
        // if the id is matched, go to the next action which is defined in user routes.
        next();
    })
}