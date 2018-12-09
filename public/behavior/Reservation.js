<<<<<<< HEAD

=======
>>>>>>> a6c346f6a71ea6cecb50e585ff117ffce7258048
$('.dropdown-trigger').dropdown();

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

<<<<<<< HEAD
$(document).ready(function(){
  $('select').formSelect();
});

$(document).ready(function(){
  $('.timepicker').timepicker(
  {
    defaultTime:12,
    twelveHour: false
  }
  );
});

$(document).ready(function(){
 $('.collapsible').collapsible();
})
=======
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
        twelveHour:false,
        defaultTime:12,
      }
      );
    });


$(document).ready(function(){
 $('.collapsible').collapsible();
});
>>>>>>> a6c346f6a71ea6cecb50e585ff117ffce7258048
