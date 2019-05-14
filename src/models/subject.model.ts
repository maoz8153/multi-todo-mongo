import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface ISubject extends Document {
    title: string;
    fkUserId: IUser['_id'];
}

export interface ISubjectAndTaskCount extends ISubject {
    taskCounter: number;
}

export interface ICreateSubjectInput {
    title: ISubject['title'];
    fkUserId: ISubject['fkUserId'];
}

const SubjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    fkUserId: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<ISubject>('Subject', SubjectSchema);