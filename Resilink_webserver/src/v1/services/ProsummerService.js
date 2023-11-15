const ProsummerDB = require("../database/ProsummerDB.js");
const userService = require("./UserService.js");
const Utils = require("./Utils.js");

const createProsummer = async (url, body, token) => {
  const response = JSON.parse(await Utils.executeCurl(
    "POST",
    url, 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
     body
  ));
  return response;
};

const getAllProsummer = async (url, token) => {
  console.log("Dans le prosummer service getAll");
  console.log(url + "all");
  console.log('AuthorizationBearer + ' + token);

  const response = JSON.parse(await Utils.executeCurl(
    "GET",
    url + "all", 
    headers = {'accept': 'application/json',
     'Authorization': token}
     ));
  console.log(response);
  return response;
};

const createProsumerCustom = async(url, body, token) => {
  const user = await userService.createUser(body);
  console.log("SORTI DE LA CREATION USER");
  console.log(user.userName);
  const newProsumer = JSON.parse(await Utils.executeCurl(
    "POST",
    url, 
    headers = {'accept': 'application/json',
     'Authorization': token,
     'Content-Type': 'application/json'},
    body = {'id': user.userName,
    'sharingAccount': 100, 
    "balance": 0}
  ));
  console.log("newprosumer) = " + newProsumer);
  ProsummerDB.newProsumer(user.userName, body.phone?? null);
  return newProsumer
};

const getAllProsummerCustom = async (url, token) => {
  const allProsummer = JSON.parse(await Utils.executeCurl(
    "GET",
    url, 
    headers = 
      {'accept': 'application/json',
      'Authorization': token}
  ));
  console.log(allProsummer);
  const allProsummerMongo = ProsummerDB.getAllProsummer();
  console.log(allProsummerMongo);
  return allProsummer; 
};

const getOneProsummer = async (url, id, token) => {
  const allProsummer = JSON.parse(await Utils.executeCurl(
    "GET",
    url + id, 
    headers = {'accept': 'application/json',
     'Authorization': token},
  ));
  return allProsummer;
};

const deleteOneProsummer = async (url, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
    "DELETE",
    url + id, 
    headers = {'accept': 'application/json',
     'Authorization': token},
  ));
  return response;
};

const patchBalanceProsummer = async (url, body, id, token) => {
  console.log("dabns le patch");
  const response = JSON.parse(await Utils.executeCurl(
    "PATCH",
    url + id + "/balance", 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
    body
  ));
  return response;
};

const patchSharingProsummer = async (url, body, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
    "PATCH",
    url + id + "/sharingAccount", 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
     body = body
  ));
  return response;
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
}