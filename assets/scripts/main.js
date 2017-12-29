(function() {
  "use strict";
  var status = document.getElementById("status");

  // Event listeners
  var ubmrellaButton = document.querySelector("#umbrella-button");
  var volumeButton = document.getElementById("volume");
  // var audioElement = document.getElementById("rain-audio");
  var audioFile = new Audio("/assets/media/rain.mp3");

  audioFile.addEventListener("timeupdate",
    function() {
      // console.log('currentTime',this.currentTime);
      var buffer = 0.65;//better?
      if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
      }
    },
    false
  );

  ubmrellaButton.addEventListener("click", () => {
    if (status.innerHTML === "Raining") {
      status.innerHTML = "Paused";
      audioFile.pause();
    } else {
      status.innerHTML = "Raining";
      audioFile.play();
    }
  });

  volumeButton.addEventListener("click", function() {
    if (localStorage.getItem("volume") === "true") {
      volumeButton.children[0].setAttribute(
        "src",
        "assets/images/volume_muted.svg"
      );
      localStorage.setItem("volume", false);
    } else {
      volumeButton.children[0].setAttribute(
        "src",
        "assets/images/volume_on.svg"
      );
      localStorage.setItem("volume", true);
    }
  });

  // Add to homescreen event
  // Does this event exist still?
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

  function sound(src) {
    var self = this;
    self.sound = document.createElement("audio");
    self.sound.src = src;
    self.sound.setAttribute("preload", "auto");
    self.sound.setAttribute("controls", "none");
    self.sound.style.display = "none";
    document.body.appendChild(self.sound);
    self.play = function() {
      self.sound.play();
    };
    self.stop = function() {
      self.sound.pause();
    };
  }

  // Desktop notifications
  function displayNotification() {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      var notification = new Notification("Timer finished!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Timer finished!");
        }
      });
    }
  }

  function checkVolume() {
    // load volume preferences
    let vol = localStorage.getItem("volume");
    if (vol === "false" || vol === "") {
      volumeButton.children[0].setAttribute(
        "src",
        "assets/images/volume_muted.svg"
      );
      localStorage.setItem("volume", false);
    } else {
      volumeButton.children[0].setAttribute(
        "src",
        "assets/images/volume_on.svg"
      );
      localStorage.setItem("volume", true);
    }
  }

  // Request desktop permissions
  // Notification.requestPermission(); // put this in an if
  checkVolume();

})();
