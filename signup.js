/**
 * IntervAI - Signup Page Script
 * Validates: name, email/mobile, password, confirm password. Toggle password visibility.
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const fullNameInput = document.getElementById('fullName');
  const emailOrMobileInput = document.getElementById('emailOrMobile');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirm = document.getElementById('toggleConfirm');

  function showError(el, msg) {
    el.textContent = msg;
    el.classList.remove('hidden');
  }
  function hideError(el) {
    el.textContent = '';
    el.classList.add('hidden');
  }

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
  }
  function isValidMobile(str) {
    return str.replace(/\D/g, '').length >= 10;
  }

  function toggleVisibility(input, btn) {
    const type = input.getAttribute('type');
    if (type === 'password') {
      input.setAttribute('type', 'text');
      btn.textContent = '🙈';
    } else {
      input.setAttribute('type', 'password');
      btn.textContent = '👁';
    }
  }

  togglePassword.addEventListener('click', function () {
    toggleVisibility(passwordInput, togglePassword);
  });
  toggleConfirm.addEventListener('click', function () {
    toggleVisibility(confirmInput, toggleConfirm);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = fullNameInput.value.trim();
    const emailOrMobile = emailOrMobileInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    hideError(nameError);
    hideError(emailError);
    hideError(passwordError);
    hideError(confirmError);

    let hasError = false;

    if (!name) {
      showError(nameError, 'Please enter your full name.');
      hasError = true;
    }
    if (!emailOrMobile) {
      showError(emailError, 'Please enter your email or mobile number.');
      hasError = true;
    } else if (!isValidEmail(emailOrMobile) && !isValidMobile(emailOrMobile)) {
      showError(emailError, 'Please enter a valid email or mobile number.');
      hasError = true;
    }
    if (!password) {
      showError(passwordError, 'Please create a password.');
      hasError = true;
    } else if (password.length < 6) {
      showError(passwordError, 'Password must be at least 6 characters.');
      hasError = true;
    }
    if (password !== confirm) {
      showError(confirmError, 'Passwords do not match.');
      hasError = true;
    }

    if (hasError) return;

    // Success: go to login (or resume-upload if you want to skip login after signup)
    goToPage('index.html');
  });
});
