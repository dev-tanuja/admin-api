const Category = require("../models/Category");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create a new category
exports.add = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

    // Validate required fields
    if (!name || !slug ) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    // Check if slug already exists
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: "Category with this slug already exists" });
    }

    const category = new Category({ name, slug, status });
    await category.save();

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all categories
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.get = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update category
exports.update = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

    if (!name || !slug || !["Active", "Disable"].includes(status)) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug, status },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete category
exports.delete = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({ slug: req.params.slug });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

