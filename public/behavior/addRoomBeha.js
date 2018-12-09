$('.dropdown-trigger').dropdown();

$(document).ready(function(){
  $('.timepicker').timepicker(
  {
    twelveHour:false,
    defaultTime:12,
  }
  );
});

$(document).ready(function(){
  $('select').formSelect();
});


$(document).ready(function(){
 $('.collapsible').collapsible();
});
