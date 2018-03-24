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

        // Tile collision detection!
        this.grounded = false;
        if(app.level.loaded){

            // Which rows of tiles are located at the player's projected top and bottom?
            var topIndex = Math.floor((this.y + this.bbox.y + this.velocity.y) / 32);
            var bottomIndex = Math.floor((this.y + this.bbox.y + this.bbox.h + this.velocity.y) / 32);

            // Detect ceilings and floors!
            for(var i = Math.floor((this.x + this.bbox.x + this.velocity.x + 1) / 32);
            i < Math.floor((this.x + this.bbox.x + this.bbox.w + this.velocity.x - 1) / 32) + 1;
            i++){
                // Make sure we don't check out-of-bounds!
                if(i < 0){
                    continue;
                }
                else if(i > app.level.tileLayout[0].length){
                    break;
                }

                // Ceilings
                if(this.velocity.y < 0 && topIndex >= 0 && topIndex < app.level.tileLayout.length){
                    if(app.level.tileLayout[topIndex][i] != 0){
                        this.velocity.y = 0;

                        if(this.acceleration.y < 0){
                            this.acceleration.y = 0;
                        }

                        this.y = ((topIndex + 1) * 32) + (this.bbox.y);
                    }
                }

                // Floors
                if(this.velocity.y > 0 && bottomIndex >= 0 && bottomIndex < app.level.tileLayout.length){
                    if(app.level.tileLayout[bottomIndex][i] != 0){
                        this.velocity.y = 0;

                        if(this.acceleration.y > 0){
                            this.acceleration.y = 0;
                        }

                        this.y = (bottomIndex * 32) - (this.bbox.y + this.bbox.h);

                        this.grounded = true;
                    }
                }
            }

            // Which columns of tiles are located at the player's projected left and right?
            var leftIndex = Math.floor((this.x + this.bbox.x + this.velocity.x) / 32);
            var rightIndex = Math.floor((this.x + this.bbox.x + this.bbox.w + this.velocity.x) / 32);

            // Detect walls!
            for(var i = Math.floor((this.y + this.bbox.y + this.velocity.y + 1) / 32);
            i < Math.floor((this.y + this.bbox.y + this.bbox.h + this.velocity.y - 1) / 32) + 1;
            i++){
                // Make sure we don't check out-of-bounds!
                if(i < 0){
                    continue;
                }
                else if(i > app.level.tileLayout.length){
                    break;
                }

                // Left walls
                if(this.velocity.x < 0 && leftIndex >= 0 && leftIndex < app.level.tileLayout[0].length){
                    if(app.level.tileLayout[i][leftIndex] != 0){
                        this.velocity.x = 0;
                        
                        if(this.acceleration.x < 0){
                            this.acceleration.x = 0;
                        }

                        this.x = ((leftIndex + 1) * 32) - (this.bbox.x);
                    }
                }

                // Right walls
                if(this.velocity.x > 0 && rightIndex >= 0 && rightIndex < app.level.tileLayout[0].length){
                    if(app.level.tileLayout[i][rightIndex] != 0){
                        this.velocity.x = 0;

                        if(this.acceleration.x > 0){
                            this.acceleration.x = 0;
                        }

                        this.x = (rightIndex * 32) - (this.bbox.x + this.bbox.w);
                    }
                }
            }
        }

        // Add our velocity to our position
        this.position.add(this.velocity);

        // Set our acceleration to 0!
        this.acceleration = new app.classes.Vector2();
    };

    return Object.seal(player);
}());