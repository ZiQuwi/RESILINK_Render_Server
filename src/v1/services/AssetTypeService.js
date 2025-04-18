require('../loggers.js');
const winston = require('winston');
const config = require('../config.js');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataResilink = winston.loggers.get('DeleteDataResilinkLogger');

const Utils = require("./Utils.js");
const User = require("./UserService.js");
const AssetTypeDB = require("../database/AssetTypeDB.js");
const UserDB = require("../database/UserDB.js");

const pathOdepAssetType = config.PATH_ODEP_ASSETTYPE

// Same result as the function getAllAssetTypes except its not a list of object but juste an object with key and an asset type associeted
const getAllAssetTypesResilink = async (token) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllAssetTypesResilink', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    var allAssetTypesResilink = {};
    const data = await AssetTypeDB.getAllAssetType();

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          allAssetTypesResilink[element['name']] = element;
        }
    }

    getDataLogger.info('success retrieving all assetTypes', { from: 'getAllAssetTypesResilink', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [allAssetTypesResilink, 200];
  } catch (e) {
    getDataLogger.error('error retrieving all assetTypes', { from: 'getAllAssetTypesResilink', dataReceived: e, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw e;
  }
};

/* 
  * Create an assetType
  * An assetType name is unique, so if it already exists, exception is return
*/
const createAssetTypes = async (token, body) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'createAssetTypes', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }
    
    const resultassetType = await getOneAssetTypes(body['name'], token);
    if (resultassetType[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'createAssetTypes', dataReceived: resultassetType[0], tokenUsed: token == null ? "Token not given" : token});
      return resultassetType;
    } else if (resultassetType[1] == 200) {
      updateDataODEP.error('assetType already exists', { from: 'createAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '') ?? ""});
      return [{message: "assetType already exists"}, 404];
    }

    await AssetTypeDB.newAssetType(body);
    updateDataODEP.info('success creating an assetType', { from: 'createAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '') ?? ""});
    return[body, 200];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'createAssetTypes', dataReceiver: e.message});
    throw e;
  }
};

/* 
  * Create an assetType by duplicating an existing assetType
*/
const duplicateAssetTypes = async (token, assetType) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'duplicateAssetTypes', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }
    
    const resultassetType = await getOneAssetTypes(assetType, token);
    if (resultassetType[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'duplicateAssetTypes', dataReceived: resultassetType[0], tokenUsed: token == null ? "Token not given" : token});
      return resultassetType;
    } else if (resultassetType[1] == 402) {
      updateDataODEP.error('no assetType duplicated => original assetType was not found', { from: 'duplicateAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '') ?? ""});
      return [{message: "no existing assetType for this name"}, 402];
    } else {
      const newAssetTypeCounter = await AssetTypeDB.newAssetTypeDBCounter(assetType);
      resultassetType[0]['name'] = newAssetTypeCounter
      await AssetTypeDB.newAssetType(resultassetType[0]);
      updateDataODEP.info('success cloning an assetType', { from: 'duplicateAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '') ?? ""});
      return [resultassetType[0], 200];
    }
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'duplicateAssetTypes', dataReceiver: e.message});
    throw e;
  }
};

//Retrieves all asset types in ODEP
const getAllAssetTypes = async (token) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllAssetTypes', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }
    
    const listAssetTypes = await AssetTypeDB.getAllAssetType();
    getDataLogger.info('success accessing all users', { from: 'getAllAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '') ?? ""});

    return [listAssetTypes, 200];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getAllAssetTypes', dataReceiver: e.message});
    throw e;
  }
};

//Retrieves an asset type by id in ODEP
const getOneAssetTypes = async (id, token) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'getOneAssetTypes', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    const data = await AssetTypeDB.getOneAssetType(id);
    updateDataODEP.info('success accessing one assetType by id', { from: 'getOneAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '') ?? ""});
    if (data === "0") {
      return [{message: "This assetType doesn't exist"}, 404]
    } else {
      return [data, 200];
    }

  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getOneAssetTypes', dataReceiver: e.message});
    throw e;
  }
};

//Updates an asset type by id in ODEP
const putAssetTypes = async (body, id, token) => {
  try {
    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'deleteAssetTypes', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }
    const adminToken = await UserDB.getUserByToken(token.replace(/^Bearer\s+/i, ''));
    if (adminToken[0]['userName'] != "admin"){
      updateDataODEP.error('error: not administrator', { from: 'deleteAssetTypes', dataReceived: "Unauthorize", tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "not the owner or administrator"}, 402];
    }
    await AssetTypeDB.updateAssetType(id, body);
    updateDataODEP.info('success updating one assetType', { from: 'putAssetTypes', tokenUsed: token.replace(/^Bearer\s+/i, '') ?? ""});
  
    return [{"message": "successful update"}, 200];
  } catch (e) {

  }
  
};

//Delete an asset type by id in ODEP
const deleteAssetTypes = async (id, token) => {
  try {
    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'deleteAssetTypes', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    const adminToken = await UserDB.getUserByToken(token.replace(/^Bearer\s+/i, ''));
    if (adminToken[0]['userName'] != "admin") {
      updateDataODEP.error('error: not administrator', { from: 'deleteAssetTypes', dataReceived: "Unauthorize", tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "not the owner or administrator"}, 402];
    }

    await AssetTypeDB.deleteAssetType(id);
    deleteDataResilink.info("success deleting an assetType in RESILINK", {from: 'deleteAssetTypes'});

    return [{message: id + " user account correctly removed in RESILINK "}, 200];
  } catch (e) {
    deleteDataResilink.error("error deleting a user account in RESILINK", {from: 'deleteAssetTypes', dataReceiver: e.message});
    throw e;
  }
};

module.exports = {
    createAssetTypes,
    duplicateAssetTypes,
    getAllAssetTypesResilink,
    getAllAssetTypes,
    getOneAssetTypes,
    putAssetTypes,
    deleteAssetTypes,
}