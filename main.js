// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initSkillBars();
    initNavigation();
    
    console.log('Portfolio loaded successfully!');
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills-bars-section')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-section, .skills-chart-section, .facts-section, .skills-bars-section, .work-section, .projects-section, .story-section, .contact-section');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const skillFill = bar.querySelector('.skill-fill');
        
        // Store the level for later animation
        skillFill.setAttribute('data-width', level);
    });
}

function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach((fill, index) => {
        const width = fill.getAttribute('data-width');
        
        setTimeout(() => {
            fill.style.width = width + '%';
        }, index * 200);
    });
}

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        const message = formData.get('message') || this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('¡Mensaje enviado exitosamente! Te contactaré pronto.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = encodeURIComponent(document.getElementById('nombre').value);
  const correo = encodeURIComponent(document.getElementById('correo').value);
  const mensaje = encodeURIComponent(document.getElementById('mensaje').value);

  const subject = `Contacto profesional de ${nombre}`;
  const body = `Nombre o empresa: ${nombre}%0ACorreo de contacto: ${correo}%0A%0AMensaje:%0A${mensaje}`;

  window.location.href = `mailto:jesusdanielchable@gmail.com?subject=${subject}&body=${body}`;
});



// Smooth reveal animations for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.about-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax
initParallax();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    setTimeout(() => {
        const aboutElements = document.querySelectorAll('.about-section .fade-in');
        aboutElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 300);
});

// Mobile menu functionality (if needed)
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        showNotification('¡Información copiada al portapapeles!');
    }).catch(err => {
        console.error('Error copying to clipboard:', err);
    });
}

// Simple notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add click handlers for contact items
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const text = item.querySelector('span').textContent;
        
        item.addEventListener('click', () => {
            copyToClipboard(text);
        });
        
        item.style.cursor = 'pointer';
        item.title = 'Click para copiar';
    });
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            revealOnScroll();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

// Console message
console.log(`
🚀 Portfolio de Jesús Daniel Chablé Narváez
📧 jesusdanielchable@gmail.com
`);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// Animación para las skills cards al hacer scroll
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-anim');
    skillCards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, i * 250 + 150);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillCards();
                observer.disconnect();
            }
        });
    }, { threshold: 0.24 });
    const skillsSection = document.querySelector('.skills-chart-section');
    if (skillsSection) observer.observe(skillsSection);
});


// Animación stagger para los logos
function animateSkillLogos() {
  const logos = document.querySelectorAll('.skill-logo');
  logos.forEach((logo, i) => {
    setTimeout(() => {
      logo.classList.add('visible');
    }, i * 150);
  });
}

// IntersectionObserver anima cuando aparece la sección
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillLogos();
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });
  observer.observe(skillsSection);
}
