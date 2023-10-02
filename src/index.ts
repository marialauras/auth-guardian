import * as express from "express"
import Person from "@/person"
import { Request, Response } from "express"
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users"
import { GetUsersController } from "./controllers/get-users/get-users"

const app = express()

const person = new Person()

app.get("/", (req: Request, res: Response) => {
    res.send(person.sayBye())
})

app.get("/users", async (req: Request, res: Response) => {
    const mongoGetsersRepository = new MongoGetUsersRepository()
    const getUsersController = new GetUsersController(mongoGetsersRepository)
    const { body, statusCode } = await getUsersController.handle()

    res.send(body).status(statusCode)
})

app.listen(3000, () => console.log("listen on port 3000"))
