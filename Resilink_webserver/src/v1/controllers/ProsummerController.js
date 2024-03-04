require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const prosummerService = require("../services/ProsummerService.js");
const _pathProsumerODEP = 'http://90.84.194.104:10010/prosumers/';

const createProsumer = async (req, res) => { 
  try {
    const response = await prosummerService.createProsummer(_pathProsumerODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'createProsumer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
};

const getAllProsummer = async (req, res) => { 
  try {
    const response = await prosummerService.getAllProsummer(_pathProsumerODEP, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getAllProsummer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
};

const createProsumerCustom = async (req, res) => {
  try {
    const response = await prosummerService.createProsumerCustom(_pathProsumerODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'createProsumerCustom', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
}
  
const getAllProsummerCustom = async (req, res) => { 
  try {
    const response = await prosummerService.getAllProsummerCustom(_pathProsumerODEP, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getAllProsummerCustom', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
};
  
const getOneProsumer = async (req, res) => {
  try {
    const response = await prosummerService.getOneProsummer(_pathProsumerODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getOneProsumer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
};
  
const deleteOneProsummer = async (req, res) => {
  try {
    const response = await prosummerService.deleteOneProsummer(_pathProsumerODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    deleteDataODEP.error('Catched error', { from: 'deleteOneProsummer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
};

const patchBalanceProsumer = async (req, res) => {
  try {
    const response = await prosummerService.patchBalanceProsummer(_pathProsumerODEP, req.body, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    patchDataODEP.error('Catched error', { from: 'patchBalanceProsumer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
};

const patchSharingProsumer = async (req, res) => {
  try {
    const response = await prosummerService.patchSharingProsummer(_pathProsumerODEP, req.body, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    patchDataODEP.error('Catched error', { from: 'patchSharingProsumer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error});
  }
};

const patchBookmarkProsumer = async (req, res) => {
  try {
    const response = await prosummerService.patchBookmarkProsummer(req.body, req.params.id);
    res.status(response[1]).send(response[0]);
  } catch (error) {
    patchDataODEP.error('Catched error', { from: 'patchBookmarkProsumer', data: error});
    res.status(500).send({message: error});
  }
};

module.exports = {
    getAllProsummer,
    getOneProsumer,
    createProsumer,
    deleteOneProsummer,
    patchBalanceProsumer,
    patchSharingProsumer,
    createProsumerCustom,
    getAllProsummerCustom,
    patchBookmarkProsumer,
};
  