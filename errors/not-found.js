const httpStatusCodes = require('http-status-codes')
const CustomAPIError = require('./custom-api')
class NotFoundError extends CustomAPIError{
    constructor(message){
      super(message)
      this.statusCode = httpStatusCodes.NOT_FOUND
    }
  }

  module.exports = NotFoundError