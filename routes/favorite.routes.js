const {Router} = require('express');
const router = Router();
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth.middleware');

router.post(
    '/add',
    auth,
    async(req, res) => {
        try {
            const pokemonLink = req.body.link;

            const existing = await Favorite.findOne({$and : [{link: pokemonLink}, {owner: req.user.userId}]});
            if(existing) {
                res.json({
                    status: 400,
                    message: "Pokemon exists"
                });

            } else {
                const addFavorite = new Favorite({link: pokemonLink, owner: req.user.userId});
                await addFavorite.save();
                res.json({
                    status: 201,
                    message: "Pokemon added to favorite"
                });
            }

        }   catch (e) {
            res.json({
                status: 500,
                message: "Some error in routes"
            })
        }
    }
);

router.get(
    '/list',
    auth,
    async(req, res) => {
        try {
            console.log(req.user.userId);
            const listFavorite = await Favorite.find({owner: req.user.userId});
            res.json(listFavorite);

        }   catch (e) {
            res.json({
                status: 500,
                message: "Some error in routes"
            })
        }
    }
)

router.post(
    '/delete',
    auth,
    async(req, res) => {
        try {
            const pokemonLink = req.body.link;
            await Favorite.deleteOne({$and : [{link: pokemonLink}, {owner: req.user.userId}]});
            res.json({
                status: 201,
                message: "Pokemon deleted from favorites"
            });
        } catch (e) {
            res.json({
                status: 500,
                message: "Some error in routes"
            })
        }
    }
);

module.exports = router;