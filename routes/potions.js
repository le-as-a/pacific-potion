const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require('../auth')
const { userValidators, loginValidators } = require('./authValidations')
const router = express.Router();


/* GET users listing. */
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const potion = await db.Potion.findOne({
    where: {
      id: req.params.id
    },
    include: db.PotionType
  });
  res.render('potion-detail', { potion });
}));

/* GET new-potions */
router.get('/potion/add', csrfProtection, (req, res) => {
  const potionTypes = db.PotionType.findAll()
  return res.render('new-potion', { csrfToken: req.csrfToken(), potionTypes });
});

/* POST new-potions */

router.post('/potion/add', csrfProtection, asyncHandler(async (req, res) => {
  const { name, description, type } = req.body
  await Potion.create({
    name,
    description,
    type
  });
  res.redirect('/');
}));

/*DELETE GET potion*/

router.get('/potion/delete/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const potionId = parseInt(req.params.id, 10);
    const potion = await db.Potion.findByPk(potionId);
    res.render('potion-delete', {
      potion,
      csrfToken: req.csrfToken(),
    });
  }));

// // /*POST DELETE potion*/

router.post('/potion/delete/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const potionId = parseInt(req.params.id, 10);
    const potion = await db.Potion.findByPk(potionId);
    await potion.destroy();
    res.redirect('/potions');
  }));







module.exports = router;
