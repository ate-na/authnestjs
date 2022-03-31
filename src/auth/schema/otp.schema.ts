import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export enum UserRole {
  Provider = 'provider',
  User = 'user',
  Admin = 'Admin',
}

export type OTPDocument = OTP & Document

@Schema({
  timestamps: true,
  toJSON: { versionKey: false, virtuals: true },
  toObject: { versionKey: false },
})
export class OTP {
  @Prop({ default: 0 })
  failedAttemps: number

  @Prop()
  phoneNumber: string

  @Prop()
  verificationCode: string

  @Prop({ required: true })
  verificationDate: Date

  @Prop({
    required: true,
    enum: UserRole,
  })
  role: string

  @Prop()
  email: string

  status: string
}

const OTPSchema = SchemaFactory.createForClass(OTP)

OTPSchema.virtual('status').get(function (this: OTPDocument) {
  if (this.verificationDate.getTime() + 2 * 60 * 1000 <= Date.now()) {
    return 'verification_code_expired'
  }
  if (this.failedAttemps >= 3) {
    return 'verificationCode_attempts'
  }
  return 'pending'
})

export { OTPSchema }
