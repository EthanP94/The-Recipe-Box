const router = require("express").Router();
const { Recipe } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({});

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(req.session);

    res.render("homepage", {
      recipes,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Recieveing singular recipe by ID
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id)

    const recipes = recipeData.get({ plain: true });
    console.log(recipes)
    res.render('recipe', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// End
router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
