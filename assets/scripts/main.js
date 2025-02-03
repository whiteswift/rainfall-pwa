(function () {
  "use strict";
  const status = document.getElementById("status");
  const umbrellaButton = document.getElementById("umbrella-button");
  const umbrellaLogo = document.getElementById("umbrella-logo");
  const audioSelect = document.getElementById("audio-select");
  const audioButtonToggle = document.getElementById('btn-audio-toggle');

  let audioFile;

  function setAudioFile() {
    const fileName = `${audioSelect.value}.mp3`;
    audioFile = new Audio(`assets/media/${fileName}`);
  }

  function setAudioLoopEvent() {
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

  umbrellaButton.addEventListener("click", () => { // TODO touchup event?
    umbrellaLogo.classList.toggle('rotate');
    if (status.innerHTML === "Raining") {
      audioFile.pause();
      status.innerHTML = "Paused";
    } else {
      setAudioFile();
      setAudioLoopEvent();
      audioFile.play();
      status.innerHTML = "Raining";
    }
  });

  audioButtonToggle.addEventListener('click', () => {
    audioButtonToggle.classList.toggle('audio-toggle-open');
    audioSelect.classList.toggle('audio-select-visible')
  });

  audioSelect.addEventListener('change', () => {
    if (status.innerHTML === "Raining") {
      // Audio is already playing so update
      // the audio file and restart playback
      audioFile.pause();
      setAudioFile();
      setAudioLoopEvent();
      audioFile.play();
    } else {
      // Audio is not already playing so update
      // the audio file but do not start playback
      setAudioFile();
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

  function restartAudio() { // ?
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
