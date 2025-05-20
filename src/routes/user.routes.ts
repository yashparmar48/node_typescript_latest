import express from 'express';
import { createPostHandler, createUserHandler, fetchUsersHandler, fetchUsersWithPostsHandler } from '../controller/user.controller';
import { authenticateJWT } from '../middlware/authMiddleware';

const router = express.Router();

router.get('/users', authenticateJWT, fetchUsersHandler);
router.post('/users', createUserHandler);

router.post('/posts', authenticateJWT, createPostHandler);
router.get('/users-with-posts', authenticateJWT, fetchUsersWithPostsHandler);

export default router;