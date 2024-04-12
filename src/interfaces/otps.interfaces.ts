import { Document } from 'mongoose';

export interface IOTP extends Document {
  otp: string;
  platform: 'event' | 'station';
  refCode: string;
  status: 'pending' | 'verified' | 'expired' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}