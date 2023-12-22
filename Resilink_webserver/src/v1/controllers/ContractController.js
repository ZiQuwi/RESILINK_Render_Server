const ContractService = require("../services/ContractService.js");

const _pathContractODEP = 'http://90.84.194.104:10010/contracts/';

const createContract = async (req, res) => {
    try {
      const response = await ContractService.createContract(_pathContractODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const getAllContract = async (req, res) => {
    try {
      const response = await ContractService.getAllContract(_pathContractODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const getOwnerContractOngoing = async (req, res) => {
  try {
    const response = await ContractService.getOwnerContractOngoing(_pathContractODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Error retrieving all contracts');
  }
};

const getOneContract = async (req, res) => {
    try {
      const response = await ContractService.getOneContract(_pathContractODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const getContractFromOwner = async (req, res) => {
    try {
      const response = await ContractService.getContractFromOwner(_pathContractODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const patchContractImmaterial = async (req, res) => {
    try {
      const response = await ContractService.patchContractImmaterial(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const patchContractMaterialPurchase = async (req, res) => {
    try {
      const response = await ContractService.patchContractMaterialPurchase(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const patchContractMaterialRent = async (req, res) => {
    try {
      const response = await ContractService.patchContractMaterialRent(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

const patchContractCancel = async (req, res) => {
    try {
      const response = await ContractService.patchContractCancel(_pathContractODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
}

module.exports = {
    createContract,
    getOneContract,
    getAllContract,
    getOwnerContractOngoing,
    getContractFromOwner,
    patchContractImmaterial,
    patchContractMaterialPurchase,
    patchContractMaterialRent,
    patchContractCancel,
}