(function() {
  "use strict";
  var status = document.getElementById("status");
  var umbrellaButton = document.querySelector("#umbrella-button");
  var umbrellaLogo = document.querySelector("#umbrella-logo");
  var audioFile = new Audio("/assets/media/rain.mp3");

  audioFile.addEventListener("timeupdate",
    function() {
      console.log('currentTime',this.currentTime);
      var buffer = 0.85;
      if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
      }
    },
    false
  );

  umbrellaButton.addEventListener("click", () => { //TODO touchup event?
    umbrellaLogo.classList.toggle('rotate');
    if (status.innerHTML === "Raining") {
      status.innerHTML = "Paused";
      audioFile.pause();
    } else {
      status.innerHTML = "Raining";
      audioFile.play();
    }
  });

  // Add to homescreen event // Does this event exist still?
  window.addEventListener("beforeinstallprompt", function(e) {
    e.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);
      if (choiceResult.outcome == "dismissed") {
        console.log("User cancelled home screen install");
      } else {
        console.log("User added to home screen");
      }
    });
  });

  function restartAudio() {
    audioFile.close();
    audioFile.start();
  }

  function setupMediaNotification() {
    if ('mediaSession' in navigator) {

      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Rainfall',
        artist: '',
        album: 'To help you concentrate',
        artwork: [
          { src: '../images/rainfall_144.png', sizes: '144x144', type: 'image/png' },
          { src: '../images/rainfall_256.png', sizes: '256x256', type: 'image/png' },
          { src: '../images/rainfall_512.png', sizes: '512x512', type: 'image/png' }
        ]
      });
    
      navigator.mediaSession.setActionHandler('play', audioFile.play());
      navigator.mediaSession.setActionHandler('pause', audioFile.pause());
      navigator.mediaSession.setActionHandler('previoustrack', restartAudio());
      navigator.mediaSession.setActionHandler('nexttrack', restartAudio());
    }
  }

  setupMediaNotification();
})();
