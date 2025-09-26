// ---------------------- DOM Loaded ----------------------
document.addEventListener('DOMContentLoaded', () => {

  // ---------- Header Entrance Animation ----------
  const header = document.querySelector('.site-header');
  setTimeout(() => header.classList.add('visible'), 140);

  // Optional: Preload hero background for smoother paint
  const hero = document.querySelector('.hero');
  if (hero) {
    const img = new Image();
    img.src = getComputedStyle(hero).backgroundImage.replace(/url\(["']?(.+)["']?\)/, '$1');
    img.onload = () => hero.classList.add('bg-loaded'); // style .bg-loaded in CSS if needed
  }

  // ---------- Animated Counters ----------
  const counters = document.querySelectorAll('.stat');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const updateCount = () => {
      const increment = target / 200; // animation speed
      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        // format special numbers
        if (target === 70000000) counter.innerText = "70M+";
        else if (target === 30) counter.innerText = "30%";
        else counter.innerText = target;
      }
    };

    // Animate only when scrolled into view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(counter); // animate once
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });

  // ---------- Sectional Reveal on Scroll ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add staggered delay for siblings (like cards)
        const parent = entry.target.parentElement;
        if (parent) {
          const children = [...parent.querySelectorAll('.reveal')];
          children.forEach((child, index) => {
            if (!child.classList.contains('active')) {
              child.style.transitionDelay = `${index * 0.15}s`;
            }
          });
        }
        entry.target.classList.add('active');
        revealOnScroll.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.3 });

  revealElements.forEach(el => revealOnScroll.observe(el));

  // ---------- Registration Form Redirect ----------
  const miniForm = document.getElementById('mini-registration');
  if (miniForm) {
    miniForm.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent default form submission
      const formLink = "https://docs.google.com/forms/d/e/1FAIpQLSfWJzjauPd7oB-5D2od1ztnIsNEOAvrjZ11KawpM_9_WaOQRQ/viewform";
      window.open(formLink, "_blank"); // open Google Form in new tab
    });
  }

});
