const User = require("./UserService.js");
const Utils = require("./Utils.js");
const AssetTypes = require("./AssetTypeService.js");
const Asset = require("./AssetService.js");

const getAllOfferForResilinkCustom = async (url, token, AssetResilink) => {
    const allAssetType = await AssetTypes.getAllAssetTypesResilink(token);
    const allAssetResilink = await Asset.getAllAssetResilink(token) ;
    const allOffer = await Utils.fetchJSONData(
        'GET',
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    var allOfferResilink = {};
    const data = await Utils.streamToJSON(allOffer.body)
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (
            new Date(element['validityLimit']) > new Date() && 
            ( allAssetType[0][allAssetResilink[0][element['assetId'].toString()]['assetType']]['nature'] !== null ?  
              (allAssetType[0][allAssetResilink[0][element['assetId'].toString()]['assetType']]['nature'] == "immaterial" ? 
              (element['remainingQuantity'] !== null ? element['remainingQuantity'] > 0 : true) : true) : false
            ) 
          ) 
          {
            allOfferResilink[element['offerId'].toString()] = element;
          }
        }
    }
    return [allOfferResilink, allOffer.status];
};

//TODO copier le filtre actuel de l'app 
const getAllOfferFilteredCustom = async (url, filter, token) => {    
  try {
    const offerResilink = await getAllOfferForResilinkCustom(url, token);
    const allOffer = offerResilink[0];
    const assetResilink = await Asset.getAllAssetResilink(token);
    const allAsset = assetResilink[0];
    const allOfferFiltered = [];
    var isCompatible = true;
    console.log("--------------------------------------------------------");
    console.log(filter);
    console.log(filter.hasOwnProperty("assetType"));
    for (const key in allOffer) {
      console.log("Début d'un cycle");
      isCompatible = true;

      if (filter !== null) {
        if(filter.hasOwnProperty("assetType")){
          if (typeof filter["assetType"] !== "string") {
            var i = 0;
            var notFound = true;

            while ( i <= filter["assetType"].length && notFound) {
              if (allOffer[key]["assetType"] == filter["assetType"][i]) {
                notFound = false;
              }
              i++;
            };
            if (notFound) {
              isCompatible = false;
              continue;
            };
          } else {
            if (allAsset[allOffer[key]["assetId"]]["assetType"] != filter["assetType"]) {
              isCompatible = false;
              continue;
            }
          }
        };

        if(filter.hasOwnProperty("Properties")){
          console.log("Dans Properties");
          if(allAsset[allOffer[key]["assetId"]].hasOwnProperty("specificAttributes")) {
            console.log("dans le if");
            console.log("condition du if pour compatible : " + filter["Properties"].every(attr2 => allAsset[allOffer[key]["assetId"]]["specificAttributes"].some(attr1 => attr1.attributeName.toUpperCase() == attr2.attributeName.toUpperCase() && attr1.value.toUpperCase() == attr2.value.toUpperCase())));
            if (Object.keys(filter["Properties"]).length > 0 && filter["Properties"].every(attr2 => allAsset[allOffer[key]["assetId"]]["specificAttributes"].some(attr1 => attr1.attributeName.toUpperCase() == attr2.attributeName.toUpperCase() && attr1.value.toUpperCase() == attr2.value.toUpperCase())) == false) {
              isCompatible = false;
              continue;
            }
          } else {
            console.log("dans le else");
            isCompatible = false;
            continue;
          }
            
        };

        if(filter.hasOwnProperty("GPS")){
            console.log("dans GPS");
            if(Utils.isInPerimeter(filter["GPS"]["latitude"], filter["GPS"]["longitude"])) {

            }
        }
    
        if(filter.hasOwnProperty("priceMin")){
          if (allOffer[key]["price"] < filter["priceMin"]) {
            isCompatible = false;
            continue;
          }
        };

        if(filter.hasOwnProperty("priceMax")){
          if (allOffer[key]["price"] > filter["priceMax"]) {
            isCompatible = false;
            continue;
          }
        };

        if(filter.hasOwnProperty("MaxQuantity")){
          if (allOffer[key]["remainingQuantity"] < filter["MaxQuantity"]) {
            isCompatible = false;
            continue;
          }
        }

        if(filter.hasOwnProperty("MinQuantity")){
          if (allOffer[key]["remainingQuantity"] < filter["MinQuantity"]) {
            isCompatible = false;
            continue;
          }
        }
    
        if(filter.hasOwnProperty("dateMin")){
          if (allOffer[key]["validityLimit"] < filter["dateMin"]) {
            isCompatible = false;
            continue;
          }
        };

        if(filter.hasOwnProperty("dateMax")){
          if (allOffer[key]["validityLimit"] > filter["dateMax"]) {
            isCompatible = false;
            continue;
          }
        };

        if(filter.hasOwnProperty("TransactionType")){
          if (allAsset[allOffer[key]["assetId"]]["transactionType"] != filter["TransactionType"]) {
            isCompatible = false;
            continue;
          }
        };

        if(isCompatible) {
          allOfferFiltered.push(allOffer[key]); 
        };
      } else {
        allOfferFiltered.push(allOffer[key]); 
      }
    };
    console.log("fin de la boucle");
    console.log(JSON.stringify(allOfferFiltered));
    console.log("------------------------------------------------------");
    return [JSON.stringify(allOfferFiltered), 200];
  } catch (e) {
    return["filter had a problem", 400];
  }
};

const getAllOfferOwnerCustom = async (url, Username, token) => {
  var allOfferOwner = {};
  const allOffer = await Utils.fetchJSONData(
    'GET',
    url + "all", 
    headers = {'accept': 'application/json',
    'Authorization': token}
  );
  const data = await Utils.streamToJSON(allOffer.body)
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const offer = data[key];
      if (offer["offerer"] === Username) {
        allOfferOwner[offer["offerId"].toString()] = offer;
      }
    }
  }
  return [data, allOffer.status];
};

const createOffer = async (url, body, token) => {
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

const getAllOffer = async (url, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const getOneOffer = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

const putOffer = async (url, body, id, token) => {
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

const deleteOffer = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body)
  return [data, response.status];
};

module.exports = {
    getAllOfferForResilinkCustom,
    getAllOfferFilteredCustom,
    getAllOfferOwnerCustom,
    createOffer,
    getAllOffer,
    getOneOffer,
    putOffer,
    deleteOffer
}