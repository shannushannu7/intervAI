/**
 * IntervAI - Interview Page
 * Shows one question at a time (5 total). Questions are based on selected job role
 * (resume-based / role-based - simulated with predefined sets since no backend).
 * Saves answers and goes to feedback when done.
 */

// Question sets per job role (simulates "AI/resume based" questions for that role)
const QUESTIONS_BY_ROLE = {
  'Frontend Developer': [
    'Tell us about a recent project where you used HTML, CSS, and JavaScript.',
    'How do you ensure a website is responsive and works on different screen sizes?',
    'Describe your experience with debugging frontend issues.',
    'What is your approach to improving page load performance?',
    'How do you stay updated with frontend technologies and best practices?'
  ],
  'Backend Developer': [
    'Describe your experience building APIs or server-side logic.',
    'How do you handle errors and logging in backend services?',
    'What database or data storage have you worked with?',
    'How do you approach security in backend development?',
    'Tell us about a time you had to optimize slow backend code.'
  ],
  'Full Stack Developer': [
    'How do you coordinate between frontend and backend when building a feature?',
    'Describe a full-stack project you have worked on from start to finish.',
    'What tools do you use for version control and deployment?',
    'How do you prioritize when both frontend and backend need attention?',
    'What is your approach to testing across the stack?'
  ],
  'Data Analyst': [
    'Describe a time you turned raw data into actionable insights.',
    'What tools do you use for data analysis and visualization?',
    'How do you ensure data quality and handle missing or messy data?',
    'Explain how you would present findings to a non-technical audience.',
    'What metrics do you think are most important to track in a product?'
  ],
  'Product Manager': [
    'How do you decide what to build next when there are many competing ideas?',
    'Describe how you gather and use user feedback.',
    'How do you work with design and engineering to ship a feature?',
    'Tell us about a product decision you made that had measurable impact.',
    'How do you balance short-term deadlines with long-term product vision?'
  ]
};

// Default questions if role not found
const DEFAULT_QUESTIONS = [
  'Tell us about your relevant experience for this role.',
  'What are your strengths and how do they apply to this job?',
  'Describe a challenge you faced and how you overcame it.',
  'Where do you see yourself in the next couple of years?',
  'Why are you interested in this type of role?'
];

document.addEventListener('DOMContentLoaded', function () {
  const roleSubtitle = document.getElementById('roleSubtitle');
  const questionNumberEl = document.getElementById('questionNumber');
  const questionTextEl = document.getElementById('questionText');
  const answerInput = document.getElementById('answer');
  const nextBtn = document.getElementById('nextQuestionBtn');

  const jobRole = getJobRole();
  const questions = (jobRole && QUESTIONS_BY_ROLE[jobRole]) ? QUESTIONS_BY_ROLE[jobRole] : DEFAULT_QUESTIONS;

  // Show which role they're interviewing for
  if (jobRole) {
    roleSubtitle.textContent = 'Practice Interview – ' + jobRole;
  }

  // Load existing answers from localStorage (in case they refresh)
  let answers = getAnswers();
  if (answers.length !== questions.length) {
    answers = new Array(questions.length).fill('');
  }

  let currentIndex = 0;

  function showQuestion(index) {
    currentIndex = index;
    questionNumberEl.textContent = 'Question ' + (index + 1) + ' of ' + questions.length;
    questionTextEl.textContent = questions[index];
    answerInput.value = answers[index] || '';
    answerInput.focus();
    nextBtn.textContent = index === questions.length - 1 ? 'Finish Interview' : 'Next';
  }

  // Save current answer and move to next or finish
  function goNext() {
    answers[currentIndex] = answerInput.value.trim();
    saveAnswers(answers);

    if (currentIndex < questions.length - 1) {
      showQuestion(currentIndex + 1);
    } else {
      goToPage('feedback.html');
    }
  }

  showQuestion(0);

  nextBtn.addEventListener('click', goNext);
});
