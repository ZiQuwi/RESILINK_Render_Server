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
 *     summary: Create a new asset (from ODEP)
 *     tags: [Asset]
 *     requestBody:
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
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
 *                        attributeName:
 *                           type: string
 *                        value:
 *                           type: string
 *     responses:
 *       200:
 *         description: Asset successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *                   assetId: 
 *                       type: number
 *       401:
 *         description: Bad Request.
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

router.post('/assets/', assetController.createAsset);

/**
 * @swagger
 * /v1/assets/custom:
 *   post: 
 *     summary: Create a new asset with image in RESILINK & ODEP (from RESILINK & ODEP)
 *     tags: [Asset]
 *     requestBody:
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
 *                        attributeName:
 *                           type: string
 *                        value:
 *                           type: string
 *     responses:
 *       200:
 *         description: Asset successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *                   assetId: 
 *                       type: number
 *       401:
 *         description: Bad Request.
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

router.post('/assets/custom', assetController.createAssetCustom);

/**
 * @swagger
 * /v1/assets/assetTypesNew:
 *   post: 
 *     summary: Create a new asset and a new assetTypes (from ODEP & RESILINK)
 *     tags: [Asset]
 *     requestBody:
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
 *                       attributeName:
 *                         type: string
 *                       value:
 *                         type: string
 *     responses:
 *       200:
 *         description: Asset successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *                   assetId: 
 *                       type: number
 *       401:
 *         description: Bad Request.
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

router.post('/assets/assetTypesNew', assetController.createAssetWithAssetTypeCustom);

/**
 * @swagger
 * /v1/assets/owner:
 *   get:
 *     summary: Get assets by owner (from ODEP)
 *     tags: [Asset]
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   availableQuantity:
 *                     type: number
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
 *                   enum:
 *                     - sale/purchase
 *                     - rent
 *                   totalQuantity:
 *                     type: number
 *                   regulatedId:
 *                     type: string
 *                   regulator:
 *                     type: string
 *                   specificAttributes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                          attributeName:
 *                            type: string
 *                          value:
 *                            type: string
 *       400:
 *         description: Bad Request.
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

router.get('/assets/owner', assetController.getOwnerAsset);

/**
 * @swagger
 * /v1/assets/custom/owner:
 *   get:
 *     summary: Get assets with image by owner (from ODEP & RESILINK)
 *     tags: [Asset]
 *     parameters:
 *       - in: query
 *         name: idOwner
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   availableQuantity:
 *                     type: number
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
 *                   enum:
 *                     - sale/purchase
 *                     - rent
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
 *                          attributeName:
 *                            type: string
 *                          value:
 *                            type: string
 *       400:
 *         description: Bad Request.
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

router.get('/assets/custom/owner', assetController.getOwnerAssetCustom);

/**
 * @swagger
 * /v1/assets/all:
 *   get:
 *     summary: Get accessible assets in the exchange place (from ODEP)
 *     tags: [Asset]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   availableQuantity:
 *                     type: number
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
 *                   enum:
 *                     - sale/purchase
 *                     - rent
 *                   totalQuantity:
 *                     type: number
 *                   regulatedId:
 *                     type: string
 *                   regulator:
 *                     type: string
 *                   specificAttributes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                          attributeName:
 *                            type: string
 *                          value:
 *                            type: string
 *       400:
 *         description: Bad Request.
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

router.get('/assets/all/', assetController.getAllAsset);

/**
 * @swagger
 * /v1/assets/{id}:
 *   get:
 *     summary: Get an asset by id (from ODEP)
 *     tags: [Asset]
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
 *                   type: number
 *                 availableQuantity:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 assetType:
 *                   type: string
 *                 owner:
 *                   type: string
 *                 transactionType:
 *                   type: string
 *                 enum:
 *                   - sale/purchase
 *                   - rent
 *                 totalQuantity:
 *                   type: number
 *                 regulatedId:
 *                   type: string
 *                 regulator:
 *                   type: string
 *                 specificAttributes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        attributeName:
 *                          type: string
 *                        value:
 *                          type: string
 *       400:
 *         description: Bad Request.
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

router.get('/assets/:id/', assetController.getOneAsset);

/**
 * @swagger
 * /v1/assets/custom/{id}:
 *   get:
 *     summary: Get an asset with image by id (from ODEP & RESILINK)
 *     tags: [Asset]
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
 *                   type: number
 *                 availableQuantity:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 assetType:
 *                   type: string
 *                 owner:
 *                   type: string
 *                 transactionType:
 *                   type: string
 *                 enum:
 *                   - sale/purchase
 *                   - rent
 *                 totalQuantity:
 *                   type: number
 *                 regulatedId:
 *                   type: string
 *                 regulator:
 *                   type: string
 *                 image:
 *                   type: string
 *                 specificAttributes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        attributeName:
 *                          type: string
 *                        value:
 *                          type: string
 *       400:
 *         description: Bad Request.
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

router.get('/assets/custom/:id/', assetController.getOneAssetCustom);

/**
 * @swagger
 * /v1/asset/allAssetCustom:
 *   get:
 *     summary: get all assets with image (from RESILINK & ODEP)
 *     tags: [Asset]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   availableQuantity:
 *                     type: number
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
 *                   enum:
 *                     - sale/purchase
 *                     - rent
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
 *                          attributeName:
 *                            type: string
 *                          value:
 *                            type: string
 *       400:
 *         description: Bad Request.
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

router.get('/asset/allAssetCustom/', assetController.getAllAssetResilink);

/**
 * @swagger
 * /v1/assets/assetImg/{id}:
 *   get: 
 *     summary: get the image of an asset by id (from RESILINK)
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
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   img:
 *                      type: string
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

router.get('/assets/assetImg/:id/', assetController.getOneAssetIdimage);

/**
 * @swagger
 * /v1/assets/{id}:
 *   put: 
 *     summary: update an asset attributes (from ODEP)
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
 *         description: Asset successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       400:
 *         description: Bad Request.
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

router.put('/assets/:id/', assetController.putAsset);

/**
 * @swagger
 * /v1/assets/custom/{id}:
 *   put: 
 *     summary: update an asset attributes (from ODEP & RESILINK)
 *     tags: [Asset]
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
 *                  type: object
 *                  properties:
 *                     attributeName:
 *                         type: string
 *                     value:
 *                         type: string
 *     responses:
 *       200:
 *         description: Asset successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       400:
 *         description: Bad Request.
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

router.put('/assets/custom/:id/', assetController.putAssetCustom);

/**
 * @swagger
 * /v1/assets/{id}/:
 *   delete: 
 *     summary: delete an asset (from ODEP)
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
 *         description: Asset successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       400:
 *         description: Bad Request.
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

router.delete('/assets/:id/', assetController.deleteAsset);

/**
 * @swagger
 * /v1/assets/custom/{id}/:
 *   delete: 
 *     summary: delete an asset (from ODEP & RESILINK)
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
 *         description: Asset successfully deleted in ODEP & RESILINK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       400:
 *         description: Bad Request.
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

router.delete('/assets/custom/:id/', assetController.deleteAssetCustom);

/**
 * @swagger
 * /v1/assets/{id}/regulatedId:
 *   patch: 
 *     summary: Regulate an Asset (from ODEP)
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
 *         description: Asset successfully regulated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       400:
 *         description: Bad Request.
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
router.patch('/assets/:id/regulatedId', assetController.patchAsset);

module.exports = router;