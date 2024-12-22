import express from 'express';
import { createResidency ,getAllResidencies,getResidency} from '../controller/residencyCntrl.js';

const residencyRoute = express.Router();

// Route to handle residency creation
residencyRoute.post('/create', createResidency);
residencyRoute.get('/allread', getAllResidencies);
residencyRoute.get("/:id",getResidency);
export default residencyRoute; // Corrected export
