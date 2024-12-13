/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API for managing appointments
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: This endpoint allows creating a new appointment with details such as doctor, patient, and appointment date and time.
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor:
 *                 type: string
 *                 description: The doctor's name or identifier
 *                 example: "Dr. Smith"
 *               patientId:
 *                 type: integer
 *                 description: The ID of the patient
 *                 example: 1
 *               reasonForAppointment:
 *                 type: string
 *                 description: The reason for the appointment
 *                 example: "Annual physical check-up"
 *               additionalComments:
 *                 type: string
 *                 description: Any additional comments regarding the appointment
 *                 example: "Patient prefers a morning slot."
 *               expectedAppointmentDate:
 *                 type: string
 *                 format: date
 *                 description: The expected date of the appointment in ISO format
 *                 example: "2024-12-20"
 *               expectedAppointmentTime:
 *                 type: string
 *                 format: time
 *                 description: The expected time of the appointment in ISO format
 *                 example: "09:30:00"
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment created successfully
 *                 appointment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     doctorId:
 *                       type: integer
 *                       example: 2
 *                     patientId:
 *                       type: integer
 *                       example: 1
 *                     reasonForAppointment:
 *                       type: string
 *                       example: Annual physical check-up
 *                     additionalComments:
 *                       type: string
 *                       example: Patient prefers a morning slot.
 *                     expectedAppointmentDateAndTime:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-20T09:30:00
 *       400:
 *         description: Invalid appointment date or time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid appointment date or time
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
 *         description: An unexpected error occurred while creating the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating the appointment
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Retrieve all appointments
 *     description: This endpoint retrieves all appointments from the database, including their details.
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointments retrieved successfully
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       doctorId:
 *                         type: integer
 *                         example: 5
 *                       patientId:
 *                         type: integer
 *                         example: 2
 *                       reasonForAppointment:
 *                         type: string
 *                         example: Routine check-up
 *                       additionalComments:
 *                         type: string
 *                         example: Patient prefers morning slots.
 *                       expectedAppointmentDateAndTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-20T09:30:00
 *                       status:
 *                         type: string
 *                         enum: [scheduled, pending, cancelled]
 *                         example: scheduled
 *       404:
 *         description: No appointments found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No appointments found
 *       500:
 *         description: An error occurred while retrieving appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving appointments
 */
