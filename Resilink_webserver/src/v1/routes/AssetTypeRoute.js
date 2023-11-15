const express = require("express");
const assetTypeController = require("../controllers/AssetTypeController.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AssetType
 *   description: AssetType from Resilink
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AssetType:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         nature:
 *           type: string
 *           enum:
 *             - material
 *             - immaterial
 *             - immaterialNotQuantified
 *           description: "La description de votre nature"
 *         unit:
 *           type: string
 *         regulated:
 *           type: boolean
 *         regulator:
 *           type: string
 *         sharingIncentive:
 *           type: boolean
 */

/**
 * @swagger
 * /v1/assetTypes:
 *   post: 
 *     summary: Create a new assetType
 *     tags: [AssetType]
 *     requestBody:
 *       description: The assetType's data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                  type: string
 *               description:
 *                  type: string
 *               nature : 
 *                  type: string
 *                  enum:
 *                   - material
 *                   - immaterial
 *               unit:
 *                  type: string
 *               regulated:
 *                  type: boolean
 *               regulator:
 *                  type: string
 *               sharingIncentive:
 *                  type: boolean
 *               specificAttributesModel: 
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          type:
 *                              type: string
 *                          mandatory:
 *                              type: string
 *                              enum:
 *                                  - true
 *                                  - false
 *                          hasValueList:
 *                              type: string
 *                              enum:
 *                                  - true
 *                                  - false
 *                          valueList:
 *                              type: string
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

router.post('/assetTypes/', assetTypeController.createAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/CustomAllAssetType:
 *   get:
 *     summary: Retrieve all asset types with RESILINK label
 *     tags: [AssetType]
 *     responses:
 *       200:
 *         description: datas of the asset type.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/assetTypes/CustomAllAssetType/', assetTypeController.getAllAssetResilink);

/**
 * @swagger
 * /v1/assetTypes/all:
 *   get:
 *     summary: Retrieve all asset types from Resilink
 *     tags: [AssetType]
 *     responses:
 *       200:
 *         description: datas of the asset type.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/assetTypes/all/', assetTypeController.getAllAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/{id}:
 *   get:
 *     summary: Retrieve an assetTypes from Resilink
 *     tags: [AssetType]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the assetType id
 *     responses:
 *       200:
 *         description: datas of the asset type.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.get('/assetTypes/:id/', assetTypeController.getOneAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/{id}:
 *   put:
 *     summary: update assetType attributes
 *     tags: [AssetType]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the assetType id
 *     requestBody:
 *       description: The prosumer's informations.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                  type: string
 *               nature : 
 *                  type: string
 *                  enum:
 *                   - material
 *                   - immaterial
 *               unit:
 *                  type: string
 *               regulated:
 *                  type: boolean
 *               regulator:
 *                  type: string
 *               sharingIncentive:
 *                  type: boolean
 *               specificAttributesModel: 
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          type:
 *                              type: string
 *                          mandatory:
 *                              type: string
 *                              enum:
 *                                  - true
 *                                  - false
 *                          hasValueList:
 *                              type: string
 *                              enum:
 *                                  - true
 *                                  - false
 *                          valueList:
 *                              type: string
 *     responses:
 *       200:
 *         description: datas of the asset type.
 *         content:
 *           application/json:
 *             schema:
 *               type: json
 *       400:
 *         description: Some server error.
 *       500:
 *         description: Some server error.
 */

router.put('/assetTypes/:id/', assetTypeController.putAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/{id}/:
 *   delete: 
 *     summary: delete an assetType 
 *     tags: [AssetType]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: the assetType id
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

router.delete('/assetTypes/:id/', assetTypeController.deleteAssetTypes);


module.exports = router;