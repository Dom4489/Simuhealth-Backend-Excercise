import { Router } from "express";
import todoController from "../controllers/todoController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get   ("/",    todoController.getTodos);
router.post  ("/",    authMiddleware, todoController.createTodo);
router.put   ("/:id", authMiddleware, todoController.updateTodo);
router.delete("/:id", authMiddleware, todoController.deleteTodo);

export default router;