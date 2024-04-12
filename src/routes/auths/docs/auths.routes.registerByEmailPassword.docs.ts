/**
 * @swagger
 * /api/auths/register/email-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Register a new user"
 *     description: "Register a new user with email, password, platform, and role"
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
 *                 example: "web"
 *               role:
 *                 type: string
 *                 required: true
 *                 description: "User's role (e.g., user, admin)"
 *                 example: "user"
 *     responses:
 *       200:
 *         description: "User registered successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *          description: "Bad Request"
 *       401:
 *          description: "Unauthorized"
 *       500:
 *          description: "Internal Server Error"
 */
