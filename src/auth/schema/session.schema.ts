import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export enum UserRole {
  Provider = 'provider',
  User = 'user',
  Admin = 'Admin',
}

export type SessionDocument = Session & Document;

@Schema({
  timestamps: true,
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class Session {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: string;

  @Prop()
  expiresAt: number;

  //   @Prop({
  //     required: true,
  //     enum: UserRole,
  //   })
  //   role: string

  @Prop({ unique: true, required: true })
  refreshToken: string;
}

const SessionSchema = SchemaFactory.createForClass(Session);

export { SessionSchema };
