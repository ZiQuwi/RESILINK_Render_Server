
const express = require("express");
const prosumerController = require("../controllers/ProsummerController.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prosumer
 *   description: consumer and producteur of the application.
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Prosumer:
 *      type: object
 *      required: 
 *          - id
 *      properties:
 *        id: 
 *          type: string
 *          description: Id of the Prosumer from ODEP
 *        email:
 *          type: string
 *          description: Email of the Prosumer
 *        phoneNumber : 
 *          type: int
 *          description: Phone number of the Prosumer
 *      example:
 *          id: mKGJSI2
 *          email: usernamehotmail.com
 *          phoneNumber: 1023456789    
 */

/**
 * @swagger
 * /v1/ODEP/prosumers/all:
 *   get:
 *     summary: Get all prosumers (from ODEP)
 *     tags: [Prosumer]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Transaction successfully executed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
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
 *         description: Not Found
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
router.get('/ODEP/prosumers/all', prosumerController.getAllProsummer); 

/**
 * @swagger
 * /v1/prosumers/all:
 *   get:
 *     summary: Get all prosumers (from ODEP & RESILINK)
 *     tags: [Prosumer]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Transaction successfully executed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                      sharingAccount:
 *                          type: number
 *                      balance:
 *                          type: number
 *                      bookMarked:
 *                          type: array
 *                          items:
 *                              type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       500:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get('/prosumers/all', prosumerController.getAllProsummerCustom); 

/**
 * @swagger
 * /v1/ODEP/prosumers/{id}:
 *   get:
 *     summary: Get a prosumer by id (from ODEP)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 sharingAccount:
 *                   type: number
 *                 balance:
 *                   type: number
 *       400:
 *         description: Bad Request 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       404:
 *         description: Not Found 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
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

router.get('/ODEP/prosumers/:id/', prosumerController.getOneProsumer);

/**
 * @swagger
 * /v1/prosumers/{id}:
 *   get:
 *     summary: Get a prosumer by id (from ODEP & RESILINK)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 sharingAccount:
 *                   type: number
 *                 balance:
 *                   type: number
 *                 bookMarked:
 *                   type: array
 *                   items:
 *                      type: string
 *       400:
 *         description: Bad Request 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       404:
 *         description: Not Found 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
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

router.get('/prosumers/:id/', prosumerController.getOneProsummerCustom);

/**
 * @swagger
 * /v1/ODEP/prosumers/new:
 *   post: 
 *     summary: Create a new Prosumer (from ODEP)
 *     tags: [Prosumer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               sharingAccount:
 *                 type: number
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *                  properties:
 *                      message:
 *                          type: string
 *       400:
 *         description: Bad Request 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
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

router.post('/ODEP/prosumers/new/', prosumerController.createProsumer);

/**
 * @swagger
 * /v1/prosumers/new:
 *   post: 
 *     summary: Create a new user and his prosumer profil (from ODEP & RESILINK)
 *     tags: [Prosumer]
 *     requestBody:
 *       description: The user's informations.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roleOfUser:
 *                 type: string
 *               email: 
 *                 type: string
 *               password:
 *                 type: string 
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      user:
 *                          type: object
 *                          properties:
 *                              userName:
 *                                 type: string
 *                              firstName:
 *                                 type: string
 *                              lastName:
 *                                 type: string
 *                              roleOfUser:
 *                                 type: string
 *                              email: 
 *                                 type: string
 *                              password:
 *                                 type: string 
 *                              phoneNumber:
 *                                 type: string
 *                      prosumer:
 *                          type: object
 *                          properties:
 *                              message:
 *                                 type: string
 *       400:
 *         description: Bad Request 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       401:
 *         description: unhautorized 
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

router.post('/prosumers/new/', prosumerController.createProsumerCustom);

/**
 * @swagger
 * /v1/ODEP/prosumers/{id}/:
 *   delete: 
 *     summary: delete a prosumer (from ODEP)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: Prosumer successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       404:
 *         description: Prosumer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
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

router.delete('/ODEP/prosumers/:id', prosumerController.deleteOneProsummer);

/**
 * @swagger
 * /v1/ODEP/prosumers/{id}/balance:
 *   patch: 
 *     summary: credit a prosumer balance (from ODEP)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountUnits:
 *                 type: number
 *     responses:
 *       200:
 *         description: Prosumer balance successfully credited.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       404:
 *         description: Prosumer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 */

router.patch('/ODEP/prosumers/:id/balance', prosumerController.patchBalanceProsumer);

/**
 * @swagger
 * /v1/prosumers/{id}/job:
 *   patch: 
 *     summary: upte a prosumer job (from Resilink)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job:
 *                 type: String
 *     responses:
 *       200:
 *         description: Prosumer balance successfully credited.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
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

router.patch('/prosumers/:id/job', prosumerController.patchJobProsummer);

/**
 * @swagger
 * /v1/ODEP/prosumers/{id}/sharingAccount:
 *   patch: 
 *     summary: credit a prosumer sharing account (from ODEP)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the Prosumer id
 *     requestBody:
 *       description: The prosumer's sharing value.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sharingPoints:
 *                 type: number
 *     responses:
 *       200:
 *         description: Prosumer sharing account successfully credited.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *       404:
 *         description: Prosumer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 */

router.patch('/ODEP/prosumers/:id/sharingAccount', prosumerController.patchSharingProsumer);

/**
 * @swagger
 * /v1/prosumers/{id}/addBookmark:
 *   patch: 
 *     summary: add an id to the bookmark list of the prosumer (from RESILINK)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookmarkId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prosumer bookmarked list succesfully updated.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.patch('/prosumers/:id/addBookmark', prosumerController.patchBookmarkProsumer);

/**
 * @swagger
 * /v1/prosumers/delBookmark/id:
 *   delete: 
 *     summary: delete an id in bookmarked list (from RESILINK)
 *     tags: [Prosumer]
  *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The news id
 *       - in: query
 *         name: owner
 *         schema:
 *           type: string 
 *         required: true
 *         description: The owner username
 *     responses:
 *       200:
 *         description: id correctly removed from prosumer bookmarked list.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.delete('/prosumers/delBookmark/id/', prosumerController.deleteIdBookmarkedList);

/**
 * @swagger
 * /v1/prosumers/{id}/:
 *   delete: 
 *     summary: delete a prosumer in ODEP and RESILINK DB (from ODEP & RESILINK)
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the Prosumer id
 *     responses:
 *       200:
 *         description: Prosumer successfully deleted in ODEP & RESILINK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   code:
 *                       type: number
 *                   message:
 *                       type: string
 *       404:
 *         description: Prosumer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   code:
 *                       type: number
 *                   message:
 *                       type: string
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 */

router.delete('/prosumers/:id', prosumerController.deleteProsumerODEPRESILINK);

module.exports = router;
