import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'


@Schema({
  _id: false,
})
export class ProviderProfile extends Document {
  @Prop({
    minlength: 3,
    maxlength: 25,
    trim: true,
  })
  company: string

  @Prop({ required: false })
  about: string
}

export type UserDocument = User & Document

@Schema({
  timestamps: true,
  toJSON: { versionKey: false, virtuals: true },
  toObject: { versionKey: false, virtuals: true },
  validateBeforeSave: true,
})
export class User {
  @Prop({
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 24,
    index: true,
  })
  firstName: string

  @Prop({
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 24,
    index: true,
  })
  lastName: string

  @Prop()
  phoneNumber: string

//   ! avatar
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: File.name })
//   avatar: string

  @Prop({ default: false })
  isProvider: boolean

  @Prop()
  providerprofile: ProviderProfile

  @Prop({ trim: true, length: 11 })
  refrealPhoneNumber: string

  @Prop({ default: false, select: false })
  isLocked: boolean

  @Prop()
  email: string

  @Prop({ default: +new Date() + 30 * 60 * 60 * 1000 })
  activeTime: Date

  status: string
}

const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre(['find', 'findOne', 'findOneAndUpdate'], async function () {
  this.populate('avatar')
})

UserSchema.virtual('status').get(function (this: UserDocument) {
  return this.activeTime.getTime() >= Date.now() && this.isProvider
})

export { UserSchema }
