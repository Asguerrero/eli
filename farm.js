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

// Plant, fertilize or collect plot
$(".plot").on("click", function (event) {
    var classList = $(event.currentTarget).attr("class");
    var plot_class = classList.split(/\s+/);
    var plot_number = plot_class[0].split("t")[1];
    if (current_tool == "plant"){
        plant(plot_number);
    }
    else if (current_tool == "fertilizer"){
        fertlize(plot_number);
    }
 // If current_tool == fertilize, then call plant function
 // If current_tool == , then call plant function
});

// Tools
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

$(".fertilizer-tool").on("click", function (event) {
    // Reset error message 
    fertlizer_tool = $(".fertilizer-tool");
    fertilizer_stats_div = $(".fertilizer-score");
    if(game_stage == "ready_to_fertilize"){
        fertlizer_tool.addClass("tool-border");
        fertilizer_stats_div.addClass("score-border");
        current_tool = "fertilizer";
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
    total_plots_planted = total_plots_planted + 1; 
    update_stats();
}

function fertilize(plot_number){
    // add class with background-image to (images/dirt-dark.svg)

}

// Need to figure out how to correctly update stats to avoid double counting
// Probably need array/dict... and a function to check if entry is false or true
function update_stats(){
    $(".plant-stats").text(`${total_plots_planted}/15`);
    console.log(total_plots_planted);
    // Update progress bar and probably trigger notes
    // If total_plots_planted == 15, then update game_stage to ready_to_fertilize
    // Fertlizer stats
    // Collect stats
}

function reset_error_message(){
    $(".error-message").text("")
}