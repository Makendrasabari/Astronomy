document.addEventListener('DOMContentLoaded', () => {
  initTelescopeSimulator();
  initCustomSelects();
});

/* Custom Dropdown Selects — avoids Chromium native popup offset bug */
function initCustomSelects() {
  document.querySelectorAll('.custom-select-wrap').forEach(wrap => {
    const btn    = wrap.querySelector('.custom-select-btn');
    const list   = wrap.querySelector('.custom-select-list');
    const label  = wrap.querySelector('[id$="-select-label"]');
    const hidden = wrap.querySelector('input[type="hidden"]');
    const options = wrap.querySelectorAll('.custom-select-option');

    if (!btn || !list) return;

    // Toggle open/close
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = list.classList.contains('open');
      // Close all other open dropdowns
      document.querySelectorAll('.custom-select-list.open').forEach(l => {
        l.classList.remove('open');
        l.closest('.custom-select-wrap').querySelector('.custom-select-btn').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        list.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Select an option
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const val  = opt.dataset.value;
        const text = opt.textContent;

        // Update hidden input and label
        if (hidden) hidden.value = val;
        if (label) {
          label.textContent = text;
          label.style.color = '#fff';
        }

        // Mark selected state
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        // Close
        list.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-list.open').forEach(l => {
      l.classList.remove('open');
      l.closest('.custom-select-wrap').querySelector('.custom-select-btn').setAttribute('aria-expanded', 'false');
    });
  });
}


/* Virtual Control Room Telescope Simulator */
function initTelescopeSimulator() {
  const screen = document.getElementById('console-screen');
  const previewImg = document.getElementById('lens-preview-img');
  
  const selectTarget = document.getElementById('console-target');
  const selectFilter = document.getElementById('console-filter');
  const inputRa = document.getElementById('console-ra');
  const inputDec = document.getElementById('console-dec');
  
  const alignBtn = document.getElementById('console-align-btn');
  const led = document.getElementById('console-led');
  const statusText = document.getElementById('console-status-text');
  
  if (!screen) return;
  
  // Target preview data mappings (images must be fully loaded or exist)
  const targets = {
    orion: {
      img: 'assets/images/orion_nebula.webp',
      ra: '05h 35m 17s',
      dec: '-05° 23\' 28"',
      name: 'Orion Nebula (M42)'
    },
    andromeda: {
      img: 'assets/images/black_hole.webp',
      ra: '00h 42m 44s',
      dec: '+41° 16\' 09"',
      name: 'Andromeda Galaxy (M31)'
    },
    moon: {
      img: 'assets/images/login_hero.webp',
      ra: '14h 22m 05s',
      dec: '-12° 44\' 15"',
      name: 'Crescent Moon (Luna)'
    }
  };
  
  // Auto-fill coordinates on target dropdown switch
  if (selectTarget) {
    selectTarget.addEventListener('change', function() {
      const val = this.value;
      const targetData = targets[val];
      if (targetData) {
        if (inputRa) inputRa.value = targetData.ra;
        if (inputDec) inputDec.value = targetData.dec;
        if (statusText) {
          statusText.textContent = `Target selected: ${targetData.name}. Awaiting alignment.`;
        }
        
        // Reset LED back to red indicating target change but not aligned
        if (led) {
          led.className = 'console-led'; // resets back to default (red)
        }
      }
    });
  }
  
  // Slew/Align telescope triggers
  if (alignBtn) {
    alignBtn.addEventListener('click', () => {
      const selectedVal = selectTarget ? selectTarget.value : '';
      const targetData = targets[selectedVal];
      
      if (!selectedVal || !targetData) {
        if (statusText) {
          statusText.style.color = '#ef4444';
          statusText.textContent = 'Error: Please select a target object first.';
          setTimeout(() => {
            statusText.style.color = '';
            statusText.textContent = 'Ready to align telescope mount.';
          }, 4000);
        }
        return;
      }
      
      // Update LED status to Slewing
      if (led) {
        led.className = 'console-led slewing';
      }
      if (statusText) {
        statusText.textContent = `Slewing dome mount to RA: ${inputRa.value || targetData.ra} | DEC: ${inputDec.value || targetData.dec}...`;
      }
      
      // Visual lens blur out during transition
      if (previewImg) {
        previewImg.style.opacity = '0.1';
        previewImg.style.filter = 'blur(10px) grayscale(1)';
        previewImg.style.transform = 'scale(0.9) rotate(15deg)';
      }
      
      // Simulates slewing mount time delay
      setTimeout(() => {
        // Aligned state updates
        if (led) {
          led.className = 'console-led aligned';
        }
        
        // Apply filter matrix color
        const filterVal = selectFilter ? selectFilter.value : 'luminance';
        applyLensStyles(filterVal, targetData.img);
        
        if (statusText) {
          statusText.textContent = `Aligned successfully with ${targetData.name}. Spectrum filter active: ${filterVal.toUpperCase()}.`;
        }
      }, 1500);
    });
  }
  
  // Apply filter states
  if (selectFilter) {
    selectFilter.addEventListener('change', function() {
      const filterVal = this.value;
      const selectedVal = selectTarget ? selectTarget.value : '';
      const targetData = targets[selectedVal];
      
      // Only apply filter if telescope is already aligned/green
      if (led && led.classList.contains('aligned') && targetData) {
        applyLensStyles(filterVal, targetData.img);
        if (statusText) {
          statusText.textContent = `Spectrum filter updated: ${filterVal.toUpperCase()}. Target: ${targetData.name}.`;
        }
      }
    });
  }
  
  function applyLensStyles(filterType, imgSrc) {
    if (!previewImg) return;
    
    // Set image source
    previewImg.src = imgSrc;
    previewImg.style.opacity = '0.9';
    previewImg.style.transform = 'scale(1) rotate(0deg)';
    
    // Apply styling profiles based on spectral filters
    switch (filterType) {
      case 'halpha': // Deep hot Red
        previewImg.style.filter = 'blur(0px) sepia(1) hue-rotate(330deg) saturate(5) brightness(0.95)';
        break;
      case 'o3': // Glowing teal blue
        previewImg.style.filter = 'blur(0px) sepia(1) hue-rotate(170deg) saturate(4.5) brightness(1)';
        break;
      case 's2': // Deep violet purple
        previewImg.style.filter = 'blur(0px) sepia(1) hue-rotate(250deg) saturate(5) brightness(0.9)';
        break;
      case 'luminance':
      default: // Normal
        previewImg.style.filter = 'blur(0px) sepia(0) contrast(1.1) brightness(1.05)';
        break;
    }
  }
}