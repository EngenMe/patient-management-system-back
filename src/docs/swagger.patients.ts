/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for patient management
 */

/**
 * @swagger
 * /api/patients/id:
 *   get:
 *     summary: Retrieve a patient's ID by email
 *     description: This endpoint retrieves the ID of a patient based on their email address.
 *     tags: [Patients]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email address of the patient
 *         schema:
 *           type: string
 *           example: patient@example.com
 *     responses:
 *       200:
 *         description: Patient ID retrieved successfully
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
 *                   example: Patient ID retrieved successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     patientId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Email query parameter is missing or invalid
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
 *         description: Patient not found
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
 *                   example: Patient not found.
 *       500:
 *         description: An unexpected error occurred while retrieving the patient
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
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     description: This endpoint allows creating a new patient in the system.
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
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
 *                   example:
 *                     id: 1
 *                     fullName: John Doe
 *                     email: john.doe@example.com
 *                     phone: 1234567890
 *       500:
 *         description: An unexpected error occurred while creating the patient
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
 * /api/patient/validate:
 *   post:
 *     summary: Validate a patient
 *     description: Validates the provided patient information and checks for conflicts.
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *     responses:
 *       200:
 *         description: Patient found and validated successfully
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
 *                   example: Patient found and all fields match.
 *       400:
 *         description: Conflict detected in patient data
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
 *                   example: Conflict detected in patient data.
 *                 conflictingFields:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: email
 *       404:
 *         description: No patient found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: new_patient
 *                 message:
 *                   type: string
 *                   example: No patient found. Redirect to new patient form.
 *                 redirectTo:
 *                   type: string
 *                   example: /patients/new
 *       500:
 *         description: An unexpected error occurred while validating the patient
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
