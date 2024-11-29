const mp3List = [
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "ben-wicks-uGVuJNhhuuo-unsplash.jpg",
    albumName: "SoundHelix Examples",
    artistName: "T. Schürger",
    trackName: "SoundHelix Song 1",
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "pexels-lucaspezeta-4336969.jpg",
    albumName: "SoundHelix Examples",
    artistName: "T. Schürger",
    trackName: "SoundHelix Song 2",
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "pexels-maumascaro-801863.jpg",
    albumName: "SoundHelix Examples",
    artistName: "T. Schürger",
    trackName: "SoundHelix Song 3",
  },
];

var currentTrackIndex = 0;
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const loopBtn = document.getElementById("loopBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const playlistButton = document.getElementById("playlistButton");
const playlistContainer = document.getElementById("playlist");
const overlay = document.getElementById("overlay");
const playlistContent = document.getElementById("playlistContent");
const coverImage = document.getElementById("coverImage");
const record = document.getElementsByClassName("record")[0];
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const urlParams = new URLSearchParams(window.location.search);
const playlistClose = document.getElementById("playlistClose");
const albumName = document.getElementById("albumName");
const artistName = document.getElementById("artistName");
const recordSticker = document.getElementById("labelSticker");
const progressBar = document.getElementById("progressbar");
const playhead = document.getElementById("playhead");
progressBar.addEventListener("click", seek);
let isPlaylistOpen = false;
let shuffle = false;
let loopmode = 1;
loopBtn.style.color = `#1abc9c`;
function togglePlaylist() {
  isPlaylistOpen = !isPlaylistOpen;
  if (isPlaylistOpen) {
    playlistContainer.classList.add("open");
    overlay.classList.add("show");
    if (window.innerHeight < window.innerWidth) {
      document.getElementsByClassName("trackContent")[0].style.flexDirection =
        "column";
    }
  } else {
    playlistContainer.classList.remove("open");
    overlay.classList.remove("show");
    if (window.innerHeight < window.innerWidth) {
      document.getElementsByClassName("trackContent")[0].style.flexDirection =
        "row";
    }
  }
}
window.addEventListener(
  "resize",
  function (event) {
    if (window.innerHeight > window.innerWidth) {
      document.getElementsByClassName("trackContent")[0].style.flexDirection =
        "column";
      playlistContainer.id = "playlistfixed";
      playlistContainer.classList.add("widelist");
    } else {
      document.getElementsByClassName("trackContent")[0].style.flexDirection =
        "row";
      playlistContainer.id = "playlist";
      playlistContainer.classList.remove("widelist");
    }
  },
  true
);
if (window.innerHeight > window.innerWidth) {
  document.getElementsByClassName("trackContent")[0].style.flexDirection =
    "column";
  playlistContainer.id = "playlistfixed";
  playlistContainer.classList.add("widelist");
} else {
  document.getElementsByClassName("trackContent")[0].style.flexDirection =
    "row";
}
function loadTrack() {
  const currentTrack = mp3List[currentTrackIndex];
  audioSource.src = currentTrack.src;
  coverImage.src = currentTrack.cover;
  recordSticker.style.backgroundImage = `url("${currentTrack.cover}")`;
  audioPlayer.load();
  albumName.innerHTML = `${mp3List[currentTrackIndex].albumName}`;
  artistName.innerHTML = `${mp3List[currentTrackIndex].artistName}`;
  document.title = `Music Player: ${mp3List[currentTrackIndex].trackName} by ${mp3List[currentTrackIndex].artistName}`;
  updatePlaylist();
}

function seek(e) {
  var percent = e.offsetX / this.offsetWidth;
  audioPlayer.currentTime = percent * audioPlayer.duration;
  progressBar.value = percent / 100;
}

audioPlayer.onloadedmetadata = function () {
  progressBar.max = audioPlayer.duration;
  if (audioPlayer.duration >= 3600) {
    duration.innerHTML = new Date(audioPlayer.duration * 1000)
      .toISOString()
      .slice(11, 19);
  } else if (audioPlayer.duration >= 600) {
    duration.innerHTML = new Date(audioPlayer.duration * 1000)
      .toISOString()
      .slice(14, 19);
  } else {
    duration.innerHTML = new Date(audioPlayer.duration * 1000)
      .toISOString()
      .slice(15, 19);
  }
};

function updateTrackTime() {
  playhead.style.left = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;
  progressBar.value = audioPlayer.currentTime;
  if (audioPlayer.currentTime >= 3600) {
    currentTime.innerHTML = new Date(audioPlayer.currentTime * 1000)
      .toISOString()
      .slice(11, 19);
  } else if (audioPlayer.currentTime >= 600) {
    currentTime.innerHTML = new Date(audioPlayer.currentTime * 1000)
      .toISOString()
      .slice(14, 19);
  } else {
    currentTime.innerHTML = new Date(audioPlayer.currentTime * 1000)
      .toISOString()
      .slice(15, 19);
  }
  document.title = `Music Player: ${mp3List[currentTrackIndex].trackName} by ${mp3List[currentTrackIndex].artistName} | ${currentTime.innerHTML} / ${duration.innerHTML}`;
}

shuffleBtn.addEventListener("click", function () {
  if (shuffle == false) {
    shuffle = new Boolean(true);
    shuffleBtn.style.color = `#1abc9c`;
  } else {
    shuffle = new Boolean(false);
    shuffleBtn.style.color = `white`;
  }
});

loopBtn.addEventListener("click", function () {
  switch (loopmode) {
    case 0:
      loopmode = 1;
      loopBtn.style.color = `#1abc9c`;
      break;
    case 1:
      loopmode = 2;
      loopBtn.classList.remove("fa-repeat");
      loopBtn.classList.add("fa-refresh");
      break;
    case 2:
      loopmode = 0;
      loopBtn.classList.remove("fa-refresh");
      loopBtn.classList.add("fa-repeat");
      loopBtn.style.color = `white`;
      break;
  }
});

shuffleBtn.addEventListener("click", function () {
  switch (shuffle) {
    case true:
      shuffle = false;
      shuffleBtn.style.color = `white`;
      break;
    case false:
      shuffle = true;
      shuffleBtn.style.color = `#1abc9c`;
      break;
  }
});

playPauseBtn.addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    record.style.animationPlayState = "running";
    playPauseBtn.className = "fa fa-pause";
  } else {
    audioPlayer.pause();
    record.style.animationPlayState = "paused";
    playPauseBtn.className = "fa fa-play";
  }
});

