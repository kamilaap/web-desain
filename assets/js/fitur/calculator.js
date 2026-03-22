// carbon.js — Logic kalkulasi emisi karbon

// ── Faktor Emisi (kg CO₂ per satuan) ──
const FAKTOR = {
  motor:   0.12,   // per km
  mobil:   0.21,   // per km
  listrik: 0.87,   // per kWh (faktor Indonesia PLN)
  gas:     2.98,   // per kg LPG
  daging:  0.027,  // per gram (27 kg per kg daging sapi)
  ayam:    0.0069, // per gram (6.9 kg per kg ayam)
  organik: 0.50,   // per kg sampah organik
  plastik: 2.50,   // per kg plastik
};

// ── State ──
let emisi = {
  transportasi: 0,
  energi: 0,
  makanan: 0,
  sampah: 0,
};

// ── Ambil elemen input ──
const inputs = {
  motor:   document.getElementById("motor"),
  mobil:   document.getElementById("mobil"),
  listrik: document.getElementById("listrik"),
  gas:     document.getElementById("gas"),
  daging:  document.getElementById("daging"),
  ayam:    document.getElementById("ayam"),
  organik: document.getElementById("organik"),
  plastik: document.getElementById("plastik"),
};

// ── Hitung & update semua ──
function hitungSemua() {
  const val = {};
  for (const key in inputs) {
    val[key] = parseFloat(inputs[key].value) || 0;
  }

  // Emisi per input
  const e = {
    motor:   val.motor   * FAKTOR.motor,
    mobil:   val.mobil   * FAKTOR.mobil,
    listrik: val.listrik * FAKTOR.listrik,
    gas:     val.gas     * FAKTOR.gas,
    daging:  val.daging  * FAKTOR.daging,
    ayam:    val.ayam    * FAKTOR.ayam,
    organik: val.organik * FAKTOR.organik,
    plastik: val.plastik * FAKTOR.plastik,
  };

  // Update hint per input
  document.getElementById("hint-motor").textContent   = `= ${e.motor.toFixed(2)} kg CO₂`;
  document.getElementById("hint-mobil").textContent   = `= ${e.mobil.toFixed(2)} kg CO₂`;
  document.getElementById("hint-listrik").textContent = `= ${e.listrik.toFixed(2)} kg CO₂`;
  document.getElementById("hint-gas").textContent     = `= ${e.gas.toFixed(2)} kg CO₂`;
  document.getElementById("hint-daging").textContent  = `= ${e.daging.toFixed(2)} kg CO₂`;
  document.getElementById("hint-ayam").textContent    = `= ${e.ayam.toFixed(2)} kg CO₂`;
  document.getElementById("hint-organik").textContent = `= ${e.organik.toFixed(2)} kg CO₂`;
  document.getElementById("hint-plastik").textContent = `= ${e.plastik.toFixed(2)} kg CO₂`;

  // Total per kategori
  emisi.transportasi = e.motor + e.mobil;
  emisi.energi       = e.listrik + e.gas;
  emisi.makanan      = e.daging + e.ayam;
  emisi.sampah       = e.organik + e.plastik;

  // Update total per tab
  document.getElementById("total-transportasi").textContent = `${emisi.transportasi.toFixed(2)} kg CO₂`;
  document.getElementById("total-energi").textContent       = `${emisi.energi.toFixed(2)} kg CO₂`;
  document.getElementById("total-makanan").textContent      = `${emisi.makanan.toFixed(2)} kg CO₂`;
  document.getElementById("total-sampah").textContent       = `${emisi.sampah.toFixed(2)} kg CO₂`;

  // Total keseluruhan
  const total = emisi.transportasi + emisi.energi + emisi.makanan + emisi.sampah;
  updateHasil(total);
  updateRincian(total);
}

// ── Update panel hasil ──
function updateHasil(total) {
  document.getElementById("totalAngka").textContent = total.toFixed(1);

  const lingkaran = document.getElementById("lingkaran");
  const badge     = document.getElementById("emisiLabel");

  lingkaran.classList.remove("rendah", "sedang", "tinggi");
  badge.classList.remove("sedang", "tinggi");

  if (total < 5) {
    lingkaran.classList.add("rendah");
    badge.textContent = "Emisi Rendah";
  } else if (total < 20) {
    lingkaran.classList.add("sedang");
    badge.classList.add("sedang");
    badge.textContent = "Emisi Sedang";
  } else {
    lingkaran.classList.add("tinggi");
    badge.classList.add("tinggi");
    badge.textContent = "Emisi Tinggi!";
  }

  // Setara dengan
  const pohon  = Math.round(total / 0.055);   // rata-rata pohon menyerap 20kg/tahun ≈ 0.055/hari
  const lampu  = Math.round(total / 0.006);   // lampu 6W menyala 1 jam = 0.006 kWh × 0.87
  const hp     = Math.round(total / 0.008);   // ngecas HP ≈ 0.008 kg CO₂

  document.getElementById("setara1").textContent =
    pohon > 0 ? `Perlu ${pohon} pohon untuk menyerap emisi harianmu` : "—";
  document.getElementById("setara2").textContent =
    lampu > 0 ? `Sama dengan menyalakan lampu selama ${lampu} jam` : "—";
  document.getElementById("setara3").textContent =
    hp > 0 ? `Sama dengan mengisi daya HP sebanyak ${hp} kali` : "—";
}

// ── Update rincian bar ──
function updateRincian(total) {
  const kategori = ["transportasi", "energi", "makanan", "sampah"];

  kategori.forEach(k => {
    const nilai = emisi[k];
    const persen = total > 0 ? (nilai / total) * 100 : 0;

    document.getElementById(`bar-${k}`).style.width    = `${persen}%`;
    document.getElementById(`label-${k}`).textContent  = `${nilai.toFixed(2)} kg`;
  });
}

// ── Tab switching ──
document.getElementById("tabBar").addEventListener("click", function(e) {
  const tab = e.target.closest(".cc-tab");
  if (!tab) return;

  document.querySelectorAll(".cc-tab").forEach(t => t.classList.remove("aktif"));
  document.querySelectorAll(".cc-konten").forEach(c => c.classList.remove("aktif"));

  tab.classList.add("aktif");
  document.getElementById("tab-" + tab.dataset.tab).classList.add("aktif");
});

// ── Event listener semua input ──
for (const key in inputs) {
  inputs[key].addEventListener("input", hitungSemua);
}

// ── Reset ──
document.getElementById("btnReset").addEventListener("click", function() {
  for (const key in inputs) {
    inputs[key].value = 0;
  }
  hitungSemua();
}); 

// ── Init ──
hitungSemua();