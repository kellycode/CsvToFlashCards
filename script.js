

var cards = [];
var headers = [];
var currentCard = 0;
var selectedCard = 0;

window.displayDescription = false


$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

$(document).on("keypress click", function (e) {
    if(window.displayDescription){
        newCard()
    }else{
        showDescription()
    }
    
    window.displayDescription = !window.displayDescription

    console.log("you clicked once")
});


function processData(allText) {

    var allTextLines = allText.split(/\r\n|\n/)
    headers = allTextLines[0].split(',')

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        data = data || []
        for (let index = 0; index < data.length; index++) {
            data[index] = data[index].replace(/\\n/g, "<br/>").replace(/['"]+/g, '');
        }
        cards.push(data)
    }
}

function showDescription(){
    $(answer).css('max-height',  '300px')
}


function newCard(){
    $(answer).css('max-height',  '0px')
    $("#card").fadeToggle(100,function(){
        setTimeout(function(){
            displayCard(getNextCard())
        },100);
        $("#card").fadeToggle(100);
    });
    
}


function displayCard(index) {
    $("#title").html(cards[index][getType("Title")])
    $("#question").html(cards[index][getType("Question")]+ '?')
    $("#answer").html(cards[index][getType("Answer")])
}

function getNextCard() {
    if(selectedCard === cards.length-1)
    {
        selectedCard = 0;
    }
    else
    {
        selectedCard += 1;
    }

    return selectedCard
}

function getType(type) {
    for (let i = 0; i < headers.length; i++) {
        if(headers[i]==type){
            return i
        }
    }
    return null
}


  window.onload = function() {
    this.newCard()
  };