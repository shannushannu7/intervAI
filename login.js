/**
 * IntervAI - Login Page Script
 * Handles: validation, show/hide password, forgot password, form submit
 * BEGINNER: We use getElementById to grab HTML elements and add events to them.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Get form and input elements by their IDs
  const form = document.getElementById('loginForm');
  const emailOrMobileInput = document.getElementById('emailOrMobile');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const toggleBtn = document.getElementById('togglePassword');
  const forgotLink = document.getElementById('forgotPassword');

  /**
   * Show error under an input and optionally focus it
   */
  function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden');
  }

  /**
   * Hide error message
   */
  function hideError(element) {
    element.textContent = '';
    element.classList.add('hidden');
  }

  /**
   * Check if string looks like an email (has @ and a dot after it)
   */
  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
  }

  /**
   * Check if string looks like a mobile number (digits, maybe with + or spaces)
   */
  function isValidMobile(str) {
    const digits = str.replace(/\D/g, '');
    return digits.length >= 10;
  }

  /**
   * Validate email or mobile: must be either valid email OR valid mobile
   */
  function validateEmailOrMobile(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your email or mobile number.';
    if (isValidEmail(trimmed) || isValidMobile(trimmed)) return null;
    return 'Please enter a valid email address or mobile number.';
  }

  /**
   * Validate password: not empty, minimum length for demo
   */
  function validatePassword(value) {
    if (!value) return 'Please enter your password.';
    if (value.length < 6) return 'Password must be at least 6 characters.';
    return null;
  }

  // --- Show / Hide Password (toggle icon) ---
  toggleBtn.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type');
    if (type === 'password') {
      passwordInput.setAttribute('type', 'text');
      toggleBtn.setAttribute('aria-label', 'Hide password');
      toggleBtn.textContent = '🙈';
    } else {
      passwordInput.setAttribute('type', 'password');
      toggleBtn.setAttribute('aria-label', 'Show password');
      toggleBtn.textContent = '👁';
    }
  });

  // --- Forgot Password: for now just show an alert (no backend) ---
  forgotLink.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Forgot password: In a full app, we would send a reset link to your email. This is frontend-only for now.');
  });

  // --- Form Submit: validate and then go to next page ---
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop form from actually submitting to a server

    const emailVal = emailOrMobileInput.value;
    const passwordVal = passwordInput.value;

    // Run validations
    const emailErr = validateEmailOrMobile(emailVal);
    const passwordErr = validatePassword(passwordVal);

    hideError(emailError);
    hideError(passwordError);

    if (emailErr) {
      showError(emailError, emailErr);
      emailOrMobileInput.focus();
      return;
    }
    if (passwordErr) {
      showError(passwordError, passwordErr);
      passwordInput.focus();
      return;
    }

    // Optional: store email for display later (e.g. "Welcome, user")
    if (typeof saveUserEmail === 'function') {
      saveUserEmail(emailVal.trim());
    }
    // Go to resume upload page (next step in flow)
    goToPage('resume-upload.html');
  });
});
