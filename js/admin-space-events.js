document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });
  initEventProportionsChart();
  initFormSubmit();
});

// Scheduling form submission handler
function initFormSubmit() {
  const form = document.getElementById('event-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('event-name').value.trim();
    const cat = document.getElementById('event-category').value;
    const date = document.getElementById('event-date').value;
    const observer = document.getElementById('event-observer').value.trim();
    
    if (!name || !cat || !date || !observer) return;
    
    window.location.href = '../404.html';
  });
}

// Chart.js Event Category Distribution Doughnut Chart
function initEventProportionsChart() {
  const ctx = document.getElementById('eventProportionsChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Solar Flares', 'Meteor Showers', 'Conjunctions', 'Eclipses'],
      datasets: [{
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(124, 58, 237, 0.6)', // Primary
          'rgba(168, 85, 247, 0.6)', // Secondary
          'rgba(192, 132, 252, 0.6)', // Accent
          'rgba(59, 130, 246, 0.6)'   // Blue
        ],
        borderColor: [
          '#7C3AED',
          '#A855F7',
          '#C084FC',
          '#3b82f6'
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
      cutout: '65%'
    }
  });
}

// Broadcaster dispatch trigger
function dispatchBroadcast() {
  const msgInput = document.getElementById('broadcast-msg');
  if (!msgInput) return;
  
  const msg = msgInput.value.trim();
  if (!msg) {
    msgInput.placeholder = 'Error: Please enter a message.';
    msgInput.style.borderColor = '#ef4444';
    setTimeout(() => {
      msgInput.placeholder = 'Enter message to display as a top alert bar on observer screens...';
      msgInput.style.borderColor = '';
    }, 3000);
    return;
  }
  
  // Saves announcement to localStorage for Stargazer dashboard to read!
  localStorage.setItem('site_broadcast', msg);
  
  window.location.href = '../404.html';
}
