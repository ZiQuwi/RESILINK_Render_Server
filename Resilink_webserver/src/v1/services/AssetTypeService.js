const Utils = require("./Utils.js");
const User = require("./UserService.js");

const getAllAssetTypeVue = async () => {
  const token = await User.functionGetTokenUser("admin", "admin123");
  const allAssetType = await getAllAssetTypesResilink(token);
  return allAssetType;
};

const getAllAssetTypesResilink = async (token) => {
    const urlGetALlAssetTypes = "http://90.84.194.104:10010/assetTypes/all";
    const allAssetTypes = JSON.parse(await Utils.executeCurl(
        'GET',
        urlGetALlAssetTypes, 
        headers = {'accept': 'application/json',
        'Authorization': token}));

    var allAssetTypesResilink = {};

    for (const key in allAssetTypes) {
        if (allAssetTypes.hasOwnProperty(key)) {
          const element = allAssetTypes[key];

          if (element['description'] !== null && element['description'].split(',').pop().toUpperCase() === 'RESILINK') {
            allAssetTypesResilink[element['name'].toString()] = element;
          }
        }
    }

    console.log("tableau des types d'asset pour resilink" + allAssetTypesResilink);
    return allAssetTypesResilink; 
};

const createAssetTypes = async (url, body, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'POST',
      url, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body = body));
  return response;
};

const getAllAssetTypes = async (url, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token},
  ));
  return response;
};

const getOneAssetTypes = async (url, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  ));
  return response;
};

const putAssetTypes = async (url, body, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'PUT',
      url + id, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body = body));
  return response;
};

const deleteAssetTypes = async (url, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  ));
  return response;
};

module.exports = {
    getAllAssetTypeVue,
    createAssetTypes,
    getAllAssetTypes,
    getOneAssetTypes,
    putAssetTypes,
    deleteAssetTypes,
}