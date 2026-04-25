const express = require("express");
const router = express.Router();

const {
    createRecipe,
    getRecipes,
    deleteRecipe
} = require("../controllers/recipeController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");

//Validators
const { recipeValidation } = require("../validators/recipeValidator");

// Create recipe (logged in users)
router.post("/", protect, recipeValidation, validate, createRecipe);

// Get recipes (public)
router.get("/", getRecipes);

// Delete recipe (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteRecipe);




module.exports = router;