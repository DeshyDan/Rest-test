import express from 'express'
import http from 'http'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import config from 'config'

const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())


const server = http.createServer(app)

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080/")
})

const MONGO_URL: string = config.get("Mongo.URL")

async function connectToMongo() {
    try {

        await mongoose.connect(MONGO_URL)
        console.log("Successfully connected to Mongo")

    } catch (err) {
        console.log(`Could not connect to Mongo: ${err}`)
    }
}

connectToMongo()

