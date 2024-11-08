require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const Utils = require("./Utils.js");
const Assets = require("./AssetService.js");
const AssetTypes = require("./AssetTypeService.js");

//Creates a contract in ODEP
const createContract = async (url, body, token) => {
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
      updateDataODEP.error('error: Unauthorize', { from: 'createContract', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        updateDataODEP.error('error creationg a contract', { from: 'createContract', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        updateDataODEP.info('success creationg a contract', { from: 'createContract', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

//Retrieves all contracts in ODEP
const getAllContract = async (url, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token}
    );
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllContract', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        getDataLogger.error('error retrieving all contracts', { from: 'getAllContract', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        getDataLogger.info('success retrieving all contracts', { from: 'getAllContract', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

//Retrieves a contract by id in ODEP
const getOneContract = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + id, 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getOneContract', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        getDataLogger.error('error retrieving one contract', { from: 'getOneContract', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        getDataLogger.info('success retrieving one contract', { from: 'getOneContract', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

//Retrieves all contracts created by user with the user's id
const getContractFromOwner = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + "owner/" + id, 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getContractFromOwner', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        getDataLogger.error('error retrieving owner\'scontracts', { from: 'getContractFromOwner', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        getDataLogger.info('success retrieving owner\'scontracts', { from: 'getContractFromOwner', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

//Recovers all a user's contracts and keeps only those that are not finished with adding theirs asset types
const getOwnerContractOngoing = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + "owner/" + id, 
        headers = {'accept': 'application/json',
        'Authorization': token}
    );
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getOwnerContractOngoing', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
      return [data, response.status];
    } else if (response.status != 200) {
        getDataLogger.error('error retrieving owner\'scontracts', { from: 'getOwnerContractOngoing', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
        return [data, response.status];
    } else {
      
      //Retrieves all assets and asset types to obtain the nature of the asset type linked to the contract
      const allAsset = await Assets.getAllAssetResilink(token);
      const allAssetTypes = await AssetTypes.getAllAssetTypesResilink(token);
      if (allAsset[1] != 200) {
        getDataLogger.warn('error retrieving all assets', { from: 'getOwnerContractOngoing', dataReceived: allAsset[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
        return[{contracts: {code: response.status, message: "Successful retrieval"}, assets: allAsset[0], AssetTypes: {code: "", message: "not started"}}, allAsset[1]];
      } else if (allAssetTypes[1] != 200) {
        getDataLogger.warn('error retrieving all assetTypes', { from: 'getOwnerContractOngoing', dataReceived: allAssetTypes[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
        return[{contracts: {code: response.status, message: "Successful retrieval"}, assets: {code: allAsset[1], message: "Successful retrieval"}, assetTypes: {code: allAssetTypes[1], message: allAssetTypes[0]}}, allAssetTypes[1]];
      } else {
        const filteredData = data.filter(obj => {
          const nameValue = obj["state"];
          if (nameValue !== "cancelled" && /* contract cancelled before ending of the deal */ //Need yo be deleted after, just needed for the account acazaux in RESILINK 
              nameValue !== 'endOfConsumption' && /* end states of an immaterial purchase contract */
              nameValue !== "assetReceivedByTheRequestor" && nameValue !== "assetNotReceivedByTheRequestor" && /* end states of an material purchase contract */
              nameValue !== "assetNotReturnedToTheOfferer" && nameValue !== "assetReceivedByTheRequestor" && nameValue !== "assetReceivedByTheRequestor" /* end states of an material rent contract */
             ) {
              obj['nature'] = allAssetTypes[0][allAsset[0][obj['asset'].toString()]['assetType']]['nature'];
              return true
          } else { 
            return false
          }
        });
        getDataLogger.info('success retrieving owner\'scontracts ongoing', { from: 'getOwnerContractOngoing', tokenUsed: token.replace(/^Bearer\s+/i, '')});
        return [filteredData, response.status];
      }
    }  
}

//Patches a immaterial sale contract in ODEP
const patchContractImmaterial = async (url, body, id, token) => {
  patchDataODEP.warn('data & id to send to ODEP', { from: 'patchOneRegulator', dataToSend: body, id: id, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        'PATCH',
        url + "immaterialContract/" + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      patchDataODEP.error('error: Unauthorize', { from: 'patchContractImmaterial', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        patchDataODEP.error('error patching immaterial contract', { from: 'patchContractImmaterial', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        patchDataODEP.info('success patching immaterial contract', { from: 'patchContractImmaterial', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

//Patches a material sale contract in ODEP
const patchContractMaterialPurchase = async (url, body, id, token) => {
  patchDataODEP.warn('data & id to send to ODEP', { from: 'patchOneRegulator', dataToSend: body, id: id, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        'PATCH',
        url + "purchaseMaterialContract/" + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      patchDataODEP.error('error: Unauthorize', { from: 'patchContractMaterialPurchase', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        patchDataODEP.error('error patching material (purchase) contract', { from: 'patchContractMaterialPurchase', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        patchDataODEP.info('success patching material (purchase) contract', { from: 'patchContractMaterialPurchase', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

//Patches a material rent contract in ODEP
const patchContractMaterialRent = async (url, body, id, token) => {
  patchDataODEP.warn('data & id to send to ODEP', { from: 'patchOneRegulator', dataToSend: body, id: id, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.executeCurl(
        'PATCH',
        url + "rentMaterialContract/" + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      patchDataODEP.error('error: Unauthorize', { from: 'patchContractMaterialRent', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        patchDataODEP.error('error patching material (rent) contract', { from: 'patchContractMaterialRent', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        patchDataODEP.info('success patching material (rent) contract', { from: 'patchContractMaterialRent', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

//Patches a contract in putting of cancel state
const patchContractCancel = async (url, body, id, token) => {
  patchDataODEP.warn('data & id to send to ODEP', { from: 'patchOneRegulator', dataToSend: body, id: id, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        'PATCH',
        url + "cancelContract/" + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      patchDataODEP.error('error: Unauthorize', { from: 'patchContractCancel', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
        patchDataODEP.error('error patching/cancel contract', { from: 'patchContractCancel', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        patchDataODEP.info('success patching/cancel contract', { from: 'patchContractCancel', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      };
    return [data, response.status];
}

module.exports = {
    createContract,
    getAllContract,
    getOwnerContractOngoing,
    getOneContract,
    getContractFromOwner,
    patchContractImmaterial,
    patchContractMaterialPurchase,
    patchContractMaterialRent,
    patchContractCancel,
}