//number of circles we have in the game
var numCircles = 6;
//The colour variable should be an array that contains as many random RGB colours as there are circles. 
var colours = [];
//This pickedColor is the RGB color we are trying to guess (string)
var pickedColor;
//This is the default colour of the game. 
let defaultColour = "#582c99";

//Grab all appropriate elements from the HTML.
var circles = document.querySelectorAll(".circle");
var colourToGuess = document.getElementById("colour-to-guess");
var resultMessage = document.getElementById("result-message");
var banner = document.querySelector("h1");
var resetButton = document.getElementById("restart");

init();

//The init function should reset the stage and set a new RGB color
function init() {
    reset();
    colourToGuess.textContent = pickedColor;
}

//Setup so that when the reset button is clicked, the reset function gets called 
resetButton.addEventListener("click", reset);

//Define what should happen when any circle is clicked. 
function clickCircle() {
    const clickedColor = this.style.backgroundColor;
    if (clickedColor === pickedColor) {
        resultMessage.textContent = "You win!";
        resetButton.textContent = "Play again";
        setAllCirclesColor(pickedColor);
        banner.style.backgroundColor = pickedColor;
    } else {
        this.style.backgroundColor = defaultColour;
        resultMessage.textContent = "Try again";
    }
}

// The reset function should set new values for the colours array by calling genRandomColours.
function reset() {
    colours = genRandomColours();
    pickedColor = chooseColor();
    colourToGuess.textContent = pickedColor;
    resultMessage.textContent = "";
    resetButton.textContent = "Restart";
    banner.style.backgroundColor = defaultColour;

    circles.forEach((circle, index) => {
        circle.style.backgroundColor = colours[index];
        circle.addEventListener("click", clickCircle);
    });
}

//Write a function to make a random RGB color.
function makeColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Write a function that will set new values for the colours array.
function genRandomColours() {
    const coloursArray = [];
    for (let i = 0; i < numCircles; i++) {
        coloursArray.push(makeColour());
    }
    return coloursArray;
}

// Return one of the RGB colours from the colours array.
function chooseColor() {
    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
}

// Helper function to set all circles to the same color when the player wins
function setAllCirclesColor(color) {
    circles.forEach(circle => {
        circle.style.backgroundColor = color;
    });
}
