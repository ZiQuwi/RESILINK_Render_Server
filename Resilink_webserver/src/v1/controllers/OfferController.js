require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');

const OfferService = require("../services/OfferService.js");
const _pathofferODEP = 'http://90.84.194.104:10010/offers/'; 

const getAllOfferResilinkCustom = async (req, res) => { 
    try {
      const response = await OfferService.getAllOfferForResilinkCustom(_pathofferODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Catched error', { from: 'getAllOfferResilinkCustom', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
      res.status(500).send({message: error.message})
    }
};

//Not added on the API for now (need to see how to handle the no price offer)
const createOfferNoPrice = async (req, res) => {
  try {
    const response = await OfferService.getAllOfferForResilinkCustom(_pathofferODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'createOfferNoPrice', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
};

const getOfferFiltered = async (req, res) => {
  try {
    const response = await OfferService.getAllOfferFilteredCustom(_pathofferODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getOfferFiltered', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
};

const getOfferOwner = async (req, res) => {
  try {
    const response = await OfferService.getAllOfferOwnerCustom(_pathofferODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getOfferOwner', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
};

const createOffer = async (req, res) => {
  try {
    const response = await OfferService.createOffer(_pathofferODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'createOffer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
}

const createOfferAsset = async (req, res) => {
  try {
    const response = await OfferService.createOfferAsset(_pathofferODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'createOffer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
}

const getAllOffer = async (req, res) => {
  try {
    const response = await OfferService.getAllOffer(_pathofferODEP, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getAllOffer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
}

const getOneOffer = async (req, res) => {
  try {
    const response = await OfferService.getOneOffer(_pathofferODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Catched error', { from: 'getOneOffer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
}

const putOffer = async (req, res) => {
  try {
    const response = await OfferService.putOffer(_pathofferODEP, req.body, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataODEP.error('Catched error', { from: 'putOffer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
}

const deleteOffer = async (req, res) => {
  try {
    const response = await OfferService.deleteOffer(_pathofferODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    deleteDataODEP.error('Catched error', { from: 'deleteOffer', data: error, tokenUsed: req.header('Authorization').replace(/^Bearer\s+/i, '')});
    res.status(500).send({message: error.message})
  }
}

module.exports = {
    getAllOfferResilinkCustom,
    getOfferFiltered,
    getOfferOwner,
    createOfferNoPrice,
    createOfferAsset,
    createOffer,
    getAllOffer,
    getOneOffer,
    putOffer,
    deleteOffer,
}