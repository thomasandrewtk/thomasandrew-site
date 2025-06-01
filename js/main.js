/**
 * Thomas Andrew - Personal Website
 * Main JavaScript file - Simplified
 */

// Set current year in footer and handle basic animations
document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Add fade-in animation for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
}); 