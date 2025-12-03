/* ===========================================================
   LOAD ANIME DATA
=========================================================== */
let animeList = [];

async function loadAnimeData() {
  try {
    const res = await fetch("animeData.json?nocache=" + Date.now());
    animeList = await res.json();
    initPage();
  } catch (err) {
    console.error("Error loading animeData.json:", err);
  }
}

loadAnimeData();

/* ===========================================================
   PAGE ROUTER
=========================================================== */
function initPage() {
  const page = document.body.dataset.page;

  switch (page) {
    case "home":     initHomePage();     break;
    case "browse":   initBrowsePage();   break;
    case "episodes": initEpisodesPage(); break;
    case "watch":    initWatchPage();    break;
    case "download": initDownloadPage(); break;
    case "admin":    initAdminPage();    break;
  }
}

/* ===========================================================
   HOME PAGE (Hero + Sections)
=========================================================== */
let heroIndex = 0;
let heroList = [];

function initHomePage() {
  if (!animeList.length) return;

  renderHomeSections();
  renderHeroBanner();
}

/* HERO AUTO ROTATION (5 sec) */
function renderHeroBanner() {
  heroList = [...animeList].sort((a, b) => b.popularity - a.popularity);

  // first slide
  setHeroAnime(heroList[0]);

  // auto next every 5 sec
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroList.length;
    fadeHero(() => setHeroAnime(heroList[heroIndex]));
  }, 5000);
}

function fadeHero(callback) {
  const hero = document.querySelector(".hero-inner");
  if (!hero) {
    callback();
    return;
  }

  hero.classList.add("fade-out");

  setTimeout(() => {
    callback();
    hero.classList.remove("fade-out");
    hero.classList.add("fade-in");

    setTimeout(() => hero.classList.remove("fade-in"), 800);
  }, 800);
}

/* Set hero banner content (no long description) */
function setHeroAnime(anime) {
  if (!anime) return;

  const titleEl   = document.getElementById("hero-title");
  const metaEl    = document.getElementById("hero-meta");
  const posterEl  = document.getElementById("hero-poster");
  const pillEl    = document.getElementById("hero-pill");
  const watchBtn  = document.getElementById("hero-watch-btn");

  if (titleEl)  titleEl.textContent  = anime.title;
  if (metaEl)   metaEl.textContent   = `${anime.seasons.length} Seasons`;
  if (posterEl) posterEl.src         = anime.poster;
  if (pillEl)   pillEl.textContent   = "Hindi Dub • Updated";

  if (watchBtn) {
    watchBtn.onclick = () => {
      location.href = `episodes.html?id=${anime.id}`;
    };
  }
}

/* ===========================================================
   TOUCH SWIPE SUPPORT FOR HERO SLIDER
=========================================================== */
let startX = 0;
let endX = 0;

const heroEl = document.querySelector(".hero-inner");

if (heroEl) {
  heroEl.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  heroEl.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;

    // swipe left = next
    if (startX - endX > 50) {
      heroIndex = (heroIndex + 1) % heroList.length;
      fadeHero(() => setHeroAnime(heroList[heroIndex]));
    }
    // swipe right = previous
    else if (endX - startX > 50) {
      heroIndex = (heroIndex - 1 + heroList.length) % heroList.length;
      fadeHero(() => setHeroAnime(heroList[heroIndex]));
    }
  });
}

/* ===========================================================
   HOME ROWS
=========================================================== */
function renderHomeSections() {
  renderHomeRow(
    "latest-row",
    [...animeList].sort((a, b) => b.updated - a.updated)
  );
  renderHomeRow(
    "popular-row",
    [...animeList].sort((a, b) => b.popularity - a.popularity)
  );
  renderHomeRow(
    "trending-row",
    [...animeList].sort((a, b) => b.trending - a.trending)
  );
}

function renderHomeRow(id, list) {
  const row = document.getElementById(id);
  if (!row) return;

  row.innerHTML = "";

  list.forEach((a) => {
    row.innerHTML += `
      <div class="anime-card" onclick="location.href='episodes.html?id=${a.id}'">
        <img src="${a.poster}">
        <div class="card-title">${a.title}</div>
      </div>`;
  });
}

