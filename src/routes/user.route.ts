import { Router } from 'express'
import { UserController } from '../controllers/user.controller';

export class UserRoute {

    private userController: UserController;

    constructor(router: Router) {
        this.userController = new UserController();
        this.createRoutes(router);
    }

    private createRoutes(router) {
        router.get('/api/users', this.userController.getUserList.bind(this.userController));
        router.post('/api/users', this.userController.createUser.bind(this.userController));
        router.get('/api/users/:userId', this.userController.getUserById.bind(this.userController));
        router.put('/api/users/:userId', this.userController.updateUser.bind(this.userController));
        router.delete('/api/users/:userId', this.userController.deleteUser.bind(this.userController));
    }

}