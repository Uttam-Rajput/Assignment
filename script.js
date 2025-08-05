const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
class RecommendationsCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.cards = document.querySelectorAll('.recommendation-card');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.cardWidth = 320; 
        this.visibleCards = this.getVisibleCards();
        
        this.init();
    }
    
    getVisibleCards() {
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        return Math.floor(containerWidth / this.cardWidth);
    }
    
    init() {
        this.updateActiveStates();
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });      
        this.startAutoSlide();        
        window.addEventListener('resize', () => {
            this.visibleCards = this.getVisibleCards();
            this.updateCarousel();
        });        
        this.track.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });        
        this.track.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
        this.updateActiveStates();
    }
    
    updateCarousel() {
        const offset = -this.currentSlide * this.cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;
    }
    
    updateActiveStates() {
        // Update cards
        this.cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentSlide) {
                card.classList.add('active');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentSlide) {
                dot.classList.add('active');
            }
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.cards.length;
        this.updateCarousel();
        this.updateActiveStates();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new RecommendationsCarousel();
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelector('input[placeholder="Subject"]').value;
    const message = this.querySelector('textarea').value;
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});
document.querySelector('.hire-btn').addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = 'CONNECTING...';
    this.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your interest! I will contact you soon.');
        this.textContent = originalText;
        this.disabled = false;
    }, 1500);
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .education-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        console.log('Project card clicked:', this.querySelector('h3').textContent);
    });
});
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
        }, index * 100);
    });
}
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}