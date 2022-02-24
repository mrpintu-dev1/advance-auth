// external imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

const __dirname = path.resolve();

// internal import 
import authRouter from "./routes/authRouter.js";
import privateRouter from "./routes/private.js";
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

// initialize app and configuration .env
const app = express();
dotenv.config();

// handle json request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// request handle for auth
app.use('/api/auth', authRouter);
app.use('/api/private', privateRouter);

// not found handler
app.use(notFound);

// Error handler 
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api running')
    })
}


// initialize port, connection database and listening server
const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    app.listen(port, () => console.log(`Server listening at port no: ${port}`))
}).catch((err) => console.log(err));

// rejection handling
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})