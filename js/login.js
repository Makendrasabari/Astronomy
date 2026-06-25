document.addEventListener('DOMContentLoaded', () => {
  initLoginValidation();
});

/* Form validations and password toggle triggers */
function initLoginValidation() {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordToggle = document.getElementById('password-toggle');
  const roleSelect = document.getElementById('role');
  
  if (!form) return;
  
  // Disable native browser validation tooltips so our custom inline errors work
  form.setAttribute('novalidate', '');
  
  // Toggle password eye icon & input type field
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle a class for visual active styling if needed
      passwordToggle.classList.toggle('active');
      
      // Shift colors of eye SVG inside toggle btn
      const eyeIcon = passwordToggle.querySelector('.eye-icon');
      if (eyeIcon) {
        if (type === 'text') {
          eyeIcon.style.color = 'var(--accent)';
        } else {
          eyeIcon.style.color = 'var(--text-muted)';
        }
      }
    });
  }

  // Helper functions for inline validation messages
  function showError(inputElement, message) {
    if (!inputElement) return;
    inputElement.classList.add('error');
    const parent = inputElement.closest('.login-input-group');
    if (!parent) return;
    
    let errorDiv = parent.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      parent.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  }

  // Clear error from validation
  function clearError(inputElement) {
    if (!inputElement) return;
    inputElement.classList.remove('error');
    const parent = inputElement.closest('.login-input-group');
    if (!parent) return;
    
    const errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  const submitBtn = document.getElementById('submit-btn');

  // Helper functions for validation
  function isValidGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    return gmailRegex.test(email);
  }

  function isValidEmailFormat(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function validateInputs() {
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    const gmailValid = isValidGmail(email);
    const passwordValid = password.length > 0;

    if (submitBtn) {
      if (gmailValid && passwordValid) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('disabled');
      } else {
        submitBtn.disabled = true;
        submitBtn.setAttribute('disabled', 'true');
      }
    }
  }

  // Clear errors dynamically when user types/changes input
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const email = emailInput.value.trim();
      
      // If valid Gmail or empty, clear the error
      if (isValidGmail(email) || email === '') {
        clearError(emailInput);
      } else if (isValidEmailFormat(email)) {
        // If it's a complete email format but not a gmail.com domain, show error immediately on input
        showError(emailInput, 'Please enter a valid Gmail address (example@gmail.com).');
      }
      
      validateInputs();
    });

    emailInput.addEventListener('blur', () => {
      const email = emailInput.value.trim();
      // On blur, if it's not empty and not a valid Gmail, show the error
      if (email !== '' && !isValidGmail(email)) {
        showError(emailInput, 'Please enter a valid Gmail address (example@gmail.com).');
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      if (passwordInput.value !== '') {
        clearError(passwordInput);
      }
      validateInputs();
    });
  }

  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      if (roleSelect.value !== '') {
        clearError(roleSelect);
      }
      validateInputs();
    });
  }

  // Initial check on load (handles browser autofill and initial state)
  validateInputs();

  // Form submission validations
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const selectedRole = roleSelect ? roleSelect.value : '';
    
    let isValid = true;
    
    // Validate email
    if (!email) {
      showError(emailInput, 'Please enter your email address.');
      isValid = false;
    } else if (!isValidGmail(email)) {
      showError(emailInput, 'Please enter a valid Gmail address (example@gmail.com).');
      isValid = false;
    } else {
      clearError(emailInput);
    }
    
    // Validate password
    if (!password) {
      showError(passwordInput, 'Password must not be empty.');
      isValid = false;
    } else {
      clearError(passwordInput);
    }
    
    // Validate role
    if (!selectedRole) {
      showError(roleSelect, 'Please select a role.');
      isValid = false;
    } else {
      clearError(roleSelect);
    }
    
    if (!isValid) {
      validateInputs();
      return;
    }
    
    // Set or update registered_user info in localStorage so dashboard can render correctly
    let regUser = null;
    const registeredUserJson = localStorage.getItem('registered_user');
    if (registeredUserJson) {
      try {
        regUser = JSON.parse(registeredUserJson);
      } catch (err) {
        // ignore
      }
    }

    if (!regUser || regUser.email.toLowerCase() !== email.toLowerCase()) {
      const nameFromEmail = email.split('@')[0];
      const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      regUser = {
        name: displayName,
        email: email,
        role: selectedRole,
        password: password
      };
      localStorage.setItem('registered_user', JSON.stringify(regUser));
    } else {
      regUser.password = password;
      regUser.role = selectedRole;
      localStorage.setItem('registered_user', JSON.stringify(regUser));
    }
    
    // Simulates connection loading state
    if (submitBtn) {
      const span = submitBtn.querySelector('span');
      if (span) {
        span.textContent = 'CONNECTING TO SKYDECK...';
      }
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
    }
    
    setTimeout(() => {
      if (selectedRole === 'admin') {
        window.location.href = 'admin/dashboard.html';
      } else {
        window.location.href = 'user/dashboard.html';
      }
    }, 1200);
  });

  // Forgot password inline status handling
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  }
}