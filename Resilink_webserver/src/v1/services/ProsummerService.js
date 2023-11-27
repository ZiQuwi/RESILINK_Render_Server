const ProsummerDB = require("../database/ProsummerDB.js");
const userService = require("./UserService.js");
const Utils = require("./Utils.js");

const createProsummer = async (url, body, token) => {
  const response = await Utils.fetchJSONData(
    "POST",
    url, 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
     body
  );
  const data = await Utils.streamToJSON(response.body);
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
  return [data, response.status];
};

const createProsumerCustom = async(url, body, token) => {
  const user = await userService.createUser(body);
  console.log("SORTI DE LA CREATION USER");
  console.log(user.userName);
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
  return [data, response.status];
};

const deleteOneProsummer = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
    "DELETE",
    url + id, 
    headers = {'accept': 'application/json',
     'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  return [data, response.status];
};

const patchBalanceProsummer = async (url, body, id, token) => {
  const response = await Utils.fetchJSONData(
    "PATCH",
    url + id + "/balance", 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
    body
  );
  const data = await Utils.streamToJSON(response.body);
  return [data, response.status];
};

const patchSharingProsummer = async (url, body, id, token) => {
  const response = await Utils.fetchJSONData(
    "PATCH",
    url + id + "/sharingAccount", 
    headers = {'accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': token},
     body
  );
  const data = await Utils.streamToJSON(response.body);
  return [data, response.status];
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