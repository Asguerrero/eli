var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var selected_color;
var rectWidth;
var rectHeight


// Resize canvas 
$(document).ready(function(){
    console.log($(window).width(), $(window).height());
    canvas.width=  $(".picture-canvas").width();
    canvas.height =  $(".picture-canvas").height();
    selected_color = 'black';
    rectWidth = 10;
    rectHeight = 10;
});


canvas.addEventListener('click', (event) => {
  const rectX = event.offsetX - 5;
  const rectY = event.offsetY - 5;
  ctx.fillStyle = selected_color;
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

});

$(".increase").on("click", function (event) {
    var example_rectangle = $(".example-rectangle");
    var updated_width = example_rectangle.width() + 10;
    var updated_heigth = example_rectangle.height() + 10;
    example_rectangle.width(updated_width);
    example_rectangle.height(updated_heigth);
    rectWidth = updated_width;
    rectHeight = updated_heigth;
});

$(".decrease").on("click", function (event) {
    var example_rectangle = $(".example-rectangle");
    var updated_width = example_rectangle.width() - 10;
    var updated_heigth = example_rectangle.height() - 10;
    example_rectangle.width(updated_width);
    example_rectangle.height(updated_heigth);
    rectHeight = updated_heigth;
    rectWidth = updated_width;
});

// $(".done").on("click", function (event) {(

// )};

$(".color-option").on("click", function (event) {
    var color = $(event.currentTarget).attr("class").split(/\s+/)[0];
    switch(color) {
        case "beige":
            selected_color = "#dad3c4";
          break;
        case "green":
            selected_color =  "#54750b";
          break;
        case "brown":
        selected_color = "#80743f";
        break;
        case "white":
            selected_color =  "white";
        break;
        case "yellow":
            selected_color =  "yellow";
        break;
        case "orange":
            selected_color =  "orange";
        break;
        case "black":
            selected_color =  "black";
        break;
        case "red":
            selected_color =  "#C20029";
        break;
        case "pink":
            selected_color =  "#D19E89";
        break;
        case "dark-green":
            selected_color =  "#3E5902";
        break;
        default:
            selected_color = "black";
      }

      $(".example-rectangle").css("background-color", selected_color);
      

});