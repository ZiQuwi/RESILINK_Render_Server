const express = require("express");
const assetTypeController = require("../controllers/AssetTypeController.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AssetType
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
 *           description: "The description of your nature"
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
 * /v1/ODEP/assetTypes:
 *   post: 
 *     summary: Create a new assetType (from ODEP)
 *     tags: [AssetType]
 *     requestBody:
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
 *         description: AssetType successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.post('/ODEP/assetTypes/', assetTypeController.createAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/all:
 *   get:
 *     summary: Get all asset types from RESILINK (from ODEP)
 *     tags: [AssetType]
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
 *                      name:
 *                        type: string
 *                      description:
 *                        type: string
 *                      nature:
 *                        type: string
 *                        enum:
 *                          - material
 *                          - immaterial
 *                      unit:
 *                        type: string
 *                      regulated:
 *                        type: boolean
 *                      regulator:
 *                        type: string
 *                      sharingIncentive:
 *                        type: boolean
 *                      specificAttributesModel:
 *                        type: array
 *                        items:
 *                            type: object
 *                            properties:
 *                                name:
 *                                    type: string
 *                                type:
 *                                    type: string
 *                                mandatory:
 *                                    type: string
 *                                    enum:
 *                                      - true
 *                                      - false
 *                                hasValueList:
 *                                    type: string
 *                                    enum:
 *                                      - true
 *                                      - false
 *                                valueList:
 *                                    type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.get('/assetTypes/all', assetTypeController.getAllAssetTypes);

/**
 * @swagger
 * /v1/ODEP/assetTypes/all/:
 *   get:
 *     summary: Get all asset types (from ODEP)
 *     tags: [AssetType]
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
 *                      name:
 *                        type: string
 *                      description:
 *                        type: string
 *                      nature:
 *                        type: string
 *                        enum:
 *                          - material
 *                          - immaterial
 *                      unit:
 *                        type: string
 *                      regulated:
 *                        type: boolean
 *                      regulator:
 *                        type: string
 *                      sharingIncentive:
 *                        type: boolean
 *                      specificAttributesModel:
 *                        type: array
 *                        items:
 *                            type: object
 *                            properties:
 *                                name:
 *                                    type: string
 *                                type:
 *                                    type: string
 *                                mandatory:
 *                                    type: string
 *                                    enum:
 *                                      - true
 *                                      - false
 *                                hasValueList:
 *                                    type: string
 *                                    enum:
 *                                      - true
 *                                      - false
 *                                valueList:
 *                                    type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.get('/ODEP/assetTypes/all/', assetTypeController.getAllAssetTypesDev);

/**
 * @swagger
 * /v1/assetTypes/{id}:
 *   get:
 *     summary: Get an asset type by id (from ODEP)
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
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name: 
 *                    type: string
 *                 description:
 *                    type: string
 *                 nature : 
 *                    type: string
 *                    enum:
 *                     - material
 *                     - immaterial
 *                 unit:
 *                    type: string
 *                 regulated:
 *                    type: boolean
 *                 regulator:
 *                    type: string
 *                 sharingIncentive:
 *                    type: boolean
 *                 specificAttributesModel: 
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                            type:
 *                                type: string
 *                            mandatory:
 *                                type: string
 *                                enum:
 *                                    - true
 *                                    - false
 *                            hasValueList:
 *                                type: string
 *                                enum:
 *                                    - true
 *                                    - false
 *                            valueList:
 *                                type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.get('/assetTypes/:id/', assetTypeController.getOneAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/{id}:
 *   put:
 *     summary: update asset type attributes (from ODEP)
 *     tags: [AssetType]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
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
 *         description: AssetType successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.put('/assetTypes/:id/', assetTypeController.putAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/{id}/:
 *   delete: 
 *     summary: delete an asset type (from ODEP)
 *     tags: [AssetType]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: AssetType successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.delete('/assetTypes/:id/', assetTypeController.deleteAssetTypes);

/**
 * @swagger
 * /v1/assetTypes/all/mapped/:
 *   get:
 *     summary: Get all asset types but with the asset type as a key with his value associate (from ODEP & RESILINK)
 *     tags: [AssetType]
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
 *                      name:
 *                        type: string
 *                      description:
 *                        type: string
 *                      nature:
 *                        type: string
 *                        enum:
 *                          - material
 *                          - immaterial
 *                      unit:
 *                        type: string
 *                      regulated:
 *                        type: boolean
 *                      regulator:
 *                        type: string
 *                      sharingIncentive:
 *                        type: boolean
 *                      specificAttributesModel:
 *                        type: array
 *                        items:
 *                            type: object
 *                            properties:
 *                                name:
 *                                    type: string
 *                                type:
 *                                    type: string
 *                                mandatory:
 *                                    type: string
 *                                    enum:
 *                                      - true
 *                                      - false
 *                                hasValueList:
 *                                    type: string
 *                                    enum:
 *                                      - true
 *                                      - false
 *                                valueList:
 *                                    type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.get('/assetTypes/all/mapFormat', assetTypeController.getAllAssetTypesResilink)

/**
 * @swagger
 * /v1/assetTypes/{assetType}:
 *   post: 
 *     summary: Create an assetType or a clone of an existing assetType (from ODEP & RESILINK)
 *     tags: [AssetType]
 *     parameters:
 *       - in: path
 *         name: assetType
 *         schema:
 *           type: string 
 *         required: true
 *     responses:
 *       200:
 *         description: AssetType successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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

router.post('/assetTypes/:assetType', assetTypeController.createAssetTypesCustom);

module.exports = router;