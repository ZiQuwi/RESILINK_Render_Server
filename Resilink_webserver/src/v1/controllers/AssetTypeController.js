const assettypeService = require("../services/AssetTypeService.js");
const _pathassetTypesODEP = 'http://90.84.194.104:10010/assetTypes/'; 

const getAllAssetResilink = async (req, res) => { 
  try {
      const response = await assettypeService.getAllAssetTypeVue();
      res.send(response);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
};

const createAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.createAssetTypes(_pathassetTypesODEP, req.body, req.header('Authorization'));
      res.send(response);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
};

const getAllAssetTypes = async (req, res) => { 
  try {
      console.log(req.header('Authorization'));
      const response = await assettypeService.getAllAssetTypes(_pathassetTypesODEP, req.header('Authorization'));
      res.send(response);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
};

const getOneAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.getOneAssetTypes(_pathassetTypesODEP, req.params.id, req.header('Authorization'));
      res.send(response);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
};

const putAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.putAssetTypes(_pathassetTypesODEP, req.body, req.params.id, req.header('Authorization'));
      res.send(response);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
};

const deleteAssetTypes = async (req, res) => { 
  try {
      const response = await assettypeService.deleteAssetTypes(_pathassetTypesODEP, req.params.id, req.header('Authorization'));
      res.send(response);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
};

module.exports = {
    getAllAssetResilink,
    createAssetTypes,
    getAllAssetTypes,
    getOneAssetTypes,
    putAssetTypes,
    deleteAssetTypes,
}