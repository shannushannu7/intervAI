/**
 * IntervAI - Feedback Page
 * Score is calculated from the user's answers (length and substance as a simple proxy for quality).
 * Strengths, weaknesses, and tips are chosen based on score range so feedback feels genuine.
 * Restart clears all data and sends user back to start.
 */

document.addEventListener('DOMContentLoaded', function () {
  const scoreDisplay = document.getElementById('scoreDisplay');
  const strengthsList = document.getElementById('strengthsList');
  const weaknessesList = document.getElementById('weaknessesList');
  const tipsList = document.getElementById('tipsList');
  const restartBtn = document.getElementById('restartBtn');

  /**
   * Score each answer out of 2 (total 10 for 5 questions).
   * Logic: empty/short = 0, medium = 1, substantial = 2.
   * We use word count and length as a simple measure of "thoughtful" answer.
   */
  function calculateScore(answers) {
    let total = 0;
    for (let i = 0; i < answers.length; i++) {
      const a = (answers[i] || '').trim();
      const words = a ? a.split(/\s+/).length : 0;
      const len = a.length;
      if (len === 0) total += 0;
      else if (words >= 30 || len >= 150) total += 2;
      else if (words >= 10 || len >= 50) total += 1;
      else total += 0.5; // very short but something
    }
    return Math.min(10, Math.round(total)); // 5 questions × 2 max = 10
  }

  // Predefined feedback (static/dummy but varied by performance)
  const FEEDBACK = {
    high: {
      strengths: [
        'You gave detailed, structured answers.',
        'You demonstrated good communication and clarity.',
        'Your answers showed relevant experience and reflection.'
      ],
      weaknesses: [
        'You could add one concrete example per answer where possible.',
        'Consider tightening the opening line of each answer for impact.'
      ],
      tips: [
        'Keep this level of detail in real interviews.',
        'Practice time-boxing answers to 1–2 minutes when needed.'
      ]
    },
    medium: {
      strengths: [
        'You answered all questions and showed willingness to engage.',
        'Some answers had good substance and relevance.'
      ],
      weaknesses: [
        'Several answers were quite short; interviewers look for depth.',
        'Adding specific examples would make your answers stronger.'
      ],
      tips: [
        'Aim for at least 2–3 sentences per question, with one example.',
        'Prepare 2–3 STAR (Situation, Task, Action, Result) stories in advance.',
        'Practice speaking your answers out loud to build confidence.'
      ]
    },
    low: {
      strengths: [
        'You completed the practice and attempted every question.',
        'You have a base to build on with more practice.'
      ],
      weaknesses: [
        'Many answers were too brief to show your skills.',
        'Interviewers need more detail to evaluate you fairly.'
      ],
      tips: [
        'Spend 30–60 seconds thinking before answering each question.',
        'Use the formula: direct answer + one example + what you learned.',
        'Practice with a friend or in front of a mirror to get used to longer answers.',
        'Review common interview questions for your role and draft outline answers.'
      ]
    }
  };

  function pickFeedback(score) {
    if (score >= 8) return FEEDBACK.high;
    if (score >= 5) return FEEDBACK.medium;
    return FEEDBACK.low;
  }

  // Load answers and show feedback
  const answers = getAnswers();
  const score = answers.length === 5 ? calculateScore(answers) : 5; // default 5 if no data
  const feedback = pickFeedback(score);

  scoreDisplay.textContent = score;

  feedback.strengths.forEach(function (text) {
    const li = document.createElement('li');
    li.textContent = text;
    strengthsList.appendChild(li);
  });
  feedback.weaknesses.forEach(function (text) {
    const li = document.createElement('li');
    li.textContent = text;
    weaknessesList.appendChild(li);
  });
  feedback.tips.forEach(function (text) {
    const li = document.createElement('li');
    li.textContent = text;
    tipsList.appendChild(li);
  });

  // Restart: clear all stored data and go back to login (fresh start)
  restartBtn.addEventListener('click', function () {
    clearAllData();
    goToPage('index.html');
  });
});
