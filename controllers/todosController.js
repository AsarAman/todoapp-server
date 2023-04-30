const Todos = require("../models/Todo");
const httpStatusCodes= require('http-status-codes')

const BadRequestError = require("../errors/bad-request");

const getTodos = async (req, res) => {
  console.log(req.user)
  const todos = await Todos.find({createdBy:req.user.userId});
  res.status(httpStatusCodes.OK).json({ todos, amount: todos.length , user:req.user});
};

const createTodo = async (req, res) => {
  const { name, description } = req.body;
  
  if (!name || !description) {
    throw new BadRequestError("Please provide all values");
  }
  const todo = await Todos.create({ name, description,createdBy:req.user.userId });
  res.status(httpStatusCodes.CREATED).json({ todo });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  //if (!name || !description){
  //  return res.status(400).send("please provide all values");
  //}

  const task = await Todos.findOneAndUpdate({ _id: id, createdBy:req.user.userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res
      .status(httpStatusCodes.NOT_FOUND)
      .json({ msg: `no item with id ${id}`, success: false });
  }
  res.status(httpStatusCodes.OK).json({ task });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const task = await Todos.findOneAndDelete({ _id: id, createdBy:req.user.userId });
  if (!task) {
    return res
      .status(httpStatusCodes.NOT_FOUND)
      .json({ msg: `no item with id ${id}`, success: false });
  }
  res.status(httpStatusCodes.OK).json({ task, msg: "successs" });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
