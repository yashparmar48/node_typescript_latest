import express from 'express';
import { createUserHandler, fetchUsersHandler } from '../controller/user.controller';
import { authenticateJWT } from '../middlware/authMiddleware';

const router = express.Router();

router.get('/users',authenticateJWT, fetchUsersHandler);
router.post('/users',createUserHandler);

export default router;