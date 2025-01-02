import express from 'express';
import { createResidency ,getAllResidencies,getResidency} from '../controller/residencyCntrl.js';
import jwtCheck from '../config/auth0config.js';

const residencyRoute = express.Router();

// Route to handle residency creation
residencyRoute.post('/create',jwtCheck, createResidency);
residencyRoute.get('/allread', getAllResidencies);
residencyRoute.get("/:id",getResidency);
export default residencyRoute; // Corrected export
