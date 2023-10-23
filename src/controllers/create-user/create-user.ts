import { User } from "@/models/user"
import { HttpRequest, HttpResponse } from "../protocols"
import {
    CreateUserParams,
    ICreateUserController,
    ICreateUserRepository,
} from "./protocols"

export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}
    async handle(
        httpResquest: HttpRequest<CreateUserParams>,
    ): Promise<HttpResponse<User>> {
        try {
            if (!httpResquest.body) {
                return { statusCode: 400, body: "Please specify a body." }
            }
            const user = await this.createUserRepository.createUser(
                httpResquest.body,
            )
            return {
                statusCode: 201,
                body: user,
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong.",
            }
        }
    }
}
