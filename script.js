// ===== Songs List =====
const songsList = [
    { name: "Tum Hi Ho", singer: "Arijit Singh", file: "songs/Tum Hi Ho.mp3", poster: "images/Tum Hi Ho.jpg" },
    { name: "Kal Ho Naa Ho", singer: "Sonu Nigam", file: "songs/Kal Ho Naa Ho.mp3", poster: "images/Kal Ho Naa Ho.jpg" },
    { name: "Tujh Mein Rab Dikhta Hai", singer: "Shreya Ghoshal", file: "songs/Tujh Mein Rab Dikhta Hai.mp3", poster: "images/Tujh Mein Rab Dikhta Hai.jpg" }
];

// ===== Spotify-style Search =====
function searchSongs() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const results = document.getElementById("searchResults");
    results.innerHTML = "";
    if(!input) return;

    const filtered = songsList.filter(song =>
        song.name.toLowerCase().includes(input) ||
        song.singer.toLowerCase().includes(input)
    );

    if(filtered.length === 0){
        results.innerHTML = "<p style='padding:15px;'>No songs found.</p>";
        return;
    }

    filtered.forEach(song => {
        const card = document.createElement("div");
        card.className = "song-card";
        card.innerHTML = `
            <img src="${song.poster}" class="song-poster">
            <div class="song-info">
                <p class="song-name">${song.name}</p>
                <p class="song-singer">${song.singer}</p>
            </div>
        `;
        card.onclick = () => {
            const player = document.getElementById("audioPlayer");
            player.src = song.file;
            player.style.display = "block";
            player.play();
        };
        results.appendChild(card);
    });
}

// ===== Local Files Loader =====
function loadLocalFiles() {
    const files = document.getElementById("localFiles").files;
    const container = document.getElementById("localSongs");
    container.innerHTML = "";

    Array.from(files).forEach(file => {
        if(!file.type.startsWith("audio/")) return;

        const fileName = document.createElement("p");
        fileName.textContent = "🎵 " + file.name;

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = URL.createObjectURL(file);
        audio.addEventListener("ended", ()=> URL.revokeObjectURL(audio.src));

        // Profile stats
        audio.addEventListener("play", () => {
            let songsPlayed = parseInt(localStorage.getItem("songsPlayed")||0)+1;
            localStorage.setItem("songsPlayed", songsPlayed);
            if(document.getElementById("songsPlayed")) document.getElementById("songsPlayed").textContent = songsPlayed;

            let listenTime = parseInt(localStorage.getItem("listenTime")||0)+1;
            localStorage.setItem("listenTime", listenTime);
            if(document.getElementById("listenTime")) document.getElementById("listenTime").textContent = listenTime;
        });

        container.appendChild(fileName);
        container.appendChild(audio);
    });
}

// ===== Reset Stats =====
function resetStats() {
    localStorage.setItem("songsPlayed", 0);
    localStorage.setItem("listenTime", 0);
    if(document.getElementById("songsPlayed")) document.getElementById("songsPlayed").textContent = 0;
    if(document.getElementById("listenTime")) document.getElementById("listenTime").textContent = 0;
}