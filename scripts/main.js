// main.js
// This file contains the outer-most structure of the application.
// Written by Edward Opich
// Last modified 3/29/18

"use strict";

var app = app || {};

app.main = {
    // Constants

    // Non-constants
    animationID: undefined,
    focused: false,

    // Modules
    userInput: undefined,
    classes: undefined,
    graphics: undefined,
    game: undefined,
    sound: undefined,

    // Functions
    init: function(){
        this.sound.playBGAudio();

        // Start the update loop!
        this.update();
    },

    update: function(){
        this.animationID = requestAnimationFrame(this.update.bind(this));

        this.game.update();
        this.userInput.update();

        // Don't draw if nothing's loaded yet!
        this.graphics.draw();
    },

    unfocusGame: function(){
        if(this.focused){
            return;
        }

        this.focused = true;

        // Cancel the animation frame to stop the update loop
        cancelAnimationFrame(this.animationID);

        this.sound.stopBGAudio();

        console.log("game unfocused");
    },

    refocusGame: function(){
        if(!this.focused){
            return;
        }

        this.focused = false;

        // Resume update loop
        this.update();

        this.sound.playBGAudio();

        console.log("game refocused");
    },
};