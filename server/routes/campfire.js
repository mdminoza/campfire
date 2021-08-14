import express from 'express';
import { fetchCampfires, fetchCampfireById, createCampfire, updateCampfire, deleteCampfire } from '../controllers/campfire.js';

const router = express.Router();

router.get('/', fetchCampfires);
router.get('/:id', fetchCampfireById)
router.post('/', createCampfire);
router.patch('/:id', updateCampfire);
router.delete('/:id', deleteCampfire);

export default router;
