const {Router} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config');

const router = Router();

// /api/auth/register
router.post (
    '/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Введены не коректные данные при регистрации'
                })
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await  user.save()
            res.status(201).json({message: 'Пользователь создан'})
        } catch (e) {
            res.status(500).json ({message: "Something went wrong"})
        }
})
//  /api/auth/login
router.post (
    '/login',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Введены не коректные данные при входе в систему'
                })
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (!candidate) {
                return res.status(400).json({message:'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, candidate.password)
            if(!isMatch) {
                return res.status(400).json({message:'Пароль не верный, попробуйте снова'})
            }
            const token = jwt.sign(
                {userId: candidate.id},
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )

            res.json({token, userId: candidate.id} )

        } catch (e) {
            res.status(500).json ({massage: "Something went wrong"})
        }
    })

module.exports = router