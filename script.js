/* ==========================================
   ARES ANIME – UPDATED SCRIPT (FILEMOON + STREAMGH)
   ========================================== */

/* ---------- 0. GLOBAL SETTINGS ---------- */

const MAIN_STREAM_URL = "https://your-streamgh-embed-url-here"; 
const MAIN_DOWNLOAD_URL = "https://your-main-download-url-here";


/* ---------- 1. ANIME DATA (CLEAN) ---------- */
/* Episode fields:
    filemoonUrl: "",
    streamghUrl: "",
    downloadUrl: ""
*/

let animeData = [
  {
    id: "jjk",
    title: "Jujutsu Kaisen (Hindi Dub)",
    poster: "https://i.postimg.cc/DydT6TPN/818DUzqnw-ES.jpg",
    description:
      "Yuji Itadori joins Tokyo Jujutsu High to fight curses after swallowing Sukuna's finger. Hindi dubbed version.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 24,
        episodes: Array.from({ length: 24 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),

          filemoonUrl: "",
          streamghUrl: "https://hglink.to/e/em1wazxg4aco",
          downloadUrl: "https://hglink.to/d/em1wazxg4aco"
        }))
      }
    ]
  },

  {
    id: "dandadan",
    title: "Dandadan (Hindi Dub)",
    poster: "https://i.postimg.cc/QMRBnkG4/dandadan.jpg",
    description:
      "Momo and Okarun get caught between aliens & ghosts in a wild supernatural story.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: Array.from({ length: 12 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),

          filemoonUrl: "",
          streamghUrl: "",
          downloadUrl: ""
        }))
      }
    ]
  },

  {
    id: "mha",
    title: "My Hero Academia (Hindi Dub)",
    poster: "https://i.postimg.cc/Yqvvyqc3/mha.jpg",
    description:
      "Izuku Midoriya aims to become the greatest hero in a world full of quirks.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 13,
        episodes: Array.from({ length: 13 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),

          filemoonUrl: "",
          streamghUrl: "",
          downloadUrl: ""
        }))
      }
    ]
  },

  {
    id: "coe",
    title: "Classroom of the Elite (Hindi Dub)",
    poster: "https://i.postimg.cc/MpqXbCs7/classroom-of-elite.jpg",
    description:
      "Ayanokoji enters a mysterious elite school full of strategy and hidden motives.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: Array.from({ length: 12 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),

          filemoonUrl: "",
          streamghUrl: "",
          downloadUrl: ""
        }))
      }
    ]
  },

  {
    id: "csm",
    title: "Chainsaw Man (Hindi Dub)",
    poster: "https://i.postimg.cc/t4gtZKZz/chainsaw-man.jpg",
    description:
      "Denji merges with Pochita and becomes Chainsaw Man to survive the dark world.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: Array.from({ length: 12 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),

          filemoonUrl: "",
          streamghUrl: "",
          downloadUrl: ""
        }))
      }
    ]
  }
];
/* ==========================================
   2. HELPER FUNCTIONS
   ========================================== */

// Short selector
const $ = (q) => document.querySelector(q);

// Get query param from URL
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// Find anime by ID
function findAnimeById(id) {
  return animeData.find((a) => a.id === id);
}

// Find season inside anime
function findSeason(anime, seasonId) {
  if (!anime) return null;
  return anime.seasons.find((s) => s.id === seasonId);
}

// Find episode inside season
function findEpisode(season, epNumber) {
  if (!season) return null;
  return season.episodes.find((e) => e.number == epNumber);
}


/* ==========================================
   3. HOME PAGE RENDER
   ========================================== */

