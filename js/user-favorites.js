document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });
  initFavRatingChart();
});

// Chart.js Bar Chart showing rating scores
function initFavRatingChart() {
  const ctx = document.getElementById('favRatingChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Galaxies', 'Nebulae', 'Star Clusters', 'Planets', 'Comets'],
      datasets: [{
        label: 'My Interest Rating (1-10)',
        data: [9.5, 9.0, 7.8, 8.5, 6.2],
        backgroundColor: 'rgba(168, 85, 247, 0.45)', // Secondary Color
        borderColor: '#A855F7',
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(168, 85, 247, 0.7)'
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
          max: 10
        }
      }
    }
  });
}
