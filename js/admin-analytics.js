document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });
  initUserGrowthChart();
  initTargetSuccessChart();
});

// Chart.js User Growth Area Chart
function initUserGrowthChart() {
  const ctx = document.getElementById('userGrowthChart');
  if (!ctx) return;
  
  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
  gradient.addColorStop(1, 'rgba(5, 3, 20, 0.05)');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Registered Observers',
        data: [450, 680, 890, 1200, 1550, 1920],
        borderColor: '#A855F7',
        borderWidth: 3,
        pointBackgroundColor: '#C084FC',
        pointBorderColor: '#fff',
        pointRadius: 4,
        fill: true,
        backgroundColor: gradient,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { color: '#8E8B9E', font: { family: 'Inter' } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { color: '#8E8B9E', font: { family: 'Inter' } }
        }
      }
    }
  });
}

// Chart.js Target Success Pie Chart
function initTargetSuccessChart() {
  const ctx = document.getElementById('targetSuccessChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Stars', 'Nebulae', 'Galaxies', 'Exoplanets'],
      datasets: [{
        data: [50, 30, 15, 5],
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
