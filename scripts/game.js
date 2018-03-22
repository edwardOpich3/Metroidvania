// game.js
// This file contains much of the game logic.
// Written by Edward Opich
// Last modified 3/21/18

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

        // Define the level object!
        // TODO: Consider moving this to its own script, for consistency
        this.level = Object.seal({
            tileLayout: [],
            tileSet: undefined,

            loaded: false,

            draw: function(){},
            load: function(){},
            unload: function(){}
        });

        this.level.load = function(){
            var transfer = function(images){
                this.tileSet = images[0];
                console.log("loaded tile set");
                this.loaded = true;
            };

            loadImagesWithCallback(["media/tileSet.png"], transfer.bind(this));


        };

        this.level.unload = function(){
            tileLayout = undefined;
            this.loaded = false;
        };

        this.level.draw = function(ctx){
            if(this.loaded == false || this.tileSet == undefined){
                return;
            }

            for(var i = 0; i < this.tileLayout.length; i++){
                for(var j = 0; j < this.tileLayout[i].length; j++){

                    ctx.drawImage(this.tileSet,                                     // Image
                        (this.tileLayout[i][j] * 32) % this.tileSet.width,               // Source X
                        Math.floor(this.tileLayout[i][j] / (this.tileSet.height / 32)),  // Source Y
                        32,                                                         // Source W
                        32,                                                         // Source H
                        i * 32,                                                     // Dest X
                        j * 32,                                                     // Dest Y
                        32,                                                         // Dest W
                        32);                                                        // Dest H

                }
            }
        };

        // Load everything that needs to be!
        this.level.load();
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
        //app.main.graphics.addToRenderQueue(this.level);
        app.main.graphics.addToRenderQueue(this.player);
    };

    // Return the ones that are public!
    return game;
}());