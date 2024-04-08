const express = require("express");
const userController = require("../controllers/UserController.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: users
 *   description: User of the application.
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    users:
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
 *        updatedAt:
 *          type: string
 *        
 */

/**
 * @swagger
 * /v1/users/auth/sign_in:
 *   post: 
 *     security:
 *         - noAuth: []
 *     summary: Retrieve data and access token from a user (from ODEP)
 *     tags: [users]
 *     requestBody:
 *       description: Sign in to get access token.
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
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 roleOfUser:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *                 provider:
 *                   type: string
 *                 account:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */


router.post('/users/auth/sign_in/', userController.getTokenUser);

/**
 * @swagger
 * /v1/users/:
 *   post: 
 *     summary: Create a new User (from ODEP)
 *     tags: [users]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *            type: string
 *            enum: [http://localhost:22000, http://localhost:22001, http://localhost:22002, http://localhost:22003, http://localhost:22004, http://localhost:22005, http://localhost:22006]
 *         description: provider value that needs to be considered for account allocation
 *     requestBody:
 *       description: User object that needs to be added to the application
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
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 roleOfUser:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *                 provider:
 *                   type: string
 *                 account:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.post('/users/', userController.createUser);

/**
 * @swagger
 * /v1/users/custom:
 *   post: 
 *     summary: Create a new User (from ODEP & RESILINK)
 *     tags: [users]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *            type: string
 *            enum: [http://localhost:22000, http://localhost:22001, http://localhost:22002, http://localhost:22003, http://localhost:22004, http://localhost:22005, http://localhost:22006]
 *         description: provider value that needs to be considered for account allocation
 *     requestBody:
 *       description: User object that needs to be added to the application
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
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 roleOfUser:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *                 provider:
 *                   type: string
 *                 account:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.post('/users/custom', userController.createUserCustom);

/**
 * @swagger
 * /v1/users/:
 *   get:
 *     summary: Return list of users (from ODEP)
 *     tags: [users]
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   roleOfUser:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string 
 *                   provider:
 *                     type: string
 *                   account:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.get('/users/', userController.getAllUser);

/**
 * @swagger
 * /v1/users/all/custom:
 *   get:
 *     summary: Return list of users (from ODEP & RESILINK)
 *     tags: [users]
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   roleOfUser:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string 
 *                   provider:
 *                     type: string
 *                   account:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.get('/users/all/custom', userController.getAllUserCustom);

/**
 * @swagger
 * /v1/users/{userId}/:
 *   get: 
 *     summary: Find user by ID (from ODEP)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string 
 *         required: true
 *         description: ID of user to return
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 roleOfUser:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *                 provider:
 *                   type: string
 *                 account:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.get('/users/:userId', userController.getUserById);

/**
 * @swagger
 * /v1/users/getUserByEmail/{userEmail}/:
 *   get: 
 *     summary: get user by Email (from ODEP)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userEmail
 *         schema:
 *           type: string 
 *         required: true
 *         description: Email of user to return
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 roleOfUser:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *                 provider:
 *                   type: string
 *                 account:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.get('/users/getUserByEmail/:userEmail', userController.getUserByEmail);

/**
 * @swagger
 * /v1/users/getUserByUserName/{userName}/:
 *   get: 
 *     summary: Username of user to return (from ODEP)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string 
 *         required: true
 *         description: the user username
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 roleOfUser:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *                 provider:
 *                   type: string
 *                 account:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.get('/users/getUserByUserName/:userName', userController.getUserByUsername);

/**
 * @swagger
 * /v1/users/{userId}/:
 *   delete: 
 *     summary: Delete user (from ODEP)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string 
 *         required: true
 *         description: ID of user to delete
 *     responses:
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.delete('/users/:userId', userController.deleteUser);

/**
 * @swagger
 * /v1/users/custom/{userId}/:
 *   delete: 
 *     summary: Delete user profil in ODEP and RESILINK DB (from ODEP & RESILINK)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string 
 *         required: true
 *         description: ID of user to delete
 *     responses:
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.delete('/users/custom/:userId', userController.deleteUserODEPRESILINK);

/**
 * @swagger
 * /v1/users/{userId}/:
 *   put: 
 *     summary: Update an existing user (from ODEP)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string 
 *         required: true
 *         description: ID of user to update
 *     requestBody:
 *       description: User object that needs to be added to the application
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
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.post('/users/:userId', userController.updateUser);

/**
 * @swagger
 * /v1/users/custom/{userId}/:
 *   put: 
 *     summary: Update an existing user in ODEP and RESILINK (from ODEP & RESILINK)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string 
 *         required: true
 *         description: ID of user to update
 *     requestBody:
 *       description: User object that needs to be added to the application
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
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.post('/users/custom/:userId', userController.updateUserCustom);

/**
 * @swagger
 * /v1/users/custom/{userId}/:
 *   get: 
 *     summary: Find user by ID in ODEP and RESILINK (from ODEP & RESILINK)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string 
 *         required: true
 *         description: ID of user to return
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 roleOfUser:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *                 provider:
 *                   type: string
 *                 account:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error from RESILINK server.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    message:
 *                        type: string
 */

router.get('/users/custom/:userId', userController.getUserbyIdCustom);

module.exports = router;
