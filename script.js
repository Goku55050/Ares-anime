/* ========= Ares Anime - script.js =========
   - Stores all anime data (Hindi Dub only)
   - Handles: home, episodes, watch, download, admin
   - Admin password: Ares13579
   - Pages must have <body id="home|episodes|watch|download|admin">
========================================== */

// ---------- 1. MASTER ANIME DATA ----------
// NOTE: streamUrl & downloadUrl are EMPTY.
// Put your real Filemoon links there later.

const animeData = [
  {
    id: "jjk",
    title: "Jujutsu Kaisen (Hindi Dub)",
    poster: "https://i.postimg.cc/DydT6TPN/818DUzqnw-ES.jpg",
    description:
      "Yuji Itadori joins Tokyo Jujutsu High to fight curses after swallowing Sukuna's finger. Hindi dubbed version.",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 24,
        episodes: [
          { number: 1,  name: "Episode 1",  streamUrl: "https://filemoon.to/e/w489ph62gwkc", downloadUrl: "https://filemoon.to/download/w489ph62gwkc" },
          { number: 2,  name: "Episode 2",  streamUrl: "", downloadUrl: "" },
          { number: 3,  name: "Episode 3",  streamUrl: "", downloadUrl: "" },
          { number: 4,  name: "Episode 4",  streamUrl: "", downloadUrl: "" },
          { number: 5,  name: "Episode 5",  streamUrl: "", downloadUrl: "" },
          { number: 6,  name: "Episode 6",  streamUrl: "", downloadUrl: "" },
          { number: 7,  name: "Episode 7",  streamUrl: "", downloadUrl: "" },
          { number: 8,  name: "Episode 8",  streamUrl: "", downloadUrl: "" },
          { number: 9,  name: "Episode 9",  streamUrl: "", downloadUrl: "" },
          { number: 10, name: "Episode 10", streamUrl: "", downloadUrl: "" },
          { number: 11, name: "Episode 11", streamUrl: "", downloadUrl: "" },
          { number: 12, name: "Episode 12", streamUrl: "", downloadUrl: "" },
          { number: 13, name: "Episode 13", streamUrl: "", downloadUrl: "" },
          { number: 14, name: "Episode 14", streamUrl: "", downloadUrl: "" },
          { number: 15, name: "Episode 15", streamUrl: "", downloadUrl: "" },
          { number: 16, name: "Episode 16", streamUrl: "", downloadUrl: "" },
          { number: 17, name: "Episode 17", streamUrl: "", downloadUrl: "" },
          { number: 18, name: "Episode 18", streamUrl: "", downloadUrl: "" },
          { number: 19, name: "Episode 19", streamUrl: "", downloadUrl: "" },
          { number: 20, name: "Episode 20", streamUrl: "", downloadUrl: "" },
          { number: 21, name: "Episode 21", streamUrl: "", downloadUrl: "" },
          { number: 22, name: "Episode 22", streamUrl: "", downloadUrl: "" },
          { number: 23, name: "Episode 23", streamUrl: "", downloadUrl: "" },
          { number: 24, name: "Episode 24", streamUrl: "", downloadUrl: "" }
        ]
      }
    ]
  },
  {
    id: "dandadan",
    title: "Dandadan (Hindi Dub)",
    poster: "https://i.postimg.cc/0NNKxZNr/DAN-DA-DAN-Official-Key-Art-2x3-1-scaled.jpg",
    description:
      "Momo and Okarun get caught between aliens and spirits in a crazy supernatural battle. Hindi dubbed.",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: [
          { number: 1,  name: "Episode 1",  streamUrl: "", downloadUrl: "" },
          { number: 2,  name: "Episode 2",  streamUrl: "", downloadUrl: "" },
          { number: 3,  name: "Episode 3",  streamUrl: "", downloadUrl: "" },
          { number: 4,  name: "Episode 4",  streamUrl: "", downloadUrl: "" },
          { number: 5,  name: "Episode 5",  streamUrl: "", downloadUrl: "" },
          { number: 6,  name: "Episode 6",  streamUrl: "", downloadUrl: "" },
          { number: 7,  name: "Episode 7",  streamUrl: "", downloadUrl: "" },
          { number: 8,  name: "Episode 8",  streamUrl: "", downloadUrl: "" },
          { number: 9,  name: "Episode 9",  streamUrl: "", downloadUrl: "" },
          { number: 10, name: "Episode 10", streamUrl: "", downloadUrl: "" },
          { number: 11, name: "Episode 11", streamUrl: "", downloadUrl: "" },
          { number: 12, name: "Episode 12", streamUrl: "", downloadUrl: "" }
        ]
      }
    ]
  },
  {
    id: "cote",
    title: "Classroom of the Elite (Hindi Dub)",
    poster: "https://i.postimg.cc/4ywTJvyN/MV5BMDg3MGVh-NWUt-YTQ2NS00ZDdi-LTg5MTMt-Zm-M5Mj-Uz-N2Ix-N2I4Xk-Ey-Xk-Fqc-Gc-V1.jpg",
    description:
      "Ayanokoji joins an elite high school where classes secretly fight for survival. Hindi dubbed.",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: [
          { number: 1,  name: "Episode 1",  streamUrl: "", downloadUrl: "" },
          { number: 2,  name: "Episode 2",  streamUrl: "", downloadUrl: "" },
          { number: 3,  name: "Episode 3",  streamUrl: "", downloadUrl: "" },
          { number: 4,  name: "Episode 4",  streamUrl: "", downloadUrl: "" },
          { number: 5,  name: "Episode 5",  streamUrl: "", downloadUrl: "" },
          { number: 6,  name: "Episode 6",  streamUrl: "", downloadUrl: "" },
          { number: 7,  name: "Episode 7",  streamUrl: "", downloadUrl: "" },
          { number: 8,  name: "Episode 8",  streamUrl: "", downloadUrl: "" },
          { number: 9,  name: "Episode 9",  streamUrl: "", downloadUrl: "" },
          { number: 10, name: "Episode 10", streamUrl: "", downloadUrl: "" },
          { number: 11, name: "Episode 11", streamUrl: "", downloadUrl: "" },
          { number: 12, name: "Episode 12", streamUrl: "", downloadUrl: "" }
        ]
      }
    ]
  },
  {
    id: "mha",
    title: "My Hero Academia (Hindi Dub)",
    poster: "https://i.postimg.cc/fW54SKWZ/Bokuno-Hiro-Akademiakeyvisual.jpg",
    description:
      "Izuku Midoriya inherits One For All and joins U.A. High to become the number one hero. Hindi dubbed.",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 13,
        episodes: [
          { number: 1,  name: "Episode 1",  streamUrl: "", downloadUrl: "" },
          { number: 2,  name: "Episode 2",  streamUrl: "", downloadUrl: "" },
          { number: 3,  name: "Episode 3",  streamUrl: "", downloadUrl: "" },
          { number: 4,  name: "Episode 4",  streamUrl: "", downloadUrl: "" },
          { number: 5,  name: "Episode 5",  streamUrl: "", downloadUrl: "" },
          { number: 6,  name: "Episode 6",  streamUrl: "", downloadUrl: "" },
          { number: 7,  name: "Episode 7",  streamUrl: "", downloadUrl: "" },
          { number: 8,  name: "Episode 8",  streamUrl: "", downloadUrl: "" },
          { number: 9,  name: "Episode 9",  streamUrl: "", downloadUrl: "" },
          { number: 10, name: "Episode 10", streamUrl: "", downloadUrl: "" },
          { number: 11, name: "Episode 11", streamUrl: "", downloadUrl: "" },
          { number: 12, name: "Episode 12", streamUrl: "", downloadUrl: "" },
          { number: 13, name: "Episode 13", streamUrl: "", downloadUrl: "" }
        ]
      }
    ]
  },
  {
    id: "cm",
    title: "Chainsaw Man (Hindi Dub)",
    poster: "https://i.postimg.cc/prc1GsyH/MV5BZGY2ZTM2MWMt-Nz-A2OS00Zj-Jl-LWIw-ZTMt-MDBh-N2Ew-Yj-Zj-Zj-Ey-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
    description:
      "Denji becomes Chainsaw Man after merging with Pochita, hunting devils for survival. Hindi dubbed.",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: [
          { number: 1,  name: "Episode 1",  streamUrl: "", downloadUrl: "" },
          { number: 2,  name: "Episode 2",  streamUrl: "", downloadUrl: "" },
          { number: 3,  name: "Episode 3",  streamUrl: "", downloadUrl: "" },
          { number: 4,  name: "Episode 4",  streamUrl: "", downloadUrl: "" },
          { number: 5,  name: "Episode 5",  streamUrl: "", downloadUrl: "" },
          { number: 6,  name: "Episode 6",  streamUrl: "", downloadUrl: "" },
          { number: 7,  name: "Episode 7",  streamUrl: "", downloadUrl: "" },
          { number: 8,  name: "Episode 8",  streamUrl: "", downloadUrl: "" },
          { number: 9,  name: "Episode 9",  streamUrl: "", downloadUrl: "" },
          { number: 10, name: "Episode 10", streamUrl: "", downloadUrl: "" },
          { number: 11, name: "Episode 11", streamUrl: "", downloadUrl: "" },
          { number: 12, name: "Episode 12", streamUrl: "", downloadUrl: "" }
        ]
      }
    ]
  }
];

