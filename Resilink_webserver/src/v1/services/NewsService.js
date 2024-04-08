require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const NewsDB = require("../database/NewsDB.js");
const ProsumerDB = require("../database/ProsummerDB.js");

//Retrieves all news by country in RESILINK
const getNewsfromCountry = async (Country, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const dataFinal = await NewsDB.getNewsfromCountry(Country);
        getDataLogger.info("success retrieving all news from a country", {from: 'getNewsfromCountry'});
        return [{NewsList: dataFinal}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from a country", {from: 'getNewsfromCountry', dataReceiver: e});
        throw e;
    }
};

//Retrieves the news associated with the id list in parameter in RESILINK
const getNewsfromIdList = async (ids, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const dataFinal = await NewsDB.getNewsfromIdList(ids);
        getDataLogger.info("success retrieving all news from a country", {from: 'getNewsfromIdList'});
        return [{NewsList: dataFinal}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from a country", {from: 'getNewsfromIdList', dataReceiver: e});
        throw e;
    }
};

//Retrieves all news in the book marked  list of a user
const getNewsfromOwner = async (owner, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const prosumer = await ProsumerDB.getOneProsummerWithUsername(owner);
        if (prosumer.bookMarked.length === 0) {
            return [{NewsList: []}, 200];
        }
        const dataFinal = await NewsDB.getNewsfromIdList(prosumer.bookMarked);
        getDataLogger.info("success retrieving all news from an owner", {from: 'getNewsfromOwner'});
        return [{NewsList: dataFinal}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from an owner", {from: 'getNewsfromOwner', dataReceiver: e});
        throw e;
    }
};

//Retrieves all news by country by excluding all news from a user's book marked list
const getNewsfromCountryWithoutUserNews = async (owner, country, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const prosumer = await ProsumerDB.getOneProsummerWithUsername(owner);
        var dataFinal;
        if (prosumer.bookMarked.length === 0) {
            dataFinal = await NewsDB.getNewsfromCountry(country);
        } else {
            dataFinal = await NewsDB.getNewsfromCountryWithoutUserNews(country, prosumer.bookMarked);
        }
        getDataLogger.info("success retrieving all news from an owner", {from: 'getNewsfromCountryWithoutUserNews'});
        return [{NewsList: dataFinal}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from an owner", {from: 'getNewsfromCountryWithoutUserNews', dataReceiver: e});
        throw e;
    }
}



module.exports = {
    getNewsfromCountry,
    getNewsfromIdList,
    getNewsfromOwner,
    getNewsfromCountryWithoutUserNews
};