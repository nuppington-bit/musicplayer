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

const playlistButton = document.getElementById("playlistButton");
const playlistContainer = document.getElementById("playlistfixed");
const overlay = document.getElementById("overlay");
const playlistContent = document.getElementById("playlistContent");

let isPlaylistOpen = false;

function togglePlaylist() {
  isPlaylistOpen = !isPlaylistOpen;
  if (isPlaylistOpen) {
    playlistContainer.classList.add("open");
    overlay.classList.add("show");
  } else {
    playlistContainer.classList.remove("open");
    overlay.classList.remove("show");
  }
}
window.addEventListener(
  "resize",
  function (event) {
    if (window.innerHeight > window.innerWidth) {
      playlistContainer.classList.add("widelist");
    } else {
      playlistContainer.classList.remove("widelist");
    }
  },
  true
);
if (window.innerHeight > window.innerWidth) {
  playlistContainer.classList.add("widelist");
}
playlistButton.addEventListener("click", togglePlaylist);
playlistClose.addEventListener("click", togglePlaylist);
overlay.addEventListener("click", togglePlaylist);

function updatePlaylist() {
  playlistContent.innerHTML = "";
  mp3List.forEach((mp3, index) => {
    const listItem = document.createElement("li");
    const listLink = document.createElement("a");
    listLink.textContent = `${mp3.trackName}`;
    listLink.addEventListener("click", () => {
      window.open(`music.html?index=${index}`, "_self");
    });
    listItem.appendChild(listLink);
    playlistContent.appendChild(listItem);
  });
}
updatePlaylist();
