require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');

const userService = require("../services/UserService.js");

const getTokenUser = async (req, res) => {
    try {
      const response = await userService.functionGetTokenUser(req.body);
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getTokenUser', data: error, bodySent: req.body});
      res.status(500).send('Catched error');
    }
};

const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'createUser', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send('Catched error');
  }
}

  module.exports = {
    getTokenUser,
    createUser
};
  