/* ===========================================================
   BROWSE PAGE
=========================================================== */
function initBrowsePage() {
  const searchBox = document.getElementById("browse-search-input");
  if (!searchBox) return;

  renderBrowseList(animeList);

  searchBox.addEventListener("input", () => {
    const q = searchBox.value.toLowerCase();
    const filtered = animeList.filter((a) =>
      a.title.toLowerCase().includes(q)
    );
    renderBrowseList(filtered);
  });
}

function renderBrowseList(list) {
  const grid = document.getElementById("browse-list");
  if (!grid) return;

  grid.innerHTML = "";

  list.forEach((a) => {
    grid.innerHTML += `
      <div class="browse-card" onclick="location.href='episodes.html?id=${a.id}'">
        <img src="${a.poster}">
        <h3>${a.title}</h3>
      </div>`;
  });
}

/* ===========================================================
   EPISODES PAGE
=========================================================== */
function initEpisodesPage() {
  const p = new URLSearchParams(location.search);
  const id = p.get("id");

  const anime = animeList.find((a) => a.id === id);
  if (!anime) return;

  const titleEl = document.getElementById("anime-title");
  const descEl  = document.getElementById("anime-description");
  const posterEl= document.getElementById("anime-poster");

  if (titleEl)  titleEl.textContent  = anime.title;
  if (descEl)   descEl.textContent   = anime.description;
  if (posterEl) posterEl.src         = anime.poster;

  const seasonSelect = document.getElementById("season-select");
  if (!seasonSelect) return;

  seasonSelect.innerHTML = "";

  anime.seasons.forEach((s, index) => {
    seasonSelect.innerHTML += `<option value="${index}">${s.name}</option>`;
  });

  seasonSelect.onchange = () =>
    renderEpisodes(anime, parseInt(seasonSelect.value, 10));

  renderEpisodes(anime, 0);
}

function renderEpisodes(anime, sIndex) {
  const list = document.getElementById("episodes-list");
  if (!list) return;

  list.innerHTML = "";

  const season = anime.seasons[sIndex];
  if (!season) return;

  season.episodes.forEach((ep) => {
    list.innerHTML += `
      <div class="episode-card">
        <div>
          <h3>${ep.title}</h3>
          <p>Episode ${ep.number}</p>
        </div>

        <button class="btn-primary"
          onclick="location.href='watch.html?id=${anime.id}&s=${sIndex}&e=${ep.number}'">
          Watch
        </button>
      </div>`;
  });
   }
/* ===========================================================
   WATCH PAGE
=========================================================== */
function initWatchPage() {
  const p = new URLSearchParams(location.search);
  const id = p.get("id");
  const s  = parseInt(p.get("s"), 10);
  const e  = parseInt(p.get("e"), 10);

  const anime  = animeList.find((a) => a.id === id);
  if (!anime) return;

  const season = anime.seasons[s];
  if (!season) return;

  const ep = season.episodes.find((x) => x.number === e);
  if (!ep) return;

  const titleEl = document.getElementById("watch-title");
  const subEl   = document.getElementById("watch-subtitle");

  if (titleEl) titleEl.textContent = `${anime.title} – Episode ${e}`;
  if (subEl)   subEl.textContent   = season.name;

  const serverList = document.getElementById("server-list");
  if (!serverList) return;

  serverList.innerHTML = "";

  ep.stream_servers.forEach((srv) => {
    serverList.innerHTML += `
      <button class="btn-primary small-btn" onclick="loadServer('${srv.url}')">
        ${srv.name}
      </button>`;
  });

  // load first server by default
  if (ep.stream_servers.length > 0) {
    loadServer(ep.stream_servers[0].url);
  }

  const prevBtn = document.getElementById("prev-ep");
  const nextBtn = document.getElementById("next-ep");
  const dlBtn   = document.getElementById("download-btn");

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (e > 1) {
        location.href = `watch.html?id=${id}&s=${s}&e=${e - 1}`;
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      if (e < season.episodes.length) {
        location.href = `watch.html?id=${id}&s=${s}&e=${e + 1}`;
      }
    };
  }

  if (dlBtn) {
    dlBtn.onclick = () => {
      location.href = `download.html?id=${id}&s=${s}&e=${e}`;
    };
  }
}

