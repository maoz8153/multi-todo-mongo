import { Router } from 'express'
import { TaskController } from '../controllers/task.controller';

export class TaskRoute {

    private taskController: TaskController;

    constructor(router: Router) {
        this.taskController = new TaskController();
        this.createRoutes(router);
    }

    private createRoutes(router: Router) {
        router.get('/api/subjects/:subjectId/tasks', this.taskController.getTaskListBySubject.bind(this.taskController));
        router.post('/api/tasks', this.taskController.createTask.bind(this.taskController));
        router.put('/api/tasks/:tasksId', this.taskController.updateTask.bind(this.taskController));
        router.delete('/api/tasks/:tasksId', this.taskController.deleteTask.bind(this.taskController));
    }

}