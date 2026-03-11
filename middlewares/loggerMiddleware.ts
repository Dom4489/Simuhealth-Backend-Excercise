import { Request, Response, NextFunction } from "express";

// A request logger for debugging purposes
const loggerMiddleware = (request: Request, _response: Response, next: NextFunction): void => {
    console.log("Method:", request.method);
    console.log("Path:", request.path);
    console.log("Body:", request.body);
    console.log("-------");
    next();
}

export default loggerMiddleware;