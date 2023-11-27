const RequestService = require("../services/RequestService.js");

const _pathRequestODEP = 'http://90.84.194.104:10010/requests/';

const createRequest = async (req, res) => {
    try {
      const response = await RequestService.createRequest(_pathRequestODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const getOneRequest = async (req, res) => {
    try {
      const response = await RequestService.getOneRequest(_pathRequestODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const getAllRequest = async (req, res) => {
    try {
      const response = await RequestService.getAllRequest(_pathRequestODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const putRequest = async (req, res) => {
    try {
      const response = await RequestService.putRequest(_pathRequestODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const deleteRequest = async (req, res) => {
    try {
      const response = await RequestService.deleteRequest(_pathRequestODEP, req.params.id,req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

module.exports = {
    createRequest,
    getOneRequest,
    getAllRequest,
    putRequest,
    deleteRequest,
}