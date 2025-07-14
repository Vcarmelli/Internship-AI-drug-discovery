
// Intersection Observer for card animations
const observerOptions = {
    threshold: 0.35,
    rootMargin: '0px 0px -50px 0px'
};

// Intersection Observer for methodology cards
const methodCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, observerOptions);
document.querySelectorAll('.methodology-card').forEach(card => {
    methodCardObserver.observe(card);
});

// Intersection Observer for objective cards
const objCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, observerOptions);
document.querySelectorAll('.objective-card').forEach(card => {
    objCardObserver.observe(card);
});

// Intersection Observer for quote box
const quoteBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, observerOptions);

const quoteBox = document.querySelector('.quote-box');
quoteBoxObserver.observe(quoteBox);




// Toggle card expansion
function toggleCard(button) {
    const card = button.closest('.methodology-card');
    const preview = card.querySelector('.card-preview');
    const content = card.querySelector('.card-content');
    const wasExpanded = content.classList.contains('expanded');
    
    // Close all other cards
    document.querySelectorAll('.card-content.expanded').forEach(otherContent => {
        if (otherContent !== content) {
            otherContent.classList.remove('expanded');
            otherContent.closest('.methodology-card').querySelector('.card-preview').classList.remove('hidden');
            otherContent.closest('.methodology-card').querySelector('.expand-btn').classList.remove('expanded');
        }
    });
    
    // Set new state
    preview.classList[wasExpanded ? 'remove' : 'add']('hidden');
    content.classList[wasExpanded ? 'remove' : 'add']('expanded');
    button.classList[wasExpanded ? 'remove' : 'add']('expanded');
    
    // Smooth scroll if expanding
    if (!wasExpanded) {
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
}