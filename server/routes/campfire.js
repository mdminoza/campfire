import express from 'express';
// TODO: For route protection
// import { verifyAuth } from '../middleware/auth.js';
import { fetchCampfires, fetchCampfireById, createCampfire, updateCampfire, deleteCampfire } from '../controllers/campfire.js';

const router = express.Router();

router.get('/campfires', fetchCampfires);
router.get('/campfires/:id', fetchCampfireById)
router.post('/campfires', createCampfire);
router.patch('/campfires/:id', updateCampfire);
router.delete('/campfires/:id', deleteCampfire);

export default router;
