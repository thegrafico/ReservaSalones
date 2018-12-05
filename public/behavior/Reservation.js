// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.dropdown-trigger');
//   var instances = M.Dropdown.init(elems, options);
// });

// Or with jQuery

$('.dropdown-trigger').dropdown();

// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.datepicker');
//   var instances = M.Datepicker.init(elems, options);
// });

// Or with jQuery

$(document).ready(function(){
  $('.datepicker').datepicker({
    //where all options for datepicker are changed
    disableWeekends: true,
    yearRange: 0,
    minDate: 0,
    autoClose: true,
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

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('select');
  //   var instances = M.FormSelect.init(elems, options);
  // });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  });

  // document.addEventListener('DOMContentLoaded', function() {
  //     var elems = document.querySelectorAll('.timepicker');
  //     var instances = M.Timepicker.init(elems, options);
  //   });

    // Or with jQuery

    $(document).ready(function(){
      $('.timepicker').timepicker(
      {
        defaultTime:12,
      }
      );
    });


    // document.addEventListener('DOMContentLoaded', function() {
    //    var elems = document.querySelectorAll('.collapsible');
    //    var instances = M.Collapsible.init(elems, options);
    //  });

     // Or with jQuery

     $(document).ready(function(){
       $('.collapsible').collapsible();
     });
