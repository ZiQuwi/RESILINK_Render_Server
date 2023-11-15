const Utils = require("./Utils.js");

const createRegulator = async (url, body, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        "POST",
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body));
    return response;
};

const getAllRegulator = async (url, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        "GET",
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token}));
    return response;
}

const getOneRegulator = async (url, body, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        "GET",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token},
        body));
    return response;
}

const patchOneRegulator = async (url, body, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        "PATCH",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body));
    return response;
}

const deleteRegulator = async (url, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        "DELETE",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token}));
    return response;
}

module.exports = {
    createRegulator,
    getAllRegulator,
    getOneRegulator,
    patchOneRegulator,
    deleteRegulator,
};