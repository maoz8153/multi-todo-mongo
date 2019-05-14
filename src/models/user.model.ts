import { Schema, Document } from 'mongoose';
import  mongoose from 'mongoose';

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    gender: Gender;
}

export interface ICreateUserInput {
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    gender: IUser['gender'];
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);