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
 * /v1/offers:
 *   post: 
 *     summary: create a new offer (from ODEP)
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
 *         description: Offer successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                      offerId:
 *                          type: number
 *                      message:
 *                          type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.post('/offers/', offerController.createOffer);

/**
 * @swagger
 * /v1/offers/all:
 *   get:
 *     summary: Get valid offers in RESILINK perspective (from ODEP & RESILINK)
 *     description: 
 *     tags: [Offer]
 *     responses:
 *       200:
 *         description: successful transaction
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 offerer:
 *                    type: string
 *                 assetId:
 *                   type: integer
 *                 beginTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 validityLimit: 
 *                   type: string
 *                   format: date-time
 *                 offeredQuantity:
 *                   type: number
 *                 price:
 *                   type: number
 *                 deposit:
 *                   type: number
 *                 cancellationFee:
 *                   type: number
 *                 rentInformation:
 *                   type: object
 *                   properties:
 *                     delayMargin:
 *                       type: number
 *                     lateRestitutionPenalty:
 *                       type: number
 *                     deteriorationPenalty:
 *                       type: number
 *                     nonRestitutionPenalty:
 *                       type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.get('/offers/all/', offerController.getAllOfferResilinkCustom);

/**
 * @swagger
 * /v1/offers/lastThree:
 *   get:
 *     summary: Get last 3 valid offers in RESILINK perspective (from ODEP & RESILINK)
 *     description: 
 *     tags: [Offer]
 *     responses:
 *       200:
 *         description: successful transaction
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 offerer:
 *                    type: string
 *                 assetId:
 *                   type: integer
 *                 beginTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 validityLimit: 
 *                   type: string
 *                   format: date-time
 *                 offeredQuantity:
 *                   type: number
 *                 price:
 *                   type: number
 *                 deposit:
 *                   type: number
 *                 cancellationFee:
 *                   type: number
 *                 rentInformation:
 *                   type: object
 *                   properties:
 *                     delayMargin:
 *                       type: number
 *                     lateRestitutionPenalty:
 *                       type: number
 *                     deteriorationPenalty:
 *                       type: number
 *                     nonRestitutionPenalty:
 *                       type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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
router.get('/offers/lastThree/', offerController.getLastThreeOfferForResilinkCustom);

/**
 * @swagger
 * /v1/offers/all/resilink/filtered:
 *   post: 
 *     summary: Returns the list of offers after custom sorting (from ODEP & RESILINK)
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
 *         description: successful transaction
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 offerId:
 *                   type: number
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 remainingQuantity:
 *                   type: number
 *                 offerer:
 *                   type: string
 *                 assetId:
 *                   type: integer
 *                 beginTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 validityLimit: 
 *                   type: string
 *                   format: date-time
 *                 offeredQuantity:
 *                   type: number
 *                 price:
 *                   type: number
 *                 deposit:
 *                   type: number
 *                 cancellationFee:
 *                   type: number
 *                 rentInformation:
 *                   type: object
 *                   properties:
 *                     delayMargin:
 *                       type: number
 *                     lateRestitutionPenalty:
 *                       type: number
 *                     deteriorationPenalty:
 *                       type: number
 *                     nonRestitutionPenalty:
 *                       type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.post('/offers/all/resilink/filtered/', offerController.getOfferFiltered);

/**
 * @swagger
 * /v1/offers/owner/{id}:
 *   get:
 *     summary: Get all offers from a prosumer (from ODEP & RESILINK)
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
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 offerId:
 *                   type: number
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 remainingQuantity:
 *                   type: number
 *                 offerer:
 *                   type: string
 *                 assetId:
 *                   type: integer
 *                 beginTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 validityLimit: 
 *                   type: string
 *                   format: date-time
 *                 offeredQuantity:
 *                   type: number
 *                 price:
 *                   type: number
 *                 deposit:
 *                   type: number
 *                 cancellationFee:
 *                   type: number
 *                 rentInformation:
 *                   type: object
 *                   properties:
 *                     delayMargin:
 *                       type: number
 *                     lateRestitutionPenalty:
 *                       type: number
 *                     deteriorationPenalty:
 *                       type: number
 *                     nonRestitutionPenalty:
 *                       type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.get('/offers/owner/:id/', offerController.getOfferOwner);

/**
 * @swagger
 * /v1/offers/owner/{id}/purchase:
 *   get:
 *     summary: Get all offers purchased from a prosumer (from ODEP & RESILINK)
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
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 offerId:
 *                   type: number
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 remainingQuantity:
 *                   type: number
 *                 offerer:
 *                   type: string
 *                 assetId:
 *                   type: integer
 *                 beginTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 validityLimit: 
 *                   type: string
 *                   format: date-time
 *                 offeredQuantity:
 *                   type: number
 *                 price:
 *                   type: number
 *                 deposit:
 *                   type: number
 *                 cancellationFee:
 *                   type: number
 *                 rentInformation:
 *                   type: object
 *                   properties:
 *                     delayMargin:
 *                       type: number
 *                     lateRestitutionPenalty:
 *                       type: number
 *                     deteriorationPenalty:
 *                       type: number
 *                     nonRestitutionPenalty:
 *                       type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.get('/offers/owner/:id/purchase/', offerController.getOwnerOfferPurchase);

/**
 * @swagger
 * /v1/ODEP/offers/all:
 *   get:
 *     summary: Get all offers (from ODEP)
 *     tags: [Offer]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 offerId:
 *                   type: number
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 remainingQuantity:
 *                   type: number
 *                 offerer:
 *                   type: string
 *                 assetId:
 *                   type: integer
 *                 beginTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 validityLimit: 
 *                   type: string
 *                   format: date-time
 *                 offeredQuantity:
 *                   type: number
 *                 price:
 *                   type: number
 *                 deposit:
 *                   type: number
 *                 cancellationFee:
 *                   type: number
 *                 rentInformation:
 *                   type: object
 *                   properties:
 *                     delayMargin:
 *                       type: number
 *                     lateRestitutionPenalty:
 *                       type: number
 *                     deteriorationPenalty:
 *                       type: number
 *                     nonRestitutionPenalty:
 *                       type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.get('/ODEP/offers/all/', offerController.getAllOffer);

/**
 * @swagger
 * /v1/offers/{id}:
 *   get:
 *     summary: Get an offers by id (from ODEP)
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
 *               type: object
 *               properties:
 *                 offerId:
 *                   type: number
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 remainingQuantity:
 *                   type: number
 *                 offerer:
 *                   type: string
 *                 assetId:
 *                   type: integer
 *                 beginTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot: 
 *                   type: string
 *                   format: date-time
 *                 validityLimit: 
 *                   type: string
 *                   format: date-time
 *                 offeredQuantity:
 *                   type: number
 *                 price:
 *                   type: number
 *                 deposit:
 *                   type: number
 *                 cancellationFee:
 *                   type: number
 *                 rentInformation:
 *                   type: object
 *                   properties:
 *                     delayMargin:
 *                       type: number
 *                     lateRestitutionPenalty:
 *                       type: number
 *                     deteriorationPenalty:
 *                       type: number
 *                     nonRestitutionPenalty:
 *                       type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.get('/offers/:id/', offerController.getOneOffer);

/**
 * @swagger
 * /v1/offers/{id}:
 *   put: 
 *     summary: update an offer attributes (from ODEP)
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
 *         description: Offer successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                      message:
 *                          type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.put('/offers/:id/', offerController.putOffer);

/**
 * @swagger
 * /v1/offers/{id}/updateOfferAsset:
 *   put: 
 *     summary: update offer's and asset's attributes
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
 *               asset:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   assetType:
 *                     type: string
 *                   owner:
 *                     type: string
 *                   transactionType:
 *                     type: string
 *                     enum:
 *                       - sale/purchase
 *                       - rent
 *                   totalQuantity:
 *                     type: number
 *                   regulatedId:
 *                     type: string
 *                   regulator:
 *                     type: string
 *                   image:
 *                     type: string
 *                   specificAttributes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         attributeName:
 *                           type: string
 *                         value:
 *                           type: string
 *               offer:
 *                 type: object
 *                 properties:
 *                   offerer:
 *                     type: string
 *                   assetId:
 *                     type: integer
 *                   beginTimeSlot: 
 *                     type: string
 *                     format: date-time
 *                   endTimeSlot: 
 *                     type: string
 *                     format: date-time
 *                   validityLimit: 
 *                     type: string
 *                     format: date-time
 *                   offeredQuantity:
 *                     type: number
 *                   price:
 *                     type: number
 *                   deposit:
 *                     type: number
 *                   cancellationFee:
 *                     type: number
 *                   rentInformation:
 *                     type: object
 *                     properties:
 *                       delayMargin:
 *                         type: number
 *                       lateRestitutionPenalty:
 *                         type: number
 *                       deteriorationPenalty:
 *                         type: number
 *                       nonRestitutionPenalty:
 *                         type: number
 *     responses:
 *       200:
 *         description: Offer successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                      message:
 *                          type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.put('/offers/:id/updateOfferAsset/', offerController.putOfferAsset);

/**
 * @swagger
 * /v1/offers/createOfferAsset:
 *   post: 
 *     summary: Create a new offer, its asset, and its asset type needed (from ODEP & RESILINK)
 *     tags: [Offer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asset:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   assetType:
 *                     type: string
 *                   owner:
 *                     type: string
 *                   transactionType:
 *                     type: string
 *                     enum:
 *                       - sale/purchase
 *                       - rent
 *                   totalQuantity:
 *                     type: number
 *                   regulatedId:
 *                     type: string
 *                   regulator:
 *                     type: string
 *                   image:
 *                     type: string
 *                   specificAttributes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         attributeName:
 *                           type: string
 *                         value:
 *                           type: string
 *               offer:
 *                 type: object
 *                 properties:
 *                   offerer:
 *                     type: string
 *                   assetId:
 *                     type: integer
 *                   beginTimeSlot: 
 *                     type: string
 *                     format: date-time
 *                   endTimeSlot: 
 *                     type: string
 *                     format: date-time
 *                   validityLimit: 
 *                     type: string
 *                     format: date-time
 *                   offeredQuantity:
 *                     type: number
 *                   price:
 *                     type: number
 *                   deposit:
 *                     type: number
 *                   cancellationFee:
 *                     type: number
 *                   rentInformation:
 *                     type: object
 *                     properties:
 *                       delayMargin:
 *                         type: number
 *                       lateRestitutionPenalty:
 *                         type: number
 *                       deteriorationPenalty:
 *                         type: number
 *                       nonRestitutionPenalty:
 *                         type: number
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 asset:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                 offer:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *       400:
 *         description: Invalid offer data.
 *       500:
 *         description: Some server error.
 */


router.post('/offers/createOfferAsset/', offerController.createOfferAsset);

/**
 * @swagger
 * /v1/offers/{id}/:
 *   delete: 
 *     summary: delete an offer (from ODEP)
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: Offer successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                      message:
 *                          type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
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

router.delete('/offers/:id/', offerController.deleteOffer);


module.exports = router;