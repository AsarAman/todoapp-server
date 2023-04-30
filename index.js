require('express-async-errors')
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const todosRouter = require("./routes/todosRoutes");
const userRouter = require('./routes/userRoutes')
require("dotenv").config();
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')
const authenticateUser = require('./middlewares/authentication')


//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/todos", authenticateUser, todosRouter);
app.use('/api/v1/auth', userRouter)
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
