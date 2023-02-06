/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from "body-parser"
import cors from "cors"
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

// set json limits
app.use(express.json({ limit: "1mb" }))
// set url encoding options
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))

// set security constraints
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

app.use(
    cors({
        origin: "*"
    })
)

// set port according to environment variable or default to 8000
const port = process.env.PORT || "8000"

// set routes
app.use("/boats/v1", boatRouter)

// start server and log port
app.listen(port, () => {
    console.log(`server started at :${port}`)
})
