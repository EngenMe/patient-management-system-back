/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API for admin management
 */

/**
 * @swagger
 * /api/admins/id:
 *   get:
 *     summary: Retrieve an admin's ID by email
 *     description: This endpoint retrieves the ID of an admin based on their email address.
 *     tags: [Admins]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email address of the admin
 *         schema:
 *           type: string
 *           example: admin@example.com
 *     responses:
 *       200:
 *         description: Admin ID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Admin ID retrieved successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     adminId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Missing or invalid email query parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Email query parameter is required and must be a valid string.
 *       404:
 *         description: Admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Admin not found.
 *       500:
 *         description: An unexpected error occurred while retrieving the admin ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An error occurred.
 */

/**
 * @swagger
 * /api/admins/validate:
 *   post:
 *     summary: Validate an admin's credentials
 *     description: This endpoint validates an admin's email and password.
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the admin
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: The password of the admin
 *                 example: password123
 *     responses:
 *       200:
 *         description: Admin validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Admin validated successfully.
 *       404:
 *         description: Admin not found or credentials are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Admin not found or credentials are incorrect.
 *       500:
 *         description: An unexpected error occurred while validating the admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An error occurred.
 */
