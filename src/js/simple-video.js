let playing = false;
const playButtons = document.querySelectorAll(".play-button");

function playVideo(video, playButton) {
  playing = true;
  video.play();
  playButton.classList.add("playing");
  playButton.classList.remove("paused");
}

function pauseVideo(video, playButton) {
  playing = false;
  video.pause();
  playButton.classList.add("paused");
  playButton.classList.remove("playing");
}

function playOrPauseVideo(video, playButton) {
  if (playing) {
    pauseVideo(video, playButton);
  } else {
    playVideo(video, playButton);
  }
}

playButtons.forEach(function assignPlayListener(btn) {
  const video = document.getElementById(
    `video-${btn.id.slice("play-button-".length)}`
  );
  // When the play button is clicked, toggle play/pause.
  btn.addEventListener("click", playOrPauseVideo.bind(null, video, btn));
  // Also perform the pausing actions when the video ends.
  video.addEventListener("ended", pauseVideo.bind(null, video, btn));
});
