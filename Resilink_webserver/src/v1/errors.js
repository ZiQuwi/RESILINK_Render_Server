class UpdateDBError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UpdateDBError';
    }
}
  
class InsertDBError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InsertDBError';
    }
}

class DeleteDBError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DeleteDBError';
    }
}

class getDBError extends Error {
    constructor(message) {
      super(message);
      this.name = 'getDBError';
    }
}

module.exports = {
  getDBError,
  DeleteDBError,
  UpdateDBError,
  InsertDBError
};