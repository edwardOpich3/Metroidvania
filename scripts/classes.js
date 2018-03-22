// classes.js
// This file contains various useful classes.
// Written by Edward Opich
// Last modified 3/21/18

"use strict";

var app = app || {};

app.classes = (function(){
    // Define your useful classes here!

    // Vector2 class
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
    var Vector2 = function(x = 0, y = 0){
        this.x = x;
        this.y = y;

        this.add = function(other){
            this.x += other.x;
            this.y += other.y;
        }
    }

    // 2D Bounding Box class
    var BBox = function(origin = new Vector2(), size = new Vector2(1, 1)){
        this.origin = origin;
        this.size = size;

        // Getters and Setters, mostly for syntactic sugar here
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
        // https://stackoverflow.com/questions/5222209/getter-setter-in-constructor
        Object.defineProperties(this, {
            "x": {
                "get": function() { return this.origin.x; },
                "set": function(value) { this.origin.x = value; }
            },

            "y": {
                "get": function() { return this.origin.y; },
                "set": function(value) { this.origin.y = value; }
            },

            "w": {
                "get": function() { return this.size.x; },
                "set": function(value) { this.size.x = value; }
            },

            "h": {
                "get": function() { return this.size.y; },
                "set": function(value) { this.size.y = value; }
            }
        });
    };

    // Game Object class
    var GameObject = function(image = undefined, bbox = new BBox()){
        this.bbox = bbox;
        this.image = image;

        this.velocity = new Vector2();
        this.acceleration = new Vector2();

        this.maxVelocity = new Vector2(6, 16);

        this.gravity = new Vector2(0, 1);
        this.friction = -0.3;

        this.init = function(){};
        this.update = function(){};
        this.draw = function(){};
        this.load = function(){};

        this.unload = function(){};

        Object.defineProperties(this, {
            "position": {
                "get": function() { return this.bbox.origin; },
                "set": function(value) { this.bbox.origin = value; }
            },

            "x": {
                "get": function() { return this.bbox.origin.x; },
                "set": function(value) { this.bbox.origin.x = value; }
            },

            "y": {
                "get": function() { return this.bbox.origin.y; },
                "set": function(value) { this.bbox.origin.y = value; }
            },

            "size": {
                "get": function() { return this.bbox.size; },
                "set": function(value) { this.bbox.size = value; }
            },

            "w": {
                "get": function() { return this.bbox.size.x; },
                "set": function(value) { this.bbox.size.x = value; }
            },

            "h": {
                "get": function() { return this.bbox.size.y; },
                "set": function(value) { this.bbox.size.y = value; }
            }
        });
    };

    // Return the ones you want publicly accessible!
    return{
        Vector2: Vector2,
        BBox: BBox,
        GameObject: GameObject
    };
}());