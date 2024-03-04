const express = require("express");
const router = express.Router();
const newsController = require("../controllers/NewsController.js");

/**
 * @swagger
 * tags:
 *   name: News
 */

/**
 * @swagger
 * /v1/news/country:
 *   get: 
 *     summary: Get all news from a country.
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Country of the news.
 *         required: true
 *     responses:
 *       200:
 *         description: News from a country.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid asset data.
 *       500:
 *         description: Some server error.
 */

router.get('/news/country', newsController.getNewsfromCountry);

/**
 * @swagger
 * /v1/news/ids:
 *   get: 
 *     summary: Get news from id list.
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: ids
 *         description: List of news id.
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *     responses:
 *       200:
 *         description: News from a country.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid asset data.
 *       500:
 *         description: Some server error.
 */

router.get('/news/ids', newsController.getNewsfromIdList);

module.exports = router;