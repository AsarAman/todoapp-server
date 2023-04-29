const httpStatusCodes = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const defaultError = {
    statusCode: err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = httpStatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  //check for unique email below
  //  if(err.code && err.code === 11000){
  //  defaultError.statusCode = httpStatusCodes.BAD_REQUEST
  //  defaultError.msg = `${Object.keys(err.keyvalue)}field has to be unique`
  //  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

module.exports = errorHandler;
