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
 *       required:
 *         - name
 *         - description
 *         - assetType
 *         - owner
 *         - transactionType
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the asset
 *         name:
 *           type: string
 *           description: The name of the asset
 *         description:
 *           type: string
 *           description: The description of the asset
 *         assetType:
 *           type: string
 *           description: The type of the asset
 *         owner:
 *           type: string
 *           description: The owner id
 *         unit:
 *           type: string
 *           description: The unit of the asset (can be different from his assetType unit) 
 *         transactionType:
 *           type: string
 *           enum:
 *             - sale/purchase
 *             - rent
 *           description: The type of transaction (two possible values)
 *         totalQuantity:
 *           type: number
 *           description: Required in case of immaterial and measurable asset
 *         availableQuantity:
 *           type: number
 *           description: Quantity still available for the asset 
 *         regulatedId:
 *           type: string
 *           description: The regulated ID of the asset
 *         regulator:
 *           type: string
 *           description: Boolean if a regulator is associated to the offer ("false" / "true")
 *         images:
 *           type: array
 *           description: The images associated to the asset
 *           items:
 *             type: string
 *             description: "Can store data such as base64, http link, etc..."
 *         specificAttributes:
 *           type: array
 *           description: Additional specific attributes for the asset
 *           items:
 *             type: object
 *             properties:
 *               attributeName:
 *                 type: string
 *               value:
 *                 type: string
 *                 description: "-{v1;V2;...;Vn}: in case of listAsset"
 */


/**
 * @swagger
 * /v1/ODEP/assets:
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

router.post('/ODEP/assets/', assetController.createAsset);

/**
 * @swagger
 * /v1/assets:
 *   post: 
 *     summary: Create a new asset
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
 *                images:
 *                  type: string
 *                unit: 
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

router.post('/assets/', assetController.createAssetCustom);

/**
 * @swagger
 * /v1/assets/withAssetType:
 *   post: 
 *     summary: Create a new asset and a new assetTypes
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
 *                images:
 *                  type: string
 *                unit:
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

router.post('/assets/withAssetType', assetController.createAssetWithAssetTypeCustom);

/**
 * @swagger
 * /v1/ODEP/assets/owner:
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
 *                     enum:
 *                       - sale/purchase
 *                       - rent
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

router.get('/ODEP/assets/owner', assetController.getOwnerAsset);

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
 *                     enum:
 *                       - sale/purchase
 *                       - rent
 *                   totalQuantity:
 *                     type: number
 *                   regulatedId:
 *                     type: string
 *                   regulator:
 *                     type: string
 *                   images:
 *                     type: string
 *                   unit:
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

router.get('/assets/owner', assetController.getOwnerAssetCustom);

/**
 * @swagger
 * /v1/ODEP/assets/all:
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
 *                     enum:
 *                       - sale/purchase
 *                       - rent
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

router.get('/ODEP/assets/all/', assetController.getAllAsset);

/**
 * @swagger
 * /v1/assets/all:
 *   get:
 *     summary: get all assets
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
 *                     enum:
 *                       - sale/purchase
 *                       - rent
 *                   totalQuantity:
 *                     type: number
 *                   regulatedId:
 *                     type: string
 *                   regulator:
 *                     type: string
 *                   images:
 *                     type: string
 *                   unit:
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

router.get('/assets/all', assetController.getAllAssetCustom);

/**
 * @swagger
 * /v1/ODEP/assets/{id}:
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
 *                   enum:
 *                     - sale/purchase
 *                     - rent
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

router.get('/ODEP/assets/:id/', assetController.getOneAsset);

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
 *                   enum:
 *                     - sale/purchase
 *                     - rent
 *                 totalQuantity:
 *                   type: number
 *                 regulatedId:
 *                   type: string
 *                 regulator:
 *                   type: string
 *                 images:
 *                   type: string
 *                 unit:
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

router.get('/assets/:id/', assetController.getOneAssetCustom);

/**
 * @swagger
 * /v1/asset/allAssetMapped:
 *   get:
 *     summary: get all assets with image in map form
 *     tags: [Asset]
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     availableQuantity:
 *                       type: number
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     assetType:
 *                       type: string
 *                     owner:
 *                       type: string
 *                     transactionType:
 *                       type: string
 *                     enum:
 *                       - sale/purchase
 *                       - rent
 *                     totalQuantity:
 *                       type: number
 *                     regulatedId:
 *                       type: string
 *                     regulator:
 *                       type: string
 *                     images:
 *                       type: string
 *                     unit:
 *                       type: string
 *                     specificAttributes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                            attributeName:
 *                              type: string
 *                            value:
 *                              type: string
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

router.get('/asset/allAssetMapped/', assetController.getAllAssetMapped);

/**
 * @swagger
 * /v1/assets/assetImg/{id}:
 *   get: 
 *     summary: get the images of an asset by id
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
 *                      type: array
 *                      items:
 *                          type: string
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
 * /v1/ODEP/assets/{id}:
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

router.put('/ODEP/assets/:id/', assetController.putAsset);

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
 *                images:
 *                  type: string
 *                unit:
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

router.put('/assets/:id/', assetController.putAssetCustom);

/**
 * @swagger
 * /v1/ODEP/assets/{id}/:
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

router.delete('/ODEP/assets/:id/', assetController.deleteAsset);

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

router.delete('/assets/:id/', assetController.deleteAssetCustom);

/**
 * @swagger
 * /v1/ODEP/assets/{id}/regulatedId:
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
router.patch('/ODEP/assets/:id/regulatedId', assetController.patchAsset);

/**
 * @swagger
 * /v1/assets/img/:
 *   post: 
 *     summary: register image in DNS reislink-dp.org
 *     tags: [Asset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assetId:
 *                 type: string
 *               owner:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                  
 *     responses:
 *       200:
 *         description: images successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                      assetId:
 *                          type: string
 *                      owner:
 *                          type: string
 *                      images:
 *                          type: array
 *                          items:
 *                            type: string
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

router.post('/assets/img/', assetController.postImagesAsset);

/**
 * @swagger
 * /v1/assets/img/{id}/:
 *   delete: 
 *     summary: delete the images associated to an asset 
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
 *         description: Images successfully deleted in ODEP & RESILINK
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

router.delete('/assets/img/:id/', assetController.deleteImagesAsset);

module.exports = router;