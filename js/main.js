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

const generatePdf = () => {
    const name = document.querySelector('header .container h1').textContent;
    const title = document.querySelector('header .container p').textContent;
    const email = document.querySelector('a[href^="mailto:"]').href.split(':')[1];
    const orcid = document.querySelector('a[href*="orcid.org"]').href;
    const github = document.querySelector('a[href*="github.com"]').href;
    const linkedin = document.querySelector('a[href*="linkedin.com"]').href;
    const about = Array.from(document.querySelectorAll('#about .container p')).map(p => p.textContent).join('<br><br>');

    const experiences = [];
    document.querySelectorAll('#experience .experience-item').forEach(item => {
        const title = item.querySelector('h3').textContent;
        const company = item.querySelector('p em') ? item.querySelector('p em').textContent : '';
        const date = item.querySelector('.date').textContent;
        const description = [];
        item.querySelectorAll('.collapsible-content ul li').forEach(li => {
            description.push(li.textContent);
        });
        experiences.push({ title, company, date, description });
    });

    const teaching = [];
    document.querySelectorAll('#teaching .experience-item').forEach(item => {
        const title = item.querySelector('h3').textContent;
        const institution = item.querySelector('p em').textContent;
        const date = item.querySelector('.date').textContent;
        const description = [];
        item.querySelectorAll('.collapsible-content ul li').forEach(li => {
            description.push(li.textContent);
        });
        teaching.push({ title, institution, date, description });
    });

    const research = [];
    document.querySelectorAll('#research .experience-item').forEach(item => {
        const title = item.querySelector('h3').textContent;
        const institution = item.querySelector('p em').textContent;
        const date = item.querySelector('.date').textContent;
        const description = [];
        item.querySelectorAll('.collapsible-content ul li').forEach(li => {
            description.push(li.textContent);
        });
        research.push({ title, institution, date, description });
    });

    const projects = [];
    document.querySelectorAll('#projects .project-item').forEach(item => {
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        projects.push({ title, description });
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

    const cvTemplate = `
        <div style="font-family: 'Times New Roman', Times, serif; color: #333; font-size: 12px; background: #fff;">
            <div style="width: 210mm; min-height: 297mm; padding: 20mm; box-sizing: border-box;">
                <h1 style="text-align: center; font-size: 24px; margin-bottom: 10px;">${name}</h1>
                <p style="text-align: center; font-size: 14px; margin-bottom: 5px;">${title}</p>
                <div style="text-align: center; font-size: 12px; margin-bottom: 20px;">
                    <a href="mailto:${email}" style="text-decoration: none; color: #333;">${email}</a> |
                    <a href="${orcid}" style="text-decoration: none; color: #333;">ORCID</a> |
                    <a href="${github}" style="text-decoration: none; color: #333;">GitHub</a> |
                    <a href="${linkedin}" style="text-decoration: none; color: #333;">LinkedIn</a>
                </div>

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">About Me</h2>
                <p>${about}</p>

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Professional Experience</h2>
                ${experiences.map(exp => `
                    <div style="margin-bottom: 15px; page-break-inside: avoid;">
                        <h3 style="font-size: 14px; margin-bottom: 5px;">${exp.title} ${exp.company ? `at ${exp.company}` : ''}</h3>
                        <p style="font-style: italic; margin-bottom: 5px;">${exp.date}</p>
                        <ul style="list-style-type: disc; margin-left: 20px;">
                            ${exp.description.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Teaching and Laboratory</h2>
                ${teaching.map(item => `
                    <div style="margin-bottom: 15px; page-break-inside: avoid;">
                        <h3 style="font-size: 14px; margin-bottom: 5px;">${item.title}</h3>
                        <p style="font-style: italic; margin-bottom: 5px;">${item.institution}</p>
                        <p style="font-style: italic; margin-bottom: 5px;">${item.date}</p>
                        <ul style="list-style-type: disc; margin-left: 20px;">
                            ${item.description.map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Research Experience</h2>
                ${research.map(item => `
                    <div style="margin-bottom: 15px; page-break-inside: avoid;">
                        <h3 style="font-size: 14px; margin-bottom: 5px;">${item.title}</h3>
                        <p style="font-style: italic; margin-bottom: 5px;">${item.institution}</p>
                        <p style="font-style: italic; margin-bottom: 5px;">${item.date}</p>
                        <ul style="list-style-type: disc; margin-left: 20px;">
                            ${item.description.map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Projects</h2>
                ${projects.map(proj => `
                    <div style="margin-bottom: 15px; page-break-inside: avoid;">
                        <h3 style="font-size: 14px; margin-bottom: 5px;">${proj.title}</h3>
                        <p>${proj.description}</p>
                    </div>
                `).join('')}

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Skills</h2>
                <div style="display: flex; flex-wrap: wrap;">
                    ${skills.map(skill => `<div style="background-color: #f2f2f2; padding: 5px 10px; border-radius: 5px; margin-right: 10px; margin-bottom: 10px;">${skill}</div>`).join('')}
                </div>

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Education</h2>
                ${education.map(edu => `
                    <div style="margin-bottom: 15px; page-break-inside: avoid;">
                        <h3 style="font-size: 14px; margin-bottom: 5px;">${edu.degree}</h3>
                        <p>${edu.institution}</p>
                    </div>
                `).join('')}

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Publications</h2>
                <ul style="list-style-type: disc; margin-left: 20px;">
                    ${publications.map(pub => `<li style="margin-bottom: 10px;">${pub}</li>`).join('')}
                </ul>

                <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 10px;">Courses & Certifications</h2>
                ${courses.map(course => `
                    <div style="margin-bottom: 15px; page-break-inside: avoid;">
                        <h3 style="font-size: 14px; margin-bottom: 5px;">${course.title}</h3>
                        ${course.details.length > 0 ? `
                            <ul style="list-style-type: disc; margin-left: 20px;">
                                ${course.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.position = 'absolute';
    hiddenContainer.style.left = '-9999px';
    hiddenContainer.innerHTML = cvTemplate;
    document.body.appendChild(hiddenContainer);

    const opt = {
        margin: 0,
        filename: 'Ronie_Martinez_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(hiddenContainer.firstElementChild).set(opt).save().then(() => {
        document.body.removeChild(hiddenContainer);
    });
};

document.getElementById('download-cv-btn').addEventListener('click', generatePdf);