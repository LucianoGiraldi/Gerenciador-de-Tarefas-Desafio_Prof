import { Request, Response, NextFunction } from "express";
import taskService from "../tasksServices/task.service";

class TaskController {
    private async handleResponse(
        res: Response,
        serviceCall: () => Promise<any>,
        successStatus: number = 200
    ) {
        try {
            const result = await serviceCall();
            res.status(successStatus).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    create(req: Request, res: Response) {
        this.handleResponse(res, () => taskService.create(req.body), 201);
    }

    findAll(req: Request, res: Response) {
        this.handleResponse(res, () => taskService.findAll());
    }

    findById(req: Request, res: Response) {
        this.handleResponse(res, () => taskService.findById(req.params.id));
    }

    update(req: Request, res: Response) {
        this.handleResponse(res, () => taskService.update(req.params.id, req.body));
    }

    delete(req: Request, res: Response) {
        this.handleResponse(res, () => taskService.delete(req.params.id));
    }
}

export default new TaskController();
