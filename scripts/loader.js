// loader.js
// This file handles window events, such as onload.
// Written by Edward Opich
// Last modified 3/20/18

"use strict";

var app = app || {};

window.onload = function(){
    // Initialize any secondary modules!
    app.graphics.init();
    app.game.init();

    // Hook up secondary modules to the main module
    app.main.userInput = app.userInput;
    app.main.classes = app.classes;
    app.main.graphics = app.graphics;
    app.main.game = app.game;

    // Initialize the main app!
    app.main.init();
};

// When the window is focused
window.onfocus = function(){
    app.main.refocusGame();
};

// When the window is unfocused
window.onblur = function(){
    app.main.unfocusGame();
};