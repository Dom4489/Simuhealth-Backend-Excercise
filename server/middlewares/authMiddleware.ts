// Protects routes that require a logged-in user. Runs before the route handler
// on any endpoint that needs authentication (POST, PUT, DELETE on /todos)
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { users, User } from "../config/db";

// Extend Express's request type
declare global {
 namespace Express {
  interface Request {
   user?: User;
  }
 }
}
const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {

 const authHeader = request.headers["authorization"];
 // No authorization header, reject immediately
 if (!authHeader) {
  response.status(401).json({ error: "auth token is missing" });
  return;
 }

 try {
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  // Verify the token was signed with JWT_SECRET and hasn't expired
  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
  const user = users.find(u => u.id === payload.id);
  // If no matching user exists, reject
  if (!user) {
      response.status(401).json({ error: "auth token is invalid" });
      return;
  }
  request.user = user;
  // Token is valid and user exists — proceed to the route handler.
  next();
 } catch {
   response.status(401).json({ error: "auth token is invalid" });
 }
}

export default authMiddleware;