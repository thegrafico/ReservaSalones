var express         = require ('express');
var router          = express.Router ()
var roleCheckHelper = require ('../helpers/roleCheck');

router.get('/', function (req, res){
  var layName = './Admin/addRoom'
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

  let parms = { title: 'addRoom'};


  parms.user = userName;
  res.render(layName, parms);
});

module.exports = router;			//requirements for the code
