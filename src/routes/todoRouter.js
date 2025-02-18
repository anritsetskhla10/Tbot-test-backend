import express from "express";
import {
  addTodo,
  deleteMany,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controllers/todoListControler.js";

const todoRouter = express.Router();

todoRouter.get("/todoList", getAllTodo);

todoRouter.post("/sendTodo", addTodo);

todoRouter.put("/updateTodo/:id", updateTodo);

todoRouter.delete("/deleteTodo/:id", deleteTodo);

todoRouter.delete("/deletedInactive", deleteMany);

export default todoRouter;
