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
 *     summary: post a new request (from ODEP)
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
 *       201:
 *         description: Request successfully created returning available offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  requestId:
 *                      type: number
 *                  message: 
 *                      type: string
 *                  availableOffersCount:
 *                      type: number
 *                  availableOffersIds:
 *                      type: array
 *                      items:
 *                          type: number
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    code:
 *                        type: number
 *                    message:
 *                        type: string
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    code:
 *                        type: number
 *                    message:
 *                        type: string
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.post('/requests/', RequestController.createRequest);

/**
 * @swagger
 * /v1/requests/all:
 *   get:
 *     summary: Get all requests (from ODEP)
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: Ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   requestor:
 *                     type: string
 *                   beginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   endTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   validityLimit:
 *                     type: string
 *                     format: date-time
 *                   transactionType:
 *                     type: string
 *                     enum:
 *                       - sale/purchase
 *                       - rent
 *                   offerIds:
 *                     type: array
 *                     items:
 *                       type: number
 *                   assetTypes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         assetTypeName:
 *                           type: string
 *                         maximumPrice:
 *                           type: number
 *                         maximumDeposit:
 *                           type: number
 *                         requestedQuantity:
 *                           type: number
 *                         requestedSpecificAttributes:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               attributeName:
 *                                 type: string
 *                               value:
 *                                 type: string
 *                               comparisonType:
 *                                 type: string
 *                                 enum:
 *                                   - contains
 *                                   - ==
 *                                   - <
 *                                   - <=
 *                                   - >
 *                                   - >=
 *                                   - between
 *                                   - in
 *                                   - conj
 *                                   - disj
 *                                   - in(circle)
 *                                   - in(rectangle)
 *                   requestId:
 *                     type: number
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


router.get('/requests/all', RequestController.getAllRequest);

/**
 * @swagger
 * /v1/requests/{id}:
 *   get:
 *     summary: Get a request by id (from ODEP)
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
 *         description: Ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestor:
 *                   type: string
 *                 beginTimeSlot:
 *                   type: string
 *                   format: date-time
 *                 endTimeSlot:
 *                   type: string
 *                   format: date-time
 *                 validityLimit:
 *                   type: string
 *                   format: date-time
 *                 transactionType:
 *                   type: string
 *                   enum:
 *                     - sale/purchase
 *                     - rent
 *                 offerIds:
 *                   type: array
 *                   items:
 *                     type: number
 *                 assetTypes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assetTypeName:
 *                         type: string
 *                       maximumPrice:
 *                         type: number
 *                       maximumDeposit:
 *                         type: number
 *                       requestedQuantity:
 *                         type: number
 *                       requestedSpecificAttributes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             attributeName:
 *                               type: string
 *                             value:
 *                               type: string
 *                             comparisonType:
 *                               type: string
 *                               enum:
 *                                 - contains
 *                                 - ==
 *                                 - <
 *                                 - <=
 *                                 - >
 *                                 - >=
 *                                 - between
 *                                 - in
 *                                 - conj
 *                                 - disj
 *                                 - in(circle)
 *                                 - in(rectangle)
 *                 requestId:
 *                   type: number
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

router.get('/requests/:id/', RequestController.getOneRequest);

/**
 * @swagger
 * /v1/requests/{id}:
 *   put:
 *     summary: update a request attributes (from ODEP)
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
 *         description: Request successfully updated returning available offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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

router.put('/requests/:id/', RequestController.putRequest);

/**
 * @swagger
 * /v1/requests/{id}/:
 *   delete: 
 *     summary: delete a request (from ODEP)
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
 *         description: Request successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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


router.delete('/requests/:id/', RequestController.deleteRequest);

module.exports = router;
