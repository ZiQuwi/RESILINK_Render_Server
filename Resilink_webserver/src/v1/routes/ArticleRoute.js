const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController.js");

/**
 * @swagger
 * tags:
 *   name: Article
 */

/**
 * @swagger
 * /v1/articles/all:
 *   get: 
 *     summary: Get all articles.
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: all articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid asset data.
 *       500:
 *         description: Some server error.
 */

router.get('/articles/all', articleController.getAllArticles);

/**
 * @swagger
 * /v1/articles/LastFour:
 *   get: 
 *     summary: Get last 4 articles.
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: last 4 articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid asset data.
 *       500:
 *         description: Some server error.
 */

router.get('/articles/LastFour', articleController.getLastFourArticles);
module.exports = router;