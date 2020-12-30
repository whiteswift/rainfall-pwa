(function () {
  "use strict";
  const status = document.getElementById("status");
  const umbrellaButton = document.querySelector("#umbrella-button");
  const umbrellaLogo = document.querySelector("#umbrella-logo");
  const audioSelect = document.querySelector("#audio-select");
  let audioFile; // = new Audio(`assets/media/rain.mp3`);

  function getAudioFile() {
    const fileName = `${audioSelect.value}.mp3`;
    audioFile = new Audio(`assets/media/${fileName}`);
  }

  function attachAudioLoopEvent() {
    audioFile.addEventListener("timeupdate",
      function () {
        // console.log('currentTime',this.currentTime);
        const buffer = 0.95;
        if (this.currentTime > this.duration - buffer) {
          this.currentTime = 0;
          this.play();
        }
      },
      false
    );
  }

  umbrellaButton.addEventListener("click", () => { //TODO touchup event?
    umbrellaLogo.classList.toggle('rotate');
    if (status.innerHTML === "Raining") {
      status.innerHTML = "Paused";
      audioFile.pause();
    } else {
      status.innerHTML = "Raining";
      getAudioFile()
      attachAudioLoopEvent()
      audioFile.play();
    }
  });

  // Add to homescreen event // Does this event exist still?
  window.addEventListener("beforeinstallprompt", function (e) {
    e.userChoice.then(function (choiceResult) {
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
        album: 'Focus',
        artwork: [
          { src: 'assets/images/rainfall_144.png', sizes: '144x144', type: 'image/png' },
          { src: 'assets/images/rainfall_256.png', sizes: '256x256', type: 'image/png' },
          { src: 'assets/images/rainfall_512.png', sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler(
        'play', () => {
          audioFile.play();
        })
      navigator.mediaSession.setActionHandler(
        'pause', () => {
          audioFile.pause();
        })
    }
  }

  setupMediaNotification();
})();
