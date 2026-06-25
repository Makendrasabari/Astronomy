document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });
  initCounters();
  initSurveyChart();
  checkBroadcastAnnouncements();
});

// Animated Counters
function initCounters() {
  animateValue("vis-index-counter", 0, 92, "%", 1500);
  animateValue("stars-spotted", 0, 48, "", 1500);
  animateValue("hours-logged", 0, 186, "", 1500);
  animateValue("photos-saved", 0, 92, "", 1500);
  animateValue("coords-saved", 0, 24, "", 1500);
}

function animateValue(id, start, end, suffix, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  
  const range = end - start;
  const minTimer = 50;
  let stepTime = Math.abs(Math.floor(duration / range));
  stepTime = Math.max(stepTime, minTimer);
  
  const startTime = new Date().getTime();
  const endTime = startTime + duration;
  let timer;
  
  function run() {
    const now = new Date().getTime();
    const remaining = Math.max((endTime - now) / duration, 0);
    const value = end - (remaining * range);
    
    obj.textContent = Math.floor(value) + suffix;
    
    if (value === end) {
      clearInterval(timer);
    }
  }
  
  timer = setInterval(run, stepTime);
  run();
}

// Chart.js Sky Survey Progress Doughnut Chart
function initSurveyChart() {
  const ctx = document.getElementById('skySurveyChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Northern Sector', 'Southern Sector', 'Galactic Plane', 'Remaining Sector'],
      datasets: [{
        data: [35, 20, 30, 15],
        backgroundColor: [
          'rgba(124, 58, 237, 0.6)', // Northern
          'rgba(168, 85, 247, 0.6)', // Southern
          'rgba(192, 132, 252, 0.6)', // Galactic
          'rgba(255, 255, 255, 0.05)' // Remaining
        ],
        borderColor: [
          '#7C3AED',
          '#A855F7',
          '#C084FC',
          'rgba(255, 255, 255, 0.1)'
        ],
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#8E8B9E',
            font: { family: 'Inter', size: 11 }
          }
        }
      },
      cutout: '70%'
    }
  });
}

// Check if any admin announcements are active
function checkBroadcastAnnouncements() {
  const banner = document.getElementById('broadcast-alert-banner');
  const msgText = document.getElementById('broadcast-msg-text');
  
  if (!banner || !msgText) return;
  
  const broadcastMsg = localStorage.getItem('site_broadcast');
  if (broadcastMsg) {
    msgText.textContent = `CRITICAL BROADCAST: ${broadcastMsg}`;
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

// Dismiss active announcement
function dismissBroadcast() {
  const banner = document.getElementById('broadcast-alert-banner');
  if (banner) banner.style.display = 'none';
  // Optionally clean localStorage
  localStorage.removeItem('site_broadcast');
}
