require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const assetService = require("../services/AssetService.js");
const _pathAssetODEP = 'http://90.84.194.104:10010/assets/'; 

const getAllAssetResilink = async (req, res) => { 
  try {
    const response = await assetService.getAllAssetVue(req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'createRequest', data: error.message});
    res.status(500).send({message: error.message});
  }
};

const createAsset = async (req, res) => { 
  try {
      const response = await assetService.createAsset(_pathAssetODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const createAssetCustom = async (req, res) => { 
  try {
      const response = await assetService.createAssetCustom(_pathAssetODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createAssetCustom', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const createAssetWithAssetTypeCustom = async (req, res) => { 
  try {
      const response = await assetService.createAssetWithAssetTypeCustom(_pathAssetODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createAssetCustom', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const getOwnerAsset = async (req, res) => { 
  try {
      const response = await assetService.getOwnerAsset(_pathAssetODEP, req.query.idOwner, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOwnerAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const getOwnerAssetCustom = async (req, res) => { 
  try {
      const response = await assetService.getOwnerAssetCustom(_pathAssetODEP, req.query.idOwner, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOwnerAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const getAllAsset = async (req, res) => { 
  try {
      const response = await assetService.getAllAsset(_pathAssetODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getAllAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : 'token not found'});
      res.status(500).send({message: error.message});
    }
};

const getOneAsset = async (req, res) => { 
  try {
      const response = await assetService.getOneAsset(_pathAssetODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOneAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const getOneAssetCustom = async (req, res) => { 
  try {
      const response = await assetService.getOneAssetCustom(_pathAssetODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOneAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const getOneAssetIdimage = async (req, res) => { 
  try {
      const response = await assetService.getOneAssetImg(req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOneAssetIdimage', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});    
    }
};

const putAsset = async (req, res) => { 
  try {
      const response = await assetService.putAsset(_pathAssetODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'putAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const putAssetCustom = async (req, res) => { 
  try {
      const response = await assetService.putAsset(_pathAssetODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'putAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const deleteAsset = async (req, res) => { 
  try {
      const response = await assetService.deleteAsset(_pathAssetODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      deleteDataODEP.error('Catched error', { from: 'putAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const deleteAssetCustom = async (req, res) => { 
  try {
      const response = await assetService.deleteAssetCustom(_pathAssetODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      deleteDataODEP.error('Catched error', { from: 'putAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const patchAsset = async (req, res) => { 
  try {
      const response = await assetService.patchAsset(_pathAssetODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      patchDataODEP.error('Catched error', { from: 'putAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

module.exports = {
  getAllAssetResilink,
  createAsset,
  createAssetCustom,
  createAssetWithAssetTypeCustom,
  getAllAsset,
  getOneAsset,
  getOneAssetCustom,
  getOneAssetIdimage,
  getOwnerAsset,
  getOwnerAssetCustom,
  putAsset,
  putAssetCustom,
  deleteAsset,
  deleteAssetCustom,
  patchAsset
}