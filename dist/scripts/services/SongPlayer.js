(function() {
    /**
    * @function SongPlayer
    * @desc For playing songs
    */      
    function SongPlayer($rootScope, Fixtures) {
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
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        
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
                stopSong(song);
            }else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        };
           
        /* @function next
        * @desc passes player bar song name and total song duration
        */   
        /*/ var SongPlayer.song = 
            
            
         /* @function 
        * @player bar plays next song
        */   
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex == currentAlbum.songs.length) {
                stopSong(song);
            }else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */      
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
        
        /* @function stopSong
        * @desc stops song and sets flag
        * @param {Object} song
        */   
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
            SongPlayer.currentSong.playing = null;
        };
        
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', [ '$rootScope', 'Fixtures', SongPlayer]);
})();