function loadServer(url) {
  const frame = document.getElementById("video-player");
  if (frame) frame.src = url;
}

/* ===========================================================
   DOWNLOAD PAGE
=========================================================== */
function initDownloadPage() {
  const p = new URLSearchParams(location.search);
  const id = p.get("id");
  const s  = parseInt(p.get("s"), 10);
  const e  = parseInt(p.get("e"), 10);

  const anime  = animeList.find((a) => a.id === id);
  if (!anime) return;

  const season = anime.seasons[s];
  if (!season) return;

  const ep = season.episodes.find((x) => x.number === e);
  if (!ep) return;

  const titleEl = document.getElementById("download-title");
  const subEl   = document.getElementById("download-subtitle");

  if (titleEl) titleEl.textContent = `${anime.title} – Episode ${e}`;
  if (subEl)   subEl.textContent   = season.name;

  const box = document.getElementById("download-buttons");
  if (!box) return;

  box.innerHTML = "";

  ep.download_servers.forEach((srv) => {
    box.innerHTML += `
      <a class="btn-primary" href="${srv.url}" target="_blank">${srv.name}</a>`;
  });

  startCountdown();
}

function startCountdown() {
  let sec = 10;
  const timer = document.getElementById("download-timer");
  const box   = document.getElementById("download-buttons");
  if (!timer || !box) return;

  const interval = setInterval(() => {
    sec--;
    timer.textContent = `Please wait ${sec} seconds…`;

    if (sec <= 0) {
      clearInterval(interval);
      timer.style.display = "none";
      box.style.display   = "block";
    }
  }, 1000);
}

/* ===========================================================
   ADMIN PAGE
=========================================================== */
let adminAnimeData = [];

function initAdminPage() {
  adminAnimeData = animeList;
  fillAnimeDropdowns();
}

/* Fill dropdowns */
function fillAnimeDropdowns() {
  const select1 = document.getElementById("season-anime-select");
  const select2 = document.getElementById("episode-anime-select");

  if (!select1 || !select2) return;

  select1.innerHTML = "";
  select2.innerHTML = "";

  adminAnimeData.forEach((a) => {
    select1.innerHTML += `<option value="${a.id}">${a.title}</option>`;
    select2.innerHTML += `<option value="${a.id}">${a.title}</option>`;
  });

  updateEpisodeSeasonDropdown();
}

/* Fill season dropdown in episode section */
function updateEpisodeSeasonDropdown() {
  const animeSelect = document.getElementById("episode-anime-select");
  const seasonSel   = document.getElementById("episode-season-select");
  if (!animeSelect || !seasonSel) return;

  const id    = animeSelect.value;
  const anime = adminAnimeData.find((a) => a.id === id);
  if (!anime) {
    seasonSel.innerHTML = "";
    return;
  }

  seasonSel.innerHTML = "";

  anime.seasons.forEach((s, index) => {
    seasonSel.innerHTML += `<option value="${index}">${s.name}</option>`;
  });
}

/* Add or update anime */
function addAnime() {
  const title  = document.getElementById("anime-title").value.trim();
  const id     = document.getElementById("anime-id").value.trim();
  const poster = document.getElementById("anime-poster").value.trim();
  const desc   = document.getElementById("anime-description").value.trim();

  if (!id || !title) {
    alert("Please enter at least Anime ID and Title.");
    return;
  }

  const existing = adminAnimeData.find((a) => a.id === id);

  if (existing) {
    existing.title       = title;
    existing.poster      = poster;
    existing.description = desc;
    existing.updated     = Date.now();
    alert("Anime updated!");
  } else {
    adminAnimeData.push({
      id,
      title,
      poster,
      description: desc,
      popularity: 0,
      trending: 0,
      updated: Date.now(),
      seasons: []
    });
    alert("Anime added!");
  }

  fillAnimeDropdowns();
}

