document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 0,           // trigger as soon as ANY part enters viewport
    startEvent: 'load'   // re-evaluate after all assets are loaded
  });
  initTransitChart();
});

// Force AOS to re-check all elements after full page load
// This fixes elements already in the viewport that AOS missed on DOMContentLoaded
window.addEventListener('load', () => {
  setTimeout(() => AOS.refresh(), 100);
});

// Chart.js Horizontal Bar Chart showing transit peak hours
function initTransitChart() {
  const ctx = document.getElementById('transitChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mars', 'Venus', 'Saturn', 'Jupiter', 'Orion Nebula'],
      datasets: [{
        label: 'Best Elevation (Degrees)',
        data: [65, 45, 18, 55, 78],
        backgroundColor: [
          'rgba(226, 104, 75, 0.5)',   // Mars (Red/Orange)
          'rgba(226, 178, 126, 0.5)',  // Venus (Gold/Yellow)
          'rgba(192, 132, 252, 0.5)',  // Saturn (Purple)
          'rgba(59, 130, 246, 0.5)',   // Jupiter (Blue)
          'rgba(124, 58, 237, 0.5)'    // Orion (Violet)
        ],
        borderColor: [
          '#E2684B',
          '#E2B27E',
          '#C084FC',
          '#3b82f6',
          '#7C3AED'
        ],
        borderWidth: 1.5,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y', // Makes the bar chart horizontal
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { color: '#8E8B9E', font: { family: 'Inter' } },
          min: 0,
          max: 90 // Max altitude in degrees
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8E8B9E', font: { family: 'Inter', weight: 600 } }
        }
      }
    }
  });
}
