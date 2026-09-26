

var cards = [];
var headers = [];
var currentCard = 0;
var selectedCard = -1;

window.displayDescription = false


$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "refrigerant_data.json",
        dataType: "json",
        success: function(data) {processData(data);}
     });
});

$(document).on("keydown click", function (e) {
    if (e.key === 'ArrowLeft') {
        console.log("Left arrow pressed");
        if(selectedCard > 0) {
            selectedCard -= 1;
        }
        displayCard(selectedCard);
        showDescription();
        e.preventDefault();
        return;
    }

    if (e.key === 'ArrowRight') {
        console.log("Right arrow pressed");
        if(selectedCard < cards.length - 1) {
            selectedCard += 1;
        }
        displayCard(selectedCard);
        showDescription();
        e.preventDefault();
        return;
    }

    if(window.displayDescription){
        newCard()
    }else{
        showDescription()
    }
    
    window.displayDescription = !window.displayDescription

    console.log("you clicked once")
});

function processData(jsonData) {
    headers = Object.keys(jsonData[0])
    for (const row of jsonData)
        cards.push(headers.map(h => String(row[h] ?? '').replace(/\r?\n/g, '<br/>')))
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