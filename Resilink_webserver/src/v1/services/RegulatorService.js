require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const Utils = require("./Utils.js");

const createRegulator = async (url, body, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'createRegulator', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        "POST",
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createRegulator', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        updateDataODEP.error('error creating one regulator', { from: 'createRegulator', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        updateDataODEP.info('success creating one regulator', { from: 'createRegulator', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
};

const getAllRegulator = async (url, token) => {
    const response = await Utils.fetchJSONData(
        "GET",
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllRegulator', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        getDataLogger.error('error retrieving all regulators', { from: 'getAllRegulator', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        getDataLogger.info('success retrieving all regulators', { from: 'getAllRegulator', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
}

const getOneRegulator = async (url, body, id, token) => {
    const response = await Utils.fetchJSONData(
        "GET",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getOneRegulator', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        getDataLogger.error('error retrieving one regulator', { from: 'getOneRegulator', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        getDataLogger.info('success retrieving one regulator', { from: 'getOneRegulator', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
}

const patchOneRegulator = async (url, body, id, token) => {
  patchDataODEP.warn('data & id to send to ODEP', { from: 'patchOneRegulator', dataToSend: body, id: id, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        "PATCH",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      patchDataODEP.error('error: Unauthorize', { from: 'patchOneRegulator', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        patchDataODEP.error('error patching one regulator', { from: 'patchOneRegulator', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        patchDataODEP.info('success patching one regulator', { from: 'patchOneRegulator', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
}

const deleteRegulator = async (url, id, token) => {
  deleteDataODEP.warn('id to send to ODEP', { from: 'deleteRegulator', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        "DELETE",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      deleteDataODEP.error('error: Unauthorize', { from: 'deleteRegulator', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        deleteDataODEP.error('error deleting one regulator', { from: 'deleteRegulator', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        deleteDataODEP.info('success deleting one regulator', { from: 'deleteRegulator', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
    return [data, response.status];
}

module.exports = {
    createRegulator,
    getAllRegulator,
    getOneRegulator,
    patchOneRegulator,
    deleteRegulator,
};