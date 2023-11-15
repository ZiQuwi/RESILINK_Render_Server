const express = require("express");
const offerController = require("../controllers/OfferController.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Offer
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Offer:
 *      type: object
 *      properties:
 *        assetId:
 *          type: integer
 *        beginTimeSlot: 
 *          type: string
 *          format: date-time
 *        endTimeSlot: 
 *          type: string
 *          format: date-time
 *        validityLimit: 
 *          type: string
 *          format: date-time
 *        offeredQuantity:
 *          type: number
 *        price:
 *          type: number
 *        deposit:
 *          type: number
 *        cancellationFee:
 *          type: number
 *        rentInformation:
 *          type: object
 *          properties:
 *            delayMargin:
 *              type: number
 *            lateRestitutionPenalty:
 *              type: number
 *            deteriorationPenalty:
 *              type: number
 *            nonRestitutionPenalty:
 *              type: number
 */

/**
 * @swagger
 * /v1/offersNoPriceCustom:
 *   post: 
 *     summary: post a new offer without price
 *     tags: [Offer]
 *     requestBody:
 *       description: offer's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offerer:
 *                  type: string
 *               assetId:
 *                 type: integer
 *               beginTimeSlot: 
 *                 type: string
 *                 format: date-time
 *               endTimeSlot: 
 *                 type: string
 *                 format: date-time
 *               validityLimit: 
 *                 type: string
 *                 format: date-time
 *               offeredQuantity:
 *                 type: number
 *               price:
 *                 type: number
 *               deposit:
 *                 type: number
 *               cancellationFee:
 *                 type: number
 *               rentInformation:
 *                 type: object
 *                 properties:
 *                   delayMargin:
 *                     type: number
 *                   lateRestitutionPenalty:
 *                     type: number
 *                   deteriorationPenalty:
 *                     type: number
 *                   nonRestitutionPenalty:
 *                     type: number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid offer data.
 *       500:
 *         description: Some server error.
 */

//TODO Add this later  
router.post('/offersNoPriceCustom/', offerController.createOfferNoPrice);

/**
 * @swagger
 * /v1/offers:
 *   post: 
 *     summary: create a new offer
 *     tags: [Offer]
 *     requestBody:
 *       description: offer's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offerer:
 *                  type: string
 *               assetId:
 *                 type: integer
 *               beginTimeSlot: 
 *                 type: string
 *                 format: date-time
 *               endTimeSlot: 
 *                 type: string
 *                 format: date-time
 *               validityLimit: 
 *                 type: string
 *                 format: date-time
 *               offeredQuantity:
 *                 type: number
 *               price:
 *                 type: number
 *               deposit:
 *                 type: number
 *               cancellationFee:
 *                 type: number
 *               rentInformation:
 *                 type: object
 *                 properties:
 *                   delayMargin:
 *                     type: number
 *                   lateRestitutionPenalty:
 *                     type: number
 *                   deteriorationPenalty:
 *                     type: number
 *                   nonRestitutionPenalty:
 *                     type: number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid offer data.
 *       500:
 *         description: Some server error.
 */

router.post('/offers/', offerController.createOffer);

/**
 * @swagger
 * /v1/offers/AllOfferResilinkCustom:
 *   get:
 *     summary: Retrieve all the offer from Resilink database
 *     tags: [Offer]
 *     responses:
 *       200:
 *         description: datas of the offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/offers/AllOfferResilinkCustom/', offerController.getAllOfferResilinkCustom);

/**
 * @swagger
 * /v1/offers/AllOfferFilteredCustom:
 *   post: 
 *     summary: Returns the list of offers after custom sorting 
 *     tags: [Offer]
 *     requestBody:
 *       description: prerequisites for the offer.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assetType:
 *                 type: string
 *               asset:
 *                 type: string
 *               price:
 *                 type: number
 *               priceSymbol: 
 *                 type: string
 *               date:
 *                 type: string
 *               dateSymbol:
 *                 type: string
 *               phrase:
 *                 type: string
 *               Properties:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     attributeName:
 *                       type: string
 *                     value:
 *                       type: string
 *     responses:
 *       200:
 *         description: filtered offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid filter data.
 *       500:
 *         description: Some server error.
 */

router.post('/offers/AllOfferFilteredCustom/', offerController.getOfferFiltered);

/**
 * @swagger
 * /v1/offers/AllOfferOwnerCustom/{id}:
 *   get:
 *     summary: Get all offers from a prosumer
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the prosummer id
 *     responses:
 *       200:
 *         description: prosumer's offer.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/offers/AllOfferOwnerCustom/:id/', offerController.getOfferOwner);

/**
 * @swagger
 * /v1/offers/all:
 *   get:
 *     summary: Get all offers 
 *     tags: [Offer]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/offers/all/', offerController.getAllOffer);

/**
 * @swagger
 * /v1/offers/{id}:
 *   get:
 *     summary: Get an offers by id
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the offer id
 *     responses:
 *       200:
 *         description: offer.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/offers/:id/', offerController.getOneOffer);

/**
 * @swagger
 * /v1/offers/{id}:
 *   put: 
 *     summary: update an offer attributes
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the offer id
 *     requestBody:
 *       description: The assetType's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offerer: 
 *                 type: string
 *               assetId:
 *                 type: integer
 *               beginTimeSlot: 
 *                 type: string
 *                 format: date-time
 *               endTimeSlot: 
 *                 type: string
 *                 format: date-time
 *               validityLimit: 
 *                 type: string
 *                 format: date-time
 *               offeredQuantity:
 *                 type: number
 *               price:
 *                 type: number
 *               deposit:
 *                 type: number
 *               cancellationFee:
 *                 type: number
 *               rentInformation:
 *                 type: object
 *                 properties:
 *                   delayMargin:
 *                     type: number
 *                   lateRestitutionPenalty:
 *                     type: number
 *                   deteriorationPenalty:
 *                     type: number
 *                   nonRestitutionPenalty:
 *                     type: number
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid asset data.
 *       500:
 *         description: Some server error.
 */

router.put('/offers/:id/', offerController.putOffer);

/**
 * @swagger
 * /v1/offers/{id}/:
 *   delete: 
 *     summary: delete an offer
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the offer id
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid prosumer data.
 *       500:
 *         description: Some server error.
 */

router.delete('/offers/:id/', offerController.deleteOffer);


module.exports = router;