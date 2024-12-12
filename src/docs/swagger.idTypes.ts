/**
 * @swagger
 * tags:
 *   name: ID Types
 *   description: API for managing ID types
 */

/**
 * @swagger
 * /api/id-types:
 *   get:
 *     summary: Retrieve all ID types
 *     description: This endpoint retrieves a list of all ID types available in the system.
 *     tags: [ID Types]
 *     responses:
 *       200:
 *         description: List of ID types retrieved successfully
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
 *                   example: ID Types retrieved successfully.
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
 *                         example: Passport
 *                       description:
 *                         type: string
 *                         example: Official travel document
 *       404:
 *         description: No ID types found
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
 *                   example: No ID types found.
 *       500:
 *         description: An unexpected error occurred while retrieving ID types
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
