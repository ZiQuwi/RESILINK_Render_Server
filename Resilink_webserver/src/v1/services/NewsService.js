require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');

const NewsDB = require("../database/NewsDB.js");
const ProsumerDB = require("../database/ProsummerDB.js");

const getNewsfromCountry = async (Country) => {
    try {
        const dataFinal = await NewsDB.getNewsfromCountry(Country);
        getDataLogger.info("success retrieving all news from a country", {from: 'getNewsfromCountry'});
        return [{NewsList: dataFinal}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from a country", {from: 'getNewsfromCountry', dataReceiver: e});
        throw e;
    }
};

const getNewsfromIdList = async (ids) => {
    try {
        const dataFinal = await NewsDB.getNewsfromIdList(ids);
        getDataLogger.info("success retrieving all news from a country", {from: 'getNewsfromIdList'});
        return [{NewsList: dataFinal}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from a country", {from: 'getNewsfromIdList', dataReceiver: e});
        throw e;
    }
};

const getNewsfromOwner = async (owner, token) => {
    try {
        const prosumer = await ProsumerDB.getOneProsummer(owner);
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

const getNewsfromCountryWithoutUserNews = async (owner, country, token) => {
    try {
        const prosumer = await ProsumerDB.getOneProsummer(owner);
        var dataFinal;
        if (prosumer.bookMarked.length === 0) {
            dataFinal = await NewsDB.getNewsfromCountry(country);
        } else {
            console.log("dans le else");
            dataFinal = await NewsDB.getNewsfromCountryWithoutUserNews(country, prosumer.bookMarked);
            console.log("apres reuete datafinal")
        }
        getDataLogger.info("success retrieving all news from an owner", {from: 'getNewsfromOwner'});
        return [{NewsList: dataFinal}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all news from an owner", {from: 'getNewsfromOwner', dataReceiver: e});
        throw e;
    }
}

module.exports = {
    getNewsfromCountry,
    getNewsfromIdList,
    getNewsfromOwner,
    getNewsfromCountryWithoutUserNews
};