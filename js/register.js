document.addEventListener('DOMContentLoaded', () => {
  initRegisterValidation();
});

function initRegisterValidation() {
  const form = document.getElementById('register-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const roleSelect = document.getElementById('role');
  const passwordInput = document.getElementById('password');
  
  if (!form) return;

  // Disable native browser validation tooltips so our custom inline errors work
  form.setAttribute('novalidate', '');

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

  // Clear errors dynamically when user types/changes input
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim() !== '') {
        clearError(nameInput);
      }
    });
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailInput.value.trim() !== '') {
        clearError(emailInput);
      }
    });
  }
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      if (passwordInput.value !== '') {
        clearError(passwordInput);
      }
    });
  }
  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      if (roleSelect.value !== '') {
        clearError(roleSelect);
      }
    });
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const role = roleSelect ? roleSelect.value : '';
    const password = passwordInput ? passwordInput.value : '';
    
    let isValid = true;
    
    // Validate Name
    if (!name) {
      showError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    if (!email) {
      showError(emailInput, 'Please enter your email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Role
    if (!role) {
      showError(roleSelect, 'Please select a role.');
      isValid = false;
    } else {
      clearError(roleSelect);
    }

    // Validate Password
    if (!password) {
      showError(passwordInput, 'Password must not be empty.');
      isValid = false;
    } else {
      clearError(passwordInput);
    }
    
    if (!isValid) return;
    
    // Simulates database storage
    const registrationDetails = {
      name,
      email,
      role,
      password
    };
    
    localStorage.setItem('registered_user', JSON.stringify(registrationDetails));
    
    // Loading indicator animation
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      const span = submitBtn.querySelector('span');
      if (span) {
        span.textContent = 'REGISTRATION SUCCESSFUL...';
      }
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
    }
    
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });
}
