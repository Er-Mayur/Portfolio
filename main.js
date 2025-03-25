// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Header scroll effect
    const header = document.getElementById('header');
    const scrollThreshold = 10;
    
    function handleScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    // Mobile menu functionality
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('menu-open');
      mobileMenu.classList.toggle('open');
    });
    
    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuBtn.classList.remove('menu-open');
        mobileMenu.classList.remove('open');
      });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      // This is a placeholder for form submission
      console.log('Form submitted:', formData);
      alert('Thanks for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
    
  });
  