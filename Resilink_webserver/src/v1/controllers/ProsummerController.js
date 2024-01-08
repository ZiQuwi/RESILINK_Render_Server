const prosummerService = require("../services/ProsummerService.js");
const _pathProsumerODEP = 'http://90.84.194.104:10010/prosumers/';

const createProsumer = async (req, res) => { 
  try {
    const response = await prosummerService.createProsummer(_pathProsumerODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
};

const getAllProsummer = async (req, res) => { 
  try {
    const response = await prosummerService.getAllProsummer(_pathProsumerODEP, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
};

const createProsumerCustom = async (req, res) => {
  try {
    const response = await prosummerService.createProsumerCustom(_pathProsumerODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la création du prosumer');
  }
}
  
const getAllProsummerCustom = async (req, res) => { 
  try {
    const response = await prosummerService.getAllProsummerCustom(_pathProsumerODEP, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
};
  
const getOneProsumer = async (req, res) => {
  try {
    const response = await prosummerService.getOneProsummer(_pathProsumerODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération du prosummer');
  }
};
  
const deleteOneProsummer = async (req, res) => {
  try {
    const response = await prosummerService.deleteOneProsummer(_pathProsumerODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération du prosummer');
  }
};

const patchBalanceProsumer = async (req, res) => {
  try {
    const response = await prosummerService.patchBalanceProsummer(_pathProsumerODEP, req.body, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération du prosummer');
  }
};

const patchSharingProsumer = async (req, res) => {
  try {
    const response = await prosummerService.patchSharingProsummer(_pathProsumerODEP, req.body, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération du prosummer');
  }
};

module.exports = {
    getAllProsummer,
    getOneProsumer,
    createProsumer,
    deleteOneProsummer,
    patchBalanceProsumer,
    patchSharingProsumer,
    createProsumerCustom,
    getAllProsummerCustom,
};
  
