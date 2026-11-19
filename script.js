// Loader Animation
const loaderFill = document.getElementById('loaderFill');
const loader = document.getElementById('loader');
let progress = 0;

const loaderInterval = setInterval(() => {
  progress += Math.random() * 25 + 10;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 350);
  }
  if (loaderFill) {
    loaderFill.style.width = progress + '%';
  }
}, 120);

// Navigation & Scroll Behaviors
const nav = document.querySelector('nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const heroBgText = document.querySelector('.hero-bg-text');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  // Header background on scroll
  if (nav) {
    if (scrolled > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Back to top button visibility
  if (backToTop) {
    if (scrolled > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // Parallax effect on Hero background name
  if (heroBgText && scrolled < window.innerHeight) {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.25}px))`;
  }
});

// Back to Top Click
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Mobile Menu Toggle
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Custom Cursor (Desktop Only)
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
let dotX = mouseX;
let dotY = mouseY;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  if (cursor && cursorDot) {
    cursorX += (mouseX - cursorX) * 0.14;
    cursorY += (mouseY - cursorY) * 0.14;
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;

    cursor.style.left = cursorX - 11 + 'px';
    cursor.style.top = cursorY - 11 + 'px';
    cursorDot.style.left = dotX - 2 + 'px';
    cursorDot.style.top = dotY - 2 + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Hover States
document.querySelectorAll('.hoverable, a, button, .project-card, .skill-card, .contact-chip').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.classList.remove('hovering');
  });
});

// Floating Project Preview on Hover
const preview = document.getElementById('projectPreview');
const previewImg = document.getElementById('previewImg');

if (preview && previewImg) {
  document.querySelectorAll('.project-card, .project-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const imgUrl = card.dataset.img;
      if (imgUrl) {
        previewImg.src = imgUrl;
        preview.classList.add('visible');
      }
    });

    card.addEventListener('mousemove', e => {
      const offsetX = 25;
      const offsetY = -80;
      // Keep within bounds
      let x = e.clientX + offsetX;
      let y = e.clientY + offsetY;
      if (x + 290 > window.innerWidth) x = e.clientX - 300;
      if (y + 190 > window.innerHeight) y = window.innerHeight - 200;
      if (y < 20) y = 20;

      preview.style.left = x + 'px';
      preview.style.top = y + 'px';
    });

    card.addEventListener('mouseleave', () => {
      preview.classList.remove('visible');
    });
  });
}

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// Animated Counters with Suffix Support (+, %, etc.)
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '+';
      let current = 0;
      const duration = 1200;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.round(current) + suffix;
      }, stepTime);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach(el => counterObserver.observe(el));

// Skill Bar Animation Observer
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = (bar.dataset.width || 0) + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Smooth Scroll for Internal Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
