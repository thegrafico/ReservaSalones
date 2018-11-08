var express = require('express'); //server
var router = express.Router(); //router

/* GET users listing. */
router.get('/admin', function(req, res, next) {
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('error', 'Flash is back!')
    res.render('admin');
});

module.exports = router;
