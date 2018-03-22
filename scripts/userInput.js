// userInput.js
// This file contains variables and functions related to user input.
// Written by Edward Opich
// Last modified 3/13/18

"use strict";

var app = app || {};

app.userInput = (function(){

    var userInput = {};

    userInput.KEYBOARD = Object.freeze({
        KEY_LEFT: 37, 
		KEY_UP: 38, 
		KEY_RIGHT: 39, 
		KEY_DOWN: 40,
        KEY_ENTER: 13,
        KEY_Z: 90
    });

    userInput.keysDown = [];

    // Event Listeners!
    window.addEventListener("keydown", function(e){
        userInput.keysDown[e.keyCode] = true;
    });

    window.addEventListener("keyup", function(e){
        userInput.keysDown[e.keyCode] = false;
    });

    // Return the stuff you want publicly accessible!
    return userInput;
}());