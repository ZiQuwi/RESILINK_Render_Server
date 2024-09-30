require('../loggers.js');
const winston = require('winston');

const getDataLogger = winston.loggers.get('GetDataLogger');
const updateDataODEP = winston.loggers.get('UpdateDataODEPLogger');
const deleteDataODEP = winston.loggers.get('DeleteDataODEPLogger');

const Utils = require("./Utils.js");
const AssetTypes = require("./AssetTypeService.js");
const Asset = require("./AssetService.js");
const Contract = require("./ContractService.js");
const UserDB = require("../database/UserDB.js");


//Retrieves all valid offers for sale or lease in ODEP for RESILINK
const getAllOfferForResilinkCustom = async (url, token) => {

  //Retrieves all data needed to confirm the offers validity
    const allAssetType = await AssetTypes.getAllAssetTypesResilink(token);
    const allAssetResilink = await Asset.getAllAssetResilink(token);
    const allOffer = await Utils.fetchJSONData(
        'GET',
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    var allOfferResilink = {};
    const data = await Utils.streamToJSON(allOffer.body);

    //Checks that none of the functions are error returns by ODEP
    if (allOffer.status == 401 || allAssetType[1] == 401 || allAssetResilink[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllOfferForResilinkCustom', tokenUsed: token == null ? "Token not given" : token});
      return [allAssetType[1] == 401 ? allAssetType[0] : allAssetResilink[1] == 401 ? allAssetResilink[0] : data, 401];
    } else if(allOffer.status != 200 || allAssetType[1] != 200 || allAssetResilink[1] != 200) {
      getDataLogger.error("error trying to fetch Offer or Asset or AssetType from ODEP", { from: 'getAllOfferFilteredCustom', dataOffer: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [allAssetType[1] != 200 ? allAssetType[0] : allAssetResilink[1] != 200 ? allAssetResilink[0] : data, allOffer.status];
    };

    //For each offer, checks if its validity date has not passed and if there is a quantity above 0 if it is an immaterial offer.
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
            await UserDB.insertUserPhoneNumber(element['offerer'].toString(), element);
            allOfferResilink[element['offerId'].toString()] = element;
          }
        }
    }
    getDataLogger.info("successful data retrieval", { from: 'getAllOfferFilteredCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [allOfferResilink, allOffer.status];
};

//Retrieves 3 last valid offers for sale or lease in ODEP for RESILINK
const getLastThreeOfferForResilinkCustom = async (url, token) => {

  //Retrieves all data needed to confirm the offers validity
    const allAssetType = await AssetTypes.getAllAssetTypesResilink(token);
    const allAssetResilink = await Asset.getAllAssetResilink(token);
    const allOffer = await Utils.fetchJSONData(
        'GET',
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    var allOfferResilink = {};
    const data = await Utils.streamToJSON(allOffer.body);

    //Checks that none of the functions are error returns by ODEP
    if (allOffer.status == 401 || allAssetType[1] == 401 || allAssetResilink[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getLastThreeOfferForResilinkCustom', tokenUsed: token == null ? "Token not given" : token});
      return [allAssetType[1] == 401 ? allAssetType[0] : allAssetResilink[1] == 401 ? allAssetResilink[0] : data, 401];
    } else if(allOffer.status != 200 || allAssetType[1] != 200 || allAssetResilink[1] != 200) {
      getDataLogger.error("error trying to fetch Offer or Asset or AssetType from ODEP", { from: 'getLastThreeOfferForResilinkCustom', dataOffer: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [allAssetType[1] != 200 ? allAssetType[0] : allAssetResilink[1] != 200 ? allAssetResilink[0] : data, allOffer.status];
    };

    const validOffers = [];
    const validMapAssets = {};
    //For each offer, checks if its validity date has not passed and if there is a quantity above 0 if it is an immaterial offer.
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
            await UserDB.insertUserPhoneNumber(element['offerer'].toString(), element);
            validOffers.push(element);
          }
        }
    }

    // Get the last 3 valid offers
    const lastThreeOffers = validOffers.slice(-3);

    // Add the last 3 valid offers to allOfferResilink
    for (const offer of lastThreeOffers) {
      validMapAssets[offer['assetId'].toString()] = (allAssetResilink[0][offer['assetId'].toString()])
    }
    allOfferResilink['offers'] = lastThreeOffers;
    allOfferResilink['assets'] = validMapAssets;
        
    getDataLogger.info("successful data retrieval", { from: 'getLastThreeOfferForResilinkCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [allOfferResilink, allOffer.status];
};

//Filters valid ODEP offers with filter parameters set
const getAllOfferFilteredCustom = async (url, filter, token) => {    
  try {
    //Retrieves all data required to check values.
    const offerResilink = await getAllOfferForResilinkCustom(url, token);
    const allOffer = offerResilink[0];
    if (offerResilink[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllOfferFilteredCustom', dataReceived: allOffer, tokenUsed: token == null ? "Token not given" : token});
      return [allOffer, offerResilink[1]];
    }
    const assetResilink = await Asset.getAllAssetResilink(token);
    const allAsset = assetResilink[0];
    if (assetResilink[1] == 401) {
      getDataLogger.error('error: Unauthorize', { from: 'getAllOfferFilteredCustom', dataReceived: allAsset, tokenUsed: token == null ? "Token not given" : token});
      return [allAsset, assetResilink[1]];
    }

    //Checks for each offer whether it does not meet one of the conditions expressed in the filter map.
    const allOfferFiltered = [];
    var isCompatible = true;

    for (const key in allOffer) {
      isCompatible = true;
      //If filter is is not existant then all offers are pushed
      if (filter !== null) {

        //Checks if the filter has an “assetType” property and if so, checks if the offer's asset is identical 
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
            if (allAsset[allOffer[key]["assetId"]]["assetType"].replaceAll(/\d+/g, '') != filter["assetType"]) {
              isCompatible = false;
              continue;
            }
          }
        };

        /*
         * Checks if the filter has a “properties” property
         * properties is a list of objects that are specifications of an assetType
         * Checks if the offer's assetType has the same specification
         */
        if(filter.hasOwnProperty("properties")){
          if(allAsset[allOffer[key]["assetId"]].hasOwnProperty("specificAttributes")) {
            if (Object.keys(filter["properties"]).length > 0 && 
                filter["properties"].every(
                  attr2 => allAsset[allOffer[key]["assetId"]]["specificAttributes"].some(attr1 => attr1.attributeName.toUpperCase() == attr2.attributeName.toUpperCase() && 
                  attr1.value.toUpperCase() == attr2.value.toUpperCase())
                ) == false) {
              isCompatible = false;
              continue;
            }
          } else {
            isCompatible = false;
            continue;
          }
        };

        /*
         * Checks if the Filter map has the key latitude, if so, then it is associated with longitude and distance and 
         * Checks whether offers are within the perimeter given by the filter.
         */
        if(filter.hasOwnProperty("latitude")){
            if(allAsset[allOffer[key]["assetId"]]["specificAttributes"] !== undefined) {
              const gpsAttribute = allAsset[allOffer[key]["assetId"]]["specificAttributes"].find(attribute => attribute.attributeName === "GPS");
              if (gpsAttribute !== undefined) {
                const regex = /<(-?\d+\.\d+),(-?\d+\.\d+)>/;
                const match = gpsAttribute["value"].match(regex);
                if(match !== undefined && match !== null) {
                  var pointInCircle = Utils.isInPerimeter(filter["latitude"], filter["longitude"], parseFloat(match[1]), parseFloat(match[2]), filter["distance"]);
                  if(!pointInCircle) {
                    isCompatible = false;
                    continue;
                  }
                } else {
                  isCompatible = false;
                  continue;
                }
              } else {
                isCompatible = false;
                continue;
              }
            } else {
              isCompatible = false;
              continue;
            }
        }

        //Checks if the filter has a “name” property, if so checks if its value is included in the asset name or description
        if(filter.hasOwnProperty("name")){
          if (!(allAsset[allOffer[key]["assetId"]]["name"].includes(filter["name"]) || allAsset[allOffer[key]["assetId"]]["description"].includes(filter["name"]))) {
            isCompatible = false;
            continue;
          }
        };

        //Checks if the filter has a “minPrice” property, if so checks that its value is lower than the offer price
        if(filter.hasOwnProperty("minPrice")){
          if (allOffer[key]["price"] < filter["minPrice"]) {
            isCompatible = false;
            continue;
          }
        };

        //Checks if the filter has a “maxPrice” property, if so checks that its value is greater than the offer price
        if(filter.hasOwnProperty("maxPrice")){
          if (allOffer[key]["price"] > filter["maxPrice"]) {
            isCompatible = false;
            continue;
          }
        };

        //Checks if the filter has a “maxQuantity” property, if so checks that its value is greater than the quantity remaining in an offer.
        if(filter.hasOwnProperty("maxQuantity")){
          if (allOffer[key]["remainingQuantity"] < filter["maxQuantity"]) {
            isCompatible = false;
            continue;
          }
        }

        //Checks if the filter has a “minQuantity” property, if so checks that its value is less than the quantity remaining in an offer.
        if(filter.hasOwnProperty("minQuantity")){
          if (allOffer[key]["remainingQuantity"] < filter["minQuantity"]) {
            isCompatible = false;
            continue;
          }
        }
    
        //Check if the filter has a “minDate” property, if so check that its value is less than the offer start date.
        if(filter.hasOwnProperty("minDate")){
          if (allOffer[key]["validityLimit"] < filter["minDate"]) {
            isCompatible = false;
            continue;
          }
        };

        //Check if the filter has a “maxDate” property, if so check that its value is less than the offer end date.
        if(filter.hasOwnProperty("maxDate")){
          if (allOffer[key]["validityLimit"] > filter["maxDate"]) {
            isCompatible = false;
            continue;
          }
        };

        //Checks if the filter has a “transactionType” property, if so checks that its value is equal to the offer's transaction type
        if(filter.hasOwnProperty("transactionType")){
          if (allAsset[allOffer[key]["assetId"]]["transactionType"] != filter["transactionType"]) {
            isCompatible = false;
            continue;
          }
        };

        //If the offer values match what the filter requests, push the offer to the response list 
        if(isCompatible) {
          allOfferFiltered.push(allOffer[key]); 
        };
      } else {
        allOfferFiltered.push(allOffer[key]); 
      }
    };
    getDataLogger.info('success filtering data', { from: 'getAllOfferFilteredCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [JSON.stringify(allOfferFiltered), 200];
  } catch (e) {
    getDataLogger.error("filter had a problem", { from: 'getAllOfferFilteredCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return[{error : e}, 500];
  }
};

const getOwnerOfferPurchase = async (url, Username, token) => {
  var allOfferPurchase = [];
  var allAssetPurchase = [];

  const allContractOwner = await Contract.getContractFromOwner('http://90.84.194.104:10010/contracts/', Username, token);
  if (allContractOwner[1] != 200) {
    getDataLogger.error('error: retrieving all owner\'s contracts', { from: 'getOwnerOfferPurchase', dataReceived: allContractOwner[0], tokenUsed: token == null ? "Token not given" : token});
    return [allContractOwner[0], allContractOwner[1]];
  }
  if (allContractOwner[0].length > 0 ) {
    const allOffer = await getAllOfferMapped(url, token);
    if (allOffer[1] != 200) {
      getDataLogger.error('error: retrieving all offers', { from: 'getOwnerOfferPurchase', dataReceived: allOffer[0], tokenUsed: token == null ? "Token not given" : token});
      return [allOffer[0], allOffer[1]];
    }
    const allAsset = await Asset.getAllAssetResilink(token);
    if (allAsset[1] != 200) {
      getDataLogger.error('error: retrieving all assets', { from: 'getOwnerOfferPurchase', dataReceived: allAsset[0], tokenUsed: token == null ? "Token not given" : token});
      return [allAsset[0], allAsset[1]];
    } 

    const allContractPurchased = allContractOwner[0].reduce((acc, contract) => {
      const nameValue = contract["state"];
      if (nameValue !== "cancelled" && /* contract cancelled before ending of the deal */ //Need yo be deleted after, just needed for the account acazaux in RESILINK 
          nameValue !== 'endOfConsumption' && /* end states of an immaterial purchase contract */
          nameValue !== "assetReceivedByTheRequestor" && nameValue !== "assetNotReceivedByTheRequestor" && /* end states of an material purchase contract */
          nameValue !== "assetNotReturnedToTheOfferer" && nameValue !== "assetReceivedByTheRequestor" && nameValue !== "assetReceivedByTheRequestor" &&/* end states of an material rent contract */
          !acc.some(item => item.idContract === contract.idContract)) {
        acc.push(contract);
      } 
      return acc;
    }, []);
    // Instead of a for... usage of Promise to make all afffectation at the same time
    await Promise.all(allContractPurchased.map(async (data) => {
      await UserDB.insertUserPhoneNumber(
        allOffer[0][parseInt(data['offer'])]['offerer'].toString(),
        allOffer[0][parseInt(data['offer'])]
      );
      allOfferPurchase.push(allOffer[0][parseInt(data['offer'])]);
      allAssetPurchase.push(allAsset[0][data['asset']]);
    }));
    return [{'contracts': allContractPurchased, 'offers': allOfferPurchase, 'assets': allAssetPurchase}, 200];
  } else {
    return [{'contracts': [], 'offers': [], 'assets': []}, allContractOwner[1]];
  }
}

//Retrieves all offers from a user in ODEP.
const getAllOfferOwnerCustom = async (url, Username, token) => {
  var allOfferOwner = {};
  const allAssetType = await AssetTypes.getAllAssetTypesResilink(token);
  const allAssetResilink = await Asset.getAllAssetResilink(token);
  //Retrives all offer in ODEP
  const allOffer = await Utils.fetchJSONData(
    'GET',
    url + "all", 
    headers = {'accept': 'application/json',
    'Authorization': token}
  );
  const data = await Utils.streamToJSON(allOffer.body)

  if (allOffer.status == 401 || allAssetType[1] == 401 || allAssetResilink[1] == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllOfferOwnerCustom', tokenUsed: token == null ? "Token not given" : token});
    return [allAssetType[1] == 401 ? allAssetType[0] : allAssetResilink[1] == 401 ? allAssetResilink[0] : data, 401];
  } else if(allOffer.status != 200 || allAssetType[1] != 200 || allAssetResilink[1] != 200) {
    getDataLogger.error("error trying to fetch Offer or Asset or AssetType from ODEP", { from: 'getAllOfferOwnerCustom', dataOffer: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [allAssetType[1] != 200 ? allAssetType[0] : allAssetResilink[1] != 200 ? allAssetResilink[0] : data, allOffer.status];
  };

  //Checks if the creator is the user in parameter
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const offer = data[key];
      if (offer["offerer"] === Username &&
        (allAssetType[0][allAssetResilink[0][offer['assetId'].toString()]['assetType']]['nature'] == "immaterial" ? 
              (offer['remainingQuantity'] !== null ? offer['remainingQuantity'] > 0 : true) : true)
      ) {
        allOfferOwner[offer["offerId"].toString()] = offer;
      }
    }
  }
  getDataLogger.info('success retrieving offers & keep the owner\'s', { from: 'getAllOfferOwnerCustom', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  return [allOfferOwner, allOffer.status];
};

//Creates an offer in ODEP
const createOffer = async (url, body, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'createOffer', dataToSend: body, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  const response = await Utils.fetchJSONData(
      'POST',
      url, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body);
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createOffer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    updateDataODEP.error('error creating an offer', { from: 'createOffer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success creating an offer', { from: 'createOffer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

//Creates an offer, his asset and asset type associated 
const createOfferAsset = async (url, body, token) => {

  //Calls the function to create an asset and his asset type
  updateDataODEP.warn('data to send to ODEP', { from: 'createOfferAsset', dataToSend: body, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  const newsAsset = await Asset.createAssetWithAssetTypeCustom("http://90.84.194.104:10010/assets/", body['asset'], token);
  if (newsAsset[1] == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'createOfferAsset', dataReceived: newsAsset[0], tokenUsed: token == null ? "Token not given" : token});
    return [newsAsset[0], newsAsset[1]];
  } else if(newsAsset[1] != 200) {
    updateDataODEP.error('error creating one assetType', { from: 'createOfferAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [newsAsset[0], newsAsset[1]];
  } else {

    //Associates the assetId just created with the map containing the offer data 
    body['offer']['assetId'] = newsAsset[0]['asset']['assetId']; 
    const newOffer = await createOffer(url, body['offer'], token);
    if (newOffer[1] == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'createOfferAsset', dataReceived: newOffer[0], tokenUsed: token == null ? "Token not given" : token});
      return [newOffer[0], newOffer[1]];
    } else if(newOffer[1] != 200) {
      updateDataODEP.error('error creating one assetType', { from: 'createOfferAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
      return [newOffer[0], newOffer[1]];
    } else {
      return [{'asset': newsAsset[0], 'offer': newOffer[0]}, 200];
    }
  }
};

//Retrieves all offer in ODEP
const getAllOffer = async (url, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllOffer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all offers', { from: 'getAllOffer' , data: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving all offers', { from: 'getAllOffer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

//Retrieves all offer in ODEP
const getAllOfferMapped = async (url, token) => {
  var allOfferOwner = {};

  const response = await Utils.fetchJSONData(
      'GET',
      url + "all", 
      headers = {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getAllOfferMapped', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    return [data, response.status];
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving all offers', { from: 'getAllOfferMapped' , data: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [data, response.status];
  } else {
    getDataLogger.info('success retrieving all offers', { from: 'getAllOfferMapped', tokenUsed: token.replace(/^Bearer\s+/i, '')});

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const offer = data[key];
        allOfferOwner[offer["offerId"].toString()] = offer;
      }
    }
    return [allOfferOwner, response.status];
  }

};

//Retrieves an offer by id in ODEP
const getOneOffer = async (url, id, token) => {
  const response = await Utils.fetchJSONData(
      'GET',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    getDataLogger.error('error: Unauthorize', { from: 'getOneOffer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    getDataLogger.error('error retrieving an offer', { from: 'getOneOffer' , data: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    getDataLogger.info('success retrieving an offer', { from: 'getOneOffer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

//Updates the offer by id in ODEP
const putOffer = async (url, body, id, token) => {
  updateDataODEP.warn('data to send to ODEP', { from: 'putOffer', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
  const response = await Utils.fetchJSONData(
      'PUT',
      url + id, 
      headers = {'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token},
      body
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'putOffer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    updateDataODEP.error('error updating an offer', { from: 'putOffer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    updateDataODEP.info('success updating an offer', { from: 'putOffer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

//Updates the offer and its asset by id in ODEP
const putOfferAsset = async (url, body, id, token) => {
  const putAsset = await Asset.putAssetCustom("http://90.84.194.104:10010/assets/", body['asset'], body['offer']['assetId'], token);
  if (putAsset[1] == 401) {
    updateDataODEP.error('error: Unauthorize', { from: 'putOfferAsset', dataReceived: newsAsset[0], tokenUsed: token == null ? "Token not given" : token});
    return [putAsset[0], putAsset[1]];
  } else if(putAsset[1] != 200) {
    updateDataODEP.error('error updating one asset', { from: 'putOfferAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    return [putAsset[0], putAsset[1]];
  } else {
    updateDataODEP.warn('data to send to ODEP', { from: 'putOfferAsset', dataToSend: body, tokenUsed: token == null ? "Token not given" : token});
    const response = await Utils.fetchJSONData(
        'PUT',
        url + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body['offer']
    );
    const data = await Utils.streamToJSON(response.body);
    if(response.status == 401) {
      updateDataODEP.error('error: Unauthorize', { from: 'putOfferAsset', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
    } else if(response.status != 200) {
      updateDataODEP.error('error updating an offer', { from: 'putOfferAsset', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
    } else {
      updateDataODEP.info('success updating an offer', { from: 'putOfferAsset', tokenUsed: token.replace(/^Bearer\s+/i, '')});
    }
    return [data, response.status];
  }
};

//Deletes an offer by id in ODEP
const deleteOffer = async (url, id, token) => {
  deleteDataODEP.warn('id to used in ODEP', { from: 'deleteOffer', offerId: id, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  const response = await Utils.fetchJSONData(
      'DELETE',
      url + id, 
      headers = {'accept': 'application/json',
      'Authorization': token}
  );
  const data = await Utils.streamToJSON(response.body);
  if(response.status == 401) {
    deleteDataODEP.error('error: Unauthorize', { from: 'deleteOffer', dataReceived: data, tokenUsed: token == null ? "Token not given" : token});
  } else if(response.status != 200) {
    deleteDataODEP.error('error deleting an offer', { from: 'deleteOffer', dataReceived: data, tokenUsed: token.replace(/^Bearer\s+/i, '')});
  } else {
    deleteDataODEP.info('success deleting an offer', { from: 'deleteOffer', tokenUsed: token.replace(/^Bearer\s+/i, '')});
  }
  return [data, response.status];
};

module.exports = {
    getAllOfferForResilinkCustom,
    getLastThreeOfferForResilinkCustom,
    getAllOfferFilteredCustom,
    getAllOfferOwnerCustom,
    getOwnerOfferPurchase,
    createOffer,
    createOfferAsset,
    getAllOffer,
    getOneOffer,
    putOffer,
    putOfferAsset,
    deleteOffer
}