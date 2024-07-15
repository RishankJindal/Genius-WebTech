// Navigation Script

document.addEventListener('DOMContentLoaded', () => {

    (() => {
        scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })();

    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    const observerOptions = {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
});

