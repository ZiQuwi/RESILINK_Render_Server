require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const NewsDB = require("../database/NewsDB.js");

const getNewsfromCountry = async (Country) => {
    try {
        const dataFinal = await NewsDB.getNewsfromCountry(Country);
        getDataLogger.info("success retrieving all news from a country", {from: 'getNewsfromCountry'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from a country", {from: 'getNewsfromCountry', dataReceiver: e});
        throw e;
    }
};

const getNewsfromIdList = async (ids) => {
    try {
        const dataFinal = await NewsDB.getNewsfromIdList(ids);
        getDataLogger.info("success retrieving all news from a country", {from: 'getNewsfromIdList'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from a country", {from: 'getNewsfromIdList', dataReceiver: e});
        throw e;
    }
};

module.exports = {
    getNewsfromCountry,
    getNewsfromIdList,
};