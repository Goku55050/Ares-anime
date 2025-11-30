/* ========= Ares Anime - script.js =========
   - Stores all anime data (Hindi Dub only)
   - Handles: home, episodes, watch, download, admin
   - Admin password: Ares13579
   - Pages must have <body id="home|episodes|watch|download|admin">
========================================== */

// ---------- 0. GLOBAL SETTINGS ----------

// Ek hi main Streamgh embed URL yahan rakho.
// Agar episode ka streamUrl empty hoga to ye use hoga.
const MAIN_STREAM_URL = "https://your-streamgh-embed-url-here";

// Agar downloadUrl empty hoga to ye use hoga (optional).
const MAIN_DOWNLOAD_URL = "https://your-main-download-url-here";

// ---------- 1. MASTER ANIME DATA ----------
// S1 ke saare episodes placeholders ke sath.
// Tum sirf streamUrl / downloadUrl ko badal do.

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
          streamUrl: "https://hglink.to/e/em1wazxg4aco",      // put your Streamgh embed here if different
          downloadUrl: "https://hglink.to/d/em1wazxg4aco"     // put direct/shortened download link here
        }))
      }
    ]
  },
  {
    id: "dandadan",
    title: "Dandadan (Hindi Dub)",
    poster: "https://i.postimg.cc/QMRBnkG4/dandadan.jpg",
    description:
      "Momo and Okarun get caught up between aliens and ghosts in a wild supernatural fight. Hindi dubbed.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: Array.from({ length: 12 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),
          streamUrl: "",
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
      "Izuku Midoriya aims to become the greatest hero in a world full of super powers. Hindi dubbed.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 13,
        episodes: Array.from({ length: 13 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),
          streamUrl: "",
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
      "Ayanokoji joins an elite high school where classes compete for survival in a cut-throat system. Hindi dubbed.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: Array.from({ length: 12 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),
          streamUrl: "",
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
      "Denji merges with his chainsaw devil dog Pochita and becomes Chainsaw Man. Hindi dubbed.",
    dubType: "Hindi Dub",
    seasons: [
      {
        id: "s1",
        name: "Season 1",
        totalEpisodes: 12,
        episodes: Array.from({ length: 12 }).map((_, i) => ({
          number: i + 1,
          name: "Episode " + (i + 1),
          streamUrl: "",
          downloadUrl: ""
        }))
      }
    ]
  }
];

// ---------- 2. UTILITIES ----------

function $(selector) {
  return document.querySelector(selector);
}

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text != null) el.textContent = text;
  return el;
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function findAnimeById(id) {
  return animeData.find((a) => a.id === id);
}

function findSeason(anime, seasonId) {
  if (!anime) return null;
  return anime.seasons.find((s) => s.id === seasonId) || anime.seasons[0];
}

function findEpisode(season, episodeNumber) {
  if (!season) return null;
  return season.episodes.find((e) => String(e.number) === String(episodeNumber));
                                                            }// ---------- 3. HOME PAGE ----------

