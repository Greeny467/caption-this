const router = require('express').Router();
const {User} = require('../../models');

// Create new user
router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        const userInfo = await dbUserData.get({ plain: true });
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userInfo.id
            req.session.username = req.body.username,

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;