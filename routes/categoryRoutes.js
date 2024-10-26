import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controller/categoryController.js';

const router = express.Router();

router.post('/', createCategory);         // Tạo mới category
router.get('/', getAllCategories);        // Lấy tất cả categories
router.get('/:id', getCategoryById);      // Lấy một category theo ID
router.put('/:id', updateCategory);       // Cập nhật một category theo ID
router.delete('/:id', deleteCategory);    // Xóa một category theo ID

export default router;
