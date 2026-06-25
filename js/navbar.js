document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  highlightActivePage();
});

/* Toggle background transparency on scroll */
function initNavbarScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  // Check scroll position on page load
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  }
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Slide drawer menu triggers */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-login-btn');
  
  if (!hamburger || !navMenu) return;
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scrolling when mobile menu drawer is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  });
  
  // Close menu when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'visible';
    });
  });
}

/* Match navigation tabs to filename */
function highlightActivePage() {
  const path = window.location.pathname;
  let page = path.split('/').pop();
  
  // Set default page to index.html if root path
  if (!page || page === '') {
    page = 'index.html';
  }
  
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href === page) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}