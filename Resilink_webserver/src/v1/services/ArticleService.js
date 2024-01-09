const Utils = require("./Utils.js");
const ArticleDB = require("../database/ArticleDB.js");

const getAllArticle = async () => {
    try {
        console.log("dans getAllArticleService");
        const dataFinal = await ArticleDB.getAllArticle();
        return [dataFinal, 200];
    } catch (e) {
        throw e;
    }
};

const getLastFourArticles = async () => {
    try {
        console.log("dans getAllArticleService");
        const dataFinal = await ArticleDB.getLastFourArticles();
        return [dataFinal, 200];
    } catch (e) {
        throw e;
    }
};

module.exports = {
    getAllArticle,
    getLastFourArticles,
};