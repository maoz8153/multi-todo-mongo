import { Request, Response } from 'express'
import userModel, { IUser, ICreateUserInput } from '../models/user.model';

export class UserController {


    public async getUserList(request: Request, responce: Response) {
        try {
            const result = await this._getUserList();
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async getUserById(request: Request, responce: Response) {
        try {
            const result = await this._getUserById(request.params.userId);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async createUser(request: Request, responce: Response) {
        try {
            const result = await this._createUser(request.body);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async updateUser(request: Request, responce: Response) {
        try {
            await this._updateUser(request.body);
            responce.status(200).send({ updated: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async deleteUser(request: Request, responce: Response) {
        try {
            await this._deleteUser(request.params.userId);
            responce.status(200).send({ deleted: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    private async _getUserList(): Promise<IUser[]> {
        return await userModel.find({});
    }

    private async _getUserById(userId: string): Promise<IUser> {
        return await userModel.findById(userId);
    }

    private async _createUser(newUser: ICreateUserInput): Promise<IUser> {
        return userModel.create(newUser)
            .then((user: IUser) => {
                return user;
            })
            .catch((error: Error) => {
                throw error;
            });;
    }

    private async _updateUser(user: IUser): Promise<IUser> {
        return await userModel.findByIdAndUpdate(user._id, user).exec();
    }

    private async _deleteUser(userId: string): Promise<any> {
        return await userModel.deleteOne(userId).exec();
    }
}