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
      format: 'ddd, mmm, dd,yyyy',
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

// $(document).ready(function(){
//     $('.check').click(function() {
//         $('.check').not(this).prop('checked', false);
//     });
// });
