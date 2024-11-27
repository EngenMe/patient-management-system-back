/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for patient management
 */

/**
 * @swagger
 * /patient/validate:
 *   post:
 *     summary: Validate patient information
 *     description: |
 *       This endpoint checks if a patient exists in the system based on their full name, email, and phone number.
 *       - **Exact Match**: All details match, returns success and patient ID.
 *       - **Partial Match**: Email or phone matches but fullName is incorrect, returns an error.
 *       - **No Match**: No record exists, prompts to register a new patient.
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
 *                 example: John Michael Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: 0123456789
 *     responses:
 *       200:
 *         description: Patient found
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
 *                   example: Patient found.
 *                 redirectTo:
 *                   type: string
 *                   example: /patients/1
 *       400:
 *         description: Patient exists but input data is incorrect
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
 *                   example: Patient exists, but input data is incorrect.
 *                 conflictingFields:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: No patient record found
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
 */
