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
 *     summary: Create a new asset (from ODEP)
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
 *         description: Contract created and pre-payment executed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 contractId:
 *                   type: number
 *                 requestId:
 *                   type: number
 *                 offerId:
 *                   type: number
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


router.post('/contracts/', contractController.createContract);

/**
 * @swagger
 * /v1/contracts/all:
 *   get: 
 *     summary: Get all contracts by the admin (from ODEP)
 *     tags: [Contracts]
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
 *                   idContract:
 *                     type: number
 *                   offer:
 *                     type: string
 *                   Request:
 *                     type: string
 *                   asset:
 *                     type: string
 *                   state:
 *                     type: string
 *                   quantityToDeliver:
 *                     type: number
 *                   deliveredQuantity:
 *                     type: number
 *                   consumedQuantity:
 *                     type: number
 *                   creationDate:
 *                     type: string
 *                     format: date-time
 *                   transactionType:
 *                     type: string
 *                   offerer:
 *                     type: string
 *                   requester:
 *                     type: string
 *                   assetType:
 *                     type: string
 *                   price:
 *                     type: number
 *                   deposit:
 *                     type: number
 *                   cancellationFee:
 *                     type: number
 *                   beginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   endTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveBeginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveEndTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   rentInformation:
 *                     type: object
 *                     properties:
 *                       delayMargin:
 *                         type: number
 *                       lateRestitutionPenalty:
 *                         type: number
 *                       deteriorationPenalty:
 *                         type: number
 *                       nonRestitutionPenalty:
 *                         type: number
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

router.get('/contracts/all', contractController.getAllContract);

/**
 * @swagger
 * /v1/contracts/owner/ongoing/{id}:
 *   get: 
 *     summary: Get ongoing contracts by owner (from ODEP & RESILINK)
 *     tags: [Contracts]
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idContract:
 *                     type: number
 *                   offer:
 *                     type: string
 *                   Request:
 *                     type: string
 *                   asset:
 *                     type: string
 *                   state:
 *                     type: string
 *                   quantityToDeliver:
 *                     type: number
 *                   deliveredQuantity:
 *                     type: number
 *                   consumedQuantity:
 *                     type: number
 *                   creationDate:
 *                     type: string
 *                     format: date-time
 *                   transactionType:
 *                     type: string
 *                   offerer:
 *                     type: string
 *                   requester:
 *                     type: string
 *                   assetType:
 *                     type: string
 *                   price:
 *                     type: number
 *                   deposit:
 *                     type: number
 *                   cancellationFee:
 *                     type: number
 *                   beginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   endTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveBeginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveEndTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   rentInformation:
 *                     type: object
 *                     properties:
 *                       delayMargin:
 *                         type: number
 *                       lateRestitutionPenalty:
 *                         type: number
 *                       deteriorationPenalty:
 *                         type: number
 *                       nonRestitutionPenalty:
 *                         type: number
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
 *       401:
 *         description: Unauthorized.
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

router.get('/contracts/owner/ongoing/:id/', contractController.getOwnerContractOngoing);

/**
 * @swagger
 * /v1/contracts/owner/{id}:
 *   get: 
 *     summary: Get contracts by owner (from ODEP)
 *     tags: [Contracts]
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idContract:
 *                     type: number
 *                   offer:
 *                     type: string
 *                   Request:
 *                     type: string
 *                   asset:
 *                     type: string
 *                   state:
 *                     type: string
 *                   quantityToDeliver:
 *                     type: number
 *                   deliveredQuantity:
 *                     type: number
 *                   consumedQuantity:
 *                     type: number
 *                   creationDate:
 *                     type: string
 *                     format: date-time
 *                   transactionType:
 *                     type: string
 *                   offerer:
 *                     type: string
 *                   requester:
 *                     type: string
 *                   assetType:
 *                     type: string
 *                   price:
 *                     type: number
 *                   deposit:
 *                     type: number
 *                   cancellationFee:
 *                     type: number
 *                   beginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   endTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveBeginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveEndTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   rentInformation:
 *                     type: object
 *                     properties:
 *                       delayMargin:
 *                         type: number
 *                       lateRestitutionPenalty:
 *                         type: number
 *                       deteriorationPenalty:
 *                         type: number
 *                       nonRestitutionPenalty:
 *                         type: number
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
 *       401:
 *         description: Unauthorized.
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

router.get('/contracts/owner/:id/', contractController.getContractFromOwner);

/**
 * @swagger
 * /v1/contracts/{id}:
 *   get: 
 *     summary: Get a contract by id (from ODEP)
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
 *               type: object
 *                 properties:
 *                   idContract:
 *                     type: number
 *                   offer:
 *                     type: string
 *                   Request:
 *                     type: string
 *                   asset:
 *                     type: string
 *                   state:
 *                     type: string
 *                   quantityToDeliver:
 *                     type: number
 *                   deliveredQuantity:
 *                     type: number
 *                   consumedQuantity:
 *                     type: number
 *                   creationDate:
 *                     type: string
 *                     format: date-time
 *                   transactionType:
 *                     type: string
 *                   offerer:
 *                     type: string
 *                   requester:
 *                     type: string
 *                   assetType:
 *                     type: string
 *                   price:
 *                     type: number
 *                   deposit:
 *                     type: number
 *                   cancellationFee:
 *                     type: number
 *                   beginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   endTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveBeginTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   effectiveEndTimeSlot:
 *                     type: string
 *                     format: date-time
 *                   rentInformation:
 *                     type: object
 *                     properties:
 *                       delayMargin:
 *                         type: number
 *                       lateRestitutionPenalty:
 *                         type: number
 *                       deteriorationPenalty:
 *                         type: number
 *                       nonRestitutionPenalty:
 *                         type: number
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

router.get('/contracts/:id/', contractController.getOneContract);

/**
 * @swagger
 * /v1/contracts/immaterialContract/{id}:
 *   patch: 
 *     summary: update the state of a contract in case of immaterial asset and adjust the payment accordingly
 *     description: |
 *        In case of immaterial asset, this method allows the offerer to update the state of the contract to "beginDelivery". 
 *        Also, it allows him to update the state to "endDelivery" and giving the delivered quantity. It allows also the requestor to update the state to "endOfConsumption" and giving the consumed quantity. According to the min (delivered,consumed, matched) quantity, this method will adjust the payment by crediting the offerer balance and debiting the requestor balance.
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
 *         description: Contract successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       404:
 *         description: Contract not found.
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

router.patch('/contracts/immaterialContract/:id/', contractController.patchContractImmaterial);

/**
 * @swagger
 * /v1/contracts/purchaseMaterialContract/{id}:
 *   patch: 
 *     summary: update the state of a purchase contract in case of material asset and adjust the payment accordingly (from ODEP)
 *     description: |
 *        In case of purchasing a material asset, this method allows the offerer to update the contract state to "assetDeliveredByTheOfferer".
 *        Furthermore, it allows the requestor to update the contract state to "assetReceivedByTheRequestor" or "assetNotReceivedByTheRequestor" in order to adjust the payment accordingly.
 *        If the asset is received, this method will proceed the payment. Otherwise, the requestor balance will be credited by the payed deposit.
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
 *         description: Contract successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       404:
 *         description: Contract not found.
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

router.patch('/contracts/purchaseMaterialContract/:id/', contractController.patchContractMaterialPurchase);

/**
 * @swagger
 * /v1/contracts/rentMaterialContract/{id}:
 *   patch: 
 *     summary: update the state of a rent contract in case of material asset and adjust the payment accordingly (from ODEP)
 *     description: |
 *        In case of renting a material asset, this method allows, at first, the offerer to update the contract state to "assetDeliveredByTheOfferer".
 *        Also, it allows the requestor to update the state to "assetReceivedByTheRequestor" as well as to "assetReturnedByTheRequestor", when returning the asset.
 *        Finally, this method allows the offerer to update the state to "assetReturnedToTheOfferer" and giving the period of delay (if there is) and indicating if the asset is deteriored or not in order to adjust the payment according to these information.
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
 *         description: Contract successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       404:
 *         description: Contract not found.
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

router.patch('/contracts/rentMaterialContract/:id/', contractController.patchContractMaterialRent);

/**
 * @swagger
 * /v1/contracts/cancelContract/{id}:
 *   patch: 
 *     summary: cancel a contract before or after its execution (from ODEP)
 *     description: |
 *      This methods allows to an offerer or a requestor to cancel a contract befor or after its execution.
 *       In case of a cancellation before the contract execution, it will update the state of the contract to "cancelled" and will debit the balance of the cancellation initiator by the "cancellationFee" to the benefit of the other prosumer.
 *       In case of a cancellation after the contract execution, it will update the state of the contract to "endDelivery", if the cancellation is perfomed by the offerer, or to "endOfUse", if the cancellation is perfomed by the requestor.
 *       This methods allows also to the cancellation initiator to indicate the effective quantity,in case of immaterial asset, in order to adjust payment accordingly. In case of an immaterial not measurable asset, it will adjust payment according to the effective period.
 *       Finally, this method will make the concerned offer and request available again for the matching.
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
 *         description: Contract successfully cancelled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                       type: string
 *       404:
 *         description: Contract not found.
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

router.patch('/contracts/rentMaterialContract/:id/', contractController.patchContractCancel);

module.exports = router;