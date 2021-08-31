import express from 'express';
// TODO: For route protection
// import { verifyAuth } from '../middleware/auth.js';
import {
    fetchRandomUser,
    addUsers,
} from '../controllers/user.js';

const router = express.Router();

router.post('/user/random/add', addUsers);
router.get('/user/random/test', fetchRandomUser);

export default router;
