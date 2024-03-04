require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const ArticleDB = require("../database/ArticleDB.js");

const getAllArticle = async () => {
    try {
        const dataFinal = await ArticleDB.getAllArticle();
        getDataLogger.info("success retrieving all articles", {from: 'getAllArticle'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all articles", {from: 'getAllArticle'});
        throw e;
    }
};

const getLastFourArticles = async () => {
    try {
        const dataFinal = await ArticleDB.getLastFourArticles();
        getDataLogger.info("success retrieving 4 articles", {from: 'getLastFourArticles'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.info("error retrieving 4 articles", {from: 'getLastFourArticles'});
        throw e;
    }
};

module.exports = {
    getAllArticle,
    getLastFourArticles,
};