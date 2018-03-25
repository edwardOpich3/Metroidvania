// main.js
// This file contains the outer-most structure of the application.
// Written by Edward Opich
// Last modified 3/24/18

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

    // Functions
    init: function(){
        // Start the update loop!
        this.update();
    },

    update: function(){
        this.animationID = requestAnimationFrame(this.update.bind(this));

        this.game.update();
        this.userInput.update();

        // Don't draw if nothing's loaded yet!
        if(app.level.loaded && app.level.tileSet != undefined){
            this.graphics.draw();
        }
    },

    unfocusGame: function(){
        if(this.focused){
            return;
        }

        this.focused = true;

        // Cancel the animation frame to stop the update loop
        cancelAnimationFrame(this.animationID);

        console.log("game unfocused");
    },

    refocusGame: function(){
        if(!this.focused){
            return;
        }

        this.focused = false;

        // Resume update loop
        this.update();

        console.log("game refocused");
    },
};