const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.classList.add("tampil");
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".muncul").forEach(function(el) {
      observer.observe(el);
    });