const Todos = require("../models/Todo");

const getTodos = async (req, res) => {
  const todos = await Todos.find({});
  res.status(200).json({ todos, amount: todos.length });
};


const createTodo = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("Please provide all values");
  }
  const todo = await Todos.create({ name, description });
  res.json({ todo });
};


const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name || !description){
    return res.status(400).send("please provide all values");
  }

  const task = await Todos.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res
      .status(404)
      .json({ msg: `no item with id ${id}`, success: false });
  }
  res.status(200).json({ task });
};


const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const task = await Todos.findOneAndDelete({ _id: id });
  if (!task) {
    return res
      .status(404)
      .json({ msg: `no item with id ${id}`, success: false });
  }
  res.status(200).json({ task, msg: "successs" });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
