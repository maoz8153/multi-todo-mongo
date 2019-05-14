import { createServer, Server } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { MongodbService } from './core/mongodb.service.core';
import { UserRoute } from './routes/user.route';
import { SubjectRoute } from './routes/subject.route';
import { TaskRoute } from './routes/task.route';
import { Router } from 'express'
import { ConfigService, IConfig } from './core/config.service.core';


export class NodeServer {
    private app: express.Application;
    private router: Router;
    private server: Server;
    private config: IConfig;

    constructor() {
        this.initEnvSettings();
        this.createApp();
        this.createServer();
        this.initExpressMiddleWare()
        this.createDbConnection();
        this.initRoutes();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private initEnvSettings(): void {
        this.config = new ConfigService().environment;
    }

    private initExpressMiddleWare(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private createDbConnection() {
        const dbConn = new MongodbService(this.config.DB_URI, this.config.DB_NAME);
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private initRoutes(): void {
        this.router = Router();
        new UserRoute(this.router);
        new SubjectRoute(this.router);
        new TaskRoute(this.router);
        this.app.use(this.router);
    }


    private listen(): void {
        this.server.listen(this.config.NODE_PORT, () => {
            console.log('Running server on port %s', this.config.NODE_PORT);
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
