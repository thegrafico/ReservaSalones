$('.js-pscroll').each(function(){
  var ps = new PerfectScrollbar(this);

  $(window).on('resize', function(){
    ps.update();
  })
});
//--------------------inicializar el datepiker-------------------
$(document).ready(function(){
  $('select').formSelect();
});

$(document).ready(function(){
  $('.datepicker').datepicker();
});

//-----------------end datepiker----------------------

// //para que no actualize siempre
// $("#formReservation").submit(function(e) {
//     e.preventDefault();
// });

//function when button is clicked
function ckechBtn(){
  var checkedValue =  $(".reserveChoose" ).val();
  checkedValue.forEach(function(elem){
    console.log(elem);
  });
  return true;
}

$('.roomID').change(function () {
  // alert($(this).val());
});

//function that activate when a select option changes
$(function() {
  $(".roomID").on('change', function() {
    // alert($(this).val());
  });
});
//btn for form reservation submit
function reservationbtn(){

  //check if checkbox is working
  $('input:checkbox.roomID').each(function () {
      var sThisVal = (this.checked ? $(this).val() : undefined);
      if(sThisVal != undefined){
        // alert(sThisVal);
      }
    });

    if(!$(".reserveChoose" ).val()){
      
    }

  // alert("Pase por aqui");

  return true;
}
