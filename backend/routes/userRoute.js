import express from 'express';
import { createUser,bookVisit,allBookings,cancelBooking, toFav,allFav } from '../controller/userCntrl.js';

const userRoute = express.Router();



// Route to handle user registration


userRoute.post('/register', createUser);
userRoute.post('/bookvisit/:id',bookVisit);
userRoute.post('/allBookings',allBookings);
userRoute.post('/removeBooking/:id',cancelBooking);
userRoute.post('/toFav/:rid',toFav)
userRoute.post('/allFav',allFav);
export default userRoute; 


// Corrected export
