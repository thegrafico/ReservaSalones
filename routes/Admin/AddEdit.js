var express         = require ('express');
var router          = express.Router ()
var roleCheckHelper = require ('../../helpers/roleCheck');

router.get('/', function (req, res){
  var layName = './Admin/AddEdit'
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

  let parms = { title: 'AddEdit',urlAdd: '/addRoom', urlEdit: '/editRoom'};


  parms.user = userName;
  res.render(layName, parms);
});

module.exports = router;			//requirements for the code  
