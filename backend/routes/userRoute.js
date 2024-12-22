import express from 'express';
import { createUser,bookVisit,allBookings } from '../controller/userCntrl.js';

const userRoute = express.Router();



// Route to handle user registration


userRoute.post('/register', createUser);
userRoute.post('/bookvisit/:id',bookVisit);
userRoute.get('/allBookings',allBookings);

export default userRoute; 


// Corrected export
