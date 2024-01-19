const OfferService = require("../services/OfferService.js");
const _pathofferODEP = 'http://90.84.194.104:10010/offers/'; 

const getAllOfferResilinkCustom = async (req, res) => { 
    try {
      const response = await OfferService.getAllOfferForResilinkCustom(_pathofferODEP, req.header('Authorization'));
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
    }
};

//Not added on the API for now (need to see how to handle the no price offer)
const createOfferNoPrice = async (req, res) => {
  try {
    const response = await OfferService.getAllOfferForResilinkCustom(_pathofferODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la création d"une offre pour négociation');
  }
};

const getOfferFiltered = async (req, res) => {
  try {
    const response = await OfferService.getAllOfferFilteredCustom(_pathofferODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
};

const getOfferOwner = async (req, res) => {
  try {
    const response = await OfferService.getAllOfferOwnerCustom(_pathofferODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
};

const createOffer = async (req, res) => {
  try {
    const response = await OfferService.createOffer(_pathofferODEP, req.body, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
}

const getAllOffer = async (req, res) => {
  try {
    const response = await OfferService.getAllOffer(_pathofferODEP, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
}

const getOneOffer = async (req, res) => {
  try {
    const response = await OfferService.getOneOffer(_pathofferODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
}

const putOffer = async (req, res) => {
  try {
    const response = await OfferService.putOffer(_pathofferODEP, req.body, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
}

const deleteOffer = async (req, res) => {
  try {
    const response = await OfferService.deleteOffer(_pathofferODEP, req.params.id, req.header('Authorization'));
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les utilisateurs');
  }
}

module.exports = {
    getAllOfferResilinkCustom,
    getOfferFiltered,
    getOfferOwner,
    createOfferNoPrice,
    createOffer,
    getAllOffer,
    getOneOffer,
    putOffer,
    deleteOffer,
}