import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
