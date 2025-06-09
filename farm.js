// Add event listener to all tools... error message if user selects option that cannot be selected. Otherwise, add border to tool to show it is selected
// Functions: 
// plant: if global variable true, then add carrot to plot 
// fertili: change svg, darker background
// collect: remove carrot
// update score (change progress bar too)
// show notes (probably called within update score)

var game_stage;
var current_tool;
var plots_planted;
var plots_fertilized;
var plots_collected;

//Initialize variables
$(document).ready(function(){
    game_stage = "ready_to_plant";
    current_tool = null;
    plots_planted = [];
    plots_fertilized = [];
    plots_collected = [];
});

// Add event listeners to plot
$(".plot").on("click", function (event) {
    var classList = $(event.currentTarget).attr("class");
    var plot_class = classList.split(/\s+/);
    var plot_number = plot_class[0].split("t")[1];
    if (current_tool == "plant"){
        plant(plot_number);
    }
    else if (current_tool == "fertilizer"){
        fertilize(plot_number);
    }
    else if (current_tool == "collect"){
        collect(plot_number);
    }

});

// Add event listener to all tools
$(".plant-tool").on("click", function (event) {
    // Reset error message 
    reset_error_message();
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
    reset_error_message();
    fertlizer_tool = $(".fertilizer-tool");
    fertilizer_stats_div = $(".fertilizer-score");
    if(game_stage == "ready_to_fertilize"){
        // Select fertilizer
        fertlizer_tool.addClass("tool-border");
        fertilizer_stats_div.addClass("score-border");
        current_tool = "fertilizer";
        // Deselect sprout
        plant_tool.removeClass("tool-border");
        plant_stats_div.removeClass("score-border");
    }
    else{
        $(".error-message").text("You cannot fertilize your crops. Try something else")
    }
});


$(".collect-tool").on("click", function (event) {
     // Reset error message 
    reset_error_message();
    collect_tool = $(".collect-tool");
    collect_stats_div = $(".collect-score");
    if(game_stage == "ready_to_collect"){
        // Select basket
        collect_tool.addClass("tool-border");
        collect_stats_div.addClass("score-border");
        current_tool = "collect";
         // Deselect fertilizer
        fertlizer_tool.removeClass("tool-border");
        fertilizer_stats_div.removeClass("score-border");
    }
    else{
        $(".error-message").text("You cannot collect your crops yet. Try something else")
    }
});

// Add event listener to notes

$(".note-img").on("click", function(event){
    var classList = $(event.currentTarget).attr("class");
    var note_classes = classList.split(/\s+/);
    var note_number = note_classes[1].split("e")[1]
    open_note(note_number);
})

$(".close-pop-up").on("click", function(event){
    close_pop_up();
})


//Adds carrots to plot 
function plant(plot_number){
    // Plant only if plot is empty
    if (!plots_planted.includes(plot_number)){
        var plot = $(`.plot${plot_number}`).children();
        plot.removeClass("hidden"); 
        plots_planted.push(plot_number); 
        update_stats("plant");
    }
}

//Changes the background of plot 
function fertilize(plot_number){
    // Fertilize only if plot has not already been fertilized
    if (!plots_fertilized.includes(plot_number)){
        var plot = $(`.plot${plot_number}`);
        // Change plot background 
        plot.addClass("plot-fertilized");
        plots_fertilized.push(plot_number); 
        update_stats("fertilize");
    }
}

//Removes carrot from plot 
function collect(plot_number){
    // Collect only if plot still has carrots
    if (!plots_collected.includes(plot_number)){
        console.log("collect called");
        var plot = $(`.plot${plot_number}`).children();;
        // Hidde carrot image
        plot.addClass("hidden");
        plots_collected.push(plot_number); 
        update_stats("collect");
    }
}

function update_stats(action){
    if(action == "plant"){
        total_plots_planted = plots_planted.length;
        $(".plant-stats").text(`${total_plots_planted}/15`);
        update_progress_bar(1)
        if (total_plots_planted == 15){
            game_stage = "ready_to_fertilize";
            display_note(1);
        }
    }
    else if (action == "fertilize"){
        total_plots_fertilized = plots_fertilized.length;
        $(".fertilize-stats").text(`${total_plots_fertilized}/15`);
        update_progress_bar(1)
        if (total_plots_fertilized == 15){
            game_stage = "ready_to_collect";
            display_note(2);
        }

    }
    else if (action == "collect"){
        total_plots_collected = plots_collected.length;
        $(".collect-stats").text(`${total_plots_collected}/15`);
        update_progress_bar(1)
        if (total_plots_collected == 15){
            game_stage = "done_collecting";
            display_note(3);
            $(".next-button").removeClass("hidden");
        }
    }
}

function update_progress_bar(percentage_increase){
    var current_percentage = parseInt($(".progress-bar").attr('value'));
    $(".progress-bar").attr('value', current_percentage + percentage_increase);
}

function display_note(note_number){
    $(`.note${note_number}`).removeClass("hidden");
}

function open_note(note_number){
    $(`.pop-up-note${note_number}`).removeClass("hidden");
}

function close_pop_up(){
    $(".pop-up-container").addClass("hidden");
}

function reset_error_message(){
    $(".error-message").text("")
}