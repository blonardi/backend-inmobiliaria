import express from 'express'
import { registerUser, loginUser, getUserProfile } from '../controllers/users.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';


export const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/profile', authMiddleware, getUserProfile);