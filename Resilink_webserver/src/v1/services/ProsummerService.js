require('../loggers.js');
const winston = require('winston');
const { notValidBody } = require('../errors.js'); 

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const deleteDataResilink = winston.loggers.get('DeleteDataResilinkLogger');
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

const createProsumerCustom = async(url, body) => {

  console.log("dans createProsumerCustom, avant get admin token");
  const admin = await userService.functionGetTokenUser({userName: "admin", password: "admin123"});
  console.log("apres get admin token");
  patchDataODEP.warn('data to send to Resilink DB & ODEP', { from: 'createProsumerCustom', dataToSend: body, tokenUsed: admin[0]["accessToken"]});
  const user = await userService.createUserResilink(body, admin[0]["accessToken"]);

  if(user[1] == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createProsumerCustom', dataReceived: user[0], tokenUsed: admin[0]["accessToken"].replace(/^Bearer\s+/i, '')});
    return user;
  } else if(user[1] != 201) {
    updateDataODEP.error('error creating user in ODEP', { from: 'createProsumerCustom', dataReceived: user[0], tokenUsed: admin[0]["accessToken"].replace(/^Bearer\s+/i, '')});
    return user;
  } else {
    updateDataODEP.info('success creating user in ODEP and Resilink DB', { from: 'createProsumerCustom', tokenUsed: admin[0]["accessToken"].replace(/^Bearer\s+/i, '')});
  }

  const response = await Utils.fetchJSONData(
    "POST",
    url, 
    headers = {'accept': 'application/json',
     'Authorization': 'Bearer ' + admin[0]["accessToken"],
     'Content-Type': 'application/json'},
    body = {'id': user[0].userName,
    'sharingAccount': 100, 
    "balance": 0}
  );
  const data = await Utils.streamToJSON(response.body);

  if(response.status == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createProsumerCustom', dataReceived: data, tokenUsed: admin[0]["accessToken"]});
    return [data, response.status];
  } else if(response.status != 200) {
    updateDataODEP.error('error creating one user but not his prosummer status', { from: 'createProsumerCustom', dataReceived: data, tokenUsed: admin[0]["accessToken"].replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  } else {
    updateDataODEP.info('success creating one user and his prosummer status in ODEP', { from: 'createProsumerCustom', tokenUsed: admin[0]["accessToken"].replace(/^Bearer\s+/i, '')});
  }
  ProsummerDB.newProsumer(user[0].userName);
  updateDataODEP.info('success creating one user and his prosummer status in ODEP and Resilink DB', { from: 'createProsumerCustom', tokenUsed: admin[0]["accessToken"].replace(/^Bearer\s+/i, '')});
  return [{user: user[0], prosumer: data}, response.status];
};

const getAllProsummerCustom = async (url, token) => {
  const response = await Utils.fetchJSONData(
    "GET",
    url + "all", 
    headers = 
      {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllProsummerCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all prosummers and his data in Resilink DB', { from: 'getAllProsummerCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  } else {
    getDataLogger.info('success retrieving all prosummers and his data in Resilink DB', { from: 'getAllProsummerCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    await ProsummerDB.getAllProsummer(data);
  }
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

const getOneProsummerCustom = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
    "GET",
    url + id, 
    headers = {'accept': 'application/json',
     'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOneProsummerCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving one prosummer', { from: 'getOneProsummerCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving one prosummer', { from: 'getOneProsummerCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    await ProsummerDB.getOneProsummer(data);
  }
  return [data, response.status];
};

const deleteOneProsummer = async (url, id, token) => {
  deleteDataODEP.warn('id to send to ODEP', { from: 'deleteOneProsummer', id: id, tokenUsed: token == null ? "Token not given" : token});
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
  try {
    if (isNaN(body['bookmarkId'])) {
      throw notValidBody("it's not a number in a string");
    }
    patchDataODEP.warn('data & id to send to local DB', { from: 'patchBookmarkProsummer', dataToSend: body, id: id});
    const data = await ProsummerDB.addbookmarked(id, body['bookmarkId']);
    /*if(response.status == 401) {
      patchDataODEP.error('error: Unauthorize', { from: 'patchBookmarkProsummer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } 
    */

    patchDataODEP.info('success patching prosummer\'s bookmark list', { from: 'patchBookmarkProsummer', /*tokenUsed: token.replace(/^Bearer\s+/i, '')*/});
    return [{message: "Prosumer bookmark list successfully changed"}, 200];
  } catch (e) {
    if (e instanceof notValidBody) {
      console.log(e.message);
      patchDataODEP.error('body is not valid', { from: 'patchBookmarkProsummer', dataReceived: body, /*tokenUsed: token.replace(/^Bearer\s+/i, '')*/});
    } else {
      patchDataODEP.error('error patching prosummer\'s bookmark list', { from: 'patchBookmarkProsummer', dataReceived: body, /*tokenUsed: token.replace(/^Bearer\s+/i, '')*/});
    }
    console.log(e.message);
    throw(e);
  }
};

const deleteIdBookmarkedList = async (owner, id, token) => {
  try {
    if (isNaN(id)) {
      throw notValidBody("it's not a number in a string");
    }
    await ProsummerDB.deleteBookmarkedId(id, owner);
    getDataLogger.info("success deleting a news from an owner's bookmarked list", {from: 'deleteIdBookmarkedList'});
    return [{message: "news " + id + " correctly removed in " + owner + " prosumer account"}, 200];
  } catch (e) {
    if (e instanceof notValidBody) {
      console.log(e.message);
      patchDataODEP.error('id is not valid', { from: 'deleteIdBookmarkedList', dataReceived: id, /*tokenUsed: token.replace(/^Bearer\s+/i, '')*/});
    }
    getDataLogger.error("error deleting a news from an owner's bookmarked list", {from: 'deleteIdBookmarkedList', dataReceiver: e});
    throw e;
  }
}

const deleteProsumerODEPRESILINK = async (url, owner, token) => {
  try {
    const delProsODEP = await deleteOneProsummer(url, owner, token);
    if (delProsODEP[1] != 200) {
      deleteDataODEP.error("error deleting a prosumer account in RESILINK DB", {from: 'deleteProsumerODEPRESILINK', dataReceiver: delProsODEP[0]});
      return delProsODEP;
    }
    await ProsummerDB.deleteProsumerODEPRESILINK(owner);
    deleteDataResilink.info("success deleting a news from an owner's bookmarked list", {from: 'deleteProsumerODEPRESILINK'});
    return [{message: owner + " prosumer account correctly removed in RESILINK and ODEP DB"}, 200];
  } catch (e) {
    deleteDataResilink.error("error deleting a prosumer account in RESILINK and ODEP DB", {from: 'deleteProsumerODEPRESILINK', dataReceiver: e.message});
    throw e;
  }
}

module.exports = {
    createProsummer,
    getAllProsummer,
    getAllProsummerCustom,
    getOneProsummer,
    getOneProsummerCustom,
    createProsumerCustom,
    deleteOneProsummer,
    patchBalanceProsummer,
    patchSharingProsummer,
    patchBookmarkProsummer,
    deleteIdBookmarkedList,
    deleteProsumerODEPRESILINK
}