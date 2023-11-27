const Utils = require("./Utils.js");

const createRequest = async (url, body, token) => {
    const response = await Utils.fetchJSONData(
        'POST',
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body
    );
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
};

const getOneRequest = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + id, 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
};

const getAllRequest = async (url, token) => {
    const response = await Utils.fetchJSONData(
        'GET',
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token});
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
};

const putRequest = async (url, body, id, token) => {
    const response = await Utils.fetchJSONData(
        'PUT',
        url + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body
    );
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
};

const deleteRequest = async (url, id, token) => {
    const response = await Utils.fetchJSONData(
        'DELETE',
        url + id, 
        headers = {'accept': 'application/json',
        'Authorization': token}
    );
    const data = await Utils.streamToJSON(response.body);
    return [data, response.status];
};

module.exports = {
    createRequest,
    getOneRequest,
    getAllRequest,
    putRequest,
    deleteRequest,
}