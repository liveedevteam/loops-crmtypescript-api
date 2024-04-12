/**
 * @openapi
 * /api/auths/login/email-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     description: Login endpoint for users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: "User's email"
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 required: true
 *                 description: "User's password"
 *                 example: "yourpassword"
 *               platform:
 *                 type: string
 *                 required: true
 *                 description: "Platform user is registering from (e.g., web, mobile)"
 *                 example: "event"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *          description: Forbidden
 *       500:
 *          description: Internal server error
 */
export {};
