require('../loggers.js');
const winston = require('winston');
const config = require('../config.js');
const fs = require('fs');
const path = require('path');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataResilink = winston.loggers.get('DeleteDataODEPLogger');

const Utils = require("./Utils.js");
const AssetTypes = require("../services/AssetTypeService.js");
const AssetDB = require("../database/AssetDB.js");
const UserDB = require("../database/UserDB.js");

const pathResilinkWebServer = "https://resilink-dp.org/v1/assets/img";
const pathODEPAsset = config.PATH_ODEP_ASSET;

//Retrieves all asset from a user 
const getOwnerAsset = async (id, token) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'getOwnerAsset', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    const data = await AssetDB.getAllAsset();
    
    var allAssetOwner = [];
    for (const key in data) {
      const asset = data[key];
      if (asset["owner"] === id) {
        allAssetOwner.push(asset);
      }
    }
    getDataLogger.info('success retrieving all assets', { from: 'getOwnerAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [allAssetOwner, 200];
    
  } catch(e) {
    getDataLogger.error('error retrieving all assets', { from: 'getOwnerAsset', dataReceived: e.message, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e);
  }
};
 
//Retrieves all asset 
const getAllAsset = async (token) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllAsset', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    const data = await AssetDB.getAllAsset();
    getDataLogger.info('success retrieving all assets', { from: 'getAllAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, 200];
    
  } catch(e) {
    getDataLogger.error('error retrieving all assets', { from: 'getAllAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e);
  }
};

/* Retrieves all asset and RESILINK 
 * Do the same as the getAllAssetCustom function but return a  a map of object asset instead of a list of object asset
 * No PATH in parameters since it's a function used in few other files
 */
const getAllAssetResilink = async (token) => {
  try {
    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllAssetResilink', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    const data = await AssetDB.getAllAsset();
    getDataLogger.info('success retrieving all assets', { from: 'getAllAssetResilink', tokenUsed: token.replace(/^Bearer\s+/i, '')});

    var assetMapResilink = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          assetMapResilink[element['id']] = element;
        }
    }
    return [assetMapResilink, 200];

  } catch(e) {
    getDataLogger.error('error retrieving all assets', { from: 'getAllAssetResilink', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e);
  }
};

//Retrieves an asset by id 
const getOneAsset = async (id, token) => {
  try {

    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'getOneAsset', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    const data = await AssetDB.getOneAsset(id);
    getDataLogger.info('success retrieving one image from an asset', { from: 'getOneAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, 200];
    
  } catch(e) {
    getDataLogger.error('error retrieving one image from an asset', { from: 'getOneAsset', dataReceived: e.message, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw(e);
  }
};

//Creates an asset in RESILINK
const createAsset = async (body, token) => {

  try {
    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'createAsset', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    if (body['images'].length > 2) {
      updateDataODEP.error('error creating one asset, contains more than 2 images', {from: 'createAsset', dataReceived: body, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{message: "images contains more than 2 elements"}, (500)];
    } else if (!Utils.areAllBase64(body['images'])) {
      updateDataODEP.error('error creating one asset, images list do not contains only base64 string', {from: 'createAsset', dataReceived: body, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{message: "images list do not contains only base64 string"}, (500)];
    }
    
    if (body['totalQuantity'] == null) {
        body['totalQuantity'] = 1;
    }

    const asset = await AssetDB.newAsset(body);

    const img = await postImages({'assetId': asset['id'].toString(), 'images': body['images'], 'fromBackUpServer': true}, token);
  
    const tamp = await AssetDB.updateAssetImagesById(asset['id'] ,img[0]['images']);
    
    //Register images in o2switch server
    updateDataODEP.info("success creating one asset", {from: 'createAsset'});
    asset['images'] = img[0]['images'];
    return [asset, 200];
  } catch (e) {
    updateDataODEP.error("error creating one asset", {from: 'createAsset', dataReceiver: e.message});
    throw e;
  }
};

/*
 * Creates a clone/child of an asset type which will be identical except for its name 
 * which will have a number (asset type creation counter in RESILINK) at the end of its name.
 * Example: Fruits -> Fruits6 
 * Update the asset type counter, or create its own counter if it doesn't already exist
 * Creates an asset in RESILINK 
 */
const createAssetWithAssetTypeCustom = async (body, token) => {
  try {

  /* 
   * Calls the createAssetTypesCustom function to create and/or update assetType counter in RESILINK
   * Checks the value of the response status code 
   */
    const resultCreateAssetType = await AssetTypes.duplicateAssetTypes(token, body['assetType']);
    if (resultCreateAssetType[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createAssetWithAssetTypeCustom', dataReceived: body, tokenUsed: token == null ? "Token not given" : token});
      return [{assetType: resultCreateAssetType[0], asset: "no attempt executed"}, resultCreateAssetType[1]];
    } else if(resultCreateAssetType[1] != 200) {
      updateDataODEP.error('error creating one assetType', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{assetType: resultCreateAssetType[0], asset: "no attempt executed"}, resultCreateAssetType[1]];
    } else {

      /* 
      * If the status code is valid, calls the createAssetTypesCustom function to create and/or update assetType counter in RESILINK
      * Checks the value of the response status code 
      */
      updateDataODEP.info('success creating one assetType', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      body["assetType"] = resultCreateAssetType[0]["name"];
      const resultCreateAsset = await createAsset(body, token);
      if (resultCreateAsset[1] == 401) {
        updateDataODEP.error('error: Unauthorize', { from: 'createAssetWithAssetTypeCustom', dataReceived: resultCreateAsset[0], tokenUsed: token == null ? "Token not given" : token});
      } else if(resultCreateAsset[1] != 200) {
        updateDataODEP.error('error creating one asset', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      } else {
        updateDataODEP.info('success creating one asset', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      }
      return [{assetType: resultCreateAssetType[0], asset: resultCreateAsset[0]}, resultCreateAsset[1]];
    }
  } catch (e) {
    updateDataODEP.error('error creating one asset', { from: 'createAssetWithAssetTypeCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw e
  }
}

//Update en asset by id in RESILINK
const putAsset = async (body, id, token) => {
  try {
    if(!Utils.validityToken(token)) {
      getDataLogger.error('error: Unauthorize', { from: 'putAsset', tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "Unauthorize"}, 401];
    }

    const userProfil = await UserDB.getUserByToken(token.replace(/^Bearer\s+/i, ''));
    if (userProfil['userName'] != "admin" && userProfil['userName'] != body["owner"] ) {
      updateDataODEP.error('error: not the owner or administrator', { from: 'putAsset', dataReceived: "Unauthorize", tokenUsed: token == null ? "Token not given" : token});
      return [{"message" : "not the owner or administrator"}, 401];
    }

    //Register images in o2switch server
    const img = await postImages({'assetId': id.toString(), 'images': body['images'], 'fromBackUpServer': true}, token);
    body['images'] = img[0]['images'];
    await AssetDB.updateAssetById(id, body);

    updateDataODEP.info("success updating one asset", {from: 'putAsset'});

    return [{message: id + " asset correctly updated"}, 200];
  } catch (e) {
    updateDataODEP.error("error updating one asset", {from: 'putAsset', dataReceiver: e.message});
    throw e;
  }
};

//Deletes an asset by id and RESILINK
const deleteAsset = async (id, token) => {
  try {
      if(!Utils.validityToken(token)) {
        getDataLogger.error('error: Unauthorize', { from: 'deleteAsset', tokenUsed: token == null ? "Token not given" : token});
        return [{"message" : "Unauthorize"}, 401];
      }

      const assetToDelete = await getOneAsset(id, token);
      
      const userProfil = await UserDB.getUserByToken(token.replace(/^Bearer\s+/i, ''));
      if (userProfil['userName'] != "admin" && userProfil['userName'] != assetToDelete[0]['owner'] ) {
        updateDataODEP.error('error: not the owner or administrator', { from: 'deleteAsset', dataReceived: "Unauthorize", tokenUsed: token == null ? "Token not given" : token});
        return [{"message" : "not the owner or administrator"}, 401];
      }
  
      await AssetDB.deleteAssetById(id);
      
      await deleteImages(id, token);
      deleteDataResilink.info("success deleting an asset in RESILINK", {from: 'deleteAsset'});
  
      return [{message: id + " asset correctly removed in RESILINK "}, 200];
    } catch (e) {
      deleteDataResilink.error("error deleting an asset in RESILINK", {from: 'deleteAsset', dataReceiver: e.message});
      throw e;
    }
};

//Post images of an asset
const postImagesAsset = async (body, token) => {
  try {
    const asset = await getOneAsset(pathODEPAsset, body['assetId'], token);
    if (asset[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'postImgAsset', dataReceived: newsAsset[0], tokenUsed: token == null ? "Token not given" : token});
      return [asset[0], asset[1]];
    } else if(asset[1] != 200) {
      updateDataODEP.error('error updating one asset', { from: 'postImgAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [asset[0], asset[1]];
    } else if (body['owner'] != asset[0]['owner']) {
      updateDataODEP.error('the user is not the owner of the asset', { from: 'postImgAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{'message': 'the user is not the owner of the asset'}, asset[1]];
    }
    // Check body.images: it must exist and be a list (array)
    if (!body.images || !Array.isArray(body.images)) {
      updateDataODEP.error('error posting one asset', { from: 'postImgAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{ 'message': 'images must be a list' }, 500];
    } else if (!Utils.areAllBase64(body['images'])) {
      updateDataODEP.error('error posting one asset, images list do not contains only base64 string', {from: 'postImgAsset', dataReceived: body, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [{message: "images list do not contains only base64 string"}, (500)];
    }
  
    const imgData = await postImages({'assetId': body['assetId'], 'images': body['images']}, token);
    if (imgData[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'postImgAsset', dataReceived: newsAsset[0], tokenUsed: token == null ? "Token not given" : token});
    } else if(imgData[1] != 200) {
      updateDataODEP.error('error posting images', { from: 'postImgAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    updateDataODEP.info('success posting images', { from: 'postImgAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [imgData[0], imgData[1]];
  } catch (e) {
    updateDataODEP.error('error posting images', { from: 'postImgAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw e;
  }
};

//Call RESILINK on o2switch to post images on webserver
const postImages = async (body, token) => {
  try {

  const data = await saveImagesAsset(body)

  if (data[1] != 200) {
    updateDataODEP.error('error posting images of asset', { from: 'postImages', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [{message: 'error during process to post new images'}, 402]
  }
  return [data[0], data[1]];
  } catch (e) {
    updateDataODEP.error('error posting images of asset', { from: 'postImages', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    throw e;
  }
};

//Call RESILINK on o2switch to delete images associated to an asset on webserver
const deleteImages = async (assetId, token) => {
  try {

    const data = await deleteImagesAsset(assetId, true);
    if (data[1] != 200) {
      updateDataODEP.error('error deleting images of asset', { from: 'deleteImages', tokenUsed: token.replace(/^Bearer\s+/i, '')});

    } else {
      updateDataODEP.info('success deleting images of asset', { from: 'deleteImages', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data[0], data[1]];
  } catch (e) {
    updateDataODEP.error('error deleting images of asset', { from: 'deleteImages', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  
};

const saveImagesAsset = async (body) => {
  const baseDir = body['fromBackUpServer'] != null ? 'public/imagesBackUp' : 'public/images';  // Dossier racine des images
  const assetDir = path.join(baseDir, body.assetId);  // Crée le chemin vers le dossier avec assetId

  // Vérifier si le dossier existe
  if (fs.existsSync(assetDir)) {
      // Supprimer tous les fichiers du dossier
      fs.readdirSync(assetDir).forEach(file => {
          const filePath = path.join(assetDir, file);
          if (fs.lstatSync(filePath).isFile()) {
              fs.unlinkSync(filePath); // Supprimer chaque fichier
          }
      });
  } else {
      // Créer le dossier si n'existe path
      fs.mkdirSync(assetDir, { recursive: true });
  }

  const savedImages = []; // Tableau pour stocker les chemins des images sauvegardées

  // Boucle à travers la liste des images (Base64)
  for (let i = 0; i < body.images.length; i++) {
      const base64Image = body.images[i];

      // Déterminer le nom du fichier (par exemple image1.png, image2.png, etc.)
      const fileName = `image${i + 1}.png`;
      const filePath = path.join(assetDir, fileName);  // Chemin complet vers le fichier

      // Convertir la chaîne base64 en buffer binaire
      const imageBuffer = Buffer.from(base64Image, 'base64');

      // Sauvegarder le fichier image dans le répertoire de l'offre
      try {
          fs.writeFileSync(filePath, imageBuffer);
           savedImages.push("https://resilink-dp.org/" + filePath);  // Ajouter le chemin du fichier sauvegardé
      } catch (err) {
          console.error(`Erreur lors de la sauvegarde de l'image ${fileName} :`, err);
      }
  }
  return [{'assetId': body.assetId, 'images': savedImages}, 200];
};

const deleteImagesAsset = async (assetId, fromBackUpServer) => {
    
  const baseDir = fromBackUpServer ? 'public/imagesBackUp' : 'public/images';  // Dossier racine des images
  const assetDir = path.join(baseDir, assetId);  // Crée le chemin vers le dossier avec assetId

  // Vérifier si le dossier existe
  if (fs.existsSync(assetDir)) {
      try {
          // Supprime le répertoire et tout son contenu
          fs.rmSync(assetDir, { recursive: true, force: true });
          return [{message: `Images associated with assetId ${assetId} have been deleted.`}, 200];
      } catch (err) {
          return [{message: `Error deleting images in DB for assetId ${assetId}.`, error: err.message}, 500];
      }
  } else {
      return [{message: `The images in DB for assetId ${assetId} does not exist.`}, 404];
  }
};

module.exports = {
    getAllAssetResilink,
    getAllAsset,
    getOneAsset,
    getOwnerAsset,
    createAsset,
    createAssetWithAssetTypeCustom,
    putAsset,
    deleteAsset,
    postImagesAsset,
    postImages,
    deleteImages,
    saveImagesAsset,
    deleteImagesAsset
}