function renderHomePage() {
  const grid = $("#anime-grid");
  const searchInput = $("#search-input");
  const browseBtn = $("#browse-btn");

  if (!grid) return;

  function renderList(filterText = "") {
    grid.innerHTML = "";
    const term = filterText.trim().toLowerCase();

    const filtered = animeData.filter((anime) => {
      if (!term) return true;
      return (
        anime.title.toLowerCase().includes(term) ||
        (anime.description && anime.description.toLowerCase().includes(term))
      );
    });

    if (filtered.length === 0) {
      const empty = createEl("p", "subtitle", "No anime found. Try another name.");
      grid.appendChild(empty);
      return;
    }

    filtered.forEach((anime) => {
      const card = createEl("a", "anime-card");
      card.href = `episodes.html?anime=${encodeURIComponent(anime.id)}`;

      const posterWrap = createEl("div", "anime-poster-wrap");
      const img = createEl("img", "anime-poster");
      img.src = anime.poster;
      img.alt = anime.title;

      const dub = createEl("span", "dub-pill", anime.dubType || "Hindi Dub");
      posterWrap.appendChild(img);
      posterWrap.appendChild(dub);

      const info = createEl("div", "anime-info");
      const title = createEl("h2", null, anime.title);
      const desc = createEl("p", "anime-desc", anime.description || "");
      const meta = createEl(
        "div",
        "anime-meta",
        `${anime.seasons.length} season${anime.seasons.length > 1 ? "s" : ""}`
      );

      info.appendChild(title);
      info.appendChild(desc);
      info.appendChild(meta);

      card.appendChild(posterWrap);
      card.appendChild(info);

      grid.appendChild(card);
    });
  }

  renderList();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderList(e.target.value);
    });
  }

  if (browseBtn) {
    browseBtn.addEventListener("click", () => {
      const section = document.querySelector(".anime-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

// ---------- 4. EPISODES PAGE ----------

function renderEpisodesPage() {
  const animeId = getQueryParam("anime");
  const anime = findAnimeById(animeId);

  const titleEl = $("#detail-title");
  const descEl = $("#detail-desc");
  const metaEl = $("#detail-meta");
  const posterImg = $("#detail-poster-img");
  const listEl = $("#episode-list");

  if (!listEl) return;

  if (!anime) {
    if (titleEl) titleEl.textContent = "Anime not found";
    if (descEl) descEl.textContent = "Please go back and select a valid anime.";
    listEl.innerHTML = "";
    return;
  }

  if (titleEl) titleEl.textContent = anime.title;
  if (descEl) descEl.textContent = anime.description || "";
  if (metaEl)
    metaEl.textContent = `${anime.dubType || "Hindi Dub"} • Seasons: ${anime.seasons.length}`;

  if (posterImg) {
    posterImg.src = anime.poster;
    posterImg.alt = anime.title;
  }

  listEl.innerHTML = "";

  anime.seasons.forEach((season) => {
    const seasonHeader = createEl("h2", "season-title", season.name || "Season");
    listEl.appendChild(seasonHeader);

    season.episodes.forEach((ep) => {
      const row = createEl("div", "episode-row");

      const main = createEl("div", "episode-row-main");
      const t = createEl(
        "div",
        "episode-row-title",
        `Episode ${ep.number}: ${ep.name || ""}`
      );
      const s = createEl(
        "div",
        "episode-row-sub",
        `${anime.dubType || "Hindi Dub"} • Click watch to open stream`
      );
      main.appendChild(t);
      main.appendChild(s);

      const btn = createEl("button", "btn-primary", "Watch Episode");
      btn.addEventListener("click", () => {
        const url = new URL("watch.html", window.location.href);
        url.searchParams.set("anime", anime.id);
        url.searchParams.set("season", season.id);
        url.searchParams.set("episode", ep.number);
        window.location.href = url.toString();
      });

      row.appendChild(main);
      row.appendChild(btn);

      listEl.appendChild(row);
    });
  });
}// ---------- 5. WATCH PAGE ----------

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

  if (!player) return;

  if (!anime || !season || !episode) {
    if (titleEl) titleEl.textContent = "Episode not found";
    if (descEl) descEl.textContent = "Please go back and choose a valid episode.";
    player.removeAttribute("src");
    if (downloadBtn) downloadBtn.disabled = true;
    if (openExternallyBtn) openExternallyBtn.disabled = true;
    return;
  }

  if (titleEl)
    titleEl.textContent = `${anime.title} – S${season.id.toUpperCase()}E${episode.number}`;
  if (descEl) descEl.textContent = episode.name || "";

  // If episode.streamUrl empty → use MAIN_STREAM_URL
  const effectiveStreamUrl = episode.streamUrl || MAIN_STREAM_URL;

  if (effectiveStreamUrl) {
    player.src = effectiveStreamUrl;
  } else {
    player.src = "";
    if (descEl)
      descEl.textContent +=
        " (No streaming URL set yet. Please add a streamUrl in animeData or MAIN_STREAM_URL.)";
  }

  if (downloadBtn) {
    const effectiveDownloadUrl = episode.downloadUrl || MAIN_DOWNLOAD_URL;
    if (effectiveDownloadUrl) {
      downloadBtn.disabled = false;
      downloadBtn.addEventListener("click", () => {
        const url = new URL("download.html", window.location.href);
        url.searchParams.set("anime", anime.id);
        url.searchParams.set("season", season.id);
        url.searchParams.set("episode", episode.number);
        window.location.href = url.toString();
      });
    } else {
      downloadBtn.disabled = true;
      downloadBtn.textContent = "No download link set";
    }
  }

  if (openExternallyBtn) {
    if (effectiveStreamUrl) {
      openExternallyBtn.disabled = false;
      openExternallyBtn.addEventListener("click", () => {
        window.open(effectiveStreamUrl, "_blank", "noopener");
      });
    } else {
      openExternallyBtn.disabled = true;
    }
  }
}

// ---------- 6. DOWNLOAD PAGE (15 sec countdown) ----------

function renderDownloadPage() {
  const animeId = getQueryParam("anime");
  const seasonId = getQueryParam("season");
  const epNumber = getQueryParam("episode");

  const anime = findAnimeById(animeId);
  const season = findSeason(anime, seasonId);
  const episode = findEpisode(season, epNumber);

  const titleEl = $("#dl-title");
  const descEl = $("#dl-desc");
  const timerEl = $("#dl-timer");
  const linkEl = $("#dl-direct-link");

  if (!titleEl || !linkEl) return;

  const effectiveDownloadUrl = episode && (episode.downloadUrl || MAIN_DOWNLOAD_URL);

  if (!anime || !season || !episode || !effectiveDownloadUrl) {
    titleEl.textContent = "Download link not available";
    if (descEl)
      descEl.textContent =
        "This episode has no downloadUrl / MAIN_DOWNLOAD_URL set yet. Please add it in the admin panel or animeData.";
    linkEl.style.display = "none";
    if (timerEl) timerEl.textContent = "";
    return;
  }

  titleEl.textContent = `Download – ${anime.title} Episode ${episode.number}`;
  if (descEl) descEl.textContent = episode.name || "";

  let seconds = 15;
  linkEl.style.display = "none";

  function updateTimer() {
    if (!timerEl) return;
    if (seconds > 0) {
      timerEl.textContent = `Your download will be ready in ${seconds} seconds...`;
      seconds -= 1;
    } else {
      timerEl.textContent = "Your download is ready. Click the button below.";
      linkEl.href = effectiveDownloadUrl;
      linkEl.style.display = "inline-flex";
      clearInterval(intervalId);
    }
  }

  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);
                           }// ---------- 7. ADMIN PAGE ----------

const ADMIN_PASSWORD = "Ares13579";

function renderAdminPage() {
  const loginSection = $("#admin-login");
  const mainSection = $("#admin-main");
  const passwordInput = $("#admin-password");
  const loginBtn = $("#admin-login-btn");

  if (!loginSection || !passwordInput || !loginBtn || !mainSection) return;

  function unlock() {
    if (passwordInput.value === ADMIN_PASSWORD) {
      loginSection.style.display = "none";
      mainSection.classList.remove("admin-hidden");
      initAdminEditor();
    } else {
      alert("Wrong password");
    }
  }

  loginBtn.addEventListener("click", unlock);
  passwordInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") unlock();
  });
}

