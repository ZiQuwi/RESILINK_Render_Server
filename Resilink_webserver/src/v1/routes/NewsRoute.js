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
 *     summary: Get all the news from a country (from RESILINK).
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: News from a country.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      url: 
 *                          type: string
 *                      country: 
 *                          type: string
 *                      institute: 
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

router.get('/news/country', newsController.getNewsfromCountry);

/**
 * @swagger
 * /v1/news/ids:
 *   get: 
 *     summary: Get news from id list (from RESILINK)
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
 *                      url: 
 *                          type: string
 *                      country: 
 *                          type: string
 *                      institute: 
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

router.get('/news/ids', newsController.getNewsfromIdList);

/**
 * @swagger
 * /v1/news/owner/{id}:
 *   get:
 *     summary: Get all news from a prosumer (from RESILINK)
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the prosummer id
 *     responses:
 *       200:
 *         description: Ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  _id:
 *                      type: string
 *                  url:
 *                      type: string
 *                  country:
 *                      type: string
 *                  institute:
 *                      type: string
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

router.get('/news/owner/:id/', newsController.getNewsfromOwner);

/**
 * @swagger
 * /v1/news/countryOwner:
 *   get:
 *     summary: Get all news within a country without user's subcribed news (from RESILINK)
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string 
 *         required: false
 *         description: The country name
 *       - in: query
 *         name: owner
 *         schema:
 *           type: string 
 *         required: false
 *         description: The owner name
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
 *                      url: 
 *                          type: string
 *                      country: 
 *                          type: string
 *                      institute: 
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

router.get('/news/countryOwner', newsController.getNewsfromCountryWithoutUserNews);

module.exports = router;