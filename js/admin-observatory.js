document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }
  initBandwidthChart();
});

// Toggle Dome Open/Close Status
function toggleDome(domeId, isOpen) {
  window.location.href = '../404.html';
}

// Chart.js Bandwidth Utilization Bar Chart
function initBandwidthChart() {
  const ctx = document.getElementById('bandwidthChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Keck Array', 'Atacama ALMA', 'La Palma Galileo', 'Sutherland Obs', 'Mauna Loa'],
      datasets: [{
        label: 'Current Download Speed (MB/s)',
        data: [78, 120, 12, 65, 45],
        backgroundColor: [
          'rgba(124, 58, 237, 0.45)', // Keck
          'rgba(168, 85, 247, 0.45)', // Atacama
          'rgba(239, 68, 68, 0.35)',  // La Palma (Offline/low speed)
          'rgba(192, 132, 252, 0.45)', // Sutherland
          'rgba(59, 130, 246, 0.45)'   // Mauna Loa
        ],
        borderColor: [
          '#7C3AED',
          '#A855F7',
          '#ef4444',
          '#C084FC',
          '#3b82f6'
        ],
        borderWidth: 1.5,
        borderRadius: 6
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
          ticks: { color: '#8E8B9E', font: { family: 'Inter' } },
          min: 0,
          max: 150
        }
      }
    }
  });
}
