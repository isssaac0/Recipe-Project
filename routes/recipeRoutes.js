const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
createRecipe,
getRecipes,
deleteRecipe
} = require("../controllers/recipeController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

/* CREATE RECIPE (logged in user) */
router.post(
"/",
protect,
[
body("title")
.notEmpty()
.withMessage("Title is required"),

body("cuisine")
.notEmpty()
.withMessage("Cuisine is required"),

body("prepTime")
.isNumeric()
.withMessage("Prep time must be number")
],
createRecipe
);

/* GET RECIPES (public) */
router.get("/", getRecipes);

/* DELETE RECIPE (admin only) */
router.delete(
"/:id",
protect,
authorizeRoles("admin"),
deleteRecipe
);

module.exports = router;