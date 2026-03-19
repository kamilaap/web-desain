// navbar.js
// Cara pakai: taruh <div id="navbar"></div> di setiap halaman
// Panggil loadNavbar() sebelum </body>
function loadNavbar() {
  const path = window.location.pathname;
  const diSubfolder = path.includes("/elemen/"); 
  const prefix = diSubfolder ? "../" : "";

  const menus = [
    { label: "Beranda", href: prefix + "home.html" },
    { label: "Tentang", href: prefix + "about.html" },
    { label: "Elemen",  href: prefix + "elemen.html" },
    { label: "Fitur",   href: prefix + "fitur.html" },
  ];

  const halamanSekarang = window.location.pathname.split("/").pop();

  const links = menus.map(menu => {
    const namaFile = menu.href.split("/").pop();
    const aktif = namaFile === halamanSekarang ? "active" : "";
    return `<a href="${menu.href}" class="nav-link ${aktif}">${menu.label}</a>`;
  }).join("");

  document.getElementById("navbar").innerHTML = `
    <nav>
      <div class="nav-logo"></div>

      <div class="nav-links" id="navMenu">${links}</div>

      <div class="nav-search" title="Cari">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>

      <!-- Tombol hamburger — hanya tampil di HP/tablet -->
      <div class="nav-hamburger" id="navHamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  `;

  const hamburger = document.getElementById("navHamburger");
  const menu      = document.getElementById("navMenu");

  hamburger.addEventListener("click", function() {
    hamburger.classList.toggle("terbuka");
    menu.classList.toggle("terbuka");
  });

  document.addEventListener("click", function(e) {
    if (!e.target.closest("nav")) {
      hamburger.classList.remove("terbuka");
      menu.classList.remove("terbuka");
    }
  });

}