require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const ArticleService = require("../services/ArticleService.js");

const getAllArticles = async (req, res) => { 
    try {
      const response = await ArticleService.getAllArticle();
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Error accessing Resilink Database', { from: 'getAllArticles', data: error});
      res.status(500).send('Error accessing Resilink Database');
    }
};

const getLastFourArticles = async (req, res) => { 
  try {
    const response = await ArticleService.getLastFourArticles();
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink Database', { from: 'getLastFourArticles', data: error});
      res.status(500).send('Error accessing Resilink Database');
  }
};

module.exports = {
    getAllArticles,
    getLastFourArticles,
};