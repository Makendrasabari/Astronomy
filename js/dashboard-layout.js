document.addEventListener('DOMContentLoaded', () => {
  initDashboardLayout();
});

function initDashboardLayout() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  const profileBtn = document.getElementById('profile-btn');
  const profileDropdown = document.getElementById('profile-dropdown');
  
  // Sidebar Toggle (Mobile & Desktop)
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });

    // Close sidebar when a navigation link is clicked
    const navLinks = sidebar.querySelectorAll('.db-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
      });
    });

    // Dynamically insert close button inside sidebar logo container
    const sidebarLogo = sidebar.querySelector('.db-sidebar-logo');
    if (sidebarLogo && !sidebar.querySelector('.db-sidebar-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'db-sidebar-close';
      closeBtn.id = 'sidebar-close';
      closeBtn.innerHTML = `
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24" height="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      `;
      closeBtn.setAttribute('aria-label', 'Close Navigation Menu');
      sidebarLogo.appendChild(closeBtn);
      
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.remove('active');
      });
    }
  }
  
  // Notification Drawer Toggler - Navigate to 404 page
  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = '../404.html';
    });
  }
  
  // Profile Dropdown Toggler
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (notifDropdown) notifDropdown.classList.remove('active');
      profileDropdown.classList.toggle('active');
    });
  }
  
  // Global Click listener to close open dropdowns
  document.addEventListener('click', () => {
    if (notifDropdown) notifDropdown.classList.remove('active');
    if (profileDropdown) profileDropdown.classList.remove('active');
  });
  
  // Retrieve signed up user info from localStorage if available
  const registeredUserJson = localStorage.getItem('registered_user');
  if (registeredUserJson) {
    const regUser = JSON.parse(registeredUserJson);
    
    // Inject profile header card inside dropdown if available
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileDropdown) {
      // Check if there are other links besides the profile card (like Console Config)
      const links = profileDropdown.querySelectorAll('.db-profile-link');
      let hasOtherLink = false;
      links.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (!text.includes('my profile') && !text.includes('log out')) {
          hasOtherLink = true;
        }
      });

      let header = profileDropdown.querySelector('.db-profile-header');
      if (!header) {
        header = document.createElement('div');
        header.className = 'db-profile-header';
        const borderStyle = hasOtherLink ? 'border-bottom: 1px solid var(--db-card-border); margin-bottom: 0.5rem;' : '';
        header.setAttribute('style', `padding: 1rem; ${borderStyle} display: flex; flex-direction: column; gap: 4px;`);
        profileDropdown.insertBefore(header, profileDropdown.firstChild);
        
        // Increase width slightly to accommodate email
        profileDropdown.style.width = '240px';
      }
      
      const displayRole = regUser.role === 'admin' ? 'Mission Controller' : 'Stargazer';
      header.innerHTML = `
        <span class="db-profile-name" style="font-weight: 600; color: #fff; font-size: 0.95rem; line-height: 1.2;">${regUser.name || 'Explorer'}</span>
        <span class="db-profile-email" style="font-size: 0.75rem; color: var(--db-text-muted); word-break: break-all; line-height: 1.2;">${regUser.email || 'no-email@stackly.org'}</span>
        <span class="db-profile-role" style="font-size: 0.7rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; line-height: 1.2;">${displayRole}</span>
      `;

      // Remove "My Profile" and "Log Out" links
      links.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text.includes('my profile') || text.includes('log out')) {
          link.remove();
        }
      });

      // Remove hr separators
      const hrs = profileDropdown.querySelectorAll('hr');
      hrs.forEach(hr => hr.remove());
    }
    
    const displayNames = document.querySelectorAll('.db-user-name');
    const displayRoles = document.querySelectorAll('.db-user-role');
    const avatars = document.querySelectorAll('.db-user-avatar');
    
    displayNames.forEach(el => {
      el.textContent = regUser.name;
    });
    
    displayRoles.forEach(el => {
      const displayRole = regUser.role === 'admin' ? 'Mission Controller' : 'Stargazer';
      el.textContent = displayRole;
    });
    
    avatars.forEach(el => {
      // Get initials
      const initials = regUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      el.textContent = initials || 'EX';
    });
  }
  
  // Mock Search listener
  const searchInput = document.getElementById('db-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          searchInput.value = 'Searching... (Found 0 matches - offline)';
          setTimeout(() => {
            searchInput.value = '';
          }, 3000);
        }
      }
    });
  }
  
  // Clear notifications mock click
  const notifClear = document.getElementById('notif-clear');
  if (notifClear) {
    notifClear.addEventListener('click', (e) => {
      e.stopPropagation();
      const items = document.querySelectorAll('.db-notif-item');
      items.forEach(item => item.style.display = 'none');
      const badge = document.getElementById('notif-badge');
      if (badge) badge.style.display = 'none';
    });
  }
}

// Log out session trigger
function logoutSession() {
  // We go back one directory since the dashboard pages live in subdirectories
  window.location.href = '../login.html';
}
