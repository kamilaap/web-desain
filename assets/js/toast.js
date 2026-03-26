const faktaBumi = [
  "1 pohon dewasa bisa menyerap hingga 21 kg CO₂ per tahun.",
  "Hanya 3% air di bumi yang layak diminum — sebagian besar terkunci di es kutub.",
  "Setiap menit, setara 30 lapangan bola hutan tropis hilang dari muka bumi.",
  "Mendaur ulang 1 ton kertas bisa menyelamatkan 17 pohon dan 26.000 liter air.",
  "Lebah menyerbuki 70% dari 100 tanaman pangan utama yang memberi makan 90% manusia.",
  "Suhu rata-rata bumi sudah naik 1.1°C sejak era pra-industri — dan terus meningkat.",
  "Lautan menyerap lebih dari 90% panas berlebih akibat perubahan iklim.",
  "Tanah sehat butuh 1.000 tahun terbentuk setebal 1 cm, tapi bisa rusak dalam setahun.",
  "Sekitar 8 juta ton plastik masuk ke lautan setiap tahunnya.",
  "Es Arktik menghilang dengan laju sekitar 13% per dekade akibat pemanasan global.",
  "Satu kilogram daging sapi menghasilkan emisi setara 27 kg CO₂.",
  "Lebih dari 1 juta spesies terancam punah akibat aktivitas manusia.",
];

const POSISI = [
  { bottom: '24px', right: '24px', top: 'auto', left: 'auto', masuk: 'translateY(20px)'  },
  { bottom: '24px', left: '24px',  top: 'auto', right: 'auto', masuk: 'translateY(20px)' },
  { top: '80px',    right: '24px', bottom: 'auto', left: 'auto', masuk: 'translateY(-20px)' },
  { top: '80px',    left: '24px',  bottom: 'auto', right: 'auto', masuk: 'translateY(-20px)' },
];

const TOAST_DURASI = 7000;

let toastIdx   = 0;
let posisiIdx  = 0;
let toastTimer = null;

function terapkanPosisi(toast, p) {
  toast.style.top    = p.top;
  toast.style.bottom = p.bottom;
  toast.style.left   = p.left;
  toast.style.right  = p.right;
}

function isiKonten(i) {
  const teks    = document.getElementById('toastTeks');
  const counter = document.getElementById('toastCounter');
  const bar     = document.getElementById('toastBar');
  if (!teks) return;

  teks.style.transition = 'opacity 0.3s';
  teks.style.opacity    = '0';

  setTimeout(() => {
    teks.textContent    = faktaBumi[i];
    counter.textContent = (i + 1) + ' / ' + faktaBumi.length;
    teks.style.opacity  = '1';

    bar.style.transition = 'none';
    bar.style.width      = '0%';
    setTimeout(() => {
      bar.style.transition = 'width ' + TOAST_DURASI + 'ms linear';
      bar.style.width      = '100%';
    }, 50);
  }, 200);
}

function pindahDanIsi(i) {
  const toast = document.getElementById('toastFakta');
  if (!toast) return;

  const posiBaru = POSISI[posisiIdx];

  toast.style.transition = 'opacity 0.3s, transform 0.3s';
  toast.style.opacity    = '0';
  toast.style.transform  = posiBaru.masuk;

  setTimeout(() => {
    terapkanPosisi(toast, posiBaru);

    setTimeout(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
      isiKonten(i);
    }, 50);
  }, 320);
}

function mulaiToast() {
  const toast = document.getElementById('toastFakta');
  if (!toast) return;

  terapkanPosisi(toast, POSISI[0]);
  toast.style.opacity   = '0';
  toast.style.transform = 'translateY(20px)';
  toast.classList.add('muncul');

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity    = '1';
    toast.style.transform  = 'translateY(0)';
    isiKonten(0);
  }, 50);

  toastTimer = setInterval(() => {
    toastIdx  = (toastIdx + 1) % faktaBumi.length;
    posisiIdx = (posisiIdx + 1) % POSISI.length;
    pindahDanIsi(toastIdx);
  }, TOAST_DURASI);
}

document.addEventListener('DOMContentLoaded', function () {
  const tutupBtn = document.getElementById('toastTutup');
  if (tutupBtn) {
    tutupBtn.addEventListener('click', () => {
      const toast = document.getElementById('toastFakta');
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      toast.style.opacity    = '0';
      toast.style.transform  = 'translateY(10px)';
      clearInterval(toastTimer);
      setTimeout(() => toast.classList.add('sembunyi'), 350);
    });
  }

  setTimeout(mulaiToast, 3000);
});