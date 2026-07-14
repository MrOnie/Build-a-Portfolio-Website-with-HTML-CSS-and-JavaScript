document.getElementById("year").textContent = new Date().getFullYear();

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

const generatePdfMake = () => {
    try {
        const name = document.querySelector('header .container h1').textContent;
        const title = document.querySelector('header .container p').textContent;
        const email = document.querySelector('a[href^="mailto:"]').href.split(':')[1];
        const orcid = document.querySelector('a[href*="orcid.org"]').href;
        const github = document.querySelector('a[href*="github.com"]').href;
        const linkedin = document.querySelector('a[href*="linkedin.com"]').href;
        const about = Array.from(document.querySelectorAll('#about .container p')).map(p => p.textContent).join('\n\n');

    const experiences = [];
    document.querySelectorAll('#experience .experience-item').forEach(item => {
        const expTitle = item.querySelector('h3').textContent;
        const company = item.querySelector('p em') ? item.querySelector('p em').textContent : '';
        const date = item.querySelector('.date').textContent;
        const description = [];
        item.querySelectorAll('.collapsible-content ul li').forEach(li => {
            description.push(li.textContent);
        });
        experiences.push({ title: expTitle, company, date, description });
    });

    const teaching = [];
    document.querySelectorAll('#teaching .experience-item').forEach(item => {
        const expTitle = item.querySelector('h3').textContent;
        const institution = item.querySelector('p em') ? item.querySelector('p em').textContent : '';
        const date = item.querySelector('.date').textContent;
        const description = [];
        item.querySelectorAll('.collapsible-content ul li').forEach(li => {
            description.push(li.textContent);
        });
        teaching.push({ title: expTitle, institution, date, description });
    });

    const research = [];
    document.querySelectorAll('#research .experience-item').forEach(item => {
        const expTitle = item.querySelector('h3').textContent;
        const institution = item.querySelector('p em') ? item.querySelector('p em').textContent : '';
        const date = item.querySelector('.date').textContent;
        const description = [];
        item.querySelectorAll('.collapsible-content ul li').forEach(li => {
            description.push(li.textContent);
        });
        research.push({ title: expTitle, institution, date, description });
    });

    const projects = [];
    document.querySelectorAll('#projects .project-item').forEach(item => {
        const projTitle = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        projects.push({ title: projTitle, description });
    });

    const skills = [];
    document.querySelectorAll('#skills .skill-item').forEach(item => {
        skills.push(item.textContent);
    });

    const education = [];
    document.querySelectorAll('#education .education-item').forEach(item => {
        const degree = item.querySelector('h3').textContent;
        const institution = item.querySelector('p').textContent;
        education.push({ degree, institution });
    });

    const publications = [];
    document.querySelectorAll('#publications .publication-item').forEach(item => {
        publications.push(item.querySelector('p').textContent);
    });

    const courses = [];
    document.querySelectorAll('#courses .course-item').forEach(item => {
        const courseTitle = item.querySelector('h3').textContent;
        const details = [];
        item.querySelectorAll('.collapsible-content ul li').forEach(li => {
            details.push(li.textContent);
        });
        courses.push({ title: courseTitle, details });
    });

    // Formatting helpers for pdfMake
    const formatSectionHeader = (text) => {
        return { text: text.toUpperCase(), style: 'sectionHeader', margin: [0, 15, 0, 5] };
    };

    const formatJobTitle = (jobTitle, date) => {
        return {
            columns: [
                { text: jobTitle, style: 'jobTitle', width: '*' },
                { text: date, style: 'jobDate', width: 'auto', alignment: 'right' }
            ],
            margin: [0, 10, 0, 2]
        };
    };

    const formatInstitution = (inst) => {
        return { text: inst, style: 'institution', margin: [0, 0, 0, 5] };
    };

    const formatList = (items) => {
        return { ul: items, style: 'listStyle', margin: [10, 0, 0, 0] };
    };

    const content = [
        // Header
        { text: name.toUpperCase(), style: 'header' },
        { text: title, style: 'subHeader' },
        {
            text: [
                { text: email, link: 'mailto:' + email, style: 'link' }, ' | ',
                { text: 'ORCID', link: orcid, style: 'link' }, ' | ',
                { text: 'GitHub', link: github, style: 'link' }, ' | ',
                { text: 'LinkedIn', link: linkedin, style: 'link' }
            ],
            style: 'contactInfo'
        },

        // About
        formatSectionHeader('About Me'),
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
        { text: about, style: 'normalText', margin: [0, 5, 0, 0] },

        // Experience
        formatSectionHeader('Professional Experience'),
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] }
    ];

    experiences.forEach(exp => {
        const fullTitle = exp.company ? `${exp.title} | ${exp.company}` : exp.title;
        content.push(formatJobTitle(fullTitle, exp.date));
        if (exp.description.length > 0) content.push(formatList(exp.description));
    });

    // Teaching
    content.push(formatSectionHeader('Teaching and Laboratory'));
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    teaching.forEach(item => {
        content.push(formatJobTitle(item.title, item.date));
        if (item.institution) content.push(formatInstitution(item.institution));
        if (item.description.length > 0) content.push(formatList(item.description));
    });

    // Research
    content.push(formatSectionHeader('Research Experience'));
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    research.forEach(item => {
        content.push(formatJobTitle(item.title, item.date));
        if (item.institution) content.push(formatInstitution(item.institution));
        if (item.description.length > 0) content.push(formatList(item.description));
    });

    // Projects
    content.push(formatSectionHeader('Projects'));
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    const projectItems = projects.map(p => {
        return { text: [{ text: p.title + ': ', bold: true }, p.description], margin: [0, 2, 0, 2] };
    });
    content.push(formatList(projectItems));

    // Skills
    content.push(formatSectionHeader('Skills'));
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    content.push({ text: skills.join(', '), style: 'normalText', margin: [0, 5, 0, 0] });

    // Education
    content.push(formatSectionHeader('Education'));
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    education.forEach(edu => {
        content.push({ text: edu.degree, style: 'jobTitle', margin: [0, 10, 0, 2] });
        content.push({ text: edu.institution, style: 'institution' });
    });

    // Publications
    content.push(formatSectionHeader('Publications (Selected)'));
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    content.push({ ul: publications, style: 'normalText', margin: [10, 5, 0, 0] });

    // Courses
    content.push(formatSectionHeader('Courses & Certifications'));
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    courses.forEach(c => {
        content.push({ text: c.title, style: 'jobTitle', margin: [0, 5, 0, 2] });
        if (c.details.length > 0) content.push(formatList(c.details));
    });

    const docDefinition = {
        content: content,
        defaultStyle: {
            fontSize: 11,
            lineHeight: 1.2
        },
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 5]
            },
            subHeader: {
                fontSize: 12,
                alignment: 'center',
                margin: [0, 0, 0, 2]
            },
            contactInfo: {
                fontSize: 10,
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            sectionHeader: {
                fontSize: 14,
                bold: true
            },
            jobTitle: {
                fontSize: 12,
                bold: true
            },
            jobDate: {
                fontSize: 11
            },
            institution: {
                italics: true,
                fontSize: 11
            },
            listStyle: {
                fontSize: 11,
                margin: [0, 2, 0, 2]
            },
            normalText: {
                fontSize: 11
            },
            link: {
                color: 'black',
                decoration: 'underline'
            }
        },
        pageMargins: [40, 40, 40, 40] // 1 inch approx
    };

    pdfMake.createPdf(docDefinition).download('Ronie_Martinez_CV.pdf');
    } catch (error) {
        console.error("PDF Generation Error: ", error);
        alert("Ocurrió un error generando el PDF: " + error.message);
    }
};

document.getElementById('download-cv-btn').addEventListener('click', generatePdfMake);

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Dark Mode Toggle
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const currentTheme = localStorage.getItem('theme');

// Check local storage
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode' && themeToggleBtn) {
        themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggleBtn.querySelector('i');
        
        let theme = 'light-mode';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', theme);
    });
}

// ScrollSpy with IntersectionObserver
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle 50% of viewport
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});