import { type Document } from "mongoose";

export interface IAuth extends Document {
  _id: string;
  email: string;
  password: string;
  platform: "event" | "station";
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}
