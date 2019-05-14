import { Schema, Document } from 'mongoose';
import  mongoose from 'mongoose';
import { ISubject } from './subject.model';

export interface ITask extends Document {
    title: string;
    complited: boolean;
    fkSubjectId: ISubject['_id'];
}

export interface ICreateTaskInput {
    title: ITask['title'];
    fkSubjectId: ITask['fkSubjectId'];
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    complited: { type: Boolean, required: true, default: false },
    fkSubjectId: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<ITask>('Task', TaskSchema);