// ---------- 2. HELPER FUNCTIONS ----------

function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function findAnime(animeId) {
  return animeData.find(a => a.id === animeId) || null;
}

function findSeason(anime, seasonId) {
  if (!anime) return null;
  return anime.seasons.find(s => s.id === seasonId) || null;
}

function findEpisode(season, epNumber) {
  if (!season) return null;
  return season.episodes.find(e => String(e.number) === String(epNumber)) || null;
}// ---------- 3. HOME PAGE (index.html, body id="home") ----------

function renderHomePage() {
  const listEl = document.getElementById("anime-list");
  if (!listEl) return;

  listEl.innerHTML = "";

  animeData.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";

    card.innerHTML = `
      <img src="${anime.poster}" alt="${anime.title} Poster" class="anime-poster">
      <div class="anime-info">
        <h2>${anime.title}</h2>
        <p class="anime-desc">${anime.description}</p>
        <p class="anime-meta">Hindi Dub • Seasons: ${anime.seasons.length}</p>
        <button class="btn watch-now-btn"
          onclick="goToEpisodes('${anime.id}', 's1')">
          Browse Episodes
        </button>
      </div>
    `;

    listEl.appendChild(card);
  });
}

function goToEpisodes(animeId, seasonId) {
  window.location.href = `episodes.html?anime=${encodeURIComponent(animeId)}&season=${encodeURIComponent(seasonId)}`;
}

