require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');

const Utils = require("./Utils.js");

//Creates a request in ODEP
const createRequest = async (url, body, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'createRequest', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        'POST',
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createRequest', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        updateDataODEP.error('error creating one request', { from: 'createRequest', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        updateDataODEP.info('success creating one request', { from: 'createRequest', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
};

//Retrieves a request by id in ODEP
const getOneRequest = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + id, 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getOneRequest', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        getDataLogger.error('error retrieving one regulator', { from: 'getOneRequest', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        getDataLogger.info('success retrieving one regulator', { from: 'getOneRequest', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
};

//Retrieves all requests in ODEP
const getAllRequest = async (url, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllRequest', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        getDataLogger.error('error retrieving all regulators', { from: 'getAllRequest', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        getDataLogger.info('success retrieving all regulators', { from: 'getAllRequest', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
};

//Updates a request by id in ODEP
const putRequest = async (url, body, id, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'putRequest', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        'PUT',
        url + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'putRequest', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        updateDataODEP.error('error updating one regulator', { from: 'putRequest', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        updateDataODEP.info('success updating one regulator', { from: 'putRequest', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
};

//Deletes a request by id in ODEP
const deleteRequest = async (url, id, token) => {
  deleteDataODEP.warn('id to send to ODEP', { from: 'deleteRequest', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        'DELETE',
        url + id, 
        headers = {'accept': 'application/json',
        'Authorization': token}
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      deleteDataODEP.error('error: Unauthorize', { from: 'deleteRequest', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        deleteDataODEP.error('error deleting one regulator', { from: 'deleteRequest', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        deleteDataODEP.info('success deleting one regulator', { from: 'deleteRequest', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
};

module.exports = {
    createRequest,
    getOneRequest,
    getAllRequest,
    putRequest,
    deleteRequest,
}