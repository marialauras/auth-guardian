import { User } from "@/models/user"
import {
    IUpdateUserController,
    IUpdateUserRepository,
    UpdateUserParams,
} from "./protocols"
import { HttpRequest, HttpResponse } from "../protocols"

export class UpdateUserController implements IUpdateUserController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id
            const body = httpRequest?.body

            if (!id) {
                return {
                    statusCode: 400,
                    body: "Missing user id",
                }
            }

            const allowedFilds: (keyof UpdateUserParams)[] = [
                "firstName",
                "lastName",
                "password",
            ]
            const fieldNotAllowed = Object.keys(body).some(
                (key) => !allowedFilds.includes(key as keyof UpdateUserParams),
            )

            if (fieldNotAllowed) {
                return {
                    statusCode: 400,
                    body: "Some received field is not allowed",
                }
            }

            const user = await this.updateUserRepository.updateUser(id, body)

            return {
                statusCode: 200,
                body: user,
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong",
            }
        }
    }
}
