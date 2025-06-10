
const questions= ["What animals do sheep descend from?", 
                "How long does it take for Merino sheep reach maturity?",
                "When were sheep domesticated?",
                "In which century did the Spanish bring the Spanish churra (the ancestors of the Navajo Churro) to the Americas?",
                "What is the Scottish haggis made out of?",
                "Who is a naturally talented sheperd?"
            ]

const options = [["The wild Asian mouflon", "The wild bezoar ibex", "Capra aegagrus", "Oberhasli"], 
                ["3 to 4 months", "9 to 12 months", "18 to 20 months", "6 to 7 months"], 
                ["18.000 BCE", "10.000 BCE", "7.000 BCE", " 15.000 BCE"], 
                ["XVI", "XVII", "XIV", "XV"], 
                [ "Fried sheep hearts", "Sheep eyes and potatoes", "Lamb, spinach and plum", "Sheep innards and oatmeal" ],
                ["Fernando", "Valentina", "Eli", "Sara"]
        ]

const correct_answers = ["1", "3", "2", "1", "4", "3"]

var current_question; 
 
var total_correct_answers;

$(document).ready(function(){
    current_question = 1;
    total_correct_answers = 0;
    set_question(current_question);
});

// Question number starts at 1
function set_question(question_number){
    $(".question-number").text(`Question # ${question_number}`);
    $(".question-text").text(questions[question_number - 1]);
    $(".option1").text(options[question_number - 1][0]);
    $(".option2").text(options[question_number - 1][1]);
    $(".option3").text(options[question_number - 1][2]);
    $(".option4").text(options[question_number - 1][3]);
}


$(".option").on("click", function(event){
   // Check if answer is correct
    var answer_selected =  $(event.currentTarget).children().attr("class");
    var answer_number = answer_selected.split("n")[1];
    if (answer_number == correct_answers[current_question - 1]){
        $(event.currentTarget).addClass("correct-answer");
        total_correct_answers = total_correct_answers +1; 
    }
    else{
        $(event.currentTarget).addClass("incorrect-answer")
    }
    update_score();
    setTimeout(() => { 
        $(event.currentTarget).removeClass("correct-answer");
        $(event.currentTarget).removeClass("incorrect-answer");
        current_question = current_question + 1;
        set_question(current_question);
    }, 1000);
})

function update_score(){
    $(".trivia-score").text(`Score: ${total_correct_answers}/${current_question}`);
}


$(".note-img").on("click", function(event){
    var classList = $(event.currentTarget).attr("class");
    var note_classes = classList.split(/\s+/);
    var note_number = note_classes[1].split("e")[1]
    console.log(note_number);
    open_note(note_number);
})

$(".close-pop-up").on("click", function(event){
    close_pop_up();
})

function display_note(note_number){
    $(`.note${note_number}`).removeClass("hidden");
}

function open_note(note_number){
    $(`.pop-up-note${note_number}`).removeClass("hidden");
}

function close_pop_up(){
    $(".pop-up-container").addClass("hidden");
}

function update_progress_bar(percentage_increase){
    var current_percentage = parseInt($(".progress-bar").attr('value'));
    $(".progress-bar").attr('value', current_percentage + percentage_increase);
    console.log("progress")
}