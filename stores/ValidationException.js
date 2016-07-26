function ValidationException(message) {
  this.message = message;
  this.name = 'ValidationException';
}

ValidationException.prototype = new Error();
ValidationException.prototype.constructor = ValidationException;