// ---------- 4. EPISODE LIST PAGE (episodes.html, body id="episodes") ----------

function renderEpisodesPage() {
  const animeId = getParam("anime");
  const seasonId = getParam("season") || "s1";

  const anime = findAnime(animeId);
  const season = findSeason(anime, seasonId);

  const titleEl = document.getElementById("episodes-anime-title");
  const descEl = document.getElementById("episodes-anime-desc");
  const seasonEl = document.getElementById("episodes-season-name");
  const listEl = document.getElementById("episode-list");

  if (!anime || !season || !listEl) {
    if (titleEl) titleEl.textContent = "Anime not found";
    return;
  }

  if (titleEl) titleEl.textContent = anime.title;
  if (descEl) descEl.textContent = anime.description;
  if (seasonEl) seasonEl.textContent = season.name + ` • ${season.totalEpisodes} Episodes (Hindi Dub)`;

  listEl.innerHTML = "";

  season.episodes.forEach(ep => {
    const li = document.createElement("li");
    li.className = "episode-item";

    li.innerHTML = `
      <div class="episode-text">
        <span class="episode-number">Episode ${ep.number}</span>
        <span class="episode-name">- ${ep.name}</span>
      </div>
      <div class="episode-actions">
        <button class="btn small"
          onclick="goToWatch('${anime.id}','${season.id}',${ep.number})">
          Watch Episode
        </button>
      </div>
    `;

    listEl.appendChild(li);
  });
}

