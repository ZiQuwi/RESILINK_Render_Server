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
 *     summary: Create a new Regulator (from ODEP)
 *     tags: [Regulator]
 *     requestBody:
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
 *       201:
 *         description: Regulator successfully created
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
 *         description: Not found.
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
router.post('/regulators', regulatorController.createRegulator);

/**
 * @swagger
 * /v1/regulators/all:
 *   get:
 *     summary: get all regulators (from ODEP)
 *     tags: [Regulator]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                     id: 
 *                       type: string
 *                     account:
 *                       type: string
 *                     assetTypes : 
 *                       type: array
 *                       items:
 *                         type: string
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
 *         description: Not found.
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
router.get('/regulators/all', regulatorController.getAllRegulator);

/**
 * @swagger
 * /v1/regulators/{id}:
 *   get:
 *     summary: Get a regulator by id (from ODEP)
 *     tags: [Regulator]
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
 *                  id: 
 *                    type: string
 *                  account:
 *                    type: string
 *                  assetTypes : 
 *                    type: array
 *                    items:
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
 *         description: Not found.
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
router.get('/regulators/:id', regulatorController.getOneRegulator);

/**
 * @swagger
 * /v1/regulators/{id}:
 *   patch: 
 *     summary: update regulator liste of asset types he is accountable on (from ODEP)
 *     tags: [Regulator]
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
 *                assetTypes:
 *                  type: array
 *                  items:
 *                      type: string
 *     responses:
 *       200:
 *         description: Regulator successfully updated
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
 *         description: Not found.
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
router.patch('/regulators/:id', regulatorController.patchOneRegulator);

/**
 * @swagger
 * /v1/regulators/{id}/:
 *   delete: 
 *     summary: delete a regulator (from ODEP)
 *     tags: [Regulator]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: Regulator successfully deleted
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
 *         description: Not found.
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
router.delete('/regulators/:id', regulatorController.deleteRegulator);

module.exports = router;

