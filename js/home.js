document.addEventListener('DOMContentLoaded', () => {
  initStatsChart();
  initStatsTabsAndGallery();
  initVerticalTestimonials();
  initPlanetsSlider();
});



/* Discovery Stats Chart (Chart.js Integration) */
function initStatsChart() {
  const ctx = document.getElementById('stats-chart');
  if (!ctx) return;
  
  // Custom deep purple violet theme gradient
  const primaryColor = '#7C3AED';
  const secondaryColor = '#A855F7';
  const accentColor = '#C084FC';
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
      datasets: [{
        label: 'Asteroids Mapped',
        data: [120, 185, 290, 420, 580, 750],
        backgroundColor: 'rgba(124, 58, 237, 0.45)',
        borderColor: primaryColor,
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(168, 85, 247, 0.7)',
        hoverBorderColor: secondaryColor,
      }, {
        label: 'Stars Documented',
        data: [80, 140, 210, 310, 460, 610],
        backgroundColor: 'rgba(192, 132, 252, 0.35)',
        borderColor: accentColor,
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(192, 132, 252, 0.7)',
        hoverBorderColor: accentColor,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#B0AEC6',
            font: {
              family: 'Inter',
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: '#0a081c',
          titleColor: '#fff',
          bodyColor: '#B0AEC6',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          displayColors: true
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.03)'
          },
          ticks: {
            color: '#B0AEC6',
            font: {
              family: 'Inter'
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.03)'
          },
          ticks: {
            color: '#B0AEC6',
            font: {
              family: 'Inter'
            }
          }
        }
      }
    }
  });
}

/* Vertical Testimonials scrolling cloning */
function initVerticalTestimonials() {
  const container = document.querySelector('.vertical-testimonials-container');
  if (!container) return;
  
  const track = container.querySelector('.vertical-testimonials-track');
  if (!track) return;
  
  // Clone all testimonials to create a seamless infinite vertical scroll
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
}

/* Worlds of Our Solar System Card Slider */
function initPlanetsSlider() {
  const wrapper = document.querySelector('.planets-slider-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector('.planets-slider-track');
  if (!track) return;

  // Clone all planet cards to create a seamless infinite marquee/ticker
  const cards = Array.from(track.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });
}

/* Tabs Switching & Capture Gallery Slideshow controls */
function initStatsTabsAndGallery() {
  const tabs = document.querySelectorAll('.stats-tab-btn');
  const panes = document.querySelectorAll('.stats-tab-pane');
  
  if (tabs.length === 0) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // 1. Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // 2. Add active class to clicked tab
      this.classList.add('active');
      
      // 3. Hide all panes
      panes.forEach(pane => {
        pane.style.display = 'none';
        pane.style.opacity = '0';
      });
      
      // 4. Show corresponding pane
      const tabId = this.dataset.tab;
      const targetPane = document.getElementById(`pane-${tabId}`);
      if (targetPane) {
        targetPane.style.display = 'block';
        // Force reflow for CSS transition
        setTimeout(() => {
          targetPane.style.opacity = '1';
        }, 30);
      }
    });
  });
  
  // Slideshow Logic
  const slides = document.querySelectorAll('.stats-gallery-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.display = 'block';
        setTimeout(() => {
          slide.style.opacity = '1';
        }, 10);
      } else {
        slide.style.opacity = '0';
        slide.style.display = 'none';
      }
    });
    
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    currentSlide = index;
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }
  
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const idx = parseInt(this.dataset.index);
      showSlide(idx);
      resetInterval();
    });
  });
  
  function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }
  
  // Initialize gallery slideshow
  showSlide(0);
  startInterval();
}