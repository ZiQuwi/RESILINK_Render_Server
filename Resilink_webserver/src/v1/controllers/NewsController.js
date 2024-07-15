require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const NewsService = require("../services/NewsService.js");

const getNewsfromCountry = async (req, res) => { 
    try {
      const response = await NewsService.getNewsfromCountry(req.query.country, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Error accessing Resilink Database', { from: 'getNewsfromCountry', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
      res.status(500).send({error: error});
    }
};

const getNewsfromIdList = async (req, res) => { 
  try {
    const response = await NewsService.getNewsfromIdList(req.query.ids, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink Database', { from: 'getNewsfromIdList', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({error: error});
  }
};

const getNewsfromOwner = async (req, res) => { 
  try {
    const response = await NewsService.getNewsfromOwner(req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink Database', { from: 'getNewsfromIdList', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({message: error.message});
  }
};

const getNewsfromCountryWithoutUserNews = async (req, res) => { 
  try {
    const response = await NewsService.getNewsfromCountryWithoutUserNews(req.query.owner, req.query.country, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink Database', { from: 'getNewsfromIdList', data: error, tokenUsed: req.header('Authorization') != null ? req.header('Authorization').replace(/^Bearer\s+/i, '') : "token not found"});
    res.status(500).send({message: error.message});
  }
};

module.exports = {
    getNewsfromCountry,
    getNewsfromIdList,
    getNewsfromOwner,
    getNewsfromCountryWithoutUserNews,
};