import { Request, Response, NextFunction } from "express";
import userService from "../ServiceUser/user.service";

class UserController {
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
        this.handleResponse(res, () => userService.create(req.body), 201);
    }

    findAll(req: Request, res: Response) {
        this.handleResponse(res, userService.findAll);
    }

    findById(req: Request, res: Response) {
        this.handleResponse(res, () => userService.findById(req.params.id));
    }

    update(req: Request, res: Response) {
        this.handleResponse(res, () => userService.update(req.params.id, req.body));
    }

    delete(req: Request, res: Response) {
        this.handleResponse(res, () => userService.delete(req.params.id));
    }
}

export default new UserController();
