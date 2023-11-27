const Utils = require("./Utils.js");

const createRegulator = async (url, body, token) => {
    const response = await Utils.fetchJSONData(
        "POST",
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
};

const getAllRegulator = async (url, token) => {
    const response = await Utils.fetchJSONData(
        "GET",
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
}

const getOneRegulator = async (url, body, id, token) => {
    const response = await Utils.fetchJSONData(
        "GET",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
}

const patchOneRegulator = async (url, body, id, token) => {
    const response = await Utils.fetchJSONData(
        "PATCH",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body);
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
}

const deleteRegulator = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        "DELETE",
        url + id + "/", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
}

module.exports = {
    createRegulator,
    getAllRegulator,
    getOneRegulator,
    patchOneRegulator,
    deleteRegulator,
};