playlistButton.addEventListener("click", togglePlaylist);
playlistClose.addEventListener("click", togglePlaylist);
overlay.addEventListener("click", togglePlaylist);

prevBtn.addEventListener("click", function () {
  if (audioPlayer.currentTime < 3) {
    currentTrackIndex =
      (currentTrackIndex - 1 + mp3List.length) % mp3List.length;
    record.style.animation = "none";
    record.offsetHeight;
    record.style.animation = null;
    loadTrack();
    audioPlayer.play();
    record.style.animationPlayState = "running";
    playPauseBtn.className = "fa fa-pause";
  } else {
    audioPlayer.currentTime = 0;
  }
});

nextBtn.addEventListener("click", function () {
  if (shuffle) {
    let randomIndex = Math.floor(Math.random() * mp3List.length);
    while (randomIndex == currentTrackIndex) {
      randomIndex = Math.floor(Math.random() * mp3List.length);
    }
    currentTrackIndex = randomIndex;
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % mp3List.length;
  }
  record.style.animation = "none";
  record.offsetHeight;
  record.style.animation = null;
  loadTrack();
  audioPlayer.play();
  record.style.animationPlayState = "running";
  playPauseBtn.className = "fa fa-pause";
});

function updatePlaylist() {
  playlistContent.innerHTML = "";
  mp3List.forEach((mp3, index) => {
    const listItem = document.createElement("li");
    const listLink = document.createElement("a");
    listLink.textContent = `${mp3.trackName}`;
    listLink.addEventListener("click", () => {
      currentTrackIndex = index;
      record.style.animation = "none";
      record.offsetHeight;
      record.style.animation = null;
      loadTrack();
      audioPlayer.play();
      record.style.animationPlayState = "running";
      playPauseBtn.className = "fa fa-pause";
    });
    if (index === currentTrackIndex) {
      listLink.style.fontWeight = "bold";
    }
    listItem.appendChild(listLink);
    playlistContent.appendChild(listItem);
  });
}

audioPlayer.addEventListener("ended", function () {
  switch (loopmode) {
    case 0:
      if (currentTrackIndex < mp3List.length - 1) {
        nextBtn.click();
      } else {
        record.style.animationPlayState = "paused";
        playPauseBtn.className = "fa fa-play";
      }
      break;
    case 1:
      nextBtn.click();
      break;
    case 2:
      prevBtn.click();
      playPauseBtn.click();
      break;
  }
});
if (urlParams.get("index") != null) {
  currentTrackIndex = parseInt(urlParams.get("index"));
}
loadTrack();
