require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');

const Utils = require("./Utils.js");
const User = require("./UserService.js");
const AssetTypeDB = require("../database/AssetTypeDB.js");

// Same result as the function getAllAssetTypes except its not a list of object but juste an object with key and an asset type associeted
const getAllAssetTypesResilink = async (token) => {
  try {
    const urlGetALlAssetTypes = "http://90.84.194.104:10010/assetTypes/all";
    const allAssetTypes = await Utils.fetchJSONData(
        'GET',
        urlGetALlAssetTypes, 
        headers = {'accept': 'application/json',
        'Authorization': token});
    var allAssetTypesResilink = {};
    const data = await Utils.streamToJSON(allAssetTypes.body);
    if (allAssetTypes.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllAssetTypesResilink', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
      return [data, allAssetTypes.status];
    } else if (allAssetTypes.status != 200) {
      getDataLogger.warn('error retrieving all assetTypes', { from: 'getAllAssetTypesResilink', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return[data, allAssetTypes.status];
    }
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          allAssetTypesResilink[element['name']] = element;
        }
    }
    getDataLogger.info('success retrieving all assetTypes', { from: 'getAllAssetTypesResilink', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [allAssetTypesResilink, allAssetTypes.status];
  } catch (e) {
    getDataLogger.error('error retrieving all assetTypes', { from: 'getAllAssetTypesResilink', dataReceived: e, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
};

const createAssetTypes = async (url, body, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'createAssetTypes', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
      'POST',
      url, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body);
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createAssetTypes', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
      return [data, response.status];
    } else if(response.status != 200) {
      updateDataODEP.error('error creating one assetType', { from: 'createAssetTypes', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      updateDataODEP.info('success creating one assetType', { from: 'createAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    };
    return [data, response.status];
};

/* Create a child assetType for an existing assetType.
*Look in odep to see if the assetType exists, 
*if not, returns the error given by ODEP, 
*if yes, create the child assetType in the local Resilink DB.
*/
const createAssetTypesCustom = async (assetType, token) => {
  try {
    const adminToken = await User.functionGetTokenUser({
      "userName": "admin",
      "password": "admin123"
    })
    const resultassetType = await getOneAssetTypes("http://90.84.194.104:10010/assetTypes/", assetType, token);
    if (resultassetType[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'createAssetTypesCustom', dataReceived: resultassetType[0], tokenUsed: token == null ? "Token not given" : token});
      return [resultassetType[0], resultassetType[1]];
    } else if (resultassetType[1] != 200) {
      //assetType doesn't exist or problem inside ODEP
      getDataLogger.error('error retrieving an assetType', { from: 'createAssetTypesCustom', dataReceived: resultassetType[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [resultassetType[0], resultassetType[1]];
    } else {
      const resultDB = await AssetTypeDB.newAssetTypeDB(assetType);
      resultassetType[0]["name"] = resultDB;
      updateDataODEP.warn('data to send to ODEP', { from: 'createAssetTypesCustom', dataToSend: resultassetType[0], tokenUsed: token == null ? "Token not given" : token});
      const response = await Utils.fetchJSONData(
        'POST',
        "http://90.84.194.104:10010/assetTypes/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken[0]["accessToken"]},
        resultassetType[0]
      );
      const data = await Utils.streamToJSON(response.body);
      if (response.status == 401) {
        updateDataODEP.error('error: Unauthorize', { from: 'createAssetTypesCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
        return [data, response.status];
      } else if (response.status != 200) {
        updateDataODEP.error('error creating one assetType in ODEP or localDB', { from: 'createAssetTypesCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        updateDataODEP.info('success creating one assetType in ODEP or localDB', { from: 'createAssetTypesCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
      console.log("4");
      data['assetType'] = resultDB;
      return [data, response.status];
    }
  } catch (e) {
    updateDataODEP.error('error creating one assetType or connecting with ODEP or localDB', { from: 'createAssetTypesCustom', dataReceived: e, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw ('error creating one assetType or connecting with ODEP or localDB');
  }
};

const getAllAssetTypes = async (url, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllAssetTypes', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if (response.status != 200) {
    getDataLogger.error('error retrieving/processing all assetTypes', { from: 'getAllAssetTypes', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  } else {
    /*const filteredData = data.filter(obj => {
      const nameValue = obj["name"];
  
      // Utiliser une expression régulière pour vérifier si nameValue ne contient pas de nombres
      return !/\d/.test(nameValue);
    });
    */
    getDataLogger.info('success retrieving/processing all assetTypes', { from: 'getAllAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  }  
};

const getOneAssetTypes = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOneAssetTypes', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving one assetType', { from: 'getOneAssetTypes', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving one assetType', { from: 'getOneAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const putAssetTypes = async (url, body, id, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'putAssetTypes', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
      'PUT',
      url + id, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body);
      const data = await Utils.streamToJSON(response.body);
      if (response.status == 401) {
        updateDataODEP.error('error: Unauthorize', { from: 'putAssetTypes', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
        return [data, response.status];
      } else if(response.status != 200) {
        updateDataODEP.error('error updating one assetType', { from: 'putAssetTypes', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        updateDataODEP.info('success updating one assetType', { from: 'putAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
      return [data, response.status];
};

const deleteAssetTypes = async (url, id, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'deleteAssetTypes', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if (response.status == 401) {
    deleteDataODEP.error('error: Unauthorize', { from: 'deleteAssetTypes', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    deleteDataODEP.error('error deleting one assetType', { from: 'deleteAssetTypes', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    deleteDataODEP.info('success deleting one assetType', { from: 'deleteAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  };
  return [data, response.status];
};

module.exports = {
    createAssetTypes,
    createAssetTypesCustom,
    getAllAssetTypesResilink,
    getAllAssetTypes,
    getOneAssetTypes,
    putAssetTypes,
    deleteAssetTypes,
}