function goToWatch(animeId, seasonId, epNumber) {
  window.location.href =
    `watch.html?anime=${encodeURIComponent(animeId)}&season=${encodeURIComponent(seasonId)}&ep=${encodeURIComponent(epNumber)}`;
}

// ---------- 5. WATCH PAGE (watch.html, body id="watch") ----------
// - Plays stream in iframe
// - Has Next / Prev episode buttons
// - Has Download button -> goes to download.html (10s timer + ads)

function renderWatchPage() {
  const animeId = getParam("anime");
  const seasonId = getParam("season") || "s1";
  const epNumber = getParam("ep");

  const anime = findAnime(animeId);
  const season = findSeason(anime, seasonId);
  const episode = findEpisode(season, epNumber);

  const titleEl = document.getElementById("watch-title");
  const iframeEl = document.getElementById("video-player");
  const prevBtn = document.getElementById("btn-prev-ep");
  const nextBtn = document.getElementById("btn-next-ep");
  const downloadBtn = document.getElementById("btn-download");
  const epInfoEl = document.getElementById("watch-ep-info");

  if (!anime || !season || !episode) {
    if (titleEl) titleEl.textContent = "Episode not found";
    return;
  }

  if (titleEl) {
    titleEl.textContent = `${anime.title} - ${season.name}`;
  }
  if (epInfoEl) {
    epInfoEl.textContent = `Episode ${episode.number}: ${episode.name} (Hindi Dub)`;
  }

  if (iframeEl) {
    if (episode.streamUrl) {
      iframeEl.src = episode.streamUrl;
    } else {
      // No stream URL yet -> show message
      iframeEl.src = "";
      iframeEl.replaceWith(document.createElement("div"));
      const msg = document.createElement("div");
      msg.className = "no-stream-msg";
      msg.textContent = "Streaming link not added yet. Please add in admin/export.";
      document.querySelector(".video-container")?.appendChild(msg);
    }
  }

  // Prev/Next episode logic
  const currentIndex = season.episodes.findIndex(e => e === episode);

  if (prevBtn) {
    if (currentIndex > 0) {
      prevBtn.disabled = false;
      prevBtn.onclick = () => {
        const prevEp = season.episodes[currentIndex - 1];
        goToWatch(anime.id, season.id, prevEp.number);
      };
    } else {
      prevBtn.disabled = true;
    }
  }

  if (nextBtn) {
    if (currentIndex < season.episodes.length - 1) {
      nextBtn.disabled = false;
      nextBtn.onclick = () => {
        const nextEp = season.episodes[currentIndex + 1];
        goToWatch(anime.id, season.id, nextEp.number);
      };
    } else {
      nextBtn.disabled = true;
    }
  }

  // Download button -> go to download.html with same params
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      window.location.href =
        `download.html?anime=${encodeURIComponent(anime.id)}&season=${encodeURIComponent(season.id)}&ep=${encodeURIComponent(episode.number)}`;
    };
  }
}

// ---------- 6. DOWNLOAD PAGE (download.html, body id="download") ----------
// - Shows 10 sec countdown
// - After 10 sec: shows real download link (episode.downloadUrl)
// - Here you can place your Adsterra banners in HTML

