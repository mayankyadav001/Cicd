import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import blogRoutes from './routes/blogRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7001;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully.');
        app.use('/api', blogRoutes);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
