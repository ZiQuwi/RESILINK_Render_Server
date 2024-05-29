require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');
const patchDataODEP = winston.loggers.get('PatchDataODEPLogger');

const Utils = require("./Utils.js");
const AssetTypes = require("../services/AssetTypeService.js");
const AssetDB = require("../database/AssetDB.js");

//Retrieves all asset from a user in ODEP
const getOwnerAsset = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "owner?idOwner=" + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOwnerAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving assets owner', { from: 'getOwnerAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving assets owner & image for each assets', { from: 'getOwnerAsset', tokenUsed: token.replace(/^Bearer\s+/i, '') });
  }
  return [data, response.status];
};

//Retrieves all asset from a user in ODEP and RESILINK
const getOwnerAssetCustom = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "owner?idOwner=" + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOwnerAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving assets owner', { from: 'getOwnerAssetCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  };
  const dataFinal = await AssetDB.getAndCompleteAssetWithImgByAssets(data);
  getDataLogger.info('success retrieving assets owner & image for each assets', { from: 'getOwnerAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '') });
  return [dataFinal, response.status];
};
 
//Retrieves all asset in ODEP
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
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all assets', { from: 'getAllAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving all assets', { from: 'getAllAsset', tokenUsed: token.replace(/^Bearer\s+/i, '') });
  };
  return [data, response.status];
};

