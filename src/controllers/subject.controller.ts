import { Request, Response } from 'express'
import subjectModel, { ISubject, ICreateSubjectInput, ISubjectAndTaskCount } from '../models/subject.model';
import mongoose from 'mongoose';

export class SubjectController {


    public async getSubjectListByUserId(request: Request, responce: Response) {
        try {
            const result = await this._getSubjectListByUserId(request.params.userId);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async getSubjectListAndTaskCounterByUserId(request: Request, responce: Response) {
        try {
            const result = await this._getSubjectListAndTaskCounterByUserId(request.params.userId);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async createSubject(request: Request, responce: Response) {
        try {
            const result = await this._createSubject(request.body);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async updateSubject(request: Request, responce: Response) {
        try {
            await this._updateSubject(request.body);
            responce.status(200).send({ updated: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async deleteSubject(request: Request, responce: Response) {
        try {
            await this._deleteSubject(request.params.subjectId);
            responce.status(200).send({ deleted: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    private async _getSubjectListAndTaskCounterByUserId(userId: string): Promise<ISubjectAndTaskCount[]> {
        const qry = {
            fkUserId: mongoose.Types.ObjectId(userId)
        };
        let aggQry = subjectModel.aggregate([
            { "$match": qry },
            {
                "$lookup": {
                    "from": "tasks",
                    "localField": "_id",
                    "foreignField": "fkSubjectId",
                    "as": "tasks"
                }
            },
            {
                "$project": {
                    _id: 1,
                    title: 1,
                    "taskCounter": { "$size": "$tasks" }
                }
            }


        ])
        return await aggQry.exec();
    }

    private async _getSubjectListByUserId(userId: string): Promise<ISubject[]> {
        const qry = {
            fkUserId: mongoose.Types.ObjectId(userId)
        };
        return await subjectModel.find(qry).exec();
    }

    private async _createSubject(newSubject: ICreateSubjectInput): Promise<ISubject> {
        return await subjectModel.create(newSubject);
    }

    private async _updateSubject(subject: ISubject): Promise<ISubject> {
        return await subjectModel.findByIdAndUpdate(subject._id, subject).exec();
    }

    private async _deleteSubject(subjectId: string): Promise<any> {
        return await subjectModel.deleteOne(subjectId).exec();
    }
}