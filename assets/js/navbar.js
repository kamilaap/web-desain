function getPathConfig() {
  const path = window.location.pathname;
  const diHalamanElemen = path.includes("/pages/elemen/");
  const diPages = path.includes("/pages/");

  if (diHalamanElemen) {
    return {
      prefixRoot: "../../",
      prefixPages: "../",
      prefixAssets: "../../assets/",
    };
  }

  if (diPages) {
    return {
      prefixRoot: "../",
      prefixPages: "",
      prefixAssets: "../assets/",
    };
  }

  return {
    prefixRoot: "",
    prefixPages: "pages/",
    prefixAssets: "assets/",
  };
}

function loadNavbar() {
  const { prefixRoot, prefixPages, prefixAssets } = getPathConfig();
  const halamanSekarang = window.location.pathname.split("/").pop() || "index.html";
  const fiturAktif = ["calculator.html", "ecochallenge.html"].includes(halamanSekarang) ? "active" : "";

  const menus = [
    { label: "Beranda", href: prefixRoot + "index.html" },
    { label: "Tentang", href: prefixPages + "tentang.html" },
    { label: "Elemen", href: prefixPages + "elemen.html" },
  ];

  const links = menus.map((menu) => {
    const namaFile = menu.href.split("/").pop();
    const aktif = namaFile === halamanSekarang ? "active" : "";
    return `<a href="${menu.href}" class="nav-link ${aktif}">${menu.label}</a>`;
  }).join("");

  const dropdown = `
    <div class="nav-dropdown" id="navDropdown">
      <a href="#" class="nav-link nav-dropdown-toggle ${fiturAktif}" id="dropdownToggle" role="button">
        Fitur <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round" class="dropdown-chevron">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </a>
      <div class="nav-dropdown-menu" id="dropdownMenu">
        <a href="${prefixPages}calculator.html" class="nav-dropdown-item ${halamanSekarang === "calculator.html" ? "active" : ""}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <line x1="8" y1="10" x2="10" y2="10"/>
            <line x1="14" y1="10" x2="16" y2="10"/>
            <line x1="8" y1="14" x2="10" y2="14"/>
            <line x1="14" y1="14" x2="16" y2="14"/>
            <line x1="8" y1="18" x2="10" y2="18"/>
            <line x1="14" y1="18" x2="16" y2="18"/>
          </svg>
          Carbon Calculator
        </a>
        <a href="${prefixPages}ecochallenge.html" class="nav-dropdown-item ${halamanSekarang === "ecochallenge.html" ? "active" : ""}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Eco Challenge
        </a>
      </div>
    </div>
  `;

  const ikonTerang = `
    <svg class="nav-tema-terang" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  `;

  const ikonGelap = `
    <svg class="nav-tema-gelap" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  `;

  document.getElementById("navbar").innerHTML = `
    <nav>
      <a href="${prefixRoot}index.html" class="nav-brand">
        <img src="${prefixAssets}img/logo.png" alt="Logo" class="nav-logo">
        <span class="nav-brand-nama">Bumi Berbicara</span>
      </a>
      <div class="nav-links" id="navMenu">
        ${links}
        ${dropdown}
        <a href="${prefixPages}kontak.html" class="btn-hijau ${halamanSekarang === "kontak.html" ? "active" : ""}">Kontak</a>
      </div>
      <div class="nav-kanan">
        <button class="nav-tema" id="temaToggle" title="Ganti tema">
          ${ikonTerang}
          ${ikonGelap}
        </button>
        <div class="nav-hamburger" id="navHamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `;

  const temaTersimpan = localStorage.getItem("tema");
  if (temaTersimpan === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  const temaToggle = document.getElementById("temaToggle");
  temaToggle.addEventListener("click", function () {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("tema", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("tema", "light");
    }
  });

  const hamburger = document.getElementById("navHamburger");
  const menu = document.getElementById("navMenu");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("terbuka");
    menu.classList.toggle("terbuka");
  });

  const toggle = document.getElementById("dropdownToggle");
  const dropMenu = document.getElementById("dropdownMenu");

  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const sudahTerbuka = dropMenu.classList.contains("terbuka");
    dropMenu.classList.toggle("terbuka", !sudahTerbuka);
    toggle.classList.toggle("dropdown-open", !sudahTerbuka);
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest("nav")) {
      hamburger.classList.remove("terbuka");
      menu.classList.remove("terbuka");
      dropMenu.classList.remove("terbuka");
      toggle.classList.remove("dropdown-open");
    }
  });
}

function loadFooter() {
  const { prefixRoot, prefixPages, prefixAssets } = getPathConfig();

  document.getElementById("footer").innerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-atas">
          <div class="footer-brand">
            <img src="${prefixAssets}img/logo.png" alt="Logo" class="footer-logo">
            <div class="footer-brand-text">
              <div class="footer-nama">Bumi Berbicara</div>
              <div class="footer-tagline">Sadar lingkungan, mulai dari kita.</div>
            </div>
          </div>
          <div class="footer-nav">
            <div class="footer-nav-col">
              <div class="footer-nav-judul">Halaman</div>
              <a href="${prefixRoot}index.html" class="footer-nav-link">Beranda</a>
              <a href="${prefixPages}tentang.html" class="footer-nav-link">Tentang</a>
              <a href="${prefixPages}elemen.html" class="footer-nav-link">Elemen</a>
            </div>
            <div class="footer-nav-col">
              <div class="footer-nav-judul">Fitur</div>
              <a href="${prefixPages}calculator.html" class="footer-nav-link">Carbon Calculator</a>
              <a href="${prefixPages}ecochallenge.html" class="footer-nav-link">Eco Challenge</a>
            </div>
            <div class="footer-nav-col">
              <div class="footer-nav-judul">Lainnya</div>
              <a href="${prefixRoot}tim.html" class="footer-nav-link footer-tim">Tim Pengembang →</a>
            </div>
          </div>
        </div>
        <div class="footer-bawah">
          <div class="footer-copy">© 2026 Bumi Berbicara. Dibuat dengan ❤ untuk bumi.</div>
        </div>
      </div>
    </footer>
  `;
}