const assetService = require("../services/AssetService.js");
const _pathAssetODEP = 'http://90.84.194.104:10010/assets/'; 

const getAllAssetResilink = async (req, res) => { 
  try {
    const response = await assetService.getAllAssetVue(req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Redirection error in the platform ');
  }
};

const createAsset = async (req, res) => { 
  try {
      const response = await assetService.createAsset(_pathAssetODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const createAssetCustom = async (req, res) => { 
  try {
      const response = await assetService.createAssetCustom(_pathAssetODEP, req.body, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const getOwnerAsset = async (req, res) => { 
  try {
    console.log(req.query.id);
      const response = await assetService.getOwnerAsset(_pathAssetODEP, req.query.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const getAllAsset = async (req, res) => { 
  try {
      const response = await assetService.getAllAsset(_pathAssetODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const getOneAsset = async (req, res) => { 
  try {
      const response = await assetService.getOneAsset(_pathAssetODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const getOneAssetIdimage = async (req, res) => { 
  try {
      const response = await assetService.getOneAssetImg(req.params.id);
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const putAsset = async (req, res) => { 
  try {
      const response = await assetService.putAsset(_pathAssetODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const deleteAsset = async (req, res) => { 
  try {
      const response = await assetService.deleteAsset(_pathAssetODEP, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

const patchAsset = async (req, res) => { 
  try {
      const response = await assetService.patchAsset(_pathAssetODEP, req.body, req.params.id, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Redirection error in the platform ');
    }
};

module.exports = {
  getAllAssetResilink,
  createAsset,
  createAssetCustom,
  getAllAsset,
  getOneAsset,
  getOneAssetIdimage,
  getOwnerAsset,
  putAsset,
  deleteAsset,
  patchAsset
}