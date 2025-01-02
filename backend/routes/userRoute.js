import express from 'express';
import { createUser,bookVisit,allBookings,cancelBooking, toFav,allFav } from '../controller/userCntrl.js';
import jwtCheck from '../config/auth0config.js';

const userRoute = express.Router();



// Route to handle user registration


userRoute.post('/register',jwtCheck, createUser);
userRoute.post('/bookvisit/:id',jwtCheck,bookVisit);
userRoute.post('/allBookings',allBookings);
userRoute.post('/removeBooking/:id',jwtCheck,cancelBooking);
userRoute.post('/toFav/:rid',jwtCheck,toFav)
userRoute.post('/allFav',jwtCheck,allFav);
export default userRoute; 


// Corrected export
