// 🎧 CODING SONG PLAYER
// Your coding companion — because bugs hit different with music 😎

// 🎵 Audio engine (our invisible DJ)
const audio = new Audio();

// 🎮 Controls
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

// 📺 Display
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");

// 🎶 Playlist (IMPORTANT: make sure files exist in your repo)
const allSongs = [
  {
    id: 0,
    title: "Spring Waltz",
    artist: "Chopin",
    src: "./Chopin-waltz-in-a-minor.mp3"
  },
  {
    id: 1,
    title: "StockTune-Casual Vibes Office Streams",
    artist: "Coding Vibes",
    src: "./StockTune-Casual Vibes Office Streams_1773967463.mp3"
  },
  {
    id: 2,
    title: "chopin 9",
    artist: "Chopin",
    src: "./clavier-music-chopin-nocturne-op-9-no-2-classical-piano-321995.mp3"
  },
  {
    id: 3,
    title: "Chopin",
    artist: "Chopin",
    src: "./pexels-jonathanschmer-6196828.jpg"
  }
];

// 🧠 App memory (state)
const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0
};

// ▶️ Play a song
const playSong = (id) => {
  const song = userData.songs.find(s => s.id === id);

  if (!song) {
    console.error("❌ Song not found!");
    return;
  }

  // 🎧 Load song
  audio.src = song.src;

  // 🔄 Reset or resume
  if (!userData.currentSong) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }

  // 🧠 Save state
  userData.currentSong = song;

  // 🎨 Update UI
  playingSong.textContent = song.title;
  songArtist.textContent = song.artist;
  playButton.classList.add("playing");

  // 🚀 Play!
  audio.play();
};

// ⏸️ Pause
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

// ⏭️ Next song
const playNextSong = () => {
  if (!userData.currentSong) {
    return playSong(0);
  }

  const index = userData.songs.indexOf(userData.currentSong);
  const next = userData.songs[index + 1];

  if (next) {
    playSong(next.id);
  } else {
    // 🎬 End of playlist
    console.log("🎵 End of playlist");
    userData.currentSong = null;
    audio.pause();
  }
};

// ⏮️ Previous song
const playPreviousSong = () => {
  if (!userData.currentSong) return;

  const index = userData.songs.indexOf(userData.currentSong);
  const prev = userData.songs[index - 1];

  if (prev) {
    playSong(prev.id);
  }
};

// ▶️ Play button
playButton.addEventListener("click", () => {
  if (!userData.currentSong) {
    playSong(0);
  } else {
    playSong(userData.currentSong.id);
  }
});

// ⏸️ Pause button
pauseButton.addEventListener("click", pauseSong);

// ⏭️ ⏮️ Navigation
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);

// 🎵 Playlist click
document.querySelectorAll(".playlist-song").forEach(song => {
  const id = Number(song.id.split("-")[1]);

  song.addEventListener("click", () => {
    playSong(id);
  });
});

// 🔁 Auto play next when song ends
audio.addEventListener("ended", playNextSong);
