import { Request, Response, NextFunction } from "express";
import categoryService from "../Services/category.service";

class CategoryController {
    private async handleRequest(
        res: Response,
        serviceMethod: () => Promise<any>,
        successStatus: number = 200
    ) {
        try {
            const result = await serviceMethod();
            res.status(successStatus).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create(req: Request, res: Response) {
        return this.handleRequest(res, () => categoryService.create(req.body), 201);
    }

    findAll(req: Request, res: Response) {
        return this.handleRequest(res, () => categoryService.findAll());
    }

    findById(req: Request, res: Response) {
        return this.handleRequest(res, () => categoryService.findById(req.params.id));
    }

    update(req: Request, res: Response) {
        return this.handleRequest(res, () => categoryService.update(req.params.id, req.body));
    }

    delete(req: Request, res: Response) {
        return this.handleRequest(res, () => categoryService.delete(req.params.id));
    }
}

export default new CategoryController();