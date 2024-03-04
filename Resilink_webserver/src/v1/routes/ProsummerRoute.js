
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
 * /v1/prosumers/all:
 *   get:
 *     summary: Retrieve prosumers from the ODEP database
 *     tags: [Prosumer]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Correctly retrieved all the Prosumer
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       500:
 *         description: Some server error.
 */
router.get('/prosumers/all', prosumerController.getAllProsummer); 

/**
 * @swagger
 * /v1/prosumers/allCustom:
 *   get:
 *     summary: Retrieve prosumers from the Resilink database
 *     tags: [Prosumer]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Correctly retrieved all the Prosumer
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       500:
 *         description: Some server error.
 */
router.get('/prosumers/allCustom', prosumerController.getAllProsummerCustom); 

/**
 * @swagger
 * /v1/prosumers/{id}:
 *   get:
 *     summary: Retrieve data from one the Prosumer
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
 *         description: data of the Prosumer.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid Prosumer id.
 *       500:
 *         description: Some server error.
 */

router.get('/prosumers/:id/', prosumerController.getOneProsumer);

/**
 * @swagger
 * /v1/prosumers/new:
 *   post: 
 *     summary: Create a new Prosumer
 *     tags: [Prosumer]
 *     requestBody:
 *       description: The prosumer's informations.
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
 *               type: json
 *       400:
 *         description: Invalid prosumer data.
 *       500:
 *         description: Some server error.
 */

router.post('/prosumers/new/', prosumerController.createProsumer);

/**
 * @swagger
 * /v1/prosumers/newCustom:
 *   post: 
 *     summary: Create a new user and put create his prosumer profil
 *     tags: [Prosumer]
 *     requestBody:
 *       description: The prosumer's informations.
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
 *               phone:
 *                 type: string
 *               password:
 *                 type: string 
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

router.post('/prosumers/newCustom/', prosumerController.createProsumerCustom);

/**
 * @swagger
 * /v1/prosumers/{id}/:
 *   delete: 
 *     summary: delete prosumer profil
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

router.delete('/prosumers/:id', prosumerController.deleteOneProsummer);

/**
 * @swagger
 * /v1/prosumers/{id}/balance:
 *   patch: 
 *     summary: Edit the balance of the prosumer
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the Prosumer id
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

router.patch('/prosumers/:id/balance', prosumerController.patchBalanceProsumer);

/**
 * @swagger
 * /v1/prosumers/{id}/sharingAccount:
 *   patch: 
 *     summary: Edit the sharing value of the prosumer
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

router.patch('/prosumers/:id/sharingAccount', prosumerController.patchSharingProsumer);

/**
 * @swagger
 * /v1/prosumers/{id}/bookmarkAccount:
 *   patch: 
 *     summary: add an id to the bookmark list of the prosumer
 *     tags: [Prosumer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the Prosumer id
 *     requestBody:
 *       description: The bookmark's id.
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

router.patch('/prosumers/:id/bookmarkAccount', prosumerController.patchBookmarkProsumer);

module.exports = router;
