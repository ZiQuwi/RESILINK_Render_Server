require('../loggers.js');
const winston = require('winston');
const config = require('../config.js');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const assetService = require("../services/AssetService.js");
const _pathAssetODEP = config.PATH_ODEP_ASSET; 

const getAllAssetMapped = async (req, res) => { 
  try {
    const response = await assetService.getAllAssetResilink(req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'createRequest', data: error.message});
    res.status(500).send({message: error.message});
  }
};

const createAsset = async (req, res) => { 
  try {
      const response = await assetService.createAsset(req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const createAssetWithAssetTypeCustom = async (req, res) => { 
  try {
      const response = await assetService.createAssetWithAssetTypeCustom(req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      updateDataODEP.error('Catched error', { from: 'createAssetWithAssetTypeCustom', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const getOwnerAsset = async (req, res) => { 
  try {
      const response = await assetService.getOwnerAsset(req.query.idOwner, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOwnerAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const getAllAsset = async (req, res) => { 
  try {
      const response = await assetService.getAllAsset(req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getAllAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : 'token not found'});
      res.status(500).send({message: error.message});
    }
};

const getOneAsset = async (req, res) => { 
  try {
      const response = await assetService.getOneAsset(req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getOneAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
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

const deleteAsset = async (req, res) => { 
  try {
      const response = await assetService.deleteAsset(req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      deleteDataODEP.error('Catched error', { from: 'putAsset', data: error.message, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({message: error.message});
    }
};

const postImagesAsset = async (req, res) => {
  try {
    const response = await assetService.postImages(req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'postImg', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({message: error.message})
  }
}

const deleteImagesAsset = async (req, res) => {
  try {
    const response = await assetService.deleteImagesAsset(req.params.id, req.header('Authorization'), false);
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'deleteImagesAsset', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({message: error.message})
  }
}

const saveImagesAsset = async (req, res) => { 
  try {
      const response = await assetService.saveImagesAsset(req.body);
      res.status(response[1]).send(response[0]);
    } catch (error) {
      patchDataODEP.error('Catched error', { from: 'saveImageAsset', data: error.message});
      res.status(500).send({message: error.message});
    }
};


module.exports = {
  getAllAssetMapped,
  getAllAsset,
  getOneAsset,
  getOwnerAsset,
  createAsset,
  createAssetWithAssetTypeCustom,
  putAsset,
  deleteAsset,
  postImagesAsset,
  deleteImagesAsset,
  saveImagesAsset
}