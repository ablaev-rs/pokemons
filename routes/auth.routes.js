const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');


router.post(
    '/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min length 6 symbols').isLength({min:6})
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.json({
                    status: 400,
                    message: "Incorrect data"
                })
            }

            const email = req.body.email;
            const password = req.body.password;
            const candidate = await User.findOne({email:email});
            if(candidate) {
                res.json({
                    status: 400,
                    message: "User already exists"
                })
            }

            const hashedPass = await bcrypt.hash(password, 12);
            const user = new User({ email: email, password: hashedPass });
            await user.save();
            res.json({
                status: 201,
                message: "Success! User registered"
            })


        }   catch (e) {
            res.json({
                status: 500,
                message: "Some error in routes"
            })
        }
    }
)


router.post(
    '/signin',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json({
                    status: 400,
                    message: "Incorrect data"
                })
            }

            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({ email: email });
            if(!user) {
                res.json({
                    status: 400,
                    message: "User not found"
                })
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                res.json({
                    status: 400,
                    message: "Wrong password"
                })
            }




            const token = jwt.sign (
                { userId: user.id },
                config.get('jwtSecret'),
                {
                    algorithm: 'HS256',
                    expiresIn: config.get('jwtExpirySeconds')
                }
                );


            res.json({token, userId: user.id});


        } catch (e) {
            res.json({
                status: 500,
                message: "Some error in routes"
            })
        }
    }
)

module.exports = router;