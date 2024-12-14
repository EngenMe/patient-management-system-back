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
 *     summary: Retrieve paginated appointments
 *     description: This endpoint retrieves appointments from the database with pagination support. It includes details of each appointment and metadata for pagination.
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *         required: false
 *         description: The number of appointments per page (default is 5).
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
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 totalAppointments:
 *                   type: integer
 *                   example: 50
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

/**
 * @swagger
 * /api/appointments/count:
 *   get:
 *     summary: Retrieve appointment counts by status
 *     description: This endpoint retrieves the total counts of appointments grouped by their status (e.g., scheduled, pending, cancelled).
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Successfully retrieved appointment counts by status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment counts retrieved successfully
 *                 counts:
 *                   type: object
 *                   properties:
 *                     scheduled:
 *                       type: integer
 *                       example: 10
 *                     pending:
 *                       type: integer
 *                       example: 5
 *                     cancelled:
 *                       type: integer
 *                       example: 2
 *       500:
 *         description: An error occurred while retrieving appointment counts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving appointment counts
 */

/**
 * @swagger
 * /api/appointments/{id}/schedule:
 *   patch:
 *     summary: Schedule an appointment
 *     description: Updates the status of an appointment to "scheduled" for the given appointment ID.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the appointment to be scheduled
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: scheduled
 *     responses:
 *       200:
 *         description: Appointment successfully scheduled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment scheduled successfully
 *                 appointment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: scheduled
 *       400:
 *         description: Appointment is already scheduled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment is already scheduled
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment not found
 *       500:
 *         description: An error occurred while scheduling the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while scheduling the appointment
 */

/**
 * @swagger
 * /api/appointments/{id}/cancel:
 *   patch:
 *     summary: Cancel an appointment
 *     description: Updates the status of an appointment to "cancelled" for the given appointment ID.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the appointment to be cancelled
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: cancelled
 *     responses:
 *       200:
 *         description: Appointment successfully cancelled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment cancelled successfully
 *                 appointment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: cancelled
 *       400:
 *         description: Appointment is already cancelled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment is already cancelled
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment not found
 *       500:
 *         description: An error occurred while cancelling the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while cancelling the appointment
 */
