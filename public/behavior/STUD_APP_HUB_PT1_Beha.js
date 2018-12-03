function getProf(){
  var input = $(this).text();
  return input;
}

$(document).ready(function(){
  $('b').on('click',getProf());
});



var input = getProf();
