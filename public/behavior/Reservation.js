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
  $('.datepicker').datepicker();
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
