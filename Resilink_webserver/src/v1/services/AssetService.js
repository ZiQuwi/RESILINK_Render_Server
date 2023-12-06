const Utils = require("./Utils.js");
const User = require("./UserService.js");
const AssetTypes = require("../services/AssetTypeService.js");
const AssetDB = require("../database/AssetDB.js");


const _urlGetALlAsset = "http://90.84.194.104:10010/assets/all";

//TODO SEUL FONCTION DE ASSET PAS ENCRE MIS A JOUR AVEC FETCHDATA ET FAIRE TOUS LE RESTE SEUL ASSET FAIT DÉBILE
const getAllAssetVue = async (token) => {
    const allAssetTypesResilink = await AssetTypes.getAllAssetTypesResilink(token);
    const allAsset = await getAllAssetResilink(allAssetTypesResilink, token);
    return allAsset;
}

const getAllAssetResilink = async (assetTypeMap, token) => {
    const allAsset = await Utils.fetchJSONData(
        'GET',
        _urlGetALlAsset, 
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
  const dataFinal = await AssetDB.getImageforAssets(data);
  return [dataFinal, response.status];
};

const getOneAsset = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const getOneAssetImg = async (assetId) => {
  try {
    const data = await AssetDB.getOneAssetDBimage(assetId);
    return [data, 200];
  } catch(e) {
    throw(e);
  }
  
};

const createAsset = async (url, body, token) => {
  const imgBase64 = body['image'];
  delete body['image'];
  const response = await Utils.fetchJSONData(
      'POST',
      url, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body
  );
  const data = await Utils.streamToJSON(response.body);
  const inDB = await AssetDB.newAssetDB(data['assetId'], imgBase64, body['owner']);
  return [data, response.status];
};

const putAsset = async (url, body, id,token) => {
  const response = await Utils.fetchJSONData(
      'PUT',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
      body
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const deleteAsset = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const patchAsset = async (url, body, id, token) => {
  const response = await Utils.fetchJSONData(
      'PATCH',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
      body
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

module.exports = {
    getAllAssetResilink,
    getAllAssetVue,
    getAllAsset,
    getOneAssetImg,
    getOneAsset,
    getOwnerAsset,
    createAsset,
    putAsset,
    patchAsset,
    deleteAsset,
}