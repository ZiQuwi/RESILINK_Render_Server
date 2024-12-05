require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');

const RatingDB = require("../database/RatingDB.js");

// Create a rating 
const createRating = async (body, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const dataFinal = await RatingDB.createNewRating(body['userId'], body['rating']);
        getDataLogger.info("success creating a rating for user " + body['userId'], {from: 'createRating'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.error("error creating a rating", {from: 'createRating', dataReceiver: e});
        throw e;
    }
};

// Retrieve all ratings 
const getAllRating = async (token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const dataFinal = await RatingDB.getAllRating();
        getDataLogger.info("success retrieving all ratings", {from: 'getAllRating'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.error("error retrieving all ratings", {from: 'getAllRating', dataReceiver: e});
        throw e;
    }
};

// Retrieve a rating by its user id  
const getIdRating = async (userId, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const dataFinal = await RatingDB.getRatingByUserId(userId);
        getDataLogger.info("success retrieving a user rating", {from: 'getIdRating'});
        return [dataFinal, 200];
    } catch (e) {
        getDataLogger.error("error retrieving a user rating", {from: 'getIdRating', dataReceiver: e});
        throw e;
    }
};

// Retrieve the average of all ratings  
const getAverageRating = async (token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        const data = await RatingDB.getAllRating();

        let totalRating = 0;
        let count = 0;

        for (const item of data) {
            if (item.rating && typeof item.rating === 'number') {
                totalRating += item.rating;
                count++;
            }
        }
        const averageRating = count > 0 ? totalRating / count : 0;

        getDataLogger.info("success retrieving the average of all rating", {from: 'getAverageRating'});
        return [{"averageRating": averageRating}, 200];
    } catch (e) {
        getDataLogger.error("error retrieving the average of all rating", {from: 'getAverageRating', dataReceiver: e});
        throw e;
    }
};

// Update a rating 
const putRating = async (userId, body, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
    
        await RatingDB.updateRating(userId, body['rating'])

        updateDataODEP.info("success retrieving the average of all rating", {from: 'putRating'});
        return [{"message": "update successfull"}, 200];
    } catch (e) {
        updateDataODEP.error("error updating a rating", {from: 'putRating', dataReceiver: e});
        throw e;
    }
};

// Update a rating 
const deleteRating = async (userID, token) => {
    try {
        if (token === null || token === "") {
            return [{message: "token is empty"}, 401];
        }
        
        await RatingDB.deleteRatingByUserId(userID);

        deleteDataODEP.info("success deleting rating from user " + userID, {from: 'getAverageRating'});
        return [{"message": "delete successfull"}, 200];
    } catch (e) {
        deleteDataODEP.error("error retrieving the average of all rating", {from: 'getAverageRating', dataReceiver: e});
        throw e;
    }
};

module.exports = {
    createRating,
    getIdRating,
    getAllRating,
    getAverageRating,
    putRating,
    deleteRating
  }