function initAdminEditor() {
  const animeSelect = $("#anime-select");
  const addAnimeBtn = $("#add-anime-btn");
  const animeIdInput = $("#anime-id");
  const animeTitleInput = $("#anime-title");
  const animePosterInput = $("#anime-poster");
  const animeDescInput = $("#anime-desc");

  const seasonSelect = $("#season-select");
  const addSeasonBtn = $("#add-season-btn");
  const seasonIdInput = $("#season-id");
  const seasonNameInput = $("#season-name");
  const seasonTotalInput = $("#season-total");

  const episodeTbody = $("#episode-tbody");
  const addEpisodeRowBtn = $("#add-episode-row-btn");

  const jsonTextarea = $("#admin-json");
  const refreshJsonBtn = $("#admin-refresh-json");
  const downloadJsonBtn = $("#admin-download-json");

  // ----- helpers -----
  function rebuildAnimeSelect() {
    animeSelect.innerHTML = "";
    animeData.forEach((anime, idx) => {
      const opt = document.createElement("option");
      opt.value = anime.id;
      opt.textContent = `${idx + 1}. ${anime.title}`;
      animeSelect.appendChild(opt);
    });
  }

  function getSelectedAnime() {
    const id = animeSelect.value;
    return findAnimeById(id) || animeData[0];
  }

  function getSelectedSeason(anime) {
    const id = seasonSelect.value;
    return findSeason(anime, id);
  }

  function fillAnimeFields() {
    const anime = getSelectedAnime();
    if (!anime) return;
    animeIdInput.value = anime.id;
    animeTitleInput.value = anime.title;
    animePosterInput.value = anime.poster || "";
    animeDescInput.value = anime.description || "";

    // season select
    seasonSelect.innerHTML = "";
    anime.seasons.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.name || s.id;
      seasonSelect.appendChild(opt);
    });
    fillSeasonFields();
  }

  function fillSeasonFields() {
    const anime = getSelectedAnime();
    const season = getSelectedSeason(anime);
    if (!season) return;
    seasonIdInput.value = season.id;
    seasonNameInput.value = season.name || "";
    seasonTotalInput.value =
      typeof season.totalEpisodes === "number" ? season.totalEpisodes : "";

    episodeTbody.innerHTML = "";
    season.episodes.forEach((ep) => {
      addEpisodeRow(ep);
    });
  }

  function addEpisodeRow(ep = { number: "", name: "", streamUrl: "", downloadUrl: "" }) {
    const tr = document.createElement("tr");

    const tdNum = document.createElement("td");
    const inputNum = document.createElement("input");
    inputNum.type = "number";
    inputNum.value = ep.number;
    tdNum.appendChild(inputNum);

    const tdTitle = document.createElement("td");
    const inputTitle = document.createElement("input");
    inputTitle.value = ep.name || "";
    tdTitle.appendChild(inputTitle);

    const tdStream = document.createElement("td");
    const inputStream = document.createElement("input");
    inputStream.value = ep.streamUrl || "";
    tdStream.appendChild(inputStream);

    const tdDownload = document.createElement("td");
    const inputDownload = document.createElement("input");
    inputDownload.value = ep.downloadUrl || "";
    tdDownload.appendChild(inputDownload);

    const tdRemove = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.className = "btn-ghost";
    removeBtn.type = "button";
    removeBtn.addEventListener("click", () => {
      tr.remove();
    });
    tdRemove.appendChild(removeBtn);

    tr.appendChild(tdNum);
    tr.appendChild(tdTitle);
    tr.appendChild(tdStream);
    tr.appendChild(tdDownload);
    tr.appendChild(tdRemove);

    episodeTbody.appendChild(tr);
  }

  function applyFormToData() {
    const anime = getSelectedAnime();
    if (!anime) return;

    anime.id = animeIdInput.value.trim() || anime.id;
    anime.title = animeTitleInput.value.trim() || anime.title;
    anime.poster = animePosterInput.value.trim();
    anime.description = animeDescInput.value.trim();

    let season = getSelectedSeason(anime);
    if (!season) {
      season = { id: "s1", name: "Season 1", totalEpisodes: 0, episodes: [] };
      anime.seasons.push(season);
    }

    season.id = seasonIdInput.value.trim() || season.id;
    season.name = seasonNameInput.value.trim() || season.name;
    season.totalEpisodes = Number(seasonTotalInput.value) || season.episodes.length;

    const rows = Array.from(episodeTbody.querySelectorAll("tr"));
    season.episodes = rows.map((tr) => {
      const [numInput, titleInput, streamInput, downloadInput] = tr.querySelectorAll("input");
      return {
        number: Number(numInput.value),
        name: titleInput.value.trim(),
        streamUrl: streamInput.value.trim(),
        downloadUrl: downloadInput.value.trim()
      };
    });
  }

  function refreshJsonDisplay() {
    applyFormToData();
    jsonTextarea.value = JSON.stringify(animeData, null, 2);
  }

  function downloadJsonFile() {
    refreshJsonDisplay();
    const blob = new Blob([jsonTextarea.value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anime-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ----- events -----
  addAnimeBtn.addEventListener("click", () => {
    const newAnime = {
      id: "anime" + (animeData.length + 1),
      title: "New Anime",
      poster: "",
      description: "",
      dubType: "Hindi Dub",
      seasons: [
        {
          id: "s1",
          name: "Season 1",
          totalEpisodes: 0,
          episodes: []
        }
      ]
    };
    animeData.push(newAnime);
    rebuildAnimeSelect();
    animeSelect.value = newAnime.id;
    fillAnimeFields();
    refreshJsonDisplay();
  });

  animeSelect.addEventListener("change", () => {
    fillAnimeFields();
    refreshJsonDisplay();
  });

  addSeasonBtn.addEventListener("click", () => {
    const anime = getSelectedAnime();
    const newSeason = {
      id: "s" + (anime.seasons.length + 1),
      name: "Season " + (anime.seasons.length + 1),
      totalEpisodes: 0,
      episodes: []
    };
    anime.seasons.push(newSeason);
    seasonSelect.value = newSeason.id;
    rebuildAnimeSelect();
    fillAnimeFields();
    refreshJsonDisplay();
  });

  seasonSelect.addEventListener("change", () => {
    fillSeasonFields();
    refreshJsonDisplay();
  });

  addEpisodeRowBtn.addEventListener("click", () => {
    addEpisodeRow();
  });

  refreshJsonBtn.addEventListener("click", () => {
    refreshJsonDisplay();
  });

  downloadJsonBtn.addEventListener("click", () => {
    downloadJsonFile();
  });

  // init
  rebuildAnimeSelect();
  fillAnimeFields();
  refreshJsonDisplay();
}

// ---------- 8. PAGE ROUTER ----------

document.addEventListener("DOMContentLoaded", () => {
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
