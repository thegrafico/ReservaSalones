var express = require('express')
var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the home page route
//basically page response as in the layout, buttons, all html stuff, etc
router.get('/', function (req, res) {

  //saves name of the layout being used
  //the hbs file that will be presented in the webpage

  //sets up the name of the layout to be displayed
  var layName = 'STUD_APP_HUB_PT1';
  //sets up window title
  var titleName = 'Appointment';
  //records userName again to display in the tab
  const userName = req.cookies.graph_user_name;
  //object that will be sent to the hbs fie for the variables to be displayed
  let parms = {title: titleName}

  //devines a variable in the object parms and defines it as the userName
  parms.user = userName;
//it reanders the webpage visual and styling elements
  res.render(layName, parms);


//res.send('Birds home page')
})
// // define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

module.exports = router
