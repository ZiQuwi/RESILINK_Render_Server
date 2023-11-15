const express = require("express");
const router = express.Router();
const RequestController = require("../controllers/RequestController.js");

/**
 * @swagger
 * tags:
 *   name: Requests
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Requests:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        requestor:
 *          type: string
 *        beginTimeSlot:
 *          type: string
 *          format: date-time
 *        endTimeSlot:
 *          type: string
 *          format: date-time
 *        validityLimit:
 *          type: string
 *          format: date-time
 *        transactionType:
 *          type: string
 *          enum:
 *            - sale/purchase
 *            - rent
 *        offerIds:
 *          type: array
 *          items:
 *            type: number
 *        assetTypes:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              assetTypeName:
 *                type: string
 *              maximumPrice:
 *                type: number
 *              maximumDeposit:
 *                type: number
 *              requestedQuantity:
 *                type: number
 *              requestedSpecificAttributes:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    attributeName:
 *                      type: string
 *                    value:
 *                      type: string
 *                    comparisonType:
 *                      type: string
 *                      enum:
 *                        - contains
 *                        - ==
 *                        - <
 *                        - <=
 *                        - >
 *                        - >=
 *                        - between
 *                        - in
 *                        - conj
 *                        - disj
 *                        - in(circle)
 *                        - in(rectangle)
 */

/**
 * @swagger
 * /v1/requests:
 *   post:
 *     summary: Get all requests
 *     tags: [Requests]
 *     requestBody:
 *       description: offer's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestor:
 *                 type: string
 *               beginTimeSlot:
 *                 type: string
 *                 format: date-time
 *               endTimeSlot:
 *                 type: string
 *                 format: date-time
 *               validityLimit:
 *                 type: string
 *                 format: date-time
 *               transactionType:
 *                 type: string
 *                 enum:
 *                   - sale/purchase
 *                   - rent
 *               offerIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               assetTypes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     assetTypeName:
 *                       type: string
 *                     maximumPrice:
 *                       type: number
 *                     maximumDeposit:
 *                       type: number
 *                     requestedQuantity:
 *                       type: number
 *                     requestedSpecificAttributes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           attributeName:
 *                             type: string
 *                           value:
 *                             type: string
 *                           comparisonType:
 *                             type: string
 *                             enum:
 *                               - contains
 *                               - ==
 *                               - <
 *                               - <=
 *                               - >
 *                               - >=
 *                               - between
 *                               - in
 *                               - conj
 *                               - disj
 *                               - in(circle)
 *                               - in(rectangle)
 *     responses:
 *       200:
 *         description: datas of the requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.post('/requests/', RequestController.createRequest);

/**
 * @swagger
 * /v1/requests/all:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: datas of the requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/requests/all/', RequestController.getAllRequest);

/**
 * @swagger
 * /v1/requests/{id}:
 *   get:
 *     summary: Get a request by id
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the request id
 *     responses:
 *       200:
 *         description: datas of the requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/requests/:id/', RequestController.getOneRequest);

/**
 * @swagger
 * /v1/requests/{id}:
 *   put:
 *     summary: update a request attributes
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the request id
 *     requestBody:
 *       description: offer's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestor:
 *                 type: string
 *               beginTimeSlot:
 *                 type: string
 *                 format: date-time
 *               endTimeSlot:
 *                 type: string
 *                 format: date-time
 *               validityLimit:
 *                 type: string
 *                 format: date-time
 *               transactionType:
 *                 type: string
 *                 enum:
 *                   - sale/purchase
 *                   - rent
 *               offerIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               assetTypes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     assetTypeName:
 *                       type: string
 *                     maximumPrice:
 *                       type: number
 *                     maximumDeposit:
 *                       type: number
 *                     requestedQuantity:
 *                       type: number
 *                     requestedSpecificAttributes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           attributeName:
 *                             type: string
 *                           value:
 *                             type: string
 *                           comparisonType:
 *                             type: string
 *                             enum:
 *                               - contains
 *                               - ==
 *                               - <
 *                               - <=
 *                               - >
 *                               - >=
 *                               - between
 *                               - in
 *                               - conj
 *                               - disj
 *                               - in(circle)
 *                               - in(rectangle)
 *     responses:
 *       200:
 *         description: datas of the requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.put('/requests/:id/', RequestController.putRequest);

/**
 * @swagger
 * /v1/requests/{id}/:
 *   delete: 
 *     summary: delete a request
 *     tags: [Requests]
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


router.delete('/requests/:id/', RequestController.deleteRequest);

module.exports = router;
