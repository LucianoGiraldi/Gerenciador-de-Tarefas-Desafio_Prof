import userModel from '../SchemasUser/user.schema';
import { userType } from '../Type/user.type';

class UserService {
    async create(user: userType) {
        try {
            const createdUser = await userModel.create(user);
            return createdUser;
        } catch (error: any) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const foundUsers = await userModel.find();
            return foundUsers;
        } catch (error: any) {
            throw new Error(`Erro ao buscar todos os usuários: ${error.message}`);
        }
    }

    async findById(id: string) {
        try {
            const foundUser = await userModel.findById(id);
            if (!foundUser) {
                throw new Error(`Usuário com ID ${id} não encontrado`);
            }
            return foundUser;
        } catch (error: any) {
            throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
        }
    }

    async update(id: string, user: Partial<userType>) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                id,
                { ...user },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error(`Usuário com ID ${id} não encontrado para atualização`);
            }
            return updatedUser;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    async delete(id: string) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(id);
            if (!deletedUser) {
                throw new Error(`Usuário com ID ${id} não encontrado para remoção`);
            }
            return { message: "Usuário removido com sucesso" };
        } catch (error: any) {
            throw new Error(`Erro ao remover usuário: ${error.message}`);
        }
    }
}

export default new UserService();
