document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initProgressBar();
  initBackToTop();
  initRippleButtons();
  initMagneticElements();
  initTiltCards();
  initLazyLoading();
  init404Redirects();
});

/* Custom trailing cursor glow */
function initCursorGlow() {
  const cursor = document.getElementById('cursor-glow');
  if (!cursor) return;
  
  // Track cursor position
  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth animation loop for trail
  function animateCursor() {
    // Linear interpolation for smooth trailing
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    
    cursor.style.transform = `translate3d(calc(${posX}px - 50%), calc(${posY}px - 50%), 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Interactive element hover scale effect
  const hoverables = document.querySelectorAll('a, button, .btn, .tilt-card, .clickable, select, input, textarea');
  hoverables.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    elem.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

/* Scroll progress bar */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${scrollPercent}%`;
    }
  });
}

/* Back-to-Top trigger */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* Button click ripple effect */
function initRippleButtons() {
  const buttons = document.querySelectorAll('.btn, .nav-login-btn, .newsletter-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple-span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* Magnetic buttons physics */
function initMagneticElements() {
  const elements = document.querySelectorAll('.magnetic');
  
  elements.forEach(elem => {
    elem.addEventListener('mousemove', function(e) {
      const bound = this.getBoundingClientRect();
      const x = e.clientX - (bound.left + bound.width / 2);
      const y = e.clientY - (bound.top + bound.height / 2);
      
      // Pull element slightly towards mouse coordinates
      this.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
      const span = this.querySelector('span');
      if (span) {
        span.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
      }
    });
    
    elem.addEventListener('mouseleave', function() {
      this.style.transform = 'translate3d(0px, 0px, 0px)';
      const span = this.querySelector('span');
      if (span) {
        span.style.transform = 'translate3d(0px, 0px, 0px)';
      }
    });
  });
}

/* 3D card tilt effect */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const bound = this.getBoundingClientRect();
      const width = bound.width;
      const height = bound.height;
      const mouseX = e.clientX - bound.left;
      const mouseY = e.clientY - bound.top;
      
      // Max tilt values
      const maxTilt = 10;
      const xRotation = -((mouseY / height) - 0.5) * maxTilt;
      const yRotation = ((mouseX / width) - 0.5) * maxTilt;
      
      this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* Image lazy loading */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  if (images.length === 0) return;
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  });
  
  images.forEach(img => observer.observe(img));
}

/* Route all placeholder footer links to the premium 404 page */
function init404Redirects() {
  const footerLinks = document.querySelectorAll('footer a[href="#"], footer a[href=""]');
  footerLinks.forEach(link => {
    link.href = '404.html';
  });
}