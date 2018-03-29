// level.js
// Used for loading rooms from external data.
// Written by Edward Opich
// Last modified 3/29/18

"use strict";

var app = app || {};

app.level = (function(){
    var level = {
        tileLayout: [],
        tileSet: undefined,

        loaded: false,

        world: [],
        row: 0,
        col: 0,

        init: function(){},
        draw: function(){},

        load: function(){},
        loadTileset: function(){},

        unload: function(){},
        unloadTileset: function(){}
    };

    // The world map. Contains the names of the file to load.
    // x means non-existent; Block the player off.
    var x = undefined;
    level.world = [
        [0, 1],
        [2, x]
    ];

    level.init = function(){
        if(this.loaded){
            this.unload();
        }

        this.row = 0;
        this.col = 0;

        this.load();
        this.loadTileset();
    };

    level.draw = function(ctx){
        if(this.loaded == false){
            return;
        }

        for(var i = 0; i < this.tileLayout.length; i++){
            for(var j = 0; j < this.tileLayout[i].length; j++){

                ctx.drawImage(this.tileSet,                                     // Image
                    (this.tileLayout[i][j] * 32) % this.tileSet.width,               // Source X
                    32 * Math.floor(this.tileLayout[i][j] / (this.tileSet.width / 32)),  // Source Y
                    32,                                                         // Source W
                    32,                                                         // Source H
                    j * 32,                                                     // Dest X
                    i * 32,                                                     // Dest Y
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
    level.load = function(){
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
            console.log("Loaded level");
        };

        // Open a "get" request from url, and make it asynchronous
        xhr.open("GET", "data/levels/" + this.world[this.row][this.col] + ".bin", true);

        // Prevent browser caching by sending a header to the server (in case your data has been changed!)
        xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2010 00:00:00 GMT");

        // Send the request!
        xhr.send();
    };

    level.unload = function(){
        this.loaded = false;
    };

    return Object.seal(level);
}());