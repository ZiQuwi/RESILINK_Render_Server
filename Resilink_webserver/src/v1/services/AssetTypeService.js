const Utils = require("./Utils.js");
const User = require("./UserService.js");

const getAllAssetTypeVue = async () => {
  const token = await User.functionGetTokenUser("acazaux", "123456");
  const allAssetType = await getAllAssetTypesResilink(token);
  return allAssetType;
};

const getAllAssetTypesResilink = async (token) => {
    const urlGetALlAssetTypes = "http://90.84.194.104:10010/assetTypes/all";
    const allAssetTypes = await Utils.fetchJSONData(
        'GET',
        urlGetALlAssetTypes, 
        headers = {'accept': 'application/json',
        'Authorization': token});
    var allAssetTypesResilink = {};
    const data = await Utils.streamToJSON(allAssetTypes.body)
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];

          if (element['description'] !== null && element['description'].split(',').pop().toUpperCase() === 'RESILINK') {
            allAssetTypesResilink[element['name'].toString()] = element;
          }
        }
    }
    console.log("tableau des types d'asset pour resilink" + allAssetTypesResilink);
    return [allAssetTypesResilink, data];
};

const createAssetTypes = async (url, body, token) => {
  const response = await Utils.fetchJSONData(
      'POST',
      url, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body);
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
};

const getAllAssetTypes = async (url, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const getOneAssetTypes = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const putAssetTypes = async (url, body, id, token) => {
  const response = await Utils.fetchJSONData(
      'PUT',
      url + id, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body);
      const data = await Utils.streamToJSON(response.body)
      return [data, response.status];
};

const deleteAssetTypes = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

module.exports = {
    getAllAssetTypeVue,
    createAssetTypes,
    getAllAssetTypes,
    getOneAssetTypes,
    putAssetTypes,
    deleteAssetTypes,
}