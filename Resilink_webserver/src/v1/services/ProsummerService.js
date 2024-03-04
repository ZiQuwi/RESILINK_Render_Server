require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const ProsummerDB = require("../database/ProsummerDB.js");
const userService = require("./UserService.js");
const Utils = require("./Utils.js");

const createProsummer = async (url, body, token) => {
  patchDataODEP.warn('data to send to ODEP', { from: 'patchBalanceProsummer', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
    "POST",
    url, 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
     body
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    updateDataODEP.error('error creating one prosummer', { from: 'createProsummer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success creating one prosummer', { from: 'createProsummer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const getAllProsummer = async (url, token) => {
  const response = await Utils.fetchJSONData(
    "GET",
    url + "all", 
    headers = {'accept': 'application/json',
     'Authorization': token}
     );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all prosummers', { from: 'getAllProsummer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving all prosummers', { from: 'getAllProsummer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const createProsumerCustom = async(url, body, token) => {
  patchDataODEP.warn('data to send to Resilink DB & ODEP', { from: 'patchBalanceProsummer', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const user = await userService.createUser(body);
  updateDataODEP.info('success creating an user', { from: 'createProsumerCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  const response = await Utils.fetchJSONData(
    "POST",
    url, 
    headers = {'accept': 'application/json',
     'Authorization': token,
     'Content-Type': 'application/json'},
    body = {'id': user.userName,
    'sharingAccount': 100, 
    "balance": 0}
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createProsumerCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    updateDataODEP.error('error creating one user but not his prosummer status', { from: 'createProsumerCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success creating one user and his prosummer status', { from: 'createProsumerCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  //TODO insert un utilisateur avec son nom comme id et son numéro de tel s'il existe
  //ProsummerDB.newProsumer(user.userName, body.phone?? null);
  return [data, response.status];
};

const getAllProsummerCustom = async (url, token) => {
  const response = await Utils.fetchJSONData(
    "GET",
    url, 
    headers = 
      {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllProsummerCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all prosummers and his data in Resilink DB', { from: 'getAllProsummerCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving all prosummers and his data in Resilink DB', { from: 'getAllProsummerCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  //TODO importer le numéro de tel depuis notre base de données via la fonction getAllProsummer
  //const allProsummerMongo = ProsummerDB.getAllProsummer();
  //console.log(allProsummerMongo);
  return [data, response.status];
};

const getOneProsummer = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
    "GET",
    url + id, 
    headers = {'accept': 'application/json',
     'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOneProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving one prosummer', { from: 'getOneProsummer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving one prosummer', { from: 'getOneProsummer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const deleteOneProsummer = async (url, id, token) => {
  deleteDataODEP.warn('id to send to ODEP', { from: 'patchBalanceProsummer', id: id, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
    "DELETE",
    url + id, 
    headers = {'accept': 'application/json',
     'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    deleteDataODEP.error('error: Unauthorize', { from: 'deleteOneProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    deleteDataODEP.error('error deleting one prosummer', { from: 'deleteOneProsummer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    deleteDataODEP.info('success deleting one prosummer', { from: 'deleteOneProsummer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const patchBalanceProsummer = async (url, body, id, token) => {
  patchDataODEP.warn('data & id to send to ODEP', { from: 'patchBalanceProsummer', dataToSend: body, id: id, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
    "PATCH",
    url + id + "/balance", 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
    body
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    patchDataODEP.error('error: Unauthorize', { from: 'patchBalanceProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    patchDataODEP.error('error patching prosummer\'s balance', { from: 'patchBalanceProsummer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    patchDataODEP.info('success patching prosummer\'s balance', { from: 'patchBalanceProsummer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const patchSharingProsummer = async (url, body, id, token) => {
  patchDataODEP.warn('data & id to send to ODEP', { from: 'patchSharingProsummer', dataToSend: body, id: id, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
    "PATCH",
    url + id + "/sharingAccount", 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
     body
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    patchDataODEP.error('error: Unauthorize', { from: 'patchSharingProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    patchDataODEP.error('error patching prosummer\'s sharing', { from: 'patchSharingProsummer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    patchDataODEP.info('success patching prosummer\'s sharing', { from: 'patchSharingProsummer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const patchBookmarkProsummer = async (body, id) => {
  console.log("dans service");
  console.log(body);
  console.log(id);
  try {
    if (isNaN(body['bookmarkId'])) {
      throw notValidBody("it's not a number in a string");
    }
    patchDataODEP.warn('data & id to send to local DB', { from: 'patchBookmarkProsummer', dataToSend: body, id: id});
    console.log("etape 1");
    console.log(body['bookmarkId']);
    const data = await ProsummerDB.addbookmarked(id, body['bookmarkId']);
    /*if(response.status == 401) {
      patchDataODEP.error('error: Unauthorize', { from: 'patchBookmarkProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } 
    */
    patchDataODEP.info('success patching prosummer\'s bookmark list', { from: 'patchBookmarkProsummer', /*tokenUsed: token.replace(/^Bearer\s+/i, '')*/});
    return [{message: "Prosumer bookmark list successfully changed"}, 200];
  } catch (e) {
    if (e instanceof notValidBody) {
      console.log(e);
      patchDataODEP.error('body is not valid', { from: 'patchBookmarkProsummer', dataReceived: body, /*tokenUsed: token.replace(/^Bearer\s+/i, '')*/});
    } else {
      patchDataODEP.error('error patching prosummer\'s bookmark list', { from: 'patchBookmarkProsummer', dataReceived: body, /*tokenUsed: token.replace(/^Bearer\s+/i, '')*/});
    }
    throw(e);
  }
};

module.exports = {
    createProsummer,
    getAllProsummer,
    getAllProsummerCustom,
    getOneProsummer,
    createProsumerCustom,
    deleteOneProsummer,
    patchBalanceProsummer,
    patchSharingProsummer,
    patchBookmarkProsummer,
}