//info:Get Our Elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

//info:Build Out Functions
function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();
}

//info: Update Play And Pause Button
function updateButton() {
    const icon = this.paused ? "▶︎" : "▐▐";
    toggle.textContent = icon;
}

//info: Skip Button
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

//info: Range Update Function
function handleRangeUpdate() {
    video[this.name] = this.value;
}

//info: Handle Progress Bar
function handleProgress() {
    const parcent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${parcent}% `
}

//info: Progress Bar Skiping...
function scrub(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


//info:Hook up the event listeners
//info: Play Pause Button Event Listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

//info: Handle Progress Bar
video.addEventListener("timeupdate", handleProgress)

// info: Skip Button Event Listener
skipButtons.forEach(button => button.addEventListener('click', skip))

//info: Range Update Event Listener
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//info: Progress Bar Skiping...
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);