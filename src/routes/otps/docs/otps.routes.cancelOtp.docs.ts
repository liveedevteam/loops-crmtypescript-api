/**
 * @openapi
 * /api/otps/cancel:
 *   patch:
 *     tags:
 *       - OTPs
 *     summary: Cancel OTP
 *     description: Cancel OTP to user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: "User's phone number to which OTP will be sent."
 *                 example: "1234567890"
 *                 required: true
 *               platform:
 *                 type: string
 *                 description: "Platform user is registering from (e.g., web, mobile)"
 *                 example: "web"
 *                 required: true
 *     responses:
 *       200:
 *         description: Cancel OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cancel OTP sent successfully"
 *                 result:
 *                   type: object
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

export {};
