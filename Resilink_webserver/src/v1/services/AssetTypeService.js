const Utils = require("./Utils.js");
const User = require("./UserService.js");
const AssetTypeDB = require("../database/AssetTypeDB.js");

const getAllAssetTypeVue = async () => {
  console.log("dansgetAllAssetTypeVue");
  const token = await User.functionGetTokenUser({
    "userName": "acazaux",
    "password": "123456"
  });
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
          allAssetTypesResilink[element['name']] = element;
        }
    }
    return [allAssetTypesResilink, allAssetTypes.status];
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

const createAssetTypesCustom = async (assetType, token) => {
  console.log("dans createAssetTypesCustom");
  const adminToken = await User.functionGetTokenUser({
    "userName": "admin",
    "password": "admin123"
  })
  console.log(adminToken[0]["accessToken"]);
  const resultassetType = await getOneAssetTypes("http://90.84.194.104:10010/assetTypes/", assetType, token);
  console.log(resultassetType);
  if (resultassetType[1] != 200) {
    //assetType doesn't exist or problem with ODEP
    return resultassetType;
  } else {
    const resultDB = await AssetTypeDB.newAssetTypeDB(assetType);
    resultassetType[0]["name"] = resultDB;
    const response = await Utils.fetchJSONData(
      'POST',
      "http://90.84.194.104:10010/assetTypes/", 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken[0]["accessToken"]},
      resultassetType[0]
    );
    console.log("apres requete new assetTypes status: " + response.status);
    const data = await Utils.streamToJSON(response.body)
    data['assetType'] = resultDB;
    return [data, response.status];
  }
};

const getAllAssetTypes = async (url, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if (response.status != 200) {
    return [data, response.status];
  } else {
    /*
    const filteredData = data.filter(obj => {
      const nameValue = obj["name"];
  
      // Utiliser une expression régulière pour vérifier si nameValue ne contient pas de nombres
      return !/\d/.test(nameValue);
    });
    
    return [filteredData, response.status];
    */
    return [data, response.status];

  }  
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
    createAssetTypesCustom,
    getAllAssetTypesResilink,
    getAllAssetTypes,
    getOneAssetTypes,
    putAssetTypes,
    deleteAssetTypes,
}