document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });
  initCounters();
  initResourceChart();
});

// Animated Counter increments
function initCounters() {
  animateValue("cpu-counter", 0, 48, "%", 1500);
  animateValue("sessions-counter", 0, 1420, "", 1500);
  animateValue("latency-counter", 180, 42, "ms", 1500);
  animateValue("telemetry-counter", 0.0, 3.4, " Gbps", 1500);
  
  // Minor fluctuations to simulate real-time stats
  setInterval(() => {
    const cpuVal = 40 + Math.floor(Math.random() * 15);
    document.getElementById("cpu-counter").textContent = cpuVal + "%";
    
    const latVal = 38 + Math.floor(Math.random() * 8);
    document.getElementById("latency-counter").textContent = latVal + "ms";
  }, 4000);
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
    
    if (suffix === " Gbps") {
      obj.textContent = value.toFixed(1) + suffix;
    } else {
      obj.textContent = Math.floor(value) + suffix;
    }
    
    if (value === end) {
      clearInterval(timer);
    }
  }
  
  timer = setInterval(run, stepTime);
  run();
}

// Chart.js Server Resource Load Line Chart
function initResourceChart() {
  const ctx = document.getElementById('resourceLoadChart');
  if (!ctx) return;
  
  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(124, 58, 237, 0.4)');
  gradient.addColorStop(1, 'rgba(5, 3, 20, 0.05)');
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00'],
      datasets: [{
        label: 'CPU Utilization (%)',
        data: [25, 38, 42, 30, 48, 65, 52, 40, 48],
        borderColor: '#7C3AED',
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
          ticks: { color: '#8E8B9E', font: { family: 'Inter' } },
          min: 0,
          max: 100
        }
      }
    }
  });
  
  // Real-time chart data updates
  setInterval(() => {
    const data = chart.data.datasets[0].data;
    data.shift();
    data.push(35 + Math.floor(Math.random() * 35));
    chart.update();
  }, 5000);
}

// Handle Controller Override Actions
function triggerAction(action) {
  const time = new Date().toTimeString().split(' ')[0];
  let title = "";
  let desc = "";
  let colorClass = "dot-purple";
  
  if (action === 'sensor') {
    title = "Sensor Arrays Calibrated";
    desc = "Triggered global active sensor grid recalibration. Telescope telemetry offset adjusted.";
    colorClass = "dot-green";
  } else if (action === 'haze') {
    title = "Haze Override Toggled";
    desc = "Atmospheric haze generator adjusted back to standard default transparency levels (12%).";
    colorClass = "dot-blue";
  } else if (action === 'stars') {
    title = "Twinkling Loop Regenerated";
    desc = "Forced reset on body space canvas. Stars coordinates redrawn on random float indices.";
    colorClass = "dot-purple";
  } else if (action === 'shutdown') {
    title = "EMERGENCY SHUTDOWN CANCELLED";
    desc = "Emergency shutdown query aborted by station administrator. Standard telemetry active.";
    colorClass = "dot-purple";
    // Inject log to timeline directly before returning
    const wrapper = document.querySelector('.timeline-wrapper');
    if (wrapper) {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot ${colorClass}"></div>
        <div class="timeline-content">
          <span class="timeline-time">${time}</span>
          <span class="timeline-title">${title}</span>
          <p class="timeline-desc">${desc}</p>
        </div>
      `;
      wrapper.insertBefore(item, wrapper.firstChild);
    }
    return;
  }
  
  // Inject log to timeline
  const wrapper = document.querySelector('.timeline-wrapper');
  if (wrapper) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot ${colorClass}"></div>
      <div class="timeline-content">
        <span class="timeline-time">${time}</span>
        <span class="timeline-title">${title}</span>
        <p class="timeline-desc">${desc}</p>
      </div>
    `;
    wrapper.insertBefore(item, wrapper.firstChild);
  }
}
