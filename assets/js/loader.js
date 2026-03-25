// loader.js
// Otomatis load semua section dari file HTML terpisah

const sections = [
  { id: 'beranda',       file: 'pages/beranda.html' },
  { id: 'elemen',        file: 'pages/elemen.html' },
  { id: 'kalkulator',    file: 'pages/calculator.html' },
  { id: 'ecochallenge',  file: 'pages/ecochallenge.html' },
  { id: 'tentang',       file: 'pages/tentang.html' },
  { id: 'kontak',        file: 'pages/kontak.html' },
];

async function loadSection({ id, file }) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Gagal load: ${file}`);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Hapus navbar & footer dari halaman yang di-load (biar tidak dobel)
    doc.querySelectorAll('#navbar, #footer, nav, footer').forEach(el => el.remove());

    // Ambil isi body
    document.getElementById(id).innerHTML = doc.body.innerHTML;

    // Jalankan ulang script yang ada di dalam section (kalau ada)
    document.getElementById(id).querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.replaceWith(newScript);
    });

  } catch (err) {
    console.warn(`[loader.js] ${err.message}`);
  }
}

// Load semua section secara berurutan
(async () => {
  for (const section of sections) {
    await loadSection(section);
  }
})();