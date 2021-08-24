import express from 'express';
// TODO: For route protection
// import { verifyAuth } from '../middleware/auth.js';
import { addMember, updateMember, deleteMember, fetchMemberById, fetchMembersByCampfireId } from '../controllers/member.js';

const router = express.Router();

router.post('/member', addMember);
router.get('/member/:id', fetchMemberById);
router.patch('/member/:id', updateMember);
router.delete('/member/:id', deleteMember);
router.get('/campfires/:id/members', fetchMembersByCampfireId);

export default router;
