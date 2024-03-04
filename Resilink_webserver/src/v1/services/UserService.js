require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');

const User = require("../database/UserDB.js");
const Utils = require("./Utils.js");
const urlSignIn = 'http://90.84.194.104:4000/oauth/api/v1.0.0/auth/sign_in';
const urlCreateUser = 'http://90.84.194.104:4000/oauth/api/v1.0.0/users?provider=http%3A%2F%2Flocalhost%3A';
const localhost = "22004";

//Récupère les données de l'utilisateur
const functionGetTokenUser = async (body) => {
    const response = await Utils.fetchJSONData(
            "POST",
            urlSignIn,  
            headers = { 'Content-Type': 'application/json', 'accept': 'application/json'},
            body
        );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'functionGetTokenUser', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else if(response.status != 200) {
      getDataLogger.error('error retrieving user\'s token', { from: 'functionGetTokenUser', dataReceived: data, bodyUsed: body});
    } else {
      getDataLogger.info('success retrieving user\'s token', { from: 'functionGetTokenUser'});
    }
    return [data, response.status];
};

//Crée un nouvel user
const createUser = async (newUserRequest, token) => {
  try {
    updateDataODEP.warn('data to send to ODEP', { from: 'createUser', dataToSend: newUserRequest, tokenUsed: token == null ? "Token not given" : token});
    var phoneNumber;
    if (newUserRequest.whatsApp != null) {
      phoneNumber = newUserRequest.whatsApp;
      delete newUserRequest.whatsApp;
    }
    const response = await Utils.fetchJSONData(
      "POST",
      urlCreateUser + localhost,  
      headers = {'Content-Type': 'application/json', 'Authorization': token.replace(/^Bearer /, ''), 'accept': 'application/json'},
      newUserRequest
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createUser', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else if(response.status != 200) {
      updateDataODEP.error('error creating user in ODEP', { from: 'createUser', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      updateDataODEP.info('success creating user in ODEP', { from: 'createUser', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    if (phoneNumber != undefined) {
      data.whatsApp = phoneNumber;
    }
    User.newUser(data, newUserRequest.password);
    return [data, response.status];
  } catch (e) {
    updateDataODEP.error('error creating user in ODEP or local Resilink DB', { from: 'createUser', error: e, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e)
  }
  
}

module.exports = {
    functionGetTokenUser,
    createUser
}