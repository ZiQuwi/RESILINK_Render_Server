const Utils = require("./Utils.js");

const createContract = async (url, body, token) => {
    const response = await Utils.fetchJSONData(
        'POST',
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
}

const getAllContract = async (url, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + "all/", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
}

const getOneContract = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
}

const getContractFromOwner = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + "owner/" + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
}

const patchContractImmaterial = async (url, body, id, token) => {
    const response = await Utils.fetchJSONData(
        'PATCH',
        url + "immaterialContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
}

const patchContractMaterialPurchase = async (url, body, id, token) => {
    const response = await Utils.fetchJSONData(
        'PATCH',
        url + "purchaseMaterialContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
}

const patchContractMaterialRent = async (url, body, id, token) => {
    const response = await Utils.executeCurl(
        'PATCH',
        url + "rentMaterialContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];}

const patchContractCancel = async (url, body, id, token) => {
    const response = await Utils.fetchJSONData(
        'PATCH',
        url + "cancelContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body)
    return [data, response.status];
}

module.exports = {
    createContract,
    getAllContract,
    getOneContract,
    getContractFromOwner,
    patchContractImmaterial,
    patchContractMaterialPurchase,
    patchContractMaterialRent,
    patchContractCancel,
}