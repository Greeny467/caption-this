const router = require('express').Router();

// Logout
// Route Works!!
router.post('/logout', (req, res) => {
    
    req.session.destroy(() => {
        res.status(204).redirect('/');
    });
    
});

module.exports = router;