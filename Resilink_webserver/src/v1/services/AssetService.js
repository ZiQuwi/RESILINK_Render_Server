require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const Utils = require("./Utils.js");
const AssetTypes = require("../services/AssetTypeService.js");
const AssetDB = require("../database/AssetDB.js");

//TODO SEUL FONCTION DE ASSET PAS ENCRE MIS A JOUR AVEC FETCHDATA ET FAIRE TOUS LE RESTE SEUL ASSET FAIT DÉBILE
const getAllAssetVue = async (token) => {
  console.log("dans getAllAssetVue")
    //const allAssetTypesResilink = await AssetTypes.getAllAssetTypesResilink(token);
    const allAsset = await getAllAssetResilink(/*allAssetTypesResilink,*/ token);
    return allAsset;
}

const getAllAssetResilink = async (token) => {
    const allAsset = await Utils.fetchJSONData(
        'GET',
        "http://90.84.194.104:10010/assets/all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    var assetMapResilink = {};
    const data = await Utils.streamToJSON(allAsset.body);
    if (allAsset.status == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllAssetResilink', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
      return [data, allAsset.status];
    } else if(allAsset.status != 200) {
      getDataLogger.error('error retrieving all assets', { from: 'getAllAssetResilink', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [data, allAsset.status];
    } 
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          assetMapResilink[element['id']] = element;
        }
    }
    getDataLogger.info('success retrieving all assets', { from: 'getAllAssetResilink', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [assetMapResilink, allAsset.status];
};

const getOwnerAsset = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "owner?idOwner=" + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  console.log(response.status);
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOwnerAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving assets owner', { from: 'getOwnerAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  };
  const dataFinal = await AssetDB.getImageforAssets(data);
  getDataLogger.info('success retrieving assets owner & image for each assets', { from: 'getOwnerAsset', tokenUsed: token.replace(/^Bearer\s+/i, '') });
  return [dataFinal, response.status];
};
 
const getAllAsset = async (url, token) => {
  const response = await Utils.fetchJSONData(
    'GET',
    url + "all", 
    headers = {'accept': 'application/json',
    'Authorization': token}
  )
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all assets', { from: 'getAllAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  };
  const dataFinal = await AssetDB.getImageforAssets(data);
  getDataLogger.info('success retrieving all assets & image for each assets', { from: 'getAllAsset', tokenUsed: token.replace(/^Bearer\s+/i, '') });
  return [dataFinal, response.status];
};

const getOneAsset = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOneAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving one asset', { from: 'getOneAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  };
  await AssetDB.getOneAssetDBimage(data);
  getDataLogger.info('success retrieving one asset', { from: 'getOneAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  return [data, response.status];
};

const getOneAssetImg = async (assetId, token) => {
  try {
    if (token != null && token.contains("Bearer ")) {
      getDataLogger.error('error: Unauthorize', { from: 'getOneAssetImg', tokenUsed: token == null ? "Token not given" : token});
      return [{message: 'Token is not given'}, 401];
    } else {
      const data = await AssetDB.getOneAssetDBimage(assetId);
      getDataLogger.info('success retrieving one image from an asset', { from: 'getOneAssetImg', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [data, 200];
    }
  } catch(e) {
    getDataLogger.error('error retrieving one image from an asset', { from: 'getOneAssetImg', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e);
  }
  
};

const createAsset = async (url, body, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'createAsset', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
    'POST',
    url, 
    headers = {'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token},
    body
  );
  const data = await Utils.streamToJSON(response.body);
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'createAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    updateDataODEP.error('error creating one asset', { from: 'createAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success creating one asset', { from: 'createAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  };
  return [data, response.status];
};

const createAssetCustom = async (url, body, token) => {
  const resultCreateAssetType = await AssetTypes.createAssetTypesCustom(body['assetType'], token);
  if (resultCreateAssetType[1] == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [resultCreateAssetType[0], resultCreateAssetType[1]];
  } else if(resultCreateAssetType[1] != 200) {
    updateDataODEP.error('error creating one assetType', { from: 'createAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    //delete resultCreateAssetType[0]["assetType"]; 
    return [resultCreateAssetType[0], resultCreateAssetType[1]];
  } else {
    updateDataODEP.info('success creating one assetType', { from: 'createAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    body["assetType"] = resultCreateAssetType[0]["assetType"];
    const imgBase64 = body['image'];
    delete body['image'];
    updateDataODEP.warn('data to send to ODEP', { from: 'createAssetCustom', dataToSend: body, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    const response = await Utils.fetchJSONData(
        'POST',
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body
    );
    const data = await Utils.streamToJSON(response.body);
    if (response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
      return [data, response.status];
    } else if(response.status != 200) {
      updateDataODEP.info('error creating one asset', { from: 'createAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      updateDataODEP.info('success creating one asset', { from: 'createAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      const inDB = await AssetDB.newAssetDB(data['assetId'], imgBase64, body['owner']);
    }
    return [data, response.status];
  }
}

const putAsset = async (url, body, id,token) => {
  const imgBase64 = body['image'];
  delete body['image'];
  updateDataODEP.warn('data to send to ODEP', { from: 'putAsset', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
      'PUT',
      url + id, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body
  );
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'putAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status == 200) {
    const inDB = await AssetDB.updateAssetImgById(id, imgBase64);
    updateDataODEP.info('success updating one asset', { from: 'putAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.error('error updating one asset', { from: 'putAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

const deleteAsset = async (url, id, token) => {
  try {
    const response = await Utils.fetchJSONData(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'deleteAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    deleteDataODEP [data, response.status];
  } else if(response.status != 200) {
    deleteDataODEP.error('error deleting one asset', { from: 'deleteAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    const delDB = await AssetDB.deleteAssetImgById(id);
    deleteDataODEP.info('success deleting one asset', { from: 'deleteAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
  } catch (e) {
    throw(e)
  }

};

const patchAsset = async (url, body, id, token) => {
  const response = await Utils.fetchJSONData(
      'PATCH',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
      body
  );
  const data = await Utils.streamToJSON(response.body);
  if (response.status == 401) {
    patchDataODEP.error('error: Unauthorize', { from: 'patchAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    patchDataODEP.error('error patching one asset', { from: 'patchAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    patchDataODEP.info('success patching one asset', { from: 'patchAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
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
    createAssetCustom,
    putAsset,
    patchAsset,
    deleteAsset,
}