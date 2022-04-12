const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      name: req.body.name,
      prep_Time: req.body.prep_Time,
      cook_Time: req.body.cook_Time,
      cool_Time: req.body.cool_Time,
      description: req.body.description,
      photos: req.body.photos
    });
    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        name: req.body.name,
        prep_Time: req.body.prep_Time,
        cook_Time: req.body.cook_Time,
        cool_Time: req.body.cool_Time,
        description: req.body.description,
        photos: req.body.photos
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No Recipe found!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;