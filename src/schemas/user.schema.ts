import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common/enums/roles.enum';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  isSubscribed: boolean;
  subscriptionType: SubscriptionType;
  role: Role;
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({
    type: String,
    enum: Object.values(Role),
    default: Role.DEVELOPER,
  })
  role: Role;

  @Prop({ default: false })
  isSubscribed: boolean;

  @Prop({
    type: String,
    enum: Object.values(SubscriptionType),
    default: SubscriptionType.BASIC,
  })
  subscriptionType: SubscriptionType;

  @Prop({
    default:
      'https://res.cloudinary.com/dtepgit65/image/upload/v1744490854/Ridee/Default/profileimage.png',
  })
  image: string;

  @Prop({ type: Date, default: null })
  subscriptionExpiry?: Date | null;

  @Prop({ type: String, default: null }) 
  stripeCustomerId?: string;

  @Prop({ type: String, default: null }) 
  stripeSubscriptionId?: string;

  @Prop({ type: String, default: null })
  subscriptionPlan?: string;

  @Prop({ type: Number, default: null })
  subscriptionAmount?: number;

  @Prop({ default: null })
  passwordResetToken: string;

  @Prop({ default: null })
  passwordResetTokenExpiresAt: Date;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, default: 1000, type: Number, min: 0 }) 
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
