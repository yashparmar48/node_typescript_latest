import express from 'express';
import { createUserHandler, fetchUsersHandler } from '../controller/user.controller';

const router = express.Router();

router.get('/users', fetchUsersHandler);
router.post('/users', createUserHandler);

export default router;