// Handles the login endpoint. Validates the submitted username and password,
// and if correct, returns a signed JWT to authenticate future requests
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../config/db";

const login = async (request: Request, response: Response): Promise<void> => {
 const { username, password } = request.body;

 // Look for a user with a matching username
 const user = users.find(u => u.username === username);

 // bcrypt.compare hashes the submitted password and checks it against the stored hash
 if (!user || !(await bcrypt.compare(password, user.password))) {
  response.status(401).json({ error: "username or password invalid." });
  return;
 }
 // Credentials are valid, The token is valid for 8 hours
 const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "8h" });
 // Return the token to the client
 response.json({ token });
}

export default { login };