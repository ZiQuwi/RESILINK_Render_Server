const User = require("./UserService.js");
const Utils = require("./Utils.js");
const AssetTypes = require("./AssetTypeService.js");
const Asset = require("./AssetService.js");

const getAllOfferForResilinkCustom = async (url, token) => {
    const allAssetResilink = await Asset.getAllAsset('http://90.84.194.104:10010/assets/', token);
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
          
          if (new Date(element['validityLimit']) > new Date() && allAssetResilink[element['assetId'].toString()] !== null) {
            allOfferResilink[element['offerId'].toString()] = element;
          }
        }
    }
    return [allOfferResilink, allOffer.status];
};

//TODO copier le filtre actuel de l'app 
const getAllOfferFilteredCustom = async (url, filter, token) => {    
    const allOffer = await getAllOffer(url, token);
    const allAssetTypes = await AssetTypes.getAllAssetTypeVue();
    const allAsset = await Asset.getAllAssetResilink(allAssetTypes, token);

    const allOfferFiltered = {};
    var isCompatible = true;

    for (const key in allOffer) {
      console.log("Début d'un cycle");
      isCompatible = true;

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
          };
        } else {
          if (allAsset[allOffer[key]["assetId"]]["assetType"] != filter["assetType"]) {
            isCompatible = false;
          }
        }
      };

      if(filter.hasOwnProperty("Properties")){
          console.log("Dans Properties");
          if(allAsset[allOffer[key]["assetId"]].hasOwnProperty("specificAttributes")) {
            console.log("dans le if");
            console.log("condition du if pour compatible : " + filter["Properties"].every(attr2 => allAsset[allOffer[key]["assetId"]]["specificAttributes"].some(attr1 => attr1.attributeName.toUpperCase() == attr2.attributeName.toUpperCase() && attr1.value.toUpperCase() == attr2.value.toUpperCase())));
            if (filter["Properties"].every(attr2 => allAsset[allOffer[key]["assetId"]]["specificAttributes"].some(attr1 => attr1.attributeName.toUpperCase() == attr2.attributeName.toUpperCase() && attr1.value.toUpperCase() == attr2.value.toUpperCase())) == false) {
              isCompatible = false;
            }
          } else {
            console.log("dans le else");
            isCompatible = false;
          }
          
      };
  
      if(filter.hasOwnProperty("priceMin")){
        if (allOffer[key]["price"] < filter["priceMin"]) {
          isCompatible = false;
        }
      };

      if(filter.hasOwnProperty("priceMax")){
        if (allOffer[key]["price"] > filter["priceMax"]) {
          isCompatible = false;
        }
      };
  
      if(filter.hasOwnProperty("dateMin")){
        if (allOffer[key]["validityLimit"] > filter["dateMin"]) {
          isCompatible = false;
        }
      };

      if(filter.hasOwnProperty("dateMax")){
        if (allOffer[key]["validityLimit"] < filter["dateMax"]) {
          isCompatible = false;
        }
      };

      if(isCompatible) {
        allOfferFiltered[allOffer[key]["offerId"]] = allOffer[key]; 
      };
  
    };
    console.log("fin de la boucle");
    console.log(allOfferFiltered);
    return allOfferFiltered;
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