gsap.fromTo(".loading-page", 
    { 
        opacity: 1 
    }, 
    { 
        opacity: 0, 
        display: "none", 
        duration: 1.5, 
        delay: 3.5 
    });
gsap.fromTo(".logo-name", 
    { 
        y: 50, 
        opacity: 0 
    }, 
    { 
        y: 0, 
        opacity: 1, 
        duration: 2, 
        delay: 0.5 
    });


document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');
    const sections = Array.from(navItems).map(item => 
        document.querySelector(item.getAttribute('href'))
    ).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
        let mostVisible = null;
        let highestRatio = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
                highestRatio = entry.intersectionRatio;
                mostVisible = entry.target;
            }
        });

        if (mostVisible) {
            const activeId = mostVisible.id;
            navItems.forEach(item => {
                item.classList.toggle('active', item.getAttribute('href') === `#${activeId}`);
            });
        }
    }, { 
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(section => observer.observe(section));
});


new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        document.querySelectorAll(".stat-value").forEach(el => {
            let start = 0, end = parseInt(el.getAttribute("data-val")), duration = 5500 / end;
            let counter = setInterval(() => {
                if (++start === end) clearInterval(counter);
                el.textContent = start + (el.getAttribute("data-suffix") || "");
            }, duration);
        });
    }
}, { threshold: 0.35 }).observe(document.querySelector('#about'));