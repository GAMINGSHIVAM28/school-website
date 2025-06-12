// test.js

// 💡 Smooth scroll for internal navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 💡 Add class when page fully loads (for loaders or transitions)
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.style.display = 'none', 700);
  }
});

// 💡 Lazy load images if not using HTML 'loading=lazy'
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  }
});
