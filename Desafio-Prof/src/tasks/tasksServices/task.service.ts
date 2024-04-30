import taskModel from '../tasksSchemas/task.schema';
import { taskType } from '../tasksTypes/task.type';

class TaskService {
    async create(task: taskType) {
        return await taskModel.create(task);
    }

    async findAll() {
        return await taskModel.find();
    }

    async findById(id: string) {
        const foundTask = await taskModel.findById(id);
        if (!foundTask) {
            throw new Error(`Tarefa com id ${id} não encontrada`);
        }
        return foundTask;
    }

    async update(id: string, task: Partial<taskType>) {
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            { ...task },
            { new: true }
        );

        if (!updatedTask) {
            throw new Error(`Tarefa com id ${id} não encontrada para atualização`);
        }

        return updatedTask;
    }

    async delete(id: string) {
        const deletedTask = await taskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            throw new Error(`Tarefa com id ${id} não encontrada para remoção`);
        }

        return { message: "Tarefa removida com sucesso" };
    }
}

export default new TaskService();