function renderHomePage() {
  const grid = $("#anime-grid");
  const searchInput = $("#search-input");
  const browseBtn = $("#browse-btn");

  if (!grid) return;

  function displayAnime(list) {
    grid.innerHTML = "";
    list.forEach((anime) => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.poster}" alt="${anime.title}" class="anime-card-img" />
        <h3 class="anime-card-title">${anime.title}</h3>
        <p class="anime-card-dub">${anime.dubType}</p>
      `;

      card.addEventListener("click", () => {
        const url = new URL("episodes.html", location.href);
        url.searchParams.set("anime", anime.id);
        location.href = url;
      });

      grid.appendChild(card);
    });
  }

  displayAnime(animeData);

  searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();
    const filtered = animeData.filter((a) =>
      a.title.toLowerCase().includes(text)
    );
    displayAnime(filtered);
  });

  browseBtn.addEventListener("click", () => {
    displayAnime(animeData);
    searchInput.value = "";
  });
}


/* ==========================================
   4. EPISODES PAGE RENDER (EPISODES.HTML)
   ========================================== */

function renderEpisodesPage() {
  const listEl = $("#episode-list");
  const titleEl = $("#anime-title");

  if (!listEl) return;

  const animeId = getQueryParam("anime");
  const anime = findAnimeById(animeId);

  if (!anime) {
    titleEl.textContent = "Anime not found";
    return;
  }

  titleEl.textContent = anime.title;

  const season = anime.seasons[0]; // default first season (you can extend later)
  listEl.innerHTML = "";

  season.episodes.forEach((ep) => {
    const li = document.createElement("li");
    li.className = "episode-item";
    li.innerHTML = `
      <span>Episode ${ep.number}</span>
    `;

    li.addEventListener("click", () => {
      const url = new URL("watch.html", location.href);
      url.searchParams.set("anime", anime.id);
      url.searchParams.set("season", season.id);
      url.searchParams.set("episode", ep.number);
      location.href = url;
    });

    listEl.appendChild(li);
  });
           }
/* ==========================================
   5. WATCH PAGE RENDER (WATCH.HTML)
   ========================================== */

function renderWatchPage() {
  const animeId = getQueryParam("anime");
  const seasonId = getQueryParam("season");
  const epNumber = getQueryParam("episode");

  const anime = findAnimeById(animeId);
  const season = findSeason(anime, seasonId);
  const episode = findEpisode(season, epNumber);

  const player = $("#video-player");
  const titleEl = $("#watch-title");
  const descEl = $("#watch-desc");
  const downloadBtn = $("#download-btn");
  const openExternallyBtn = $("#open-externally-btn");
  const serverSelect = $("#server-select");

  if (!player) return;

  /* ---------- Validation ---------- */
  if (!anime || !season || !episode) {
    if (titleEl) titleEl.textContent = "Episode not found";
    if (descEl) descEl.textContent = "Invalid episode.";
    player.removeAttribute("src");

    downloadBtn.disabled = true;
    openExternallyBtn.disabled = true;
    serverSelect.disabled = true;
    return;
  }

  /* ---------- Display Title ---------- */
  titleEl.textContent = `${anime.title} – S${season.id.toUpperCase()}E${episode.number}`;
  descEl.textContent = episode.name || "";

  /* ---------- URL Getter Function ---------- */
  function getUrl(server) {
    if (server === "filemoon") {
      return episode.filemoonUrl || "";
    }
    if (server === "streamgh") {
      return episode.streamghUrl || MAIN_STREAM_URL || "";
    }
    return "";
  }

  /* ---------- Apply Server to Player ---------- */
  function applyServer(server) {
    const url = getUrl(server);
    if (url) {
      player.src = url;

      openExternallyBtn.disabled = false;
      openExternallyBtn.onclick = () => window.open(url, "_blank");
    } else {
      player.removeAttribute("src");
      openExternallyBtn.disabled = true;
      openExternallyBtn.onclick = null;
    }
  }

  /* ---------- Default Server Selection ---------- */
  let defaultServer = "filemoon";
  if (!getUrl("filemoon") && getUrl("streamgh")) {
    defaultServer = "streamgh";
  }

  serverSelect.value = defaultServer;
  applyServer(defaultServer);

  /* ---------- When User Changes Server ---------- */
  serverSelect.addEventListener("change", (e) => {
    applyServer(e.target.value);
  });

  /* ---------- Download Button ---------- */
  downloadBtn.onclick = () => {
    const downloadUrl = episode.downloadUrl || MAIN_DOWNLOAD_URL;
    if (!downloadUrl) {
      downloadBtn.disabled = true;
      return;
    }

    const url = new URL("download.html", location.href);
    url.searchParams.set("anime", anime.id);
    url.searchParams.set("season", season.id);
    url.searchParams.set("episode", episode.number);

    location.href = url.toString();
  };
                        }
/* ==========================================
   6. DOWNLOAD PAGE RENDER (download.html)
   ========================================== */

function renderDownloadPage() {
  const animeId = getQueryParam("anime");
  const seasonId = getQueryParam("season");
  const epNumber = getQueryParam("episode");

  const anime = findAnimeById(animeId);
  const season = findSeason(anime, seasonId);
  const episode = findEpisode(season, epNumber);

  const titleEl = $("#download-title");
  const linkEl = $("#download-link");

  if (!anime || !season || !episode) {
    titleEl.textContent = "Download not found";
    linkEl.textContent = "Invalid episode.";
    return;
  }

  titleEl.textContent = `${anime.title} – Episode ${episode.number}`;
  const finalUrl = episode.downloadUrl || MAIN_DOWNLOAD_URL;

  if (!finalUrl) {
    linkEl.textContent = "No download link available";
    linkEl.removeAttribute("href");
  } else {
    linkEl.href = finalUrl;
    linkEl.textContent = "Click here to download";
  }
}


/* ==========================================
   7. ADMIN PANEL (admin-ares-panel.html)
   FULLY UPDATED (Filemoon + StreamGH)
   ========================================== */

function initAdminEditor() {
  const animeSelect = $("#anime-select");
  const seasonSelect = $("#season-select");
  const animeIdInput = $("#anime-id");
  const animeTitleInput = $("#anime-title");
  const animePosterInput = $("#anime-poster");
  const animeDescInput = $("#anime-description");

  const seasonIdInput = $("#season-id");
  const seasonNameInput = $("#season-name");
  const seasonTotalInput = $("#season-total");

  const episodeTbody = $("#episode-tbody");
  const jsonTextarea = $("#json-output");
  const saveBtn = $("#save-btn");

  if (!animeSelect) return;

  /* ---------- Populate Anime Dropdown ---------- */
  animeSelect.innerHTML = "";
  animeData.forEach((anime) => {
    const opt = document.createElement("option");
    opt.value = anime.id;
    opt.textContent = anime.title;
    animeSelect.appendChild(opt);
  });

  /* ---------- Update Form when Anime Changes ---------- */
  animeSelect.addEventListener("change", () => {
    loadAnimeToForm();
    refreshEpisodeTable();
    refreshJsonDisplay();
  });

  /* ---------- Update Season dropdown on load ---------- */
  seasonSelect.addEventListener("change", () => {
    loadSeasonToForm();
    refreshEpisodeTable();
    refreshJsonDisplay();
  });

  /* ---------- Load Anime into Inputs ---------- */
  function loadAnimeToForm() {
    const anime = getSelectedAnime();
    if (!anime) return;

    animeIdInput.value = anime.id;
    animeTitleInput.value = anime.title;
    animePosterInput.value = anime.poster;
    animeDescInput.value = anime.description;

    /* Populate Season Dropdown */
    seasonSelect.innerHTML = "";
    anime.seasons.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.name;
      seasonSelect.appendChild(opt);
    });

    loadSeasonToForm();
  }

  /* ---------- Load Season into Inputs ---------- */
  function loadSeasonToForm() {
    const anime = getSelectedAnime();
    const season = getSelectedSeason(anime);
    if (!season) return;

    seasonIdInput.value = season.id;
    seasonNameInput.value = season.name;
    seasonTotalInput.value = season.totalEpisodes;
  }

  /* ---------- Helpers ---------- */
  function getSelectedAnime() {
    return findAnimeById(animeSelect.value);
  }

  function getSelectedSeason(anime) {
    if (!anime) return null;
    return anime.seasons.find((s) => s.id === seasonSelect.value);
  }

  /* ---------- Refresh Episode Table ---------- */
  function refreshEpisodeTable() {
    const anime = getSelectedAnime();
    const season = getSelectedSeason(anime);
    episodeTbody.innerHTML = "";

    if (!season) return;

    season.episodes.forEach((ep) => addEpisodeRow(ep));
     }
   /* ==========================================
     EPISODE ROW BUILDER  (Updated)
     ========================================== */

  function addEpisodeRow(
    ep = {
      number: "",
      name: "",
      filemoonUrl: "",
      streamghUrl: "",
      downloadUrl: ""
    }
  ) {
    const tr = document.createElement("tr");

    /* ----- Episode Number ----- */
    const tdNum = document.createElement("td");
    const inputNum = document.createElement("input");
    inputNum.type = "number";
    inputNum.value = ep.number;
    tdNum.appendChild(inputNum);

    /* ----- Episode Title ----- */
    const tdTitle = document.createElement("td");
    const inputTitle = document.createElement("input");
    inputTitle.value = ep.name || "";
    tdTitle.appendChild(inputTitle);

    /* ----- Filemoon URL ----- */
    const tdFilemoon = document.createElement("td");
    const inputFilemoon = document.createElement("input");
    inputFilemoon.value = ep.filemoonUrl || "";
    tdFilemoon.appendChild(inputFilemoon);

    /* ----- StreamGH URL ----- */
    const tdStreamgh = document.createElement("td");
    const inputStreamgh = document.createElement("input");
    inputStreamgh.value = ep.streamghUrl || "";
    tdStreamgh.appendChild(inputStreamgh);

    /* ----- Download URL ----- */
    const tdDownload = document.createElement("td");
    const inputDownload = document.createElement("input");
    inputDownload.value = ep.downloadUrl || "";
    tdDownload.appendChild(inputDownload);

    /* ----- Remove Button ----- */
    const tdRemove = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.className = "btn-ghost remove-episode-btn";
    removeBtn.type = "button";
    removeBtn.addEventListener("click", () => tr.remove());
    tdRemove.appendChild(removeBtn);

    /* Append Cells */
    tr.appendChild(tdNum);
    tr.appendChild(tdTitle);
    tr.appendChild(tdFilemoon);
    tr.appendChild(tdStreamgh);
    tr.appendChild(tdDownload);
    tr.appendChild(tdRemove);

    episodeTbody.appendChild(tr);
  }


  /* ==========================================
     APPLY FORM → UPDATE animeData STRUCTURE
     ========================================== */

  function applyFormToData() {
    const anime = getSelectedAnime();
    if (!anime) return;

    /* ----- Update Anime Info ----- */
    anime.id = animeIdInput.value.trim() || anime.id;
    anime.title = animeTitleInput.value.trim() || anime.title;
    anime.poster = animePosterInput.value.trim();
    anime.description = animeDescInput.value.trim();

    /* ----- Update Season Info ----- */
    let season = getSelectedSeason(anime);
    if (!season) {
      season = { id: "s1", name: "Season 1", totalEpisodes: 0, episodes: [] };
      anime.seasons.push(season);
    }

    season.id = seasonIdInput.value.trim() || season.id;
    season.name = seasonNameInput.value.trim() || season.name;
    season.totalEpisodes = Number(seasonTotalInput.value) || season.episodes.length;

    /* ----- Build Episodes Array from Table ----- */
    const rows = Array.from(episodeTbody.querySelectorAll("tr"));
    season.episodes = rows.map((tr) => {
      const inputs = tr.querySelectorAll("input");
      return {
        number: Number(inputs[0].value),
        name: inputs[1].value.trim(),
        filemoonUrl: inputs[2].value.trim(),
        streamghUrl: inputs[3].value.trim(),
        downloadUrl: inputs[4].value.trim()
      };
    });
  }


  /* ==========================================
     UPDATE JSON PREVIEW BOX
     ========================================== */

  function refreshJsonDisplay() {
    applyFormToData();
    jsonTextarea.value = JSON.stringify(animeData, null, 2);
  }

  /* Auto refresh JSON when typing in inputs */
  document.addEventListener("input", (e) => {
    if (e.target.closest("#admin-panel")) {
      refreshJsonDisplay();
    }
  });

  /* SAVE BUTTON (COPY JSON TO CLIPBOARD) */
  saveBtn.addEventListener("click", () => {
    refreshJsonDisplay();
    navigator.clipboard.writeText(jsonTextarea.value);
    alert("JSON copied to clipboard!");
  });

  /* Load initial default */
  loadAnimeToForm();
  refreshEpisodeTable();
  refreshJsonDisplay();
       }
/* ==========================================
   8. INIT PAGE LOGIC
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  switch (page) {
    case "home":
      renderHomePage();
      break;

    case "episodes":
      renderEpisodesPage();
      break;

    case "watch":
      renderWatchPage();
      break;

    case "download":
      renderDownloadPage();
      break;

    case "admin":
      initAdminEditor();
      break;

    default:
      console.warn("Unknown page:", page);
  }
});
