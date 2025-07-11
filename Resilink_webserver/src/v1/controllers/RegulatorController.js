require('../loggers.js');
const winston = require('winston');
const config = require('../config.js');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const RegulatorService = require("../services/RegulatorService.js");

const _pathRegulatorODEP = config.PATH_ODEP_REGULATOR;


const createRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.createRegulator(_pathRegulatorODEP, req.body, req.header('Authorization') ?? "");
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createRegulator', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message})
    }
}

const getAllRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.getAllRegulator(_pathRegulatorODEP, req.header('Authorization') ?? ""); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getAllRegulator', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message})
    }
}

const getOneRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.getOneRegulator(_pathRegulatorODEP, req.body, req.params.id, req.header('Authorization') ?? ""); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOneRegulator', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message})
    }
}

const patchOneRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.patchOneRegulator(_pathRegulatorODEP, req.body, req.params.id, req.header('Authorization') ?? ""); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      patchDataODEP.error('Catched error', { from: 'patchOneRegulator', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message})
    }
}

const deleteRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.deleteRegulator(_pathRegulatorODEP, req.params.id, req.header('Authorization') ?? ""); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      deleteDataODEP.error('Catched error', { from: 'deleteRegulator', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message})
    }
}

module.exports = {
    createRegulator,
    getAllRegulator,
    getOneRegulator,
    patchOneRegulator,
    deleteRegulator,
};
  