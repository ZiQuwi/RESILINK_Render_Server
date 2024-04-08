require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const ArticleService = require("../services/ArticleService.js");

const getAllArticles = async (req, res) => { 
  try {
    const response = await ArticleService.getAllArticle(req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error(error.message, { from: 'getAllArticles', data: error.message});
    res.status(500).send({message: error.message});
  }
};

const getLastFourArticles = async (req, res) => { 
  try {
    const response = await ArticleService.getLastFourArticles(req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error(error.message, { from: 'getLastFourArticles', data: error.message});
    res.status(500).send({message: error.message});
  }
};

module.exports = {
    getAllArticles,
    getLastFourArticles,
};