require('express-async-errors')
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const todosRouter = require("./routes/todosRoutes");
require("dotenv").config();
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')


//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/todos", todosRouter);
app.use(notFound)
app.use(errorHandler)

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
