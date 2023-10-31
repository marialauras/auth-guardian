import * as express from "express"
import Person from "@/person"
import { Request, Response } from "express"
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users"
import { GetUsersController } from "./controllers/get-users/get-users"
import { CreateUserController } from "./controllers/create-user/create-user"
import { MongoClient } from "./database/mongo"
import { config } from "dotenv"
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-users"
import { MongoUpdateUserRepository } from "./repositories/update-user/update-user"
import { UpdateUserController } from "./controllers/update-user/update-user"

const main = async () => {
    config()

    const app = express()
    app.use(express.json())
    await MongoClient.connect()

    const port = process.env.PORT

    app.listen(port, () => console.log("listen on port ", port))

    const person = new Person()

    app.get("/", (req: Request, res: Response) => {
        res.send(person.sayHello())
    })

    app.get("/users", async (req: Request, res: Response) => {
        const mongoGetsersRepository = new MongoGetUsersRepository()
        const getUsersController = new GetUsersController(
            mongoGetsersRepository,
        )
        const { body, statusCode } = await getUsersController.handle()

        res.status(statusCode).send(body)
    })

    app.post("/users", async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository()
        const createUserController = new CreateUserController(
            mongoCreateUserRepository,
        )
        const { body, statusCode } = await createUserController.handle({
            body: req.body,
        })

        res.status(statusCode).send(body)
    })

    app.patch("/users/:id", async (req, res) => {
        const mongoUpdateUserRepository = new MongoUpdateUserRepository()
        const updateUserController = new UpdateUserController(
            mongoUpdateUserRepository,
        )
        const { body, statusCode } = await updateUserController.handle({
            body: req.body,
            params: req.params,
        })

        res.status(statusCode).send(body)
    })
}

main()
