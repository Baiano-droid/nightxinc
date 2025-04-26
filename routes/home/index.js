const router = require('express').Router();

router.get('/', async (req, res) => {
    return res.render('index');  
});

module.exports = router;
