require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const NewsService = require("../services/NewsService.js");

const getNewsfromCountry = async (req, res) => { 
    try {
      console.log("dans getNewsfromCountry");
      const response = await NewsService.getNewsfromCountry(req.query.country);
      res.status(response[1]).send(response[0]);
    } catch (error) {
      getDataLogger.error('Error accessing Resilink Database', { from: 'getNewsfromCountry', data: error});
      res.status(500).send({error: error});
    }
};

const getNewsfromIdList = async (req, res) => { 
  try {
    const response = await NewsService.getNewsfromIdList(req.query.ids);
    res.status(response[1]).send(response[0]);
  } catch (error) {
    getDataLogger.error('Error accessing Resilink Database', { from: 'getNewsfromIdList', data: error});
    res.status(500).send({error: error});
  }
};

module.exports = {
    getNewsfromCountry,
    getNewsfromIdList,
};