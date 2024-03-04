require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');

const assettypeService = require("../services/AssetTypeService.js");
const _pathassetTypesODEP = 'http://90.84.194.104:10010/assetTypes/'; 
const userService = require("../services/UserService.js");

const createAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.createAssetTypes(_pathassetTypesODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Error accessing ODEP', { from: 'createAssetTypes', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Error accessing ODEP');
    }
};
/*
const createAssetTypesCustom = async (req, res) => { 
  try {
      const response = await assettypeService.createAssetTypes(_pathassetTypesODEP, req.body, req.header('Authorization') ?? userService.functionGetTokenUser({
        "userName": "admin",
        "password": "admin123"
      }));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Error accessing ODEP', { from: 'createAssetTypesCustom', data: error});
      res.status(500).send('Error accessing ODEP');
    }
};
*/
const getAllAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.getAllAssetTypes(_pathassetTypesODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Error accessing ODEP', { from: 'getAllAssetTypes', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Error accessing ODEP');
    }
};

const getOneAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.getOneAssetTypes(_pathassetTypesODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Error accessing ODEP', { from: 'getOneAssetTypes', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Error accessing ODEP');
    }
};

const putAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.putAssetTypes(_pathassetTypesODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Error accessing ODEP', { from: 'putAssetTypes', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Error accessing ODEP');
    }
};

const deleteAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.deleteAssetTypes(_pathassetTypesODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      deleteDataODEP.error('Error accessing ODEP', { from: 'deleteAssetTypes', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Error accessing ODEP');
    }
};

module.exports = {
    createAssetTypes,
    getAllAssetTypes,
    getOneAssetTypes,
    putAssetTypes,
    deleteAssetTypes,
}