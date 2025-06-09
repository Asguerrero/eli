// Add event listener to all tools... error message if user selects option that cannot be selected. Otherwise, add border to tool to show it is selected
// Functions: 
// plant: if global variable true, then add carrot to plot 
// fertili: change svg, darker background
// collect: remove carrot
// update score (change progress bar too)
// show notes (probably called within update score)

var game_stage;
var current_tool;
var total_plots_planted;
var total_plots_fertilized;
var total_plots_collected;

//Initialize variables
$(document).ready(function(){
    game_stage = "ready_to_plant";
    current_tool = null;
    total_plots_planted = 0;
    total_plots_fertilized = 0;
    total_plots_collected = 0;
});

$(".plot").on("click", function (event) {
    var classList = $(event.currentTarget).attr("class");
    var plot_class = classList.split(/\s+/);
    var plot_number = plot_class[0].split("t")[1];
    if (current_tool == "plant"){
        plant(plot_number);
    }
 // If current_tool == plant, then call plant function
 // If current_tool == fertilize, then call plant function
 // If current_tool == , then call plant function
});

$(".plant-tool").on("click", function (event) {
    // Reset error message 
    plant_tool = $(".plant-tool");
    plant_stats_div = $(".plant-score");
    if(game_stage == "ready_to_plant"){
        plant_tool.addClass("tool-border");
        plant_stats_div.addClass("score-border");
        current_tool = "plant";
    }
    else{
        $(".error-message").text("You already planted all your crops. Try something else")
    }
});


$(".plant-tool").on("click", function (event) {
    plant_tool = $(".plant-tool");
    plant_stats_div = $(".plant-score");
    if(game_stage == "ready_to_plant"){
        plant_tool.addClass("tool-border");
        plant_stats_div.addClass("score-border");
    }
    else{
        $(".error-message").text("You cannot plant. Pick a different tool")
    }
});

function plant(plot_number){
    var plot = $(`.plot${plot_number}`).children();
    plot.removeClass("hidden");
}

function update_stats(){
}

function reset_error_message(){
    $(".error-message").text("")
}