import { model, Schema } from "mongoose";
import { type IAuth } from "../interfaces/auths.interfaces";

/**
 * @openapi
 * components:
 *   schemas:
 *     Auths:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - platform
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Unique email for the user.
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the user account.
 *           example: Password123!
 *         platform:
 *           type: string
 *           enum:
 *             - event
 *             - station
 *           description: Platform type the user is associated with.
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *           description: Role assigned to the user.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated.
 */

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    enum: ["event", "station"],
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const AuthsModel = model<IAuth>("Auths", authSchema);

export default AuthsModel;
