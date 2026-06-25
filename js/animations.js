/* Initialization of animations libraries and cosmic canvas background */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initCosmicCanvas();
});

/* Initialize AOS scroll framework */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 120
    });
  }
}

/* Star field + Parallax + Shooting Star Canvas Animation */
function initCosmicCanvas() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  // Track mouse coordinates for parallax
  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
  
  document.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  // Star particle structure
  const stars = [];
  const starCount = Math.min(Math.floor((width * height) / 5000), 300);
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      // depth layer (parallax factor)
      depth: Math.random() * 0.8 + 0.2,
      // blink speed
      blinkSpeed: 0.005 + Math.random() * 0.015,
      alpha: Math.random(),
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }
  
  // Shooting Stars structure
  const shootingStars = [];
  
  function createShootingStar() {
    // Only schedule if canvas is active and max count not reached
    if (shootingStars.length > 1 || Math.random() > 0.005) return;
    
    shootingStars.push({
      x: Math.random() * (width * 0.7),
      y: Math.random() * (height * 0.3),
      length: Math.random() * 80 + 40,
      speed: Math.random() * 12 + 8,
      angle: Math.PI / 4, // 45 degrees
      opacity: 1,
      fadeSpeed: 0.02 + Math.random() * 0.02
    });
  }
  
  // Animation Loop
  function drawSpace() {
    ctx.clearRect(0, 0, width, height);
    
    // Smooth lerp mouse coordinates
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
    
    // 1. Draw Stars with Parallax
    stars.forEach(star => {
      // Calculate depth offset
      const offsetX = (mouse.x - width / 2) * star.depth * 0.03;
      const offsetY = (mouse.y - height / 2) * star.depth * 0.03;
      
      let starX = star.x - offsetX;
      let starY = star.y - offsetY;
      
      // Keep stars within boundary limits
      if (starX < 0) starX = width + (starX % width);
      if (starX > width) starX = starX % width;
      if (starY < 0) starY = height + (starY % height);
      if (starY > height) starY = starY % height;
      
      // Twinkle alpha updates
      star.alpha += star.blinkSpeed * star.direction;
      if (star.alpha >= 1) {
        star.alpha = 1;
        star.direction = -1;
      } else if (star.alpha <= 0.1) {
        star.alpha = 0.1;
        star.direction = 1;
      }
      
      // Draw circular star
      ctx.beginPath();
      ctx.arc(starX, starY, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192, 132, 252, ${star.alpha})`; // Purple tinted star
      ctx.fill();
    });
    
    // 2. Schedule and Draw Shooting Stars
    createShootingStar();
    
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      
      // Draw shooting star line gradient
      const endX = ss.x + Math.cos(ss.angle) * ss.length;
      const endY = ss.y + Math.sin(ss.angle) * ss.length;
      
      const grad = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
      grad.addColorStop(1, 'rgba(124, 58, 237, 0)');
      
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Move shooting star
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.opacity -= ss.fadeSpeed;
      
      // Delete if faded
      if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
        shootingStars.splice(i, 1);
      }
    }
    
    requestAnimationFrame(drawSpace);
  }
  
  drawSpace();
}