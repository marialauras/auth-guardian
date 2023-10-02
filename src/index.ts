import * as express from "express"
import Person from "@/person"
import { Request, Response } from "express"

const app = express()

const person = new Person()

app.get("/", (req: Request, res: Response) => {
    res.send(person.sayBye())
})

app.listen(3000, () => console.log("listen on port 3000"))
