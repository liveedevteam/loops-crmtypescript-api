/**
 * @openapi
 * components:
 *  schemas:
 *   OTPs:
 *      type: object
 *      required:
 *          - phoneNumber
 *          - otp
 *          - platform
 *          - refCode
 *      properties:
 *          phoneNumber:
 *              type: string
 *              description: Phone number of the user.
 *              example: 66949582614
 *          otp:
 *              type: string
 *              description: OTP generated for the user.
 *              example: 123456
 *          platform:
 *              type: string
 *              enum:
 *                  - event
 *                  - station
 *              description: Platform type the user is associated with.
 *          refCode:
 *              type: string
 *              description: Reference code for the OTP.
 *              example: 123456
 *          status:
 *              type: string
 *              enum:
 *                  - pending
 *                  - verified
 *                  - expired
 *                  - cancelled
 *              description: Status of the OTP.
 *          createdAt:
 *              type: string
 *              format: date-time
 *              description: Timestamp when the OTP was created.
 *          updatedAt:
 *              type: string
 *              format: date-time
 *              description: Timestamp when the OTP was last updated.
 */

import { model, Schema } from "mongoose";
import { type IOTP } from "../interfaces/otps.interfaces";

const OTPSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    description: "Phone number of the user.",
  },
  otp: {
    type: String,
    required: true,
    description: "OTP generated for the user.",
  },
  platform: {
    type: String,
    required: true,
    enum: ["event", "station"],
    description: "Platform type the user is associated with.",
  },
  refCode: {
    type: String,
    required: true,
    description: "Reference code for the OTP.",
  },
  status: {
    type: String,
    enum: ["pending", "verified", "expired", "cancelled"],
    description: "Status of the OTP.",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Timestamp when the OTP was created.",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    description: "Timestamp when the OTP was last updated.",
  },
});

// If you want to set `updatedAt` automatically on every save:
OTPSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const OTP = model<IOTP>("OTP", OTPSchema);

module.exports = OTP;
