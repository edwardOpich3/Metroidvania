// game.js
// This file contains much of the game logic.
// Written by Edward Opich
// Last modified 3/29/18

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

    game.deltaTime = 0;
    game.lastTime = 0;

    game.player = undefined;
    game.level = undefined;

    // Public functions

    // Initialize game module!
    game.init = function(){
        // Init any special objects!
        /*this.player.init();
        this.level.init();*/
    };

    // Update objects
    game.update = function(){
        if(this.gameState == this.GAME_STATE.TITLE){
            if(app.userInput.keysPressed[app.userInput.KEYBOARD.KEY_ENTER]){
                this.gameState = this.GAME_STATE.GAMEPLAY;

                this.player.init();
                this.level.init();
            }
        }
        else if(this.gameState == this.GAME_STATE.GAMEPLAY){
            // Update objects based on time and input!
            this.player.update();
        }
        else if(this.gameState == this.GAME_STATE.GAME_OVER){
            if(app.userInput.keysPressed[app.userInput.KEYBOARD.KEY_ENTER]){
                this.gameState = this.GAME_STATE.GAMEPLAY;

                this.player.init();
                this.level.init();
            }
        }

        // Now that everything's been updated, add everything to the render queue!
        this.draw();

        // Update the delta-time!
        this.deltaTime = this.calculateDeltaTime();
    };

    // Private functions

    // Add all appropriate objects to the render queue!
    game.draw = function(){
        if(this.gameState == this.GAME_STATE.TITLE){
            app.main.graphics.addToRenderQueue({
                draw: function(ctx){
                    ctx.save();
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.font = "30px Times New Roman";

                    ctx.fillText("Cool Game, Bro", app.graphics.WIDTH / 2, 64);
                    ctx.fillText("Press 'Enter' to start!", app.graphics.WIDTH / 2, 256);

                    ctx.restore();
                }
            });
        }
        else if(this.gameState == this.GAME_STATE.GAMEPLAY){
            app.main.graphics.addToRenderQueue(this.level);
            app.main.graphics.addToRenderQueue(this.player);
        }
        else if(this.gameState == this.GAME_STATE.GAME_OVER){
            app.main.graphics.addToRenderQueue({
                draw: function(ctx){
                    ctx.save();
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.font = "30px Times New Roman";

                    ctx.fillText("Game Over, duuuude", app.graphics.WIDTH / 2, app.graphics.HEIGHT / 2);
                    ctx.fillText("Press 'Enter' to try again, maaaan", app.graphics.WIDTH / 2, (app.graphics.HEIGHT / 2) + 64);

                    ctx.restore();
                }
            });
        }
    };

    game.calculateDeltaTime = function(){
        var now,fps;
        now = performance.now(); 
        fps = 1000 / (now - this.lastTime);
        fps = clamp(fps, 12, 60);
        this.lastTime = now; 
        return 1/fps;
    };

    // Return the ones that are public!
    return game;
}());