const video = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');

// Functions
const togglePlay = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updateButton = (e) => {
  toggle.textContent = video.paused ? '►' : '❚❚';
};

const handleRangeChange = (e) => {
  video[e.target.name] = e.target.value;
};

const handleSkip = (e) => {
  video.currentTime += Number(e.target.dataset.skip);
};

const trackProgress = (e) => {
  let percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  video.currentTime = video.duration * (e.offsetX / progress.offsetWidth);
};

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', trackProgress);

toggle.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', handleRangeChange));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeChange));
skipButtons.forEach(button => button.addEventListener('click', handleSkip));

let isMouseDown = false;
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e));