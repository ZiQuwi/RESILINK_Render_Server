require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');

const RequestService = require("../services/RequestService.js");

const _pathRequestODEP = 'http://90.84.174.128:10010/requests/';

const createRequest = async (req, res) => {
    try {
      const response = await RequestService.createRequest(_pathRequestODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createRequest', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send({message: error.message})
    }
}

const getOneRequest = async (req, res) => {
    try {
      const response = await RequestService.getOneRequest(_pathRequestODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOneRequest', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send({message: error.message})
    }
}

const getAllRequest = async (req, res) => {
    try {
      const response = await RequestService.getAllRequest(_pathRequestODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getAllRequest', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send({message: error.message})
    }
}

const putRequest = async (req, res) => {
    try {
      const response = await RequestService.putRequest(_pathRequestODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'putRequest', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send({message: error.message})
    }
}

const deleteRequest = async (req, res) => {
    try {
      const response = await RequestService.deleteRequest(_pathRequestODEP, req.params.id,req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      deleteDataODEP.error('Catched error', { from: 'deleteRequest', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send({message: error.message})
    }
}

module.exports = {
    createRequest,
    getOneRequest,
    getAllRequest,
    putRequest,
    deleteRequest,
}