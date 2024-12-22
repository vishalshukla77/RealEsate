import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import residencyRoute from './routes/residencyRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Define routes
app.use('/api/user', userRoute); // Corrected route path
app.use('/api/residency', residencyRoute);

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
