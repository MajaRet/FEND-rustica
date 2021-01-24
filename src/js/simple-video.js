const playButtons = document.querySelectorAll(".play-button");

function playVideo(video, playButton) {
  video.play();
  playButton.classList.add("playing");
  playButton.classList.remove("paused");
}

function pauseVideo(video, playButton) {
  video.pause();
  playButton.classList.add("paused");
  playButton.classList.remove("playing");
}

function playOrPauseVideo(video, playButton) {
  if (playButton.classList.contains("playing")) {
    pauseVideo(video, playButton);
  } else {
    playVideo(video, playButton);
  }
}

// Add listeners for playback controls for each video
playButtons.forEach(function assignPlayListener(btn) {
  const video = document.getElementById(
    `video-${btn.id.slice("play-button-".length)}`
  );
  // When the play button is clicked, toggle play/pause.
  btn.addEventListener("click", playOrPauseVideo.bind(null, video, btn));
  // Also perform the pausing actions when the video ends.
  video.addEventListener("ended", pauseVideo.bind(null, video, btn));
});
