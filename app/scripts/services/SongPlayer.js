(function() {
    function SongPlayer() {
        var SongPlayer = {};
        console.log("in player service redone");
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */     
        var currentBuzzObject = null;
        
        SongPlayer.play = function(song) {
            console.log("in SongPlayer.play");
            if (currentSong !== song) {
                console.log("just before currentBuzzObjectplay in service");
                setSong(song);
                currentBuzzObject.play();
                song.playing = true;
                
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }              
        };
        
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */      
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
         };
        
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();