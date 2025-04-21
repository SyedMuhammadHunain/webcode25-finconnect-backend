import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common/enums/roles.enum';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';

// ✅ Rename the interface to avoid conflict
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

// ✅ Define the document type
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
    default: SubscriptionType.FREE,
  })
  subscriptionType: SubscriptionType;

  @Prop({
    default:
      'https://res.cloudinary.com/dtepgit65/image/upload/v1744490854/Ridee/Default/profileimage.png',
  })
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
