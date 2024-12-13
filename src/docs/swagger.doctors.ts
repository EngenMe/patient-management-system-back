/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API for doctor management
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Retrieve all doctors
 *     description: This endpoint retrieves a list of all doctors in the system.
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors retrieved successfully
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
 *                   example: Doctors retrieved successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Dr. Emily Carter
 *                       phone:
 *                         type: string
 *                         example: 1234567890
 *                       email:
 *                         type: string
 *                         example: emily.carter@example.com
 *                       speciality:
 *                         type: string
 *                         example: Pediatrics
 *                       imageUrl:
 *                         type: string
 *                         example: https://example.com/images/emily-carter.jpg
 *       404:
 *         description: No doctors found
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
 *                   example: No doctors found.
 *       500:
 *         description: An unexpected error occurred while retrieving doctors
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
 * /api/doctor/{id}:
 *   get:
 *     summary: Retrieve doctor details by ID
 *     description: This endpoint retrieves the details of a doctor based on their ID.
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the doctor
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor retrieved successfully
 *                 doctor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Dr. Jane Smith
 *                     phone:
 *                       type: string
 *                       example: +123456789
 *                     email:
 *                       type: string
 *                       example: jane.smith@example.com
 *                     speciality:
 *                       type: string
 *                       example: Cardiology
 *                     imageUrl:
 *                       type: string
 *                       format: url
 *                       example: http://example.com/jane-smith.jpg
 *       400:
 *         description: Invalid doctor ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid doctor ID
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor not found
 *       500:
 *         description: An error occurred while retrieving the doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred.
 */
