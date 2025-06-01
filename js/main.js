/**
 * Thomas Andrew - Personal Website
 * Main JavaScript file - Apple Reminders Style
 */

// Set current year in footer and handle basic animations
document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Animate elements on page load
  animatePageLoad();
  
  // Setup Contact Form Modal
  setupContactModal();
  
  // Setup Changing Text Animation
  setupChangingText();
});

// Handle page load animations
function animatePageLoad() {
  // Animate header with fade in
  const header = document.querySelector('.profile-header');
  setTimeout(() => {
    header.classList.add('fade-in');
  }, 100);

  // Animate section titles with typewriter effect
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach((title, index) => {
    title.classList.add('typewriter');
    // Stagger section title animations
    setTimeout(() => {
      title.classList.add('fade-in');
    }, 300 + (index * 200));
  });

  // Animate reminder items
  const reminderItems = document.querySelectorAll('.reminder-item');
  reminderItems.forEach((item, index) => {
    // Stagger item animations
    setTimeout(() => {
      item.classList.add('fade-in');
      
      // Pop in the icons with a slight delay
      setTimeout(() => {
        const icon = item.querySelector('.social-icon');
        if (icon) {
          icon.classList.add('pop-in');
        }
      }, 150);
    }, 500 + (index * 200));
  });
}

// Setup Contact Form Modal
function setupContactModal() {
  const modal = document.getElementById('contactModal');
  const openButton = document.getElementById('openContactForm');
  const closeButton = document.querySelector('.close-button');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  
  // Open modal
  openButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
  
  // Close modal
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Allow scrolling
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Allow scrolling
    }
  });
  
  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        formStatus.textContent = 'Thanks for your message! I\'ll get back to you soon.';
        formStatus.style.color = '#34C759'; // Apple success green
        form.reset();
        
        // Close modal after success (delay for user to see message)
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto'; // Allow scrolling
          formStatus.textContent = ''; // Clear status message for next time
        }, 2000);
      } else {
        // Server error
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          formStatus.textContent = data.errors.map(error => error.message).join(', ');
        } else {
          formStatus.textContent = 'Something went wrong. Please try again.';
        }
        formStatus.style.color = '#FF3B30'; // Apple error red
      }
    } catch (error) {
      // Network error
      formStatus.textContent = 'Connection error. Please check your internet and try again.';
      formStatus.style.color = '#FF3B30'; // Apple error red
    } finally {
      // Reset button
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });
}

// Setup Changing Text Animation
function setupChangingText() {
  const projectTypes = ['Website', 'YouTube', 'Music', 'Design', 'Brand'];
  const changingTextElement = document.getElementById('projectType');
  const hiddenProjectTypeField = document.getElementById('hiddenProjectType');
  let currentIndex = 0;
  
  // Create transition function with better animation
  function transitionToNextWord() {
    // Start transition
    changingTextElement.style.opacity = '0';
    changingTextElement.style.transform = 'translateY(5px)';
    
    // After fade out, change text and fade in
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % projectTypes.length;
      const newType = projectTypes[currentIndex];
      changingTextElement.textContent = newType;
      
      // Update hidden field for form submission
      if (hiddenProjectTypeField) {
        hiddenProjectTypeField.value = newType;
      }
      
      // Trigger reflow for smooth animation
      void changingTextElement.offsetWidth;
      
      // Fade in with slight upward movement
      changingTextElement.style.opacity = '1';
      changingTextElement.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // Set initial state
  changingTextElement.style.opacity = '1';
  changingTextElement.style.transform = 'translateY(0)';
  
  // Change text every 2.5 seconds
  setInterval(transitionToNextWord, 2500);
}

// Add touch feedback for mobile devices
document.addEventListener('touchstart', () => {}, {passive: true}); 