const Recipe = require("../models/Recipe");
const { validationResult } = require("express-validator");
// =====================================================
// ADD RECIPE
// =====================================================


exports.createRecipe = async (req, res, next) => {

const errors = validationResult(req);

if (!errors.isEmpty()) {
return res.status(400).json({
errors: errors.array()
});
}

try {

const title = req.body.title;

let imageUrl = "";

/* Search TheMealDB */
const response = await fetch(
`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(title)}`
);

const data = await response.json();

/* If found */
if (data.meals && data.meals.length > 0) {
imageUrl = data.meals[0].strMealThumb;
}

/* Save recipe */
const recipe = await Recipe.create({

...req.body,

imageUrl: imageUrl,

createdBy: req.user._id

});

res.status(201).json(recipe);

} catch (error) {
next(error);
}

};

// =====================================================
// GET RECIPES
// Supports:
// cuisine
// difficulty
// category
// isVeg=true
// isPopular=true
// maxTime=30
// search=text
// page
// limit
// =====================================================
exports.getRecipes = async (req, res, next) => {
  try {
    const {
      cuisine,
      difficulty,
      category,
      isVeg,
      isPopular,
      maxTime,
      search,
      page = 1,
      limit = 6
    } = req.query;

    const query = {};

    // cuisine filter
    if (cuisine) {
      query.cuisine = {
        $regex: cuisine,
        $options: "i"
      };
    }

    // difficulty filter
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // category filter
    if (category) {
      query.category = category;
    }

    // veg filter
    if (isVeg === "true") {
      query.isVeg = true;
    }

    // popular filter
    if (isPopular === "true") {
      query.isPopular = true;
    }

    // prep time filter
    if (maxTime) {
      query.prepTime = {
        $lte: Number(maxTime)
      };
    }

    // search filter
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          cuisine: {
            $regex: search,
            $options: "i"
          }
        },
        {
          ingredients: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    const recipes = await Recipe.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.json(recipes);

  } catch (error) {
    next(error);
  }
};

// =====================================================
// DELETE RECIPE
// =====================================================
exports.deleteRecipe = async (req, res, next) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.json({
      message: "Recipe deleted"
    });

  } catch (error) {
    next(error);
  }
};