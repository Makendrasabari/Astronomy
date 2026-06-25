(function() {
  // Check if navigating from a dashboard page to another dashboard page
  const currentUrl = window.location.href;
  const referrer = document.referrer;
  
  const isCurrentDashboard = currentUrl.includes('/user/') || currentUrl.includes('/admin/');
  const isReferrerDashboard = referrer && (referrer.includes('/user/') || referrer.includes('/admin/'));
  
  if (isCurrentDashboard && isReferrerDashboard) {
    // Skip preloader setup entirely
    return;
  }

  // Add preloading class to HTML/body immediately to hide other elements during parsing
  if (document.documentElement) {
    document.documentElement.classList.add('preloading');
  }

  function initPreloader() {
    const body = document.body;
    if (!body) return;
    
    body.classList.add('preloading');

    // Create preloader element if not already present
    let preloader = document.getElementById('preloader');
    if (!preloader) {
      preloader = document.createElement('div');
      preloader.id = 'preloader';
      preloader.innerHTML = `
        <div class="preloader-content">
          <div class="cosmic-spinner">
            <div class="spinner-star"></div>
            <div class="spinner-orbit">
              <div class="spinner-planet"></div>
            </div>
          </div>
          <div class="preloader-text">STACKLY</div>
          <div class="preloader-subtext">Initializing Skydeck...</div>
          <div class="preloader-progress-bar">
            <div class="preloader-progress"></div>
          </div>
        </div>
      `;
      body.insertBefore(preloader, body.firstChild);
    }

    // Set 1.5s timer to fade out preloader
    setTimeout(() => {
      preloader.classList.add('fade-out');
      body.classList.remove('preloading');
      document.documentElement.classList.remove('preloading');
      
      // Fully remove from DOM after fade-out transition
      setTimeout(() => {
        preloader.remove();
        // Refresh AOS animations if AOS is active on the page
        if (typeof AOS !== 'undefined' && AOS.refresh) {
          AOS.refresh();
        }
      }, 500);
    }, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }
})();
