/**
 * @openapi
 * /api/otps/verify:
 *   post:
 *     tags:
 *       - OTPs
 *     summary: Send OTP
 *     description: Send OTP to user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refCode:
 *                 type: string
 *                 description: "Reference code for the OTP."
 *                 example: "1234567890"
 *                 required: true
 *               otp:
 *                 type: string
 *                 description: "OTP entered by the user."
 *                 example: "123456"
 *                 required: true
 *     responses:
 *       200:
 *         description: OTP verify successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verify successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     refCode:
 *                       type: string
 *                       example: "123456"
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
