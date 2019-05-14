import { Router } from 'express'
import { SubjectController } from '../controllers/subject.controller';



export class SubjectRoute {

    private subjectController: SubjectController;

    constructor(router: Router) {
        this.subjectController = new SubjectController();
        this.createRoutes(router);
    }

    private createRoutes(router: Router) {
        router.get('/api/users/:userId/subjects', this.subjectController.getSubjectListAndTaskCounterByUserId.bind(this.subjectController));
        router.post('/api/subjects', this.subjectController.createSubject.bind(this.subjectController));
        router.put('/api/subjects/:subjectId', this.subjectController.updateSubject.bind(this.subjectController));
        router.delete('/api/subjects/:subjectId', this.subjectController.deleteSubject.bind(this.subjectController));
    }

}