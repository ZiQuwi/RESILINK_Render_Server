const RegulatorService = require("../services/RegulatorService.js");

const _pathRegulatorODEP = 'http://90.84.194.104:10010/regulators/';


const createRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.createRegulator(_pathRegulatorODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const getAllRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.getAllRegulator(_pathRegulatorODEP, req.header('Authorization')); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const getOneRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.getOneRegulator(_pathRegulatorODEP, req.body, req.params.id, req.header('Authorization')); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const patchOneRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.patchOneRegulator(_pathRegulatorODEP, req.body, req.params.id, req.header('Authorization')); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const deleteRegulator = async (req, res) => {
    try {
      const response = await RegulatorService.deleteRegulator(_pathRegulatorODEP, req.params.id, req.header('Authorization')); 
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

module.exports = {
    createRegulator,
    getAllRegulator,
    getOneRegulator,
    patchOneRegulator,
    deleteRegulator,
};
  