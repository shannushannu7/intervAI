/**
 * IntervAI - Job Role Selection Page
 * Displays 4-5 job roles. User selects one (highlight). "Start Interview" enabled only when one is selected.
 * Selected role is saved to localStorage and used on the interview page for role-specific questions.
 */

document.addEventListener('DOMContentLoaded', function () {
  // List of job roles we offer (real-time: we could add more later)
  const JOB_ROLES = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Analyst',
    'Product Manager'
  ];

  const jobList = document.getElementById('jobList');
  const startBtn = document.getElementById('startBtn');
  let selectedRole = null;

  // Create a button for each job role
  JOB_ROLES.forEach(function (role) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'job-role';
    btn.textContent = role;
    btn.dataset.role = role;

    btn.addEventListener('click', function () {
      // Remove 'selected' from all, add to this one
      document.querySelectorAll('.job-role').forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      selectedRole = role;
      startBtn.disabled = false;
    });

    jobList.appendChild(btn);
  });

  // Start Interview: save role and go to interview page
  startBtn.addEventListener('click', function () {
    if (!selectedRole) return;
    saveJobRole(selectedRole);
    goToPage('interview.html');
  });
});
