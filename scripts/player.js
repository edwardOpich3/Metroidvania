// player.js
// Contains data having to do with the player; a sub-module of app.game
// Written by Edward Opich
// Last modified 3/21/18

"use strict";

var app = app || {};

// Since this is a sub-module of app.game, we have to account for app.game existing, too!
app.game = app.game || {};

app.game.player = (function(){
    var player = new app.classes.GameObject();

    player.init = function(){
        this.x = app.graphics.WIDTH / 2;
        this.y = app.graphics.HEIGHT / 2;

        this.load();
    };

    player.load = function(){
        var transfer = function(images){
            this.image = images[0];
            console.log("loaded player");
        };

        loadImagesWithCallback(["media/player.png"], transfer.bind(this));
    };

    player.unload = function(){
        // TODO: Figure out how to deallocate images and other data!
    };

    player.draw = function(ctx){
        if(this.image == undefined){
            return;
        }

        ctx.drawImage(this.image, this.x, this.y, parseInt(this.image.width * this.w), parseInt(this.image.height * this.h));
    };

    player.update = function(){
        if(this.image == undefined){
            return;
        }

        // User Input!
        if(app.userInput.keysDown[app.userInput.KEYBOARD.KEY_LEFT]){
            this.acceleration.x -= 0.5;
        }
        if (app.userInput.keysDown[app.userInput.KEYBOARD.KEY_RIGHT]){
            this.acceleration.x += 0.5;
        }

        // Jump!
        // TODO: Figure out how to make it so jump isn't rapid-fire!
        if(app.userInput.keysDown[app.userInput.KEYBOARD.KEY_Z]){
            if(this.position.y === app.graphics.HEIGHT / 2){
                this.acceleration.y -= 16;
            }
        }

        // Calculate physics!

        // Apply gravity to our current acceleration
        this.acceleration.add(this.gravity);

        // For now, we have a hard-coded floor.
        // TODO: Replace this with collision code for floor tiles!
        if(this.position.y >= app.graphics.HEIGHT / 2){
            if(this.acceleration.y > 0){
                this.acceleration.y = 0;
            }

            if(this.velocity.y > 0){
                this.velocity.y = 0;
            }

            this.position.y = app.graphics.HEIGHT / 2;
        }

        // Apply friction
        if(this.velocity.x > 0){
            this.velocity.x += this.friction;
            if(this.velocity.x < 0){
                this.velocity.x = 0;
            }
        }
        else if(this.velocity.x < 0){
            this.velocity.x -= this.friction;
            if(this.velocity.x > 0){
                this.velocity.x = 0;
            }
        }

        // Add acceleration to velocity
        this.velocity.add(this.acceleration);

        // Clamp our velocity to the max values!
        if(this.velocity.x > this.maxVelocity.x){
            this.velocity.x = this.maxVelocity.x;
        }
        else if(this.velocity.x < -this.maxVelocity.x){
            this.velocity.x = -this.maxVelocity.x;
        }
        if(this.velocity.y > this.maxVelocity.y){
            this.velocity.y = this.maxVelocity.y;
        }
        else if(this.velocity.y < -this.maxVelocity.y){
            this.velocity.y = -this.maxVelocity.y;
        }

        // Add our velocity to our position
        this.position.add(this.velocity);

        // Set our acceleration to 0!
        this.acceleration = new app.classes.Vector2();
    };

    return Object.seal(player);
}());