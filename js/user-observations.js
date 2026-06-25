document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });
  initObservationsLogbook();
});

let breakdownChartObj = null;

// Initialize form triggers, list rendering, and Chart
function initObservationsLogbook() {
  const form = document.getElementById('obs-logger-form');
  const tbody = document.getElementById('logbook-body');
  
  if (!form || !tbody) return;
  
  // Set up default values in localStorage if empty
  let savedLogs = JSON.parse(localStorage.getItem('stargazer_logs'));
  if (!savedLogs) {
    savedLogs = [
      { name: 'Andromeda Galaxy', category: 'Galaxy', date: '2026-06-20', coords: '00h 42m / +41° 16\'', notes: 'Bright core clearly visible. Dust lanes resolved using UHC filters.' },
      { name: 'Jupiter', category: 'Planet', date: '2026-06-18', coords: '14h 12m / -11° 30\'', notes: 'Great Red Spot transited central meridian. Moons Io and Europa aligned.' }
    ];
    localStorage.setItem('stargazer_logs', JSON.stringify(savedLogs));
  }
  
  // Render logs
  renderLogs(savedLogs);
  
  // Build Chart
  initBreakdownChart(savedLogs);
  
  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('obs-name').value.trim();
    const category = document.getElementById('obs-cat').value;
    const date = document.getElementById('obs-date').value;
    const coords = document.getElementById('obs-coords').value.trim();
    const notes = document.getElementById('obs-notes').value.trim();
    
    if (!name || !category || !date || !coords || !notes) return;
    
    const newLog = { name, category, date, coords, notes };
    savedLogs.unshift(newLog); // Place new logs at the top
    localStorage.setItem('stargazer_logs', JSON.stringify(savedLogs));
    
    window.location.href = '../404.html';
  });
}

function renderLogs(logs) {
  const tbody = document.getElementById('logbook-body');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  logs.forEach(log => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${log.name}</strong></td>
      <td>${log.category}</td>
      <td class="font-mono">${log.date}</td>
      <td class="font-mono">${log.coords}</td>
      <td>${log.notes}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Chart.js Pie Chart configuration
function initBreakdownChart(logs) {
  const ctx = document.getElementById('obsBreakdownChart');
  if (!ctx) return;
  
  const counts = getCategoryCounts(logs);
  
  breakdownChartObj = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Nebulae', 'Galaxies', 'Planets', 'Comets'],
      datasets: [{
        data: [counts.Nebula, counts.Galaxy, counts.Planet, counts.Comet],
        backgroundColor: [
          'rgba(124, 58, 237, 0.65)',
          'rgba(168, 85, 247, 0.65)',
          'rgba(192, 132, 252, 0.65)',
          'rgba(59, 130, 246, 0.65)'
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
      }
    }
  });
}

function updateChartData(logs) {
  if (!breakdownChartObj) return;
  const counts = getCategoryCounts(logs);
  breakdownChartObj.data.datasets[0].data = [counts.Nebula, counts.Galaxy, counts.Planet, counts.Comet];
  breakdownChartObj.update();
}

function getCategoryCounts(logs) {
  const counts = { Nebula: 0, Galaxy: 0, Planet: 0, Comet: 0 };
  logs.forEach(log => {
    if (counts[log.category] !== undefined) {
      counts[log.category]++;
    }
  });
  return counts;
}
