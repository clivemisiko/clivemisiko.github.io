// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dark mode toggle
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  
  // Check for saved user preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
  }
  
  modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      modeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      modeToggle.textContent = '🌙';
    }
  });

  // Typing animation for hero subtitle
  const typingText = document.querySelector('.typing-text');
  const cursor = document.querySelector('.cursor');
  const professions = ['Web Developer', 'Student', 'Cybersecurity Analyst'];
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
      typingText.textContent = currentProfession.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentProfession.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentProfession.length) {
      isEnd = true;
      setTimeout(() => {
        isDeleting = true;
      }, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      professionIndex = (professionIndex + 1) % professions.length;
      isEnd = false;
    }

    const speed = isDeleting ? 100 : isEnd ? 2000 : 150;
    setTimeout(type, speed);
  }

  // Start typing animation after a short delay
  setTimeout(type, 1000);

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show an alert
      console.log({ name, email, subject, message });
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  document.querySelectorAll('.project-card, .skill-category, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});