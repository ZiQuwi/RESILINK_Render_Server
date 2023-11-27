const Utils = require("./Utils.js");
const User = require("./UserService.js");
const AssetTypes = require("../services/AssetTypeService.js");


const urlGetALlAsset = "http://90.84.194.104:10010/assets/all";

//TODO SEUL FONCTION DE ASSET PAS ENCRE MIS A JOUR AVEC FETCHDATA ET FAIRE TOUS LE RESTE SEUL ASSET FAIT DÉBILE
const getAllAssetVue = async (token) => {
    const allAssetTypesResilink = await AssetTypes.getAllAssetTypesResilink(token);
    const allAsset = await getAllAssetResilink(allAssetTypesResilink, token);
    return allAsset;
}

const getAllAssetResilink = async (assetTypeMap, token) => {
    const allAsset = await Utils.fetchJSONData(
        'GET',
        urlGetALlAsset, 
        headers = {'accept': 'application/json',
        'Authorization': "Bearer " + token});
    var assetMapResilink = {};
    const data = await Utils.streamToJSON(allAsset.body)
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (assetTypeMap[0][element['id']] == null) {
            assetMapResilink[element['id'].toString()] = element;
          }
        }
    }
    return [assetMapResilink, allAsset.status];
};

const getOwnerAsset = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "owner?idOwner=" + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};
 
const getAllAsset = async (url, token) => {
  const response = await Utils.fetchJSONData(
    'GET',
    url + "all", 
    headers = {'accept': 'application/json',
    'Authorization': token}
  )
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const getOneAsset = async (url, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  ));
  return response;
};

const createAsset = async (url, body, token) => {
  console.log(body);
  const response = JSON.parse(await Utils.executeCurl(
      'POST',
      url, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body
  ));
  console.log(response);
  return response;
};

const putAsset = async (url, body, id,token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'PUT',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
      body
  ));
  return response;
};

const deleteAsset = async (url, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  ));
  return response;
};

const patchAsset = async (url, body, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'PATCH',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
      body
  ));
  return response;
};

module.exports = {
    getAllAssetResilink,
    getAllAssetVue,
    getAllAsset,
    getOneAsset,
    getOwnerAsset,
    createAsset,
    putAsset,
    patchAsset,
    deleteAsset,
}