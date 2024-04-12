/**
 * @openapi
 * /api/auths/verify/email-password:
 *   get:
 *     summary: Verifies email and password
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: accessToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Access token to be verified
 *     responses:
 *       200:
 *         description: Verify success
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - Token does not grant access to the requested resource
 *       500:
 *         description: Internal server error
 */

export {};
