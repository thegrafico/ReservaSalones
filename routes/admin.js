var express = require('express'); //server
var router = express.Router(); //router


/* GET users listing. */
router.get('/admin', function(req, res, next) {

  var layout = './Admin/admin';
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('error', 'Flash is back!')
    res.render(layout);
});

module.exports = router;
