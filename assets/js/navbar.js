// navbar.js
// Cara pakai: taruh <div id="navbar"></div> di setiap halaman
// Panggil loadNavbar() sebelum </body>
function loadNavbar() {
  const path = window.location.pathname;
  const diSubfolder = path.includes("/elemen/") || path.includes("/fitur/") || path.includes("/halaman");
  const prefix = diSubfolder ? "../" : "";

  const halamanSekarang = window.location.pathname.split("/").pop() || "beranda.html";

  const fiturAktif = ["calculator.html", "ecochallenge.html"].includes(halamanSekarang) ? "active" : "";

  const menus = [
    { label: "Beranda", href: prefix + "beranda.html" },
    { label: "Tentang", href: prefix + "tentang.html" },
    { label: "Elemen", href: prefix + "elemen.html" },
  ];

  const links = menus.map(menu => {
    const namaFile = menu.href.split("/").pop();
    const aktif = namaFile === halamanSekarang ? "active" : "";
    return `<a href="${menu.href}" class="nav-link ${aktif}">${menu.label}</a>`;
  }).join("");

  const dropdown = `
    <div class="nav-dropdown" id="navDropdown">
      <button class="nav-link nav-dropdown-toggle ${fiturAktif}" id="dropdownToggle">
        Fitur <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round" class="dropdown-chevron">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="nav-dropdown-menu" id="dropdownMenu">
        <a href="${prefix}fitur/calculator.html" class="nav-dropdown-item ${halamanSekarang === 'calculator.html' ? 'active' : ''}">
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
        <a href="${prefix}fitur/ecochallenge.html" class="nav-dropdown-item ${halamanSekarang === 'ecochallenge.html' ? 'active' : ''}">
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

  document.getElementById("navbar").innerHTML = `
    <nav>
      <a href="${prefix}beranda.html" class="nav-brand">
        <img src="${prefix}../../assets/img/logo.png" alt="Logo" class="nav-logo">
        <span class="nav-brand-nama">Bumi Berbicara</span>
      </a>
      <div class="nav-links" id="navMenu">
        ${links}
        ${dropdown}
        <a href="${prefix}kontak.html" class="nav-link ${halamanSekarang === 'kontak.html' ? 'active' : ''}">Kontak</a>
      </div>
      <div class="nav-search" title="Cari">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <div class="nav-hamburger" id="navHamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  `;

  const hamburger = document.getElementById("navHamburger");
  const menu = document.getElementById("navMenu");
  const toggle = document.getElementById("dropdownToggle");
  const dropMenu = document.getElementById("dropdownMenu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("terbuka");
    menu.classList.toggle("terbuka");
  });

  toggle.addEventListener("click", function (e) {
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

// ── Footer ──
// Cara pakai: taruh <div id="footer"></div> di setiap halaman
// Panggil loadFooter() sebelum </body>
function loadFooter() {
  const path = window.location.pathname;
  const diSubfolder = path.includes("/elemen/") || path.includes("/fitur/");
  const prefix = diSubfolder ? "../" : "";

  document.getElementById("footer").innerHTML = `
 <footer class="footer">
      <div class="footer-inner">

        <div class="footer-atas">
          <div class="footer-brand">
            <img src="${prefix}../../assets/img/logo.png" alt="Logo" class="footer-logo">
            
            <div class="footer-brand-text">
              <div class="footer-nama">Bumi Berbicara</div>
              <div class="footer-tagline">Sadar lingkungan, mulai dari kita.</div>
            </div>
          </div>

          <div class="footer-nav">
            <div class="footer-nav-col">
              <div class="footer-nav-judul">Halaman</div>
              <a href="${prefix}beranda.html" class="footer-nav-link">Beranda</a>
              <a href="${prefix}tentang.html" class="footer-nav-link">Tentang</a>
              <a href="${prefix}elemen.html" class="footer-nav-link">Elemen</a>
            </div>
            <div class="footer-nav-col">
              <div class="footer-nav-judul">Fitur</div>
              <a href="${prefix}fitur/calculator.html" class="footer-nav-link">Carbon Calculator</a>
              <a href="${prefix}fitur/ecochallenge.html" class="footer-nav-link">Eco Challenge</a>
            </div>
            <div class="footer-nav-col">
              <div class="footer-nav-judul">Lainnya</div>
              <a href="${prefix}tim.html" class="footer-nav-link footer-tim">Tim Pengembang →</a>
            </div>
          </div>
        </div>

        <div class="footer-bawah">
          <div class="footer-copy">© 2026 Bumi Berbicara. Dibuat dengan ❤️ untuk bumi.</div>
        </div>

      </div>
    </footer>
  `;
}