function renderDownloadPage() {
  const animeId = getParam("anime");
  const seasonId = getParam("season") || "s1";
  const epNumber = getParam("ep");

  const anime = findAnime(animeId);
  const season = findSeason(anime, seasonId);
  const episode = findEpisode(season, epNumber);

  const titleEl = document.getElementById("download-title");
  const infoEl = document.getElementById("download-ep-info");
  const countdownEl = document.getElementById("download-count");
  const buttonContainer = document.getElementById("download-button-container");

  if (!anime || !season || !episode) {
    if (titleEl) titleEl.textContent = "Download not found";
    return;
  }

  if (titleEl) {
    titleEl.textContent = `Download - ${anime.title}`;
  }
  if (infoEl) {
    infoEl.textContent = `Episode ${episode.number}: ${episode.name} (Hindi Dub)`;
  }

  let secondsLeft = 10;
  if (countdownEl) {
    countdownEl.textContent = secondsLeft.toString();
  }

  const timer = setInterval(() => {
    secondsLeft--;
    if (countdownEl) countdownEl.textContent = secondsLeft.toString();

    if (secondsLeft <= 0) {
      clearInterval(timer);

      if (!buttonContainer) return;

      buttonContainer.innerHTML = "";

      if (episode.downloadUrl) {
        const a = document.createElement("a");
        a.href = episode.downloadUrl;
        a.textContent = "Download Now";
        a.className = "btn download-now-btn";
        a.target = "_blank";
        buttonContainer.appendChild(a);
      } else {
        const msg = document.createElement("div");
        msg.className = "no-download-msg";
        msg.textContent = "Download link not added yet. Please add in admin/export.";
        buttonContainer.appendChild(msg);
      }
    }
  }, 1000);
}// ---------- 7. ADMIN PAGE (hidden URL, body id="admin") ----------
// File example: admin-ares-13579.html (not linked anywhere)
// Simple JS "password": Ares13579  (NOT real security, just basic protection)

const ADMIN_PASSWORD = "Ares13579";

function renderAdminPage() {
  const body = document.body;
  if (!body || body.id !== "admin") return;

  // Simple prompt-based protection
  const entered = prompt("Enter admin password:");
  if (entered !== ADMIN_PASSWORD) {
    alert("Wrong password.");
    window.location.href = "index.html";
    return;
  }

  const textarea = document.getElementById("admin-json");
  const loadBtn = document.getElementById("admin-load-json");
  const exportBtn = document.getElementById("admin-export-json");
  const importInput = document.getElementById("admin-import-file");
  const applyImportBtn = document.getElementById("admin-apply-import");

  if (!textarea) return;

  // Load current animeData into textarea
  if (loadBtn) {
    loadBtn.onclick = () => {
      textarea.value = JSON.stringify(animeData, null, 2);
    };
  }

  // Export textarea JSON as file (you will commit it manually to GitHub)
  if (exportBtn) {
    exportBtn.onclick = () => {
      try {
        // Just validate JSON parses
        JSON.parse(textarea.value);
      } catch (e) {
        alert("JSON invalid: " + e.message);
        return;
      }

      const blob = new Blob([textarea.value], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "anime-data-export.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert("Exported JSON. Replace animeData in script.js with this JSON on your PC and push to GitHub.");
    };
  }

  // Load JSON file from your PC into textarea (for editing)
  if (importInput && applyImportBtn) {
    applyImportBtn.onclick = () => {
      const file = importInput.files && importInput.files[0];
      if (!file) {
        alert("Select a JSON file first.");
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        textarea.value = e.target.result;
        alert("Imported JSON into textarea. Edit if needed, then Export.");
      };
      reader.readAsText(file);
    };
  }
}

// ---------- 8. PAGE ROUTER ----------

window.addEventListener("DOMContentLoaded", () => {
  const bodyId = document.body.id;

  if (bodyId === "home") {
    renderHomePage();
  } else if (bodyId === "episodes") {
    renderEpisodesPage();
  } else if (bodyId === "watch") {
    renderWatchPage();
  } else if (bodyId === "download") {
    renderDownloadPage();
  } else if (bodyId === "admin") {
    renderAdminPage();
  }
});
