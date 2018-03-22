// level.js
// Used for loading rooms from external data.
// Written by Edward Opich
// Last modified 3/21/18

"use strict";

var app = app || {};

app.game = app.game || {};

// TODO: Convert this to a sub-module called "level" of app.game!
app.game.level = (function(){
    var level = {
        tileLayout: [],
        tileSet: undefined,

        loaded: false,

        init: function(){},
        draw: function(){},

        load: function(){},
        loadTileset: function(){},

        unload: function(){},
        unloadTileset: function(){}
    };

    level.init = function(){
        level.requestTileLayout("data/levels/0.bin");
        loadImagesWithCallback(["media/tiles/1.png", "media/tiles/2.png"], function(images){
            level.tileSet = images;
            console.log("images loaded");
        });
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

    level.loadTileset = function(){
        var transfer = function(images){
            this.tileSet = images[0];
            console.log("loaded tile set");
        };

        loadImagesWithCallback(["media/tileSet.png"], transfer.bind(this));
    };

    level.unloadTileset = function(){
        // TODO: Figure out how to unload images!
    };
    
    // Make a request for a new tile layout
    level.load = function(url){
        // Make a request object!
        var xhr = new XMLHttpRequest();

        // Do the onload function once the request has been completed!
        xhr.onload = function(){
            var response = xhr.responseText;

            // Split the data into rows via line-breaks
            level.tileLayout = response.split("\n");

            for(var i = 0; i < level.tileLayout.length; i++){
                // Split each row into columns via commas
                var row = level.tileLayout[i];
                row = row.split(",");

                // Make the row a Uint8 array, and populate it!
                level.tileLayout[i] = new Uint8Array(row.length);
                for(var j = 0; j < row.length; j++){
                    level.tileLayout[i][j] = row[j];
                }
            }

            level.loaded = true;
        };

        // Open a "get" request from url, and make it asynchronous
        xhr.open("GET", url, true);

        // Prevent browser caching by sending a header to the server (in case your data has been changed!)
        xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2010 00:00:00 GMT");

        // Send the request!
        xhr.send();
    };

    level.unload = function(){
        this.loaded = false;
    };

    return level;
}());