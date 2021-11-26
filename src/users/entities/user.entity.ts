import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    emailId: string;

    @Prop()
    userId: string;

    @Prop()
    email: string;
}


export const UserSchema = SchemaFactory.createForClass(User);