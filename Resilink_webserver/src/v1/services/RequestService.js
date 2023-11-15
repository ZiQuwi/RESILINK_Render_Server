const Utils = require("./Utils.js");

const createRequest = async (url, body, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'POST',
        url, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body
    ));
    return response;
};

const getOneRequest = async (url, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'GET',
        url + id, 
        headers = {'accept': 'application/json',
        'Authorization': token}));
    return response;
};

const getAllRequest = async (url, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'GET',
        url + "all", 
        headers = {'accept': 'application/json',
        'Authorization': token}));
    return response;
};

const putRequest = async (url, body, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'PUT',
        url + id, 
        headers = {'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token},
        body
    ));
    return response;
};

const deleteRequest = async (url, id, token) => {
    const response = JSON.parse(await Utils.executeCurl(
        'DELETE',
        url + id, 
        headers = {'accept': 'application/json',
        'Authorization': token}
    ));
    return response;
};

module.exports = {
    createRequest,
    getOneRequest,
    getAllRequest,
    putRequest,
    deleteRequest,
}