// player.js
// Contains data having to do with the player; a sub-module of app.game
// Written by Edward Opich
// Last modified 3/23/18

"use strict";

var app = app || {};

app.player = (function(){
    var player = new app.classes.GameObject();

    player.init = function(){
        this.x = app.graphics.WIDTH / 2;
        this.y = app.graphics.HEIGHT / 2;

        this.bbox.x = 20;
        this.bbox.y = 0;
        this.bbox.w = 24;
        this.bbox.h = 64;

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

        ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
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
            if(this.grounded){
                this.acceleration.y -= 16;
            }
        }

        // Calculate physics!

        // Apply gravity to our current acceleration
        this.acceleration.add(this.gravity);

        // For now, we have a hard-coded floor.
        // TODO: Replace this with collision code for floor tiles!
        /*if(this.position.y >= app.graphics.HEIGHT / 2){
            if(this.acceleration.y > 0){
                this.acceleration.y = 0;
            }

            if(this.velocity.y > 0){
                this.velocity.y = 0;
            }

            this.position.y = app.graphics.HEIGHT / 2;
        }*/

        // Tile collision detection!
        // TODO: Implement spatial optimization!
        this.grounded = false;
        if(app.level.loaded){

            // Current row; fancy math added to ensure we only check tiles we intersect
            for(var i = Math.max(Math.floor((this.y + this.bbox.y) / 32), 0);
            i < Math.min(Math.floor((this.y + this.bbox.y + this.bbox.h) / 32) + 1, app.level.tileLayout.length);
            i++){

                // Current column
                for(var j = Math.max(Math.floor((this.x + this.bbox.x) / 32), 0);
                j < Math.min(Math.floor((this.x + this.bbox.x + this.bbox.w) / 32) + 1, app.level.tileLayout[i].length);
                j++){

                    // The tile is air, don't bother checking collision with it
                    if(app.level.tileLayout[i][j] == 0){
                        continue;
                    }

                    // Otherwise, we are most *certainly* colliding with it. Adjust accordingly!

                    // If the hor. center is to the left of the player's, push the player right!
                    if((j * 32) + 16 < player.x + player.bbox.x + (player.bbox.w / 2)
                        && player.velocity.x < 0){
                        player.x = ((j + 1) * 32) - player.bbox.x;

                        if(player.acceleration.x < 0){
                            player.acceleration.x = 0;
                        }

                        if(player.velocity.x < 0){
                            player.velocity.x = 0;
                        }
                    }

                    // If the hor. center is to the right of the player's, push the player left!
                    else if(player.velocity.x > 0){
                        player.x = (j * 32) - (player.bbox.w + player.bbox.x);

                        if(player.acceleration.x > 0){
                            player.acceleration.x = 0;
                        }

                        if(player.velocity.x > 0){
                            player.velocity.x = 0;
                        }
                    }

                    // If the vert. center is above the player's, push the player down!
                    if((i * 32) + 16 < player.y + player.bbox.y + (player.bbox.h / 2)
                        && player.velocity.y < 0){
                        player.y = ((i + 1) * 32) - player.bbox.y;
                        
                        if(player.acceleration.y < 0){
                            player.acceleration.y = 0;
                        }

                        if(player.velocity.y < 0){
                            player.velocity.y = 0;
                        }
                    }

                    // If the vert. center is below the player's, push the player up!
                    else if(player.velocity.y > 0){
                        player.y = (i * 32) - (player.bbox.h + player.bbox.y);

                        if(player.acceleration.y < 0){
                            player.acceleration.y = 0;
                        }

                        if(player.velocity.y > 0){
                            player.velocity.y = 0;
                        }

                        this.grounded = true;
                    }
                }
            }
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