/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from "body-parser"
import express from "express"
import helmet from "helmet"
import { connectToDb } from "./db/db"
import boatRouter from "./routes/boats.route"
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const morgan = require("morgan")

export const app = express()

connectToDb()

app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"))
app.set("trust proxy", "loopback, linklocal, uniquelocal")

app.use(express.json({ limit: "6mb" }))
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "form-action": ["'none'"],
            "style-src": ["'none'"],
            "font-src": ["'none'"]
        }
    })
)

const port = process.env.PORT || "8000"

app.use("/boats", boatRouter)

app.listen(port, () => {
    console.log(`server started at :${port}`)
})
