import express from 'express';
import { createUser,bookVisit,allBookings,cancelBooking, toFav } from '../controller/userCntrl.js';

const userRoute = express.Router();



// Route to handle user registration


userRoute.post('/register', createUser);
userRoute.post('/bookvisit/:id',bookVisit);
userRoute.get('/allBookings',allBookings);
userRoute.get('/removeBooking/:id',cancelBooking);
userRoute.get('/toFav/:rid',toFav)

export default userRoute; 


// Corrected export
