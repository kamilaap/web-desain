const semuaCard = document.querySelectorAll(".card");
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, index) {
    if (entry.isIntersecting) {
      const card = entry.target;
      setTimeout(function () {
        card.classList.add("muncul");
        const barIsi = card.querySelector(".bar-isi");
        barIsi.style.width = card.dataset.progress + "%";
      }, index * 150);
      observer.unobserve(card);
    }
  });
}, { threshold: 0.2 });

semuaCard.forEach(function (card) {
  observer.observe(card);
});