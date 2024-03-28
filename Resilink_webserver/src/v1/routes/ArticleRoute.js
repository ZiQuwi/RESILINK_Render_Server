const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController.js");

/**
 * @swagger
 * tags:
 *   name: Article
 *   description: Temporary (can be removed at any time)
 */

/**
 * @swagger
 * /v1/articles/all:
 *   get: 
 *     summary: Get all articles from (RESILINK).
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: all articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      title:
 *                          type: string
 *                      body:
 *                          type: string
 *                      link:
 *                          type: string
 *                      img:
 *                          type: string
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get('/articles/all', articleController.getAllArticles);

/**
 * @swagger
 * /v1/articles/LastFour:
 *   get: 
 *     summary: Get last 4 articles (from RESILINK).
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: Ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      title:
 *                          type: string
 *                      body:
 *                          type: string
 *                      link:
 *                          type: string
 *                      img:
 *                          type: string
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get('/articles/LastFour', articleController.getLastFourArticles);

module.exports = router;