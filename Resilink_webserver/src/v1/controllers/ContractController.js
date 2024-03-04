require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const ContractService = require("../services/ContractService.js");

const _pathContractODEP = 'http://90.84.194.104:10010/contracts/';

const createContract = async (req, res) => {
    try {
      const response = await ContractService.createContract(_pathContractODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createContract', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

const getAllContract = async (req, res) => {
    try {
      const response = await ContractService.getAllContract(_pathContractODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getAllContract', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

const getOwnerContractOngoing = async (req, res) => {
  try {
    const response = await ContractService.getOwnerContractOngoing(_pathContractODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getOwnerContractOngoing', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send('Catched error');
  }
};

const getOneContract = async (req, res) => {
    try {
      const response = await ContractService.getOneContract(_pathContractODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOneContract', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

const getContractFromOwner = async (req, res) => {
    try {
      const response = await ContractService.getContractFromOwner(_pathContractODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getContractFromOwner', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

const patchContractImmaterial = async (req, res) => {
    try {
      const response = await ContractService.patchContractImmaterial(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      patchDataODEP.error('Catched error', { from: 'patchContractImmaterial', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

const patchContractMaterialPurchase = async (req, res) => {
    try {
      const response = await ContractService.patchContractMaterialPurchase(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      patchDataODEP.error('Catched error', { from: 'patchContractMaterialPurchase', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

const patchContractMaterialRent = async (req, res) => {
    try {
      const response = await ContractService.patchContractMaterialRent(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      patchDataODEP.error('Catched error', { from: 'patchContractMaterialRent', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

const patchContractCancel = async (req, res) => {
    try {
      const response = await ContractService.patchContractCancel(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      patchDataODEP.error('Catched error', { from: 'patchContractCancel', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send('Catched error');
    }
}

module.exports = {
    createContract,
    getOneContract,
    getAllContract,
    getOwnerContractOngoing,
    getContractFromOwner,
    patchContractImmaterial,
    patchContractMaterialPurchase,
    patchContractMaterialRent,
    patchContractCancel,
}