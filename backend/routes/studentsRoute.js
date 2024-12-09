import express from "express";
import { createStudent, deleteStudent, getStudents, updateStudent } from "../controllers/studentControllers.js";
const router = express.Router();

router.get('/', getStudents)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router;