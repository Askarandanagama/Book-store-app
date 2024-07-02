import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js"; // Correct import
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for handling CORS POLICY
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('App is connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
