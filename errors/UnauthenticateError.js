const httpStatusCodes = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class UnauthenticatedError extends CustomAPIError{
    constructor(message){
      super(message)
      this.statusCode = httpStatusCodes.FORBIDDEN
    }
  }

  module.exports = UnauthenticatedError