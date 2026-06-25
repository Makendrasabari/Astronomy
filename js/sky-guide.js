document.addEventListener('DOMContentLoaded', () => {
  initConstellationMap();
  initMoonPhaseCalculator();
});

/* Interactive SVG Constellations Highlight Outlines */
function initConstellationMap() {
  const stars = document.querySelectorAll('.constellation-star');
  const buttons = document.querySelectorAll('.constellation-btn');
  const cards = document.querySelectorAll('.constellation-info-card');
  
  if (stars.length === 0) return;
  
  // Activate selected constellation
  function activateConstellation(name) {
    // 1. Deactivate all active classes
    document.querySelectorAll('.constellation-line').forEach(line => line.classList.remove('active'));
    stars.forEach(star => star.classList.remove('active'));
    document.querySelectorAll('.constellation-label').forEach(label => label.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    cards.forEach(card => card.classList.remove('active'));
    
    // 2. Activate elements matching the selector name
    // Line connections
    document.querySelectorAll(`.line-${name}`).forEach(line => line.classList.add('active'));
    // Star vertices
    document.querySelectorAll(`.constellation-star[data-group="${name}"]`).forEach(star => star.classList.add('active'));
    // Typography label
    const label = document.querySelector(`.label-${name}`);
    if (label) label.classList.add('active');
    
    // Detail info card
    const card = document.querySelector(`.constellation-info-card[data-constellation="${name}"]`);
    if (card) card.classList.add('active');
    
    // Selector button
    const btn = document.querySelector(`.constellation-btn[data-constellation="${name}"]`);
    if (btn) btn.classList.add('active');
  }
  
  // Click listener on SVG star vertices
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const name = this.dataset.group;
      if (name) activateConstellation(name);
    });
  });
  
  // Click listener on detail switch buttons
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.dataset.constellation;
      if (name) activateConstellation(name);
    });
  });
  
  // Initialize on Ursa Major
  activateConstellation('ursa');
}

/* Interactive Moon Phase Shading Offset calculations */
function initMoonPhaseCalculator() {
  const slider = document.getElementById('moon-slider');
  const shading = document.getElementById('moon-shading');
  const nameLabel = document.getElementById('moon-phase-name');
  const descLabel = document.getElementById('moon-phase-desc');
  
  if (!slider || !shading) return;
  
  slider.addEventListener('input', function() {
    const val = parseInt(this.value);
    
    // 1. Shift the shading mask using translations
    // At 0: New Moon, shadow is centered (translateX(0))
    // At 50: Full Moon, shadow is pushed off to the left (translateX(100%))
    // At 100: New Moon, shadow returns from the right (translateX(-100% to 0%))
    if (val <= 50) {
      // Moves shadow from 0% to 100% to the left
      shading.style.transform = `translateX(${val * 2}%)`;
    } else {
      // Moves shadow from -100% to 0% back to center
      const offset = -100 + (val - 50) * 2;
      shading.style.transform = `translateX(${offset}%)`;
    }
    
    // 2. Map ranges to phase names and details
    let phaseName = 'New Moon';
    let phaseDesc = 'The Moon is positioned between the Earth and the Sun. Its illuminated side faces away from Earth, making it invisible to the naked eye.';
    
    if (val >= 0 && val <= 4) {
      phaseName = 'New Moon';
      phaseDesc = 'The Moon is positioned between the Earth and the Sun. Its illuminated side faces away from Earth, making it invisible to the naked eye.';
    } else if (val > 4 && val < 25) {
      phaseName = 'Waxing Crescent';
      phaseDesc = 'A thin silver sliver of light appears on the right side. The crescent grows larger each night, ideal for viewing high-contrast crater rims.';
    } else if (val === 25) {
      phaseName = 'First Quarter';
      phaseDesc = 'Exactly half of the Moon is illuminated on the right side. The terminator line is highly detailed under low-power magnification.';
    } else if (val > 25 && val < 50) {
      phaseName = 'Waxing Gibbous';
      phaseDesc = 'The illuminated portion continues to grow, leaving only a small dark sliver on the left side. Most details are highly visible.';
    } else if (val === 50) {
      phaseName = 'Full Moon';
      phaseDesc = 'The Moon is fully illuminated by the Sun. It rises at sunset and sets at sunrise, casting bright natural light on dark sky locations.';
    } else if (val > 50 && val < 75) {
      phaseName = 'Waning Gibbous';
      phaseDesc = 'The illuminated portion begins to shrink, leaving a small dark sliver appearing on the right side. Excellent morning visibility.';
    } else if (val === 75) {
      phaseName = 'Third Quarter';
      phaseDesc = 'Exactly half of the Moon is illuminated on the left side. Best observed in the early morning hours high in the Southern sky.';
    } else if (val > 75 && val < 96) {
      phaseName = 'Waning Crescent';
      phaseDesc = 'Only a thin sliver of light remains on the left side, shrinking daily before transitioning back to a New Moon.';
    } else if (val >= 96 && val <= 100) {
      phaseName = 'New Moon';
      phaseDesc = 'The Moon has completed its 29.5-day cycle. A new lunar cycle starts tonight.';
    }
    
    if (nameLabel) nameLabel.textContent = phaseName;
    if (descLabel) descLabel.textContent = phaseDesc;
  });
  
  // Fire input event to calculate default values on load (25% -> First Quarter)
  slider.dispatchEvent(new Event('input'));
}