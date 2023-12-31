import {
    IGetUsersController,
    IGetUsersRepository,
} from "@/controllers/get-users/protocols"

export class GetUsersController implements IGetUsersController {
    constructor(private readonly getUsersRepository: IGetUsersRepository) {}
    async handle() {
        try {
            //validar requisição
            const users = await this.getUsersRepository.getUsers()

            return {
                statusCode: 200,
                body: users,
            }

            //direcionar chamada para o Repository
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong.",
            }
        }
    }
}
