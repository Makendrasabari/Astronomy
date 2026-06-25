document.addEventListener('DOMContentLoaded', () => {
  initAchievementsCounters();
});

/* Achievement count-up triggers when scrolled into view */
function initAchievementsCounters() {
  const cards = document.querySelectorAll('.achievement-card');
  const numbers = document.querySelectorAll('.achievement-number');
  if (numbers.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  let started = false;
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        numbers.forEach(num => startCountUp(num));
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe parent achievements section
  const section = document.querySelector('.achievements-section');
  if (section) {
    observer.observe(section);
  } else {
    // Fallback if section doesn't exist (run immediately)
    numbers.forEach(num => startCountUp(num));
  }
  
  function startCountUp(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();
    
    // Check if target is a decimal
    const isDecimal = target % 1 !== 0;
    
    function updateNumber(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out quad formula for smooth decelerating
      const easeProgress = progress * (2 - progress);
      const currentVal = easeProgress * target;
      
      if (isDecimal) {
        el.textContent = currentVal.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(currentVal) + suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        // Force exact final value
        el.textContent = target + suffix;
      }
    }
    
    requestAnimationFrame(updateNumber);
  }
}