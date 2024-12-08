/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for patient management
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     description: This endpoint allows you to create a new patient in the system.
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the patient
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 description: Age of the patient
 *                 example: 30
 *               gender:
 *                 type: string
 *                 description: Gender of the patient
 *                 example: Male
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                     description: Contact phone number
 *                     example: +1234567890
 *                   email:
 *                     type: string
 *                     description: Contact email address
 *                     example: johndoe@example.com
 *               medicalHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of past medical conditions or treatments
 *                 example: [ "Diabetes", "Hypertension" ]
 *             required:
 *               - name
 *               - age
 *               - gender
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   description: The newly created patient record
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier for the patient
 *                       example: 61c9ebf8b6f2c1a678e54b12
 *                     name:
 *                       type: string
 *                       description: Full name of the patient
 *                       example: John Doe
 *                     age:
 *                       type: integer
 *                       description: Age of the patient
 *                       example: 30
 *                     gender:
 *                       type: string
 *                       description: Gender of the patient
 *                       example: Male
 *                     contactInfo:
 *                       type: object
 *                       properties:
 *                         phone:
 *                           type: string
 *                           example: +1234567890
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                     medicalHistory:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "Diabetes", "Hypertension" ]
 *       400:
 *         description: Invalid request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Invalid request payload.
 *       500:
 *         description: An unexpected error occurred
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
 *                   example: An unexpected error occurred.
 */
