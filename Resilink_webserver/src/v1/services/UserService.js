require('../loggers.js');
const winston = require('winston');
const config = require('../config.js');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const deleteDataResilink = winston.loggers.get('DeleteDataResilinkLogger');

const User = require("../database/UserDB.js");
const Utils = require("./Utils.js");

const _ipAdress = config.PATH_ODEP_USER;
const _urlSignIn = 'auth/sign_in';
const _urlCreateUser = 'users?provider=http%3A%2F%2Flocalhost%3A';
/*
 * localhost indicates the machine address on which to save a user (place limited on each machine)
 * can have the value 22000 to 22004
 */
const _localhost = ["22000","22001","22002","22003","22004","22005","22006"];

//Retrieves user data (token is associated with "accesToken" key)
const functionGetTokenUser = async (body) => {
    const response = await Utils.fetchJSONData(
            "POST",
            _ipAdress + _urlSignIn,  
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
    await User.getUser(data['_id'], data);
    return [data, response.status];
};

//Creates an ODEP user and a Resilink user with the id of the ODEP user
const createUserResilink = async (pathUserODEP, newUserRequest, token) => {
  try {
    updateDataODEP.warn('data to send to ODEP', { from: 'createUserResilink', dataToSend: newUserRequest, tokenUsed: token == null ? "Token not given" : token});
    //Deletes data not relevant to ODEP to create a user in ODEP
    var phoneNumber;
    if (newUserRequest['phoneNumber'] != null) {
      phoneNumber = newUserRequest['phoneNumber'];
      delete newUserRequest['phoneNumber'];
    }
    
    const findUserUserName = await getUserByUsername(pathUserODEP, newUserRequest['userName'], token);

    if(findUserUserName[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createUserResilink', dataReceived: findUserUserName[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return findUserUserName;
    } else if(findUserUserName[1] == 200) {
      updateDataODEP.error('error email already taken in ODEP', { from: 'createUserResilink', dataReceived: findUserUserName[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{'message': 'userName already taken'}, 404]
    }

    const findUserMail = await getUserByEmail(pathUserODEP, newUserRequest['email'], token);
    if(findUserMail[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createUserResilink', dataReceived: findUserMail[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return findUserMail;
    } else if(findUserMail[1] == 200) {
      updateDataODEP.error('error email already taken in ODEP', { from: 'createUserResilink', dataReceived: findUserMail[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{'message': 'email already taken'}, 404]
    }

    const response = await Utils.fetchJSONData(
      "POST",
      _ipAdress + _urlCreateUser + _localhost[0],  
      headers = {'Content-Type': 'application/json', 'Authorization': token.replace(/^Bearer /, ''), 'accept': 'application/json'},
      newUserRequest
    );
    
    //Calls the function to create a user in RESILINK DB if no errors caught
    const data = await Utils.streamToJSON(response.body);
    let currentIndex = 0;
    if(response.status == 401 && data === "string") {
      updateDataODEP.error('No available accounts, trying next localhost', {from: 'createUser', errorMessage: data, tokenUsed: token.replace(/^Bearer\s+/i, ''), triedLocalhost: currentLocalhost});
      let isProviderGood = false;
      while (currentIndex < 8 && isProviderGood == false) {
        const response = await Utils.fetchJSONData(
          "POST",
          _ipAdress + _urlCreateUser + _localhost[currentIndex],  
          headers = {'Content-Type': 'application/json', 'Authorization': token.replace(/^Bearer /, ''), 'accept': 'application/json'},
          newUserRequest
        );
        const data = await Utils.streamToJSON(response.body);
        if(response.status == 401 && data === "string") {
          updateDataODEP.error('No available accounts, trying next localhost', {from: 'createUser', errorMessage: data, tokenUsed: token.replace(/^Bearer\s+/i, ''), triedLocalhost: currentLocalhost});
        } else {
          isProviderGood = true;
        }
      }
    } else if (response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createUserResilink', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else if(response.status != 200 && response.status != 201) {
      updateDataODEP.error('error creating user in ODEP', { from: 'createUserResilink', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      updateDataODEP.info('success creating user in ODEP', { from: 'createUserResilink', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      if (phoneNumber != undefined) {
        data['phoneNumber'] = phoneNumber;
      }
      await User.newUser(data);
    }
    data['password'] = newUserRequest['password'];
    return [data, response.status];
  } catch (e) {
    updateDataODEP.error('error creating user in ODEP or local Resilink DB', { from: 'createUserResilink', error: e, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e)
  }
};

//Creates a ODEP user
const createUser = async (url, newUserRequest, token) => {
  try {
    let currentIndex = 0;
    const response = await Utils.fetchJSONData(
      "POST",
      _ipAdress + _urlCreateUser + _localhost[currentIndex],  
      headers = {'Content-Type': 'application/json', 'Authorization': token.replace(/^Bearer /, ''), 'accept': 'application/json'},
      newUserRequest
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401 && data === "string") {
      updateDataODEP.error('No available accounts, trying next localhost', {from: 'createUser', errorMessage: data, tokenUsed: token.replace(/^Bearer\s+/i, ''), triedLocalhost: currentLocalhost});
      let isProviderGood = false;
      while (currentIndex < 8 && isProviderGood == false) {
        const response = await Utils.fetchJSONData(
          "POST",
          _ipAdress + _urlCreateUser + _localhost[currentIndex],  
          headers = {'Content-Type': 'application/json', 'Authorization': token.replace(/^Bearer /, ''), 'accept': 'application/json'},
          newUserRequest
        );
        const data = await Utils.streamToJSON(response.body);
        if(response.status == 401 && data === "string") {
          updateDataODEP.error('No available accounts, trying next localhost', {from: 'createUser', errorMessage: data, tokenUsed: token.replace(/^Bearer\s+/i, ''), triedLocalhost: currentLocalhost});
        } else {
          isProviderGood = true;
        }
      }
    } else if (response.status == 401 && "message" in data){
      updateDataODEP.error('error: Unauthorize', { from: 'createUser', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else if(response.status != 200) {
      updateDataODEP.error('error creating user in ODEP', { from: 'createUser', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      updateDataODEP.info('success creating user in ODEP', { from: 'createUser', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data, response.status];
  } catch (e) {
    updateDataODEP.error('error creating user in ODEP or local Resilink DB', { from: 'createUser', error: e, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e)
  }
};

//Deletes an ODEP user
const deleteUser = async (url, id, token) => {
  try {
    deleteDataODEP.warn('id to send to ODEP', { from: 'deleteUser', id: id, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
      "DELETE",
      url + id, 
      headers = {
       'accept': 'application/json',
       'Authorization': token},
    );
    if(response.status == 401) {
      deleteDataODEP.error('error: Unauthorize', { from: 'deleteUser', tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 202) {
      deleteDataODEP.error('error deleting one user', { from: 'deleteUser', tokenUsed: token});
    } else {
      deleteDataODEP.info('success deleting one user', { from: 'deleteUser', tokenUsed: token});
    }
    return [{message: "user correctly deleted"}, response.status];
  } catch (e) {
    deleteDataODEP.error("error deleting a user account in ODEP DB", {from: 'deleteUser', dataReceiver: e.message});
    throw e;
  }
}

//Deletes an ODEP user & RESILINK user
const deleteUserODEPRESILINK = async (url, id, token) => {
  try {
    //Calls the function to delete a user in ODEP 
    const delProsODEP = await deleteUser(url, id, token);
    if (delProsODEP[1] != 202) {
      deleteDataODEP.error("error deleting a user account in ODEP", {from: 'deleteUserODEPRESILINK', dataReceiver: delProsODEP[0]});
      return delProsODEP;
    }
    //Creates a user in RESILINK DB
    await User.deleteUser(id);
    deleteDataResilink.info("success deleting a user in RESILINK and ODEP DB", {from: 'deleteUserODEPRESILINK'});
    return [{message: id + " user account correctly removed in RESILINK and ODEP DB"}, 200];
  } catch (e) {
    deleteDataResilink.error("error deleting a user account in RESILINK and ODEP DB", {from: 'deleteUserODEPRESILINK', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves a user by id in ODEP
const getUserById = async (url, id, token) => {
  try {
    getDataLogger.warn('id to send to ODEP', { from: 'getUserById', id: id, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
      "GET",
      url + id, 
      headers = {'accept': 'application/json',
       'Authorization': token.replace(/^Bearer\s+/i, '')},
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getUserById', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error accessing one user by ID ' + id, { from: 'getUserById', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success accessing one user by ID', { from: 'getUserById', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getUserById', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves all user in ODEP
const getAllUser = async (url, token) => {
  try {
    const response = await Utils.fetchJSONData(
      "GET",
      url, 
      headers = {'accept': 'application/json',
       'Authorization': token},
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllUser', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error accessing all user' + id, { from: 'getAllUser', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success accessing all user', { from: 'getAllUser', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getAllUser', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves all user in ODEP & RESILINK
const getAllUserCustom = async (url, token) => {
  try {
    const response = await Utils.fetchJSONData(
      "GET",
      url, 
      headers = {'accept': 'application/json',
       'Authorization': token},
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllUserCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error accessing all user' + id, { from: 'getAllUserCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success accessing all user', { from: 'getAllUserCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      await User.getAllUser(data);
    }
    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getAllUserCustom', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves a user by email
const getUserByEmail = async (url, email, token) => {
  try {
    getDataLogger.warn('email to send to ODEP', { from: 'getUserByEmail', email: email, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
      "GET",
      url + "getUserByEmail/" + email, 
      headers = {'accept': 'application/json',
       'Authorization': token},
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getUserByEmail', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error accessing one user by email ' + email, { from: 'getUserByEmail', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success accessing one user by email', { from: 'getUserByEmail', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getUserByEmail', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves a user by email
const getUserByEmailCustom = async (url, email, token) => {
  try {
    getDataLogger.warn('email to send to ODEP', { from: 'getUserByEmailCustom', email: email, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
      "GET",
      url + "getUserByEmail/" + email, 
      headers = {'accept': 'application/json',
       'Authorization': token},
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getUserByEmailCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error accessing one user by email ' + email, { from: 'getUserByEmailCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success accessing one user by email', { from: 'getUserByEmailCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    await User.getUser(data["id"], data);
    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getUserByEmailCustom', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves a user by username
const getUserByUsername = async (url, username, token) => {
  try {
    getDataLogger.warn('username to send to ODEP', { from: 'getUserByUsername', username: username, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
      "GET",
      url + "getUserByUserName/" + username, 
      headers = {
        'accept': 'application/json',
        'Authorization': token
      },
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getUserByUsername', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error accessing one user by username ' + username, { from: 'getUserByUsername', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success accessing one user by username', { from: 'getUserByUsername', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getUserByUsername', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves a user by username
const getUserByUsernameCustom = async (url, username, token) => {
  try {
    getDataLogger.warn('username to send to ODEP', { from: 'getUserByUsernameCustom', username: username, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
      "GET",
      url + "getUserByUserName/" + username, 
      headers = {
        'accept': 'application/json',
        'Authorization': token
      },
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getUserByUsernameCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error accessing one user by username ' + username, { from: 'getUserByUsernameCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success accessing one user by username', { from: 'getUserByUsernameCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    await User.getUser(data["id"], data);

    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getUserByUsernameCustom', dataReceiver: e.message});
    throw e;
  }
}

//Updates user profile in ODEP
const updateUser = async (url, id, body, token) => {
  try {
    getDataLogger.warn('username to send to ODEP', { from: 'updateUser', data: {body: body, id: id}, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
      "PUT",
      url + id, 
      headers = {
       'accept': 'application/json',
       'Authorization': token.replace(/^Bearer\s+/i, ''),
       'Content-Type': 'application/json'},
       body
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'updateUser', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      getDataLogger.error('error updating one user' + username, { from: 'updateUser', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      getDataLogger.info('success updating one user', { from: 'updateUser', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data, response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'updateUser', dataReceiver: e.message});
    throw e;
  }
}

//ODEP actually broken, don't know if the url is the same - have to check later
//Updates user profile in ODEP & RESILINK
const updateUserCustom = async (url, id, body, token) => {
  try {

    //Deletes data not relevant to ODEP to update a user in ODEP
    var phoneNumber;
    if (body['phoneNumber'] != null) {
      phoneNumber = body['phoneNumber'];
      delete body['phoneNumber'];
    }

    const userODEP = await updateUser(url, id, body, token);
    if(userODEP[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'updateUserCustom', dataReceived: userODEP[0], tokenUsed: token == null ? "Token not given" : token});
      return userODEP;
    } else if(userODEP[1] != 200) {
      updateDataODEP.error('error accessing one user by username ' + username, { from: 'updateUserCustom', dataReceived: userODEP[0], tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return userODEP;
    } else {
      updateDataODEP.info('success accessing one user by username', { from: 'updateUserCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }

    //Returns RESILINK data to map and calls function to update user in RESILINK db
    if (phoneNumber != undefined) {
      body['phoneNumber'] = phoneNumber;
    }
    await User.updateUser(id, body);
    return [body, userODEP[1]];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'updateUserCustom', dataReceiver: e.message});
    throw e;
  }
}

//Retrieves a user by id in ODEP & RESILINK
const getUserByIdCustom = async (url, id, token) => {
  try {
    const userODEP = await getUserById(url, id, token);
    if(userODEP[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getUSerByIdCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
      return userODEP;
    } else if(userODEP[1] != 200) {
      getDataLogger.error('error accessing one user by username ' + username, { from: 'getUSerByIdCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return userODEP;
    } else {
      getDataLogger.info('success accessing one user by username', { from: 'getUSerByIdCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }

    await User.getUser(id, userODEP[0]);
    return [userODEP[0], response.status];
  } catch (e) {
    getDataLogger.error("error accessing ODEP", {from: 'getUSerByIdCustom', dataReceiver: e.message});
    throw e;
  }
}

module.exports = {
    functionGetTokenUser,
    createUser,
    createUserResilink,
    deleteUser,
    deleteUserODEPRESILINK,
    getAllUser,
    getAllUserCustom,
    getUserByEmail,
    getUserByEmailCustom,
    getUserById,
    getUserByUsername,
    getUserByUsernameCustom,
    updateUser,
    getUserByIdCustom,
    updateUserCustom
}