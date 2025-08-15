document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------------------
    // SECTION 1: DATA FETCHING AND CONTENT POPULATION
    // -----------------------------------------------------------------------------

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}. Make sure data.json is in the same folder as your index.html.`);
            }
            return response.json();
        })
        .then(data => {
            populatePersonalInfo(data.personalInfo);
            populateAboutFocusGrid();
            populateSkills(data.skills);
            populateExperienceAndEducation(data.experience, data.education);
            populateProjects(data.projects);
            populateContactInfo(data.personalInfo, data.socialLinks);
            populateSocialLinks(data.socialLinks);
            initializeUI();
        })
        .catch(error => {
            console.error("Error loading portfolio data:", error);
            const mainContent = document.querySelector('main');
            if(mainContent) {
                mainContent.innerHTML = `<div class="container" style="text-align: center; padding: 10rem 0;"><h2 class="heading-lg">Oops! Content Error</h2><p class="large-text">Could not load portfolio content from data.json. Please check the browser console for more details.</p></div>`;
            }
        });

    // --- Population Functions ---

    function populatePersonalInfo(info) {
        document.getElementById('hero-name').textContent = info.name;
        document.getElementById('download-resume').href = info.resume;
        document.getElementById('profile-image').src = info.profileImage;
        const firstSentence = info.about.split('.')[0] + '.';
        document.getElementById('hero-about-short').textContent = firstSentence;
        const aboutParagraphs = info.about.split('\n').filter(p => p.trim() !== '').map(p => `<p>${p}</p>`).join('');
        document.getElementById('about-me-content').innerHTML = aboutParagraphs;

        const typewriterElement = document.getElementById('typewriter');
        const titles = info.title.split('|').map(t => t.trim());
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentTitle = titles[titleIndex];
            let displayText = '';
            if (isDeleting) {
                displayText = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }
            typewriterElement.textContent = displayText;
            let typeSpeed = isDeleting ? 100 : 200;
            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        if (titles.length > 0) {
            type();
        }
    }

    function populateAboutFocusGrid() {
        const focusAreas = [
            { icon: 'server', title: 'Python Full-Stack', description: 'Building scalable web applications and REST APIs with Django and React.' },
            { icon: 'smartphone', title: 'Android Development', description: 'Creating user-focused native Android apps with Java and Firebase.' },
            { icon: 'layout-template', title: 'Modern Web Design', description: 'Crafting responsive and intuitive user interfaces with modern frontend principles.' },
            { icon: 'trending-up', title: 'Scalable Solutions', description: 'Engineering robust systems designed for growth and high performance.' }
        ];
        const gridContainer = document.getElementById('about-focus-grid');
        gridContainer.innerHTML = '';
        focusAreas.forEach(area => {
            const card = document.createElement('div');
            card.className = 'focus-card';
            card.innerHTML = `
                <div class="focus-icon"><i data-lucide="${area.icon}"></i></div>
                <h4>${area.title}</h4>
                <p>${area.description}</p>
            `;
            gridContainer.appendChild(card);
        });
    }

    function populateSkills(skills) {
        const skillIconMap = {
            'Python': { name: 'python', variant: 'plain' }, 'Java': { name: 'java', variant: 'plain' }, 'JavaScript': { name: 'javascript', variant: 'plain' }, 'SQL': { name: 'mysql', variant: 'plain-wordmark' }, 'HTML': { name: 'html5', variant: 'plain' }, 'CSS': { name: 'css3', variant: 'plain' }, 'XML': { name: 'html5', variant: 'plain' }, 'PHP': { name: 'php', variant: 'plain' }, 'Django': { name: 'django', variant: 'plain' }, 'React.js': { name: 'react', variant: 'original' }, 'Node.js': { name: 'nodejs', variant: 'plain' }, 'MongoDB': { name: 'mongodb', variant: 'plain' }, 'MySQL': { name: 'mysql', variant: 'plain' }, 'Firebase Realtime DB': { name: 'firebase', variant: 'plain' }, 'Git': { name: 'git', variant: 'plain' }, 'GitHub': { name: 'github', variant: 'original' }, 'Vercel': { name: 'vercel', variant: 'original' }, 'Android Studio': { name: 'androidstudio', variant: 'plain' }, 'WordPress': { name: 'wordpress', variant: 'plain' }, 'Postman': { name: 'postman', variant: 'plain' },
            'REST APIs': null, 'MVC Architecture': null, 'Google Sheets API': null, 'Apps Script': null, 'ClickUp': null, 'Agile': null, 'API Testing': null, 'Unit Testing': null, 'Version Control': null, 'Responsive Design': null
        };
        const skillColors = {
            'python': '#3776AB', 'java': '#007396', 'javascript': '#F7DF1E', 'mysql': '#4479A1', 'html5': '#E34F26', 'css3': '#1572B6', 'php': '#777BB4', 'django': '#092E20', 'nodejs': '#339933', 'mongodb': '#47A248', 'firebase': '#FFCA28', 'git': '#F05032', 'androidstudio': '#3DDC84', 'wordpress': '#21759B', 'postman': '#FF6C37'
        };
        const skillsContainer = document.getElementById('skills-container');
        skillsContainer.innerHTML = '';
        for (const category in skills) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category-grid animate-on-scroll';
            const title = document.createElement('h3');
            title.textContent = category;
            categoryDiv.appendChild(title);
            const skillsList = document.createElement('div');
            skillsList.className = 'skills-list';
            skills[category].forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item-new';
                const iconData = skillIconMap[skill];
                let iconElement;
                if (iconData) {
                    iconElement = document.createElement('i');
                    iconElement.className = `devicon-${iconData.name}-${iconData.variant}`;
                    if (iconData.variant !== 'plain') {
                        iconElement.classList.add('colored');
                    } else {
                        iconElement.style.color = skillColors[iconData.name] || 'var(--primary)';
                    }
                } else {
                    iconElement = document.createElement('span');
                    iconElement.setAttribute('data-lucide', 'check-circle-2');
                    iconElement.style.width = '30px';
                    iconElement.style.height = '1.75rem';
                    iconElement.style.color = 'var(--gray-400)';
                }
                const name = document.createElement('span');
                name.textContent = skill;
                skillItem.appendChild(iconElement);
                skillItem.appendChild(name);
                skillsList.appendChild(skillItem);
            });
            categoryDiv.appendChild(skillsList);
            skillsContainer.appendChild(categoryDiv);
        }
    }

    function populateExperienceAndEducation(experience, education) {
        const experienceColumn = document.getElementById('experience-column');
        const educationColumn = document.getElementById('education-column');
        experienceColumn.innerHTML = '';
        educationColumn.innerHTML = '';

        experience.forEach(item => {
            const card = createJourneyCard(item);
            experienceColumn.appendChild(card);
        });

        education.forEach(item => {
            const card = createJourneyCard(item);
            educationColumn.appendChild(card);
        });
    }

    function createJourneyCard(item) {
        const card = document.createElement('div');
        card.className = 'journey-card';

        let dateHtml;
        if (!item.points && item.year && item.year.includes('•')) {
            const parts = item.year.split('•').map(p => p.trim());
            const year = parts[0];
            const marks = parts[1];
            dateHtml = `
                <div class="journey-date education">
                    <span class="journey-year-span">${year}</span>
                    <span class="journey-marks-span">${marks}</span>
                </div>
            `;
        } else {
            dateHtml = `<div class="journey-date">${item.period || item.year}</div>`;
        }

        const title = item.title || item.degree;
        const location = item.company || item.institution;
        const description = item.points ? `<ul>${item.points.map(p => `<li>${p}</li>`).join('')}</ul>` : '';

        card.innerHTML = `
            ${dateHtml}
            <h4 class="journey-title">${title}</h4>
            <p class="journey-location">${location}</p>
            <div class="journey-description">${description}</div>
        `;
        return card;
    }

    function populateProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card-new animate-on-scroll';

            // Create and append the image container
            if (project.image) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'project-image-container';
                const image = document.createElement('img');
                image.src = project.image;
                image.alt = project.title;
                image.onerror = () => { image.src = 'https://placehold.co/600x400/eeeeee/aaaaaa?text=Image+Not+Found'; };
                imageContainer.appendChild(image);
                card.appendChild(imageContainer);
            }

            const content = document.createElement('div');
            content.className = 'project-content';

            const title = document.createElement('h3');
            title.textContent = project.title;
            content.appendChild(title);

            const description = document.createElement('p');
            description.className = 'project-description';
            description.textContent = project.description;
            content.appendChild(description);

            const techContainer = document.createElement('div');
            techContainer.className = 'project-tech';
            project.tech.forEach(tech => {
                const pill = document.createElement('span');
                pill.className = 'tech-pill';
                pill.textContent = tech;
                techContainer.appendChild(pill);
            });
            content.appendChild(techContainer);

            const links = document.createElement('div');
            links.className = 'project-links-new';
            if (project.link) {
                const link = document.createElement('a');
                link.href = project.link;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.innerHTML = `<i data-lucide="github"></i> GitHub`;
                links.appendChild(link);
            }
            if (project.demo) {
                const demo = document.createElement('a');
                demo.href = project.demo;
                demo.target = '_blank';
                demo.rel = 'noopener noreferrer';
                demo.innerHTML = `<i data-lucide="external-link"></i> Live Demo`;
                links.appendChild(demo);
            }
            if (project.store) {
                const store = document.createElement('a');
                store.href = project.store;
                store.target = '_blank';
                store.rel = 'noopener noreferrer';
                store.innerHTML = `<i data-lucide="play"></i> Play Store`;
                links.appendChild(store);
            }
            content.appendChild(links);

            card.appendChild(content);
            projectsGrid.appendChild(card);
        });
    }

    function populateContactInfo(info, social) {
        document.getElementById('contact-phone').textContent = info.phone;
        document.getElementById('contact-phone').href = `tel:${info.phone.replace(/\s/g, '')}`;
        document.getElementById('contact-email').textContent = info.email;
        document.getElementById('contact-email').href = `mailto:${info.email}`;
        document.getElementById('contact-location').textContent = info.location;
        if (social.github) {
            document.getElementById('github-link').href = social.github;
        }
    }

    function populateSocialLinks(links) {
        const container = document.getElementById('social-icons-container');
        container.innerHTML = '';
        const socialMap = { github: 'github', linkedin: 'linkedin', playstore: 'play' };
        for (const key in socialMap) {
            if (links[key]) {
                const a = document.createElement('a');
                a.href = links[key];
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.setAttribute('aria-label', key);
                a.innerHTML = `<i data-lucide="${socialMap[key]}"></i>`;
                container.appendChild(a);
            }
        }
    }

    // -----------------------------------------------------------------------------
    // SECTION 2: UI INITIALIZATION
    // -----------------------------------------------------------------------------

    function initializeUI() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        const header = document.getElementById('header');
        if (header) {
            const handleScroll = () => {
                header.classList.toggle('scrolled', window.scrollY > 10);
            };
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('menu-open');
                mobileMenu.classList.toggle('open');
            });
        }
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (menuBtn && mobileMenu) {
                    menuBtn.classList.remove('menu-open');
                    mobileMenu.classList.remove('open');
                }
            });
        });
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Form submitted');
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                }, 3000);
                contactForm.reset();
            });
        }
        lucide.createIcons();
        setupScrollAnimations();
    }

    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(element => {
            if (!element.classList.contains('visible')) {
                observer.observe(element);
            }
        });
    }
});
