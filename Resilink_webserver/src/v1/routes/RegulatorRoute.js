const express = require("express");
const regulatorController = require("../controllers/RegulatorController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Regulator
 *   description: User's State
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Regulator:
 *      type: object
 *      required: 
 *          - id
 *      properties:
 *        id: 
 *          type: string
 *        account:
 *          type: string
 *        assetTypes : 
 *          type: array
 *          items:
 *            type: string
 *      example:
 *          id: mKGJSI2
 *          email: usernamehotmail.com
 *          phoneNumber: 1023456789    
 */


/**
 * @swagger
 * /v1/regulators:
 *   post: 
 *     summary: Create a new Regulator and is user's state
 *     tags: [Regulator]
 *     requestBody:
 *       description: The prosumer's informations.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: 
 *                  type: string
 *               account:
 *                  type: string
 *               assetTypes : 
 *                  type: array
 *                  items:
 *                    type: string
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid regulator data.
 *       500:
 *         description: Some server error.
 */
router.post('/regulators', regulatorController.createRegulator);

/**
 * @swagger
 * /v1/regulators/all:
 *   get:
 *     summary: Retrieve data from all the regulators
 *     tags: [Regulator]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Correctly retrieved all the regulators
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       500:
 *         description: Some server error.
 */
router.get('/regulators/all', regulatorController.getAllRegulator);

/**
 * @swagger
 * /v1/regulators/{id}:
 *   get:
 *     summary: Retrieve data from one regulator
 *     tags: [Regulator]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the Prosumer id
 *     responses:
 *       200:
 *         description: Correctly retrieved all the regulators
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       500:
 *         description: Some server error.
 */
router.get('/regulators/:id', regulatorController.getOneRegulator);

/**
 * @swagger
 * /v1/regulators/{id}:
 *   patch: 
 *     summary: Regulator assetType
 *     tags: [Regulator]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the Prosumer id
 *     requestBody:
 *       description: The prosumer's informations.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                assetTypes:
 *                  type: array
 *                  items:
 *                      type: string
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid regulator's id or body.
 *       500:
 *         description: Some server error.
 */
router.patch('/regulators/:id', regulatorController.patchOneRegulator);

/**
 * @swagger
 * /v1/regulators/{id}/:
 *   delete: 
 *     summary: delete regulator profil
 *     tags: [Regulator]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the Regulator id
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
router.delete('/regulators/:id', regulatorController.deleteRegulator);

module.exports = router;

