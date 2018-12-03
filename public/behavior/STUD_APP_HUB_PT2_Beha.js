// var express = require('express');
// var dataB = require("../helpers/mysqlConnection").mysql_pool;

// Date Picker Javascript Starts
$(document).ready(function(){
  $('select').formSelect();
});

  $(document).ready(function(){
    $('.datepicker').datepicker({

      //where all options for datepicker are changed
      disableWeekends: true,
      format: 'ddd, mmm dd,yyyy',
      onSelect:function (dateText, inst)
       {

           var getKeys = function(obj){
           var keys = [];
           for(var key in obj){
              keys.push(key);
           }
           return keys;
         }
         var day = dateText.getDay();
         switch (day){
           case 1: day = "Mon"
                  break;
           case 2: day = "Tue"
                  break;
           case 3: day = "Wed"
                  break;
           case 4: day = "Thu"
                  break;
           case 5: day = "Fri"
                  break;
           default: break;
         }
            console.log(day);
       }
    });
  });
// Date Picker Javascript Ends

// This is for the checkbox
console.log();

$(document).ready(function(){
    $('.check').click(function() {
        $('.check').not(this).prop('checked', false);
    });
});


// var name = "professorName";
// var email = "professorEmail";
// var description = "Department";
// var parms = {title: titleName}  //object that will be sent to the hbs fie for the variables to be displayed
// //initializes the different variables of parms that will be used in the hbs
//
// parms [name] = new Object();
// parms [email] = new Object();
// parms [description] = new Object();
//
//
// //defines the name of the professor table as a variable
// var professor = 'Professor';
//
// //defines the query i want to make
// let query = `SELECT name, email, start, end, Day
//              FROM Users NATURAL JOIN ProfHours
//              WHERE email = '${profEmail}'`;
//
// // // establishes connection to database
// // dataB.getConnection(function(err, connection){
// //
// // //to make the query to the dataBase
// // connection.query(query, function(error, results, fields){
// //
// // //result of query is called results
// // //it is an array
// // //which the first index is given by
// // //and the second is given by name
// // // an example of how to call a similar array would be like
// // // var array1 = {once: "once", twice: "twice"}
// // // var array2 = [array1];
// // // console.log(array2[0]["once"]);
// // //example using the results array
// // //console.log(results[0]["profName"]);
// //
// //
// // if (error) throw error;
// //    //console.log(a);
// //    parms.results = results;
// //    parms.profName = results[0]["name"];
// //    parms.profEmail = results[0]["email"];
// // })
// // })
