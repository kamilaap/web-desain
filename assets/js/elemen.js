// elemen.js — Animasi card masuk & progress bar
// File ini dipakai khusus di elemen.html

const semuaCard = document.querySelectorAll(".card");

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, index) {
    if (entry.isIntersecting) {
      const card = entry.target;

      // Munculkan card satu per satu (stagger 150ms)
      setTimeout(function() {
        card.classList.add("muncul");

        // Jalankan progress bar
        const barIsi = card.querySelector(".bar-isi");
        barIsi.style.width = card.dataset.progress + "%";
      }, index * 150);

      observer.unobserve(card);
    }
  });
}, { threshold: 0.2 });

semuaCard.forEach(function(card) {
  observer.observe(card);
});