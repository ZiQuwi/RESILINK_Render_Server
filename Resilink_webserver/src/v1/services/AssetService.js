const Utils = require("./Utils.js");
const User = require("./UserService.js");
const AssetTypes = require("../services/AssetTypeService.js");


const urlGetALlAsset = "http://90.84.194.104:10010/assets/all";

const getAllAssetVue = async () => {
    const token = await User.functionGetTokenUser("admin", "admin123");
    const allAssetTypesResilink = await AssetTypes.getAllAssetTypesResilink(token);
    const allAsset = await getAllAssetResilink(allAssetTypesResilink, token);
    return allAsset;
}

const getAllAssetResilink = async (assetTypeMap, token) => {
    const allAsset = JSON.parse(await Utils.executeCurl(
        'GET',
        urlGetALlAsset, 
        headers = {'accept': 'application/json',
        'Authorization': "Bearer " + token}));
    var assetMapResilink = {};
    for (const key in allAsset) {
        if (allAsset.hasOwnProperty(key)) {
          const element = allAsset[key];
          
          if (assetTypeMap[element['id']] == null) {
            assetMapResilink[element['id'].toString()] = element;
          }
        }
      }
    return assetMapResilink;
};

const getOwnerAsset = async (url, id, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'GET',
      url + "owner?idOwner=" + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  ));

  return response;
};

const getAllAsset = async (url, token) => {
  const response = JSON.parse(await Utils.executeCurl(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token},
  ));
  return response;
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
  const response = JSON.parse(await Utils.executeCurl(
      'POST',
      url, 
      headers = {'accept': 'application/json',
      'Authorization': token},
      body
  ));
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