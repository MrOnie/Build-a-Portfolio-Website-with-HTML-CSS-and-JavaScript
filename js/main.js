document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Collapsible sections (accordion)
const collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach(collapsible => {
    const trigger = collapsible.querySelector('.collapsible-trigger');

    trigger.addEventListener('click', () => {
        // Close all other collapsibles
        collapsibles.forEach(otherCollapsible => {
            if (otherCollapsible !== collapsible) {
                otherCollapsible.classList.remove('active');
            }
        });

        // Toggle the clicked collapsible
        collapsible.classList.toggle('active');
    });
});

// Scroll animations
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 150) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
