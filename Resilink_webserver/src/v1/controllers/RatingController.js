require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataLogger = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataLogger = winston.loggers.get('DeleteDataODEPLogger');

const RatingService = require("../services/RatingService.js");

const createRating = async (req, res) => { 
  try {
    const response = await RatingService.createRating(req.body, req.header('Authorization') ?? "");
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink server', { from: 'createRating', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({error: error});
  }
};

const updateRating = async (req, res) => { 
  try {
    const response = await RatingService.putRating(req.params.userId, req.body, req.header('Authorization') ?? "");
    res.status(response[1]).send(response[0]);
  } catch (error) {
    updateDataLogger.error('Error accessing Resilink server', { from: 'updateRating', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({message: error.message});
  }
};

const getAllRating = async (req, res) => { 
  try {
    const response = await RatingService.getAllRating(req.header('Authorization') ?? "");
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink server', { from: 'getAllRating', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({error: error});
  }
};

const getRatingFromUserId = async (req, res) => { 
    try {
      const response = await RatingService.getIdRating(req.params.userId, req.header('Authorization') ?? "");
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Error accessing Resilink server', { from: 'getRatingFromUserId', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({error: error});
    }
};

const getAverageRating = async (req, res) => { 
  try {
    const response = await RatingService.getAverageRating(req.header('Authorization') ?? "");
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink server', { from: 'getAverageRating', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({error: error});
  }
};

const deleteRating = async (req, res) => { 
  try {
    const response = await RatingService.deleteRating(req.params.userId, req.header('Authorization') ?? "");
    res.status(response[1]).send(response[0]);
  } catch (error) {
    deleteDataLogger.error('Error accessing Resilink server', { from: 'deleteRating', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({error: error});
  }
};

module.exports = {
    createRating,
    getAllRating,
    getAverageRating,
    getRatingFromUserId,
    updateRating,
    deleteRating
};