//Retrieves all asset in ODEP and RESILINK
const getAllAssetCustom = async (url, token) => {
  const response = await Utils.fetchJSONData(
    'GET',
    url + "all", 
    headers = {'accept': 'application/json',
    'Authorization': token}
  )
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all assets', { from: 'getAllAssetCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  };
  const dataFinal = await AssetDB.getAndCompleteAssetWithImgByAssets(data);
  getDataLogger.info('success retrieving all assets & image for each assets', { from: 'getAllAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '') });
  return [dataFinal, response.status];
};

//TODO SEUL FONCTION DE ASSET PAS ENCRE MIS A JOUR AVEC FETCHDATA ET FAIRE TOUS LE RESTE SEUL ASSET FAIT DÉBILE
const getAllAssetVue = async (token) => {
    //const allAssetTypesResilink = await AssetTypes.getAllAssetTypesResilink(token);
    const allAsset = await getAllAssetResilink(/*allAssetTypesResilink,*/ token);
    return allAsset;
}

/* Retrieves all asset in ODEP and RESILINK 
 * Do the same as the getAllAssetCustom function but return a  a map of object asset instead of a list of object asset
 */
const getAllAssetResilink = async (token) => {
    const allAsset = await Utils.fetchJSONData(
        'GET',
        "http://90.84.174.128:10010/assets/all", 
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
    const dataFinal = await AssetDB.getAndCompleteAssetWithImgByAssets(data);
    for (const key in dataFinal) {
        if (dataFinal.hasOwnProperty(key)) {
          const element = dataFinal[key];
          assetMapResilink[element['id']] = element;
        }
    }
    getDataLogger.info('success retrieving all assets', { from: 'getAllAssetResilink', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [assetMapResilink, allAsset.status];
};

//Retrieves an asset by id in ODEP
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
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving one asset', { from: 'getOneAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving one asset', { from: 'getOneAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

//Retrieves an asset by id in ODEP and RESILINK
const getOneAssetCustom = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body);
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOneAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving one asset', { from: 'getOneAssetCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  };
  await AssetDB.getAndCompleteOneAssetByAsset(data);
  getDataLogger.info('success retrieving one asset', { from: 'getOneAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  return [data, response.status];
};

//Retrieves an img of an asset by id in RESILINK
const getOneAssetImg = async (assetId, token) => {
  try {
    if (token == null ) {
      getDataLogger.error('error: Unauthorize', { from: 'getOneAssetImg', tokenUsed: token == null ? "Token not given" : token});
      return [{message: 'Token is not given'}, 401];
    } else {
      const data = await AssetDB.getOneAssetImageById(assetId);
      getDataLogger.info('success retrieving one image from an asset', { from: 'getOneAssetImg', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{img: data}, 200];
    }
  } catch(e) {
    getDataLogger.error('error retrieving one image from an asset', { from: 'getOneAssetImg', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e);
  }
  
};

//Creates an asset in ODEP
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

//Creates an asset in ODEP and RESILINK
const createAssetCustom = async (url, body, token) => {

  console.log("in createAssetCustom")
  const imgBase64 = body['image'];
  const unit = body['unit'];
  delete body['image'];
  delete body['unit'];

  console.log('pass1');
  updateDataODEP.warn('data to send to ODEP', { from: 'createAssetCustom', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
    'POST',
    url, 
    headers = {'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token},
    body
  );
  console.log('pass2');
  const data = await Utils.streamToJSON(response.body);
  console.log('pass3');
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', {from: 'createAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if (response.status != 200) {
    updateDataODEP.error('error creating one asset', {from: 'createAssetCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success creating one asset', {from: 'createAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    await AssetDB.newAsset(data['assetId'], imgBase64, body['owner'], unit);
    console.log('pass4');
  };
  return [data, response.status];
};

/*
 * Creates a clone/child of an asset type which will be identical except for its name 
 * which will have a number (asset type creation counter in RESILINK) at the end of its name.
 * Example: Fruits -> Fruits6 
 * Update the asset type counter, or create its own counter if it doesn't already exist
 * Creates an asset in ODEP and RESILINK 
 */
const createAssetWithAssetTypeCustom = async (url, body, token) => {

  /* 
   * Calls the createAssetTypesCustom function to create and/or update assetType counter in ODEP and RESILINK
   * Checks the value of the response status code 
   */
  const resultCreateAssetType = await AssetTypes.createAssetTypesCustom(body['assetType'], token);
  console.log("dans createAssetWithAssetTypeCustom");
  if (resultCreateAssetType[1] == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createAssetWithAssetTypeCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [{assetType: resultCreateAssetType[0], asset: "no attempt executed"}, resultCreateAssetType[1]];
  } else if(resultCreateAssetType[1] != 200) {
    updateDataODEP.error('error creating one assetType', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [{assetType: resultCreateAssetType[0], asset: "no attempt executed"}, resultCreateAssetType[1]];
  } else {

    /* 
     * If the status code is valid, calls the createAssetTypesCustom function to create and/or update assetType counter in ODEP and RESILINK
     * Checks the value of the response status code 
   */
  console.log("création assetType ODEP et RES fini, continuation");
    updateDataODEP.info('success creating one assetType', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    body["assetType"] = resultCreateAssetType[0]["assetType"];
    const resultCreateAsset = await createAssetCustom(url, body, token);
    if (resultCreateAsset[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createAssetWithAssetTypeCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(resultCreateAsset[1] != 200) {
      updateDataODEP.info('error creating one asset', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      console.log("création asset fini ODEP et RES, continuation");
      updateDataODEP.info('success creating one asset', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [{assetType: resultCreateAssetType[0], asset: resultCreateAsset[0]}, resultCreateAsset[1]];
  }
}

//Update an asset by id in ODEP
const putAsset = async (url, body, id, token) => {
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
  } else if(response.status != 200) {
    updateDataODEP.error('error updating one asset', { from: 'putAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success updating one asset', { from: 'putAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

//Update en asset by id in ODEP and RESILINK
const putAssetCustom = async (url, body, id, token) => {
  const imgBase64 = body['image'];
  delete body['image'];
  updateDataODEP.warn('data to send to ODEP', { from: 'putAssetCustom', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
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
    updateDataODEP.error('error: Unauthorize', { from: 'putAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    updateDataODEP.error('error updating one asset', { from: 'putAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success updating one asset', { from: 'putAssetCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    await AssetDB.updateAssetById(id, imgBase64, data);
  }
  return [data, response.status];
};

//Deletes an asset by id in ODEP
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
  } else if(response.status != 200) {
    deleteDataODEP.error('error deleting one asset', { from: 'deleteAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    deleteDataODEP.info('success deleting one asset', { from: 'deleteAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
  } catch (e) {
    throw(e)
  }
};

//Deletes an asset by id in ODEP and RESILINK
const deleteAssetCustom = async (url, id, token) => {
  try {
    const response = await Utils.fetchJSONData(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token},
  );
  const data = await Utils.streamToJSON(response.body)
  if (response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'deleteAssetCustom', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    deleteDataODEP.error('error deleting one asset', { from: 'deleteAssetCustom', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    deleteDataODEP.info('success deleting one asset', { from: 'deleteAssetCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    await AssetDB.deleteAssetById(id);
  }
  return [data, response.status];
  } catch (e) {
    throw(e)
  }

};

//Patch an asset in ODEP
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
    getAllAssetCustom,
    getOneAssetImg,
    getOneAsset,
    getOneAssetCustom,
    getOwnerAsset,
    getOwnerAssetCustom,
    createAsset,
    createAssetCustom,
    createAssetWithAssetTypeCustom,
    putAsset,
    putAssetCustom,
    patchAsset,
    deleteAsset,
    deleteAssetCustom
}