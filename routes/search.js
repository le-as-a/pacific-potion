const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require('../auth')
const { userValidators, loginValidators } = require('./authValidations')
const router = express.Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


router.post('/', asyncHandler(async (req, res) => {
    let { search } = req.body

    //if no search term is defined, return all potions
    if (!search) {
        const results = await db.Potion.findAll({
            order: [['name']],
            include: db.PotionType,
        });
        res.render('search', { results, search });
    //else return the potion that was asked for
    } else {
        const results = await db.Potion.findAll({
            where: {
                name: { [Op.iLike]: `%${search}%` }
            },
            order: [['name']],
            include: db.PotionType
        });

        res.render('search', { results, search });
    }
}));

router.post('/type', asyncHandler(async (req, res) => {
    //search for the specific potion type asked for
    let { type } = req.body
    const results = await db.Potion.findAll({
        include: [{
            model: db.PotionType,
            where: { name: type }
        }]
    });
    console.log(results);
    res.render('search', { results, search });
}));


module.exports = router;
