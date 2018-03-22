// game.js
// This file contains much of the game logic.
// Written by Edward Opich
// Last modified 3/22/18

"use strict";

var app = app || {};

app.game = (function(){
    var game = {};

    // Private variables

    // Public variables
    game.GAME_STATE = Object.freeze({
        TITLE: 0,
        GAMEPLAY: 1,
        INVENTORY: 2,
        GAME_OVER: 3,
        WIN: 4
    });

    game.gameState = game.GAME_STATE.TITLE;

    game.player = undefined;
    game.level = undefined;

    // Public functions

    // Initialize game module!
    game.init = function(){
        // Init any special objects!
        this.player.init();
        this.level.init();
    };

    // Update objects
    game.update = function(){
        // Update objects based on time and input!
        this.player.update();

        // Now that everything's been updated, add everything to the render queue!
        this.draw();
    };

    // Private functions

    // Add all appropriate objects to the render queue!
    game.draw = function(){
        app.main.graphics.addToRenderQueue(this.level);
        app.main.graphics.addToRenderQueue(this.player);
    };

    // Return the ones that are public!
    return game;
}());