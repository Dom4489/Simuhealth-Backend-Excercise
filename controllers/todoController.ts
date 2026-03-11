// Handles all CRUD operations for todo items.
import { Request, Response } from "express";
import { todos, idCounters } from "../config/db";

// Returns all todo items. Any user (authenticated or not) can call this.
// Supports optional query string filters to narrow results:
// ?userId=1 — todos belonging to a specific user
// ?title=X — todos whose title contains "X" (case-insensitive)
// ?description=X — todos whose description contains "X" (case-insensitive)
// ?category=X — todos with an exact category match
// ?completed=true — only completed (or incomplete for false) todos
// Multiple filters can be combined: ?category=chores&completed=false
const getTodos = (request: Request, response: Response): void => {
 const { userId, title, description, category, completed } = request.query;
 let filteredTodos = todos;
 // Filter by owner
 if (userId) {
  filteredTodos = filteredTodos.filter(todo => todo.userId === Number(userId));
 }

 // Filter on title
 if (title) {
  filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(String(title).toLowerCase()));
 }

 // Filter on description
 if (description) {
  filteredTodos = filteredTodos.filter(todo => todo.description.toLowerCase().includes(String(description).toLowerCase()));
 }

 // Filter on category
 if (category) {
  filteredTodos = filteredTodos.filter(todo => todo.category === String(category));
 }

 // Filter on completed
 if (completed !== undefined) {
  filteredTodos = filteredTodos.filter(todo => todo.completed === (completed === "true"));
 }

 response.status(200).json(filteredTodos);
};

// Creates a new todo, requires authentication
const createTodo = (request: Request, response: Response): void => {
 const { title, description, category } = request.body;

 // Title is the only required field, reject if it's missing or empty
 if (!title) {
  response.status(400).json({ error: "title cannot be empty" });
  return;
 }

 const newTodo = {
  // Assign the next available id and increment the counter for next time
  id: idCounters.todoIdCounter++,
  title,
  description: description ?? "",
  category: category ?? "general",
  completed: false,
  userId: request.user!.id,
 };

 // Add the new todo to the in-memory array
 todos.push(newTodo);

 response.status(201).json(newTodo);
};

// Deletes a todo permanently, Only the owner can delete their own todos
const deleteTodo = (request: Request, response: Response): void => {

 const todoId = Number(request.params.id);
 const todoItem = todos.find(todo => todo.id === todoId);

 // If no todo with this id exists, return error
 if (!todoItem) {
  response.status(404).json({ error: "todo item not found" });
  return;
 }

 // Ownership check
 if (request.user!.id !== todoItem.userId) {
  response.status(403).json({ error: "you must be the owner to delete this todo item" });
  return;
 }

 // Remove todo in the array
 todos.splice(todos.indexOf(todoItem), 1);

 response.status(200).json({ message: "todo item successfully deleted!" });
};

// Updates an existing todo, only the user who created it can update it
const updateTodo = (request: Request, response: Response): void => {
 const todoId = Number(request.params.id);
 const todoItem = todos.find(todo => todo.id === todoId);

 // If no todo with this id exists, return error
 if (!todoItem) {
  response.status(404).json({ error: "todo item not found" });
  return;
 }

 // Ownership check
 if (request.user!.id !== todoItem.userId) {
  response.status(403).json({ error: "you must be the owner to update this todo item" });
  return;
 }

 // PUT requires all fields to be present, reject if any are missing
 const { title, description, category, completed } = request.body;
 if (!title || !description || !category || completed === undefined) {
     response.status(400).json({ error: "PUT requires all fields: title, description, category, completed" });
     return;
 }
 const updatedTodo = { ...todoItem, title, description, category, completed };

 // Replace the old todo in the array
 todos[todos.indexOf(todoItem)] = updatedTodo;

 response.status(200).json(updatedTodo);
};

// Partially updates a todo — only sends the fields you want to change
const patchTodo = (request: Request, response: Response): void => {
 const todoId = Number(request.params.id);
 const todoItem = todos.find(todo => todo.id === todoId);

 // If no todo with this id exists, return error
 if (!todoItem) {
  response.status(404).json({ error: "todo item not found" });
  return;
 }

 // Ownership check
 if (request.user!.id !== todoItem.userId) {
  response.status(403).json({ error: "you must be the owner to update this todo item" });
  return;
 }

 // Only overwrite the fields that were actually sent
 // Unlike PUT, fields omitted from the body are kept as there were
 const updatedTodo = { ...todoItem, ...request.body };

 // Replace the old todo in the array
 todos[todos.indexOf(todoItem)] = updatedTodo;

 response.status(200).json(updatedTodo);
};

export default { getTodos, createTodo, deleteTodo, updateTodo, patchTodo };