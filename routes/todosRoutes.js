const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

module.exports = router;
