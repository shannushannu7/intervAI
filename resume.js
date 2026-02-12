/**
 * IntervAI - Resume Upload Page (Frontend Only)
 * Handles: PDF file selection (click or drag), show file name, enable Next when file chosen.
 * No backend - we only store the file NAME in localStorage for display; we don't upload anywhere.
 */

document.addEventListener('DOMContentLoaded', function () {
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');
  const uploadPrompt = document.getElementById('uploadPrompt');
  const fileNameEl = document.getElementById('fileName');
  const nextBtn = document.getElementById('nextBtn');

  /**
   * When user selects a file (or drops one), check it's PDF and show name + enable Next
   */
  function handleFile(file) {
    if (!file) return;
    // Only allow PDF
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }
    uploadPrompt.textContent = 'Resume selected:';
    fileNameEl.textContent = file.name;
    fileNameEl.classList.remove('hidden');
    nextBtn.disabled = false;
    // Store the File object in a variable so we could use it later (we don't send anywhere)
    window._selectedResumeFile = file;
  }

  // Click on zone = open file picker
  uploadZone.addEventListener('click', function (e) {
    if (e.target === fileInput) return;
    fileInput.click();
  });

  // When user picks a file from the dialog
  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    handleFile(file);
  });

  // Drag and drop: prevent default so "drop" works
  uploadZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });
  uploadZone.addEventListener('dragleave', function () {
    uploadZone.classList.remove('dragover');
  });
  uploadZone.addEventListener('drop', function (e) {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });

  // Next: save file name to localStorage and go to job selection
  nextBtn.addEventListener('click', function () {
    const file = fileInput.files[0] || window._selectedResumeFile;
    const name = file ? file.name : (fileNameEl.textContent || '');
    if (name && typeof saveResumeName === 'function') {
      saveResumeName(name);
    }
    goToPage('job-selection.html');
  });
});
