// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(element);
    }
}

// Initialize floating elements
createFloatingElements();




// Intersection Observer for card animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.methodology-card').forEach(card => {
    observer.observe(card);
});

// Toggle card expansion
function toggleCard(button) {
    const card = button.closest('.methodology-card');
    const preview = card.querySelector('.card-preview');
    const content = card.querySelector('.card-content');
    const isExpanded = content.classList.contains('expanded');
    
    // Close all other cards
    document.querySelectorAll('.card-content.expanded').forEach(otherContent => {
        if (otherContent !== content) {

            otherContent.classList.remove('expanded');
            otherContent.closest('.methodology-card').querySelector('.expand-btn').classList.remove('expanded');
        }
    });
    
    // Toggle current card
    preview.classList.toggle('hidden');
    content.classList.toggle('expanded');
    button.classList.toggle('expanded');
    
    // Smooth scroll to card if expanding
    if (!isExpanded) {
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

const behindSection = document.getElementById('behind');
const mainHeading = behindSection.querySelector('.main-heading');
const paragraph = behindSection.querySelector('quote-box');

const quoteObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const quoteObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // Animate paragraph after a delay
            setTimeout(() => {
                paragraph.classList.add('visible');
            }, 500);

            quoteObserver.unobserve(entry.target);
        }
    });
}, quoteObserverOptions);

quoteObserver.observe(behindSection);