/* Add or update season (by name) */
function addSeason() {
  const id   = document.getElementById("season-anime-select").value;
  const name = document.getElementById("season-name").value.trim();

  if (!id || !name) {
    alert("Select anime and enter season name.");
    return;
  }

  const anime = adminAnimeData.find((a) => a.id === id);
  if (!anime) return;

  const existing = anime.seasons.find((s) => s.name === name);

  if (existing) {
    existing.name = name; // simple rename (no change to episodes)
    alert("Season name updated!");
  } else {
    anime.seasons.push({ name, episodes: [] });
    alert("Season added!");
  }

  fillAnimeDropdowns();
}

/* Add or update episode (by episode number in that season) */
function addEpisode() {
  const animeSelect = document.getElementById("episode-anime-select");
  const seasonSel   = document.getElementById("episode-season-select");

  const id     = animeSelect.value;
  const anime  = adminAnimeData.find((a) => a.id === id);
  if (!anime) {
    alert("Select a valid anime.");
    return;
  }

  const sIndex = parseInt(seasonSel.value, 10);
  const season = anime.seasons[sIndex];
  if (!season) {
    alert("Select a valid season.");
    return;
  }

  const epNum   = parseInt(document.getElementById("ep-number").value, 10);
  const epTitle = document.getElementById("ep-title").value.trim();

  if (!epNum || !epTitle) {
    alert("Please enter episode number and title.");
    return;
  }

  const fm = document.getElementById("stream-filemoon").value.trim();
  const st = document.getElementById("stream-streamtape").value.trim();
  const sh = document.getElementById("stream-streamgh").value.trim();

  const dl_fm = document.getElementById("dl-filemoon").value.trim();
  const dl_sh = document.getElementById("dl-streamgh").value.trim();

  const newEpisode = {
    number: epNum,
    title: epTitle,
    stream_servers: [
      ...(fm ? [{ name: "Filemoon",   url: fm }] : []),
      ...(st ? [{ name: "StreamTape", url: st }] : []),
      ...(sh ? [{ name: "StreamGH",   url: sh }] : [])
    ],
    download_servers: [
      ...(dl_fm ? [{ name: "Filemoon DL", url: dl_fm }] : []),
      ...(dl_sh ? [{ name: "StreamGH DL", url: dl_sh }] : [])
    ]
  };

  const existingIndex = season.episodes.findIndex((ep) => ep.number === epNum);

  if (existingIndex !== -1) {
    // overwrite existing episode with same number
    season.episodes[existingIndex] = newEpisode;
    alert("Episode updated!");
  } else {
    season.episodes.push(newEpisode);
    alert("Episode added!");
  }
}

/* ===========================================================
   SAVE TO GITHUB
=========================================================== */
async function saveToGitHub() {
  const owner = document.getElementById("github-owner").value.trim();
  const repo  = document.getElementById("github-repo").value.trim();
  const branch= document.getElementById("github-branch").value.trim();
  const file  = document.getElementById("github-file-path").value.trim();
  const token = document.getElementById("github-token").value.trim();

  if (!owner || !repo || !branch || !file || !token) {
    alert("Please fill all GitHub fields.");
    return;
  }

  const apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;

  // Get current file SHA
  const getRes = await fetch(apiURL, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!getRes.ok) {
    alert("Failed to get existing file from GitHub.");
    return;
  }

  const getJSON = await getRes.json();
  const sha = getJSON.sha;

  // Encode new data
  const content = btoa(
    unescape(encodeURIComponent(JSON.stringify(adminAnimeData, null, 2)))
  );

  // Upload updated JSON
  const uploadRes = await fetch(apiURL, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Updated animeData.json via Admin Panel",
      content,
      sha,
      branch
    })
  });

  if (uploadRes.ok) {
    alert("Uploaded! Vercel will auto redeploy.");
  } else {
    alert("Failed to upload to GitHub.");
  }
     }
