const express = require("express");
const assetController = require("../controllers/AssetController.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Asset
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Asset:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         assetType:
 *           type: string
 *         owner:
 *           type: string
 *         transactionType:
 *           type: string
 *           enum:
 *             - sale/purchase
 *             - rent
 *           description: "La description de votre transactionType"
 *         totalQuantity:
 *           type: number
 *         regulatedId:
 *           type: string
 *         regulator:
 *           type: string
 *         specificAttributes:
 *           type: object
 *           properties:
 *              attributeName:
 *                  type: string
 *              value:
 *                  type: string
 */

/**
 * @swagger
 * /v1/assets:
 *   post: 
 *     summary: Create a new asset
 *     tags: [Asset]
 *     requestBody:
 *       description: The assetType's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                assetType:
 *                  type: string
 *                owner:
 *                  type: string
 *                transactionType:
 *                  type: string
 *                  enum:
 *                    - sale/purchase
 *                    - rent
 *                  description: "La description de votre transactionType"
 *                totalQuantity:
 *                  type: number
 *                regulatedId:
 *                  type: string
 *                regulator:
 *                  type: string
 *                image:
 *                  type: string
 *                specificAttributes:
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
    *                     attributeName:
    *                         type: string
    *                     value:
    *                         type: string
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

router.post('/assets/', assetController.createAsset);

/**
 * @swagger
 * /v1/assets/assetTypesNew:
 *   post: 
 *     summary: Create a new asset and a new assetTypes 
 *     tags: [Asset]
 *     requestBody:
 *       description: The assetType's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                assetType:
 *                  type: string
 *                owner:
 *                  type: string
 *                transactionType:
 *                  type: string
 *                  enum:
 *                    - sale/purchase
 *                    - rent
 *                  description: "La description de votre transactionType"
 *                totalQuantity:
 *                  type: number
 *                regulatedId:
 *                  type: string
 *                regulator:
 *                  type: string
 *                image:
 *                  type: string
 *                specificAttributes:
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
    *                     attributeName:
    *                         type: string
    *                     value:
    *                         type: string
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

router.post('/assets/assetTypesNew', assetController.createAssetCustom);

/**
 * @swagger
 * /v1/assets/owner:
 *   get:
 *     summary: Get assets by owner
 *     tags: [Asset]
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: datas of the assets.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/assets/owner', assetController.getOwnerAsset);

/**
 * @swagger
 * /v1/assets/all:
 *   get:
 *     summary: Get accessible assets in the exchange place
 *     tags: [Asset]
 *     responses:
 *       200:
 *         description: datas of the assets.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/assets/all/', assetController.getAllAsset);

/**
 * @swagger
 * /v1/assets/{id}:
 *   get:
 *     summary: Get an asset by id
 *     tags: [Asset]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: datas of the assets.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/assets/:id/', assetController.getOneAsset);

/**
 * @swagger
 * /v1/asset/allAssetCustom:
 *   get:
 *     summary: Retrieve all assets from Resilink
 *     tags: [Asset]
 *     responses:
 *       200:
 *         description: datas of the assets.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/asset/allAssetCustom/', assetController.getAllAssetResilink);

/**
 * @swagger
 * /v1/assets/assetImg/{id}:
 *   get: 
 *     summary: update an asset attributes
 *     tags: [Asset]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the asset id
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

router.get('/assets/assetImg/:id/', assetController.getOneAssetIdimage);

/**
 * @swagger
 * /v1/assets/{id}:
 *   put: 
 *     summary: update an asset attributes
 *     tags: [Asset]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the asset id
 *     requestBody:
 *       description: The assetType's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                assetType:
 *                  type: string
 *                owner:
 *                  type: string
 *                transactionType:
 *                  type: string
 *                  enum:
 *                    - sale/purchase
 *                    - rent
 *                  description: "La description de votre transactionType"
 *                totalQuantity:
 *                  type: number
 *                regulatedId:
 *                  type: string
 *                regulator:
 *                  type: string
 *                specificAttributes:
 *                  type: object
 *                  properties:
 *                     attributeName:
 *                         type: string
 *                     value:
 *                         type: string
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

router.put('/assets/:id/', assetController.putAsset);

/**
 * @swagger
 * /v1/assets/{id}/:
 *   delete: 
 *     summary: delete an asset
 *     tags: [Asset]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the asset id
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

router.delete('/assets/:id/', assetController.deleteAsset);

/**
 * @swagger
 * /v1/assets/{id}/regulatedId:
 *   patch: 
 *     summary: Regulate an Asset
 *     tags: [Asset]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the asset id
 *     requestBody:
 *       description: The regulator id.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 regulatedId:
 *                     type: string
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
router.patch('/assets/:id/regulatedId', assetController.patchAsset);

module.exports = router;