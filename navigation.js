/**
 * IntervAI - Navigation & Local Storage Logic
 * Handles moving between pages and storing/clearing user data.
 * BEGINNER TIP: localStorage keeps data in the browser until we clear it.
 */

// Keys we use in localStorage (so we don't typo them)
const STORAGE_KEYS = {
  JOB_ROLE: 'intervai_job_role',
  RESUME_NAME: 'intervai_resume_name',
  ANSWERS: 'intervai_answers',
  USER_EMAIL: 'intervai_user_email'
};

/**
 * Save the selected job role so we can use it on the interview page
 * @param {string} jobRole - The job role name user selected
 */
function saveJobRole(jobRole) {
  localStorage.setItem(STORAGE_KEYS.JOB_ROLE, jobRole);
}

/**
 * Get the job role user selected (from job selection page)
 * @returns {string|null} - Job role or null if not set
 */
function getJobRole() {
  return localStorage.getItem(STORAGE_KEYS.JOB_ROLE);
}

/**
 * Save resume file name (we only store the name, not the file - frontend only)
 * @param {string} fileName - Name of uploaded file
 */
function saveResumeName(fileName) {
  localStorage.setItem(STORAGE_KEYS.RESUME_NAME, fileName);
}

/**
 * Get saved resume file name
 * @returns {string|null}
 */
function getResumeName() {
  return localStorage.getItem(STORAGE_KEYS.RESUME_NAME);
}

/**
 * Save user's interview answers (array of strings)
 * @param {string[]} answers - Array of answer strings
 */
function saveAnswers(answers) {
  localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
}

/**
 * Get saved answers
 * @returns {string[]}
 */
function getAnswers() {
  const data = localStorage.getItem(STORAGE_KEYS.ANSWERS);
  return data ? JSON.parse(data) : [];
}

/**
 * Save user email (e.g. after login) for welcome message
 * @param {string} email - Email or mobile used to log in
 */
function saveUserEmail(email) {
  localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
}

/**
 * Clear all IntervAI data - used when user clicks "Restart Interview"
 * So the next time they start fresh
 */
function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.JOB_ROLE);
  localStorage.removeItem(STORAGE_KEYS.RESUME_NAME);
  localStorage.removeItem(STORAGE_KEYS.ANSWERS);
  localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
}

/**
 * Navigate to a page by changing the browser location
 * @param {string} page - Filename e.g. 'signup.html', 'resume-upload.html'
 */
function goToPage(page) {
  window.location.href = page;
}
