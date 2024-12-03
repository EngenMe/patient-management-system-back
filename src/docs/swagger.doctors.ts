/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API for doctor management
 */

/**
 * @swagger
 * /doctors:
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
 *                       picturePath:
 *                         type: string
 *                         example: /images/emily-carter.jpg
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
