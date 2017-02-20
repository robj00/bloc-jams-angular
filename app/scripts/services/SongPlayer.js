(function() {
    /**
    * @function SongPlayer
    * @desc For playing songs
    */      
    function SongPlayer() {
        var SongPlayer = {};
        console.log("in player service redone");

        /**
        * @desc current song playing
        * @type {Object}
        */   
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */     
        var currentBuzzObject = null;
        
        
        /* @function SongPlayer.play
        * @desc begins playing new song, or starts curent paused song
        * @param {Object} song
        */      
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }              
        };
        
         /* @function SongPlayer.pause
        * @desc pauses current song
        * @param {Object} song
        */   
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
        
         /* @function playSong
        * @desc starts play with current Buss Object and sets song.playing flag to true
        * @param {Object} song
        */   
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();