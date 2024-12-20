import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {userRoute} from './routes/userRoute.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('./api/user'.userRoute);

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
