import express from 'express'
import { userControllers } from './user.controller';

const router = express.Router()

router.post('/create-students', userControllers.createStudent)

export const userRoutes= router;