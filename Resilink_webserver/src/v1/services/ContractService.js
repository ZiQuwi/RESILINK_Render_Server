const Utils = require("./Utils.js");

const createContract = async (url, body, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'POST',
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body));
    return response;
}

const getAllContract = async (url, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'GET',
        url + "all/", 
        headers = {'accept': 'application/json',
        'Authorization': token}));
    return response;
}

const getOneContract = async (url, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'GET',
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token}));
    return response;
}

const getContractFromOwner = async (url, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'GET',
        url + "owner/" + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token}));
    return response;
}

const patchContractImmaterial = async (url, body, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'PATCH',
        url + "immaterialContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body));
    return response;
}

const patchContractMaterialPurchase = async (url, body, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'PATCH',
        url + "purchaseMaterialContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body));
    return response;
}

const patchContractMaterialRent = async (url, body, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'PATCH',
        url + "rentMaterialContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body));
    return response;
}

const patchContractCancel = async (url, body, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'PATCH',
        url + "cancelContract/" + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body));
    return response;
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