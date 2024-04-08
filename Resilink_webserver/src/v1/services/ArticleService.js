require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const ArticleDB = require("../database/ArticleDB.js");

//Retrieves all articles in RESILINK
const getAllArticle = async (token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const dataFinal = await ArticleDB.getAllArticle();
        getDataLogger.info("success retrieving all articles", {from: 'getAllArticle'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all articles", {from: 'getAllArticle'});
        throw e;
    }
};

//Retrieves the last 4 articles registered in RESILINK
const getLastFourArticles = async (token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
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