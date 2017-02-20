(function() {
    /**
    * @function SongPlayer
    * @desc For playing songs
    */      
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc getting current album using fixtures service
        * @type {Object}
        */     
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */     
        var currentBuzzObject = null;
        
        
         /**
        * @desc index of the song
        * @type {number}
        */  
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc current song playing
        * @type {Object}
        */   
        SongPlayer.currentSong = null;
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
                
            } else if (SongPlayer.currentSong === song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
         
        /* @function previous
        * @player bar plays previous song
        */   
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        };
        

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */      
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
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
        .factory('SongPlayer', [ 'Fixtures', SongPlayer]);
})();