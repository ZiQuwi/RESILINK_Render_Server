const ArticleService = require("../services/ArticleService.js");

const getAllArticles = async (req, res) => { 
    try {
      const response = await ArticleService.getAllArticle();
      res.status(response[1]).send(response[0]);
    } catch (error) {
      console.error('Erreur lors de l\'exécution de CURL :', error);
      res.status(500).send('Erreur lors de la récupération de tous les articles');
    }
};

const getLastFourArticles = async (req, res) => { 
  try {
    const response = await ArticleService.getLastFourArticles();
    res.status(response[1]).send(response[0]);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de CURL :', error);
    res.status(500).send('Erreur lors de la récupération de tous les articles');
  }
};

module.exports = {
    getAllArticles,
    getLastFourArticles,
};