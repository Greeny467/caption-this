const router = require('express').Router();

const { User } = require('../../models');

// Login
// Route works!! 
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password. Please try again!'});
        return;
        }

        const userPassword = await dbUserData.checkPassword(req.body.password);

        if (!userPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password. Please try again!'});
        return;
        }
        const userInfo = await dbUserData.get({ plain: true });
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userInfo.id
            req.session.username = req.body.username,
            res
            .status(200)
            // .json({ user: dbUserData, message: 'You are now logged in!'})
            .json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;