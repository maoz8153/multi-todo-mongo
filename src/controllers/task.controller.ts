import { Request, Response } from 'express'
import mongoose from 'mongoose';
import taskModel, { ITask, ICreateTaskInput } from '../models/task.model';
import { ObjectId } from 'mongodb';

export class TaskController {

    public async getTaskListBySubject(request: Request, responce: Response) {
        try {
            const result = await this._getTaskListBySubject(request.params.subjectId);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    public async createTask(request: Request, responce: Response) {
        try {
            const result = await this._createTask(request.body);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    public async updateTask(request: Request, responce: Response) {
        try {
            const res = await this._updateTask(request.body);
            responce.status(200).send({ updated: true });
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    public async deleteTask(request: Request, responce: Response) {
        try {
            const id = mongoose.Types.ObjectId(request.params.tasksId)
            const res = await this._deleteTask(id);
            responce.status(200).send({ deleted: true });
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    private async _getTaskListBySubject(subjectId: string): Promise<ITask[]> {
        const qry = {
            fkSubjectId: mongoose.Types.ObjectId(subjectId)
        };
        return await taskModel.find(qry).exec();
    }

    private async _createTask(newTask: ICreateTaskInput): Promise<ITask> {
        return await taskModel.create(newTask);
    }

    private async _updateTask(task: ITask): Promise<ITask> {
        return await taskModel.findByIdAndUpdate({ _id: task._id }, { $set: task, useFindAndModify: false }).exec();
    }

    private async _deleteTask(taskId: ObjectId): Promise<any> {
        return await taskModel.findByIdAndDelete(taskId).exec();
    }
}