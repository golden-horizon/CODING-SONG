//  Our DJ (audio engine)
const audio = new Audio();

//  Buttons
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

//  Display
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");

// 🎶 Playlist (IMPORTANT: replace src with real mp3 links)
const allSongs = [
  { id: 0, title: "Spring Waltz", artist: "Chopin", src: "" },
  { id: 1, title: "Lo-fi Coding Beat", artist: "Dev Beats", src: "" },
  { id: 2, title: "Deep Focus", artist: "Ambient Dev", src: "" },
  { id: 3, title: "Hotel California", artist: "Eagles", src: "" }
];

//  App memory
const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0
};

//  Play song
const playSong = (id) => {
  const song = userData.songs.find(s => s.id === id);

  // load music
  audio.src = song.src;

  // update memory
  userData.currentSong = song;

  // UI update
  playingSong.textContent = song.title;
  songArtist.textContent = song.artist;

  playButton.classList.add("playing");

  //  let's gooo
  audio.play();
};

//  Pause
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

//  Next
const playNextSong = () => {
  if (!userData.currentSong) return playSong(0);

  const index = userData.songs.indexOf(userData.currentSong);
  const next = userData.songs[index + 1];

  if (next) playSong(next.id);
};

//  Previous
const playPreviousSong = () => {
  if (!userData.currentSong) return;

  const index = userData.songs.indexOf(userData.currentSong);
  const prev = userData.songs[index - 1];

  if (prev) playSong(prev.id);
};

//  Play button
playButton.addEventListener("click", () => {
  if (!userData.currentSong) playSong(0);
  else playSong(userData.currentSong.id);
});

//  Pause button
pauseButton.addEventListener("click", pauseSong);

// 
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);

// 🎵 Click playlist songs
document.querySelectorAll(".playlist-song").forEach(song => {
  const id = Number(song.id.split("-")[1]);

  song.addEventListener("click", () => {
    playSong(id);
  });
});

//  Auto next when song ends
audio.addEventListener("ended", playNextSong);
