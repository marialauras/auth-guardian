import { IGetUsersRepository } from "@/controllers/get-users/protocols"
import { User } from "@/models/user"

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [
            {
                firstName: "Maria Laura",
                lastName: "Moreira",
                email: "marialauras@gmail.com",
                password: "123",
            },
        ]
    }
}
