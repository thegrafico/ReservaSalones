// Date Picker Javascript Starts
$(document).ready(function(){
  $('select').formSelect();
});

$(document).ready(function(){
  $('.datepicker').datepicker();
});
// Date Picker Javascript Ends

// This is for the checkbox

$(document).ready(function(){
    $('.check').click(function() {
        $('.check').not(this).prop('checked', false);
    });
});
