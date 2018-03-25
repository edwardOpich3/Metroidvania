// sound.js
// This file manages music and sound effects!
// Written by Edward Opich
// Modified 3/25/18
"use strict";

// If app exists use the existing copy
// Otherwise, create a new object
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function(){
    
    var bgAudio = undefined;
    var currentEffect = 0;
    var currentDirection = 1;
    var effectSounds = ["1.mp3", "2.mp3", "3.mp3", "4.mp3", "5.mp3", "6.mp3", "7.mp3", "8.mp3"];

    function init(){
        bgAudio = document.querySelector("#bgAudio");
        bgAudio.volume = 1.00;
    }

    function stopBGAudio(){
        bgAudio.pause();
    }

    function playEffect(){
        var effectSound = document.createElement('audio');
        effectSound.volume = 0.3;
        effectSound.src = "media/" + effectSounds[currentEffect];
        effectSound.play();
        currentEffect += currentDirection;
        if(currentEffect == effectSounds.length || currentEffect == -1){
            currentDirection *= -1;
            currentEffect += currentDirection;
        }
    }

    function playBGAudio(){
        bgAudio.play();
    }

    // Export a public interface to this module
    return{
        init: init,
        stopBGAudio: stopBGAudio,
        playEffect: playEffect,
        playBGAudio: playBGAudio
    };
	
}());