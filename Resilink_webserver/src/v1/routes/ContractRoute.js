const express = require("express");
const router = express.Router();
const contractController = require("../controllers/ContractController.js");

/**
 * @swagger
 * tags:
 *   name: Contracts
 */

/**
 * @swagger
 * /v1/contracts:
 *   post: 
 *     summary: Create a new asset
 *     tags: [Contracts]
 *     requestBody:
 *       description: The assetType's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                offerId:
 *                  type: integer
 *                requestId:
 *                  type: integer
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


router.post('/contracts/', contractController.createContract);

/**
 * @swagger
 * /v1/contracts/all:
 *   get: 
 *     summary: Get all contracts by the admin
 *     tags: [Contracts]
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

router.get('/contracts/all', contractController.getAllContract);

/**
 * @swagger
 * /v1/contracts/owner/{id}:
 *   get: 
 *     summary: Get contracts  by owner
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
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

router.get('/contracts/owner/:id/', contractController.getContractFromOwner);

/**
 * @swagger
 * /v1/contracts/{id}:
 *   get: 
 *     summary: Get contracts  by owner
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
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

router.get('/contracts/:id/', contractController.getOneContract);

/**
 * @swagger
 * /v1/contracts/immaterialContract/{id}:
 *   patch: 
 *     summary: update the state of a contract in case of immaterial asset and adjust the payment accordingly
 *     tags: [Contracts]
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
 *                offerId:
 *                  type: string
 *                quantity:
 *                  type: number
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

router.patch('/contracts/immaterialContract/:id/', contractController.patchContractImmaterial);

/**
 * @swagger
 * /v1/contracts/purchaseMaterialContract/{id}:
 *   patch: 
 *     summary: update the state of a purchase contract in case of material asset and adjust the payment accordingly
 *     tags: [Contracts]
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
 *                state:
 *                  type: string
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

router.patch('/contracts/purchaseMaterialContract/:id/', contractController.patchContractMaterialPurchase);

/**
 * @swagger
 * /v1/contracts/rentMaterialContract/{id}:
 *   patch: 
 *     summary: update the state of a rent contract in case of material asset and adjust the payment accordingly
 *     tags: [Contracts]
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
 *                state:
 *                  type: string
 *                delayPeriod:
 *                  type: number
 *                deterioration:
 *                  type: boolean
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid asset data.
 *       500:
 *         description: Some server error.
 */

router.patch('/contracts/rentMaterialContract/:id/', contractController.patchContractMaterialRent);

/**
 * @swagger
 * /v1/contracts/cancelContract/{id}:
 *   patch: 
 *     summary: cancel a contract before or after its execution
 *     tags: [Contracts]
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
 *                quantity:
 *                  type: number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Invalid asset data.
 *       500:
 *         description: Some server error.
 */

router.patch('/contracts/rentMaterialContract/:id/', contractController.patchContractCancel);

module.exports = router;