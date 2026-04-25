const { body } = require("express-validator");

exports.recipeValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("ingredients")
        .isArray({ min: 1 })
        .withMessage("At least one ingredient is required"),

    body("cuisine")
        .notEmpty()
        .withMessage("Cuisine is required"),

    body("difficulty")
        .isIn(["easy", "medium", "hard"])
        .withMessage("Difficulty must be easy, medium, or hard")
];