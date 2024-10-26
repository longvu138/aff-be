import Category from "../models/categories.js";

// Tạo mới một category
export const createCategory = async (req, res) => {
    try {
        const { code, name } = req.body;
        const category = await Category.create({ code, name });
        res.status(201).json({ message: 'Category created successfully', data: category });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
};

// Lấy tất cả các category
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ data: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};

// Lấy một category theo ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (category) {
            res.status(200).json({ data: category });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }
};

// Cập nhật một category theo ID
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name } = req.body;
        
        const category = await Category.findByPk(id);
        if (category) {
            await category.update({ code, name });
            res.status(200).json({ message: 'Category updated successfully', data: category });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

// Xóa một category theo ID
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        
        if (category) {
            await category.destroy();
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};
