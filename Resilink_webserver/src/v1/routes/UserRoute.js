const express = require("express");
const userController = require("../controllers/UserController.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User of the application.
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required: 
 *          - username
 *          - password
 *      properties:
 *        _id:
 *          type: string
 *        username: 
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        roleOfUser:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        provider:
 *          type: string
 *        account:
 *          type: string
 *        createdAt:
 *          type: string
 *        updateAt:
 *          type: string
 *        
 */

/**
 * @swagger
 * /v1/User/token:
 *   post: 
 *     security:
 *         - noAuth: []
 *     summary: Retrieve access token from a user
 *     tags: [User]
 *     requestBody:
 *       description: The prosumer username and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Invalid prosumer data.
 *       500:
 *         description: Some server error.
 */


router.post('/User/token', userController.getTokenUser);

/**
 * @swagger
 * /v1/User/new:
 *   post: 
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       description: The prosumer username and password.
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
 *               password:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Token of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid prosumer data.
 *       500:
 *         description: Some server error.
 */

router.post('/User/new', userController.createUser);

module.exports = router;
