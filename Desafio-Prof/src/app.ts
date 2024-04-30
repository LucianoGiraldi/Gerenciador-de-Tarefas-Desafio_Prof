import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './userRoutes';
import taskRoutes from './taskRoutes';
import categoryRoutes from './categoryRoutes';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.database();
        this.errorHandler();
    }

    private middleware() {
        this.express.use(express.json()); // Adiciona suporte para JSON
    }

    private async database() {
        const dbUri = 'mongodb://localhost:27017/userTask';
        try {
            await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Conectado ao Banco de Dados');
        } catch (error: any) {
            console.error('Erro na conexão com o Banco de Dados:', error.message);
        }
    }

    private routes() {
        this.express.use('/users', userRoutes);
        this.express.use('/tasks', taskRoutes);
        this.express.use('/categories', categoryRoutes);
    }

    private errorHandler() {
        this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(`Erro: ${err.message}`);
            res.status(500).json({ error: err.message || 'Erro interno do servidor' });
        });
    }
}

export default new App().express;
