/* ============================================================
   GITHUB-THEMED PORTFOLIO — SCRIPT.JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTypingAnimation();
    initContributionGraph();
    initProjects();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
});

/* ============ THEME TOGGLE ============ */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    }

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

/* ============ TYPING ANIMATION ============ */
function initTypingAnimation() {
    const el = document.getElementById('heroBio');
    const phrases = [
        'Full-Stack Developer 🚀',
        'Flutter Enthusiast 💙',
        'Open Source Contributor 🌟',
        'Building the future, one commit at a time 💻'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 60;

    function type() {
        const phrase = phrases[phraseIndex];

        if (isDeleting) {
            el.innerHTML = phrase.substring(0, charIndex - 1) + '<span class="cursor"></span>';
            charIndex--;
            speed = 30;
        } else {
            el.innerHTML = phrase.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
            speed = 60;
        }

        if (!isDeleting && charIndex === phrase.length) {
            speed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ============ CONTRIBUTION GRAPH ============ */
function initContributionGraph() {
    const grid = document.getElementById('contributionGrid');
    const monthsRow = document.getElementById('contributionMonths');
    const totalWeeks = 52;
    const now = new Date();

    // Generate month labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - (totalWeeks * 7));

    // Track months for labels
    let lastMonth = -1;
    const monthPositions = [];
    for (let w = 0; w < totalWeeks; w++) {
        const weekStart = new Date(startDate);
        weekStart.setDate(weekStart.getDate() + w * 7);
        const m = weekStart.getMonth();
        if (m !== lastMonth) {
            monthPositions.push({ month: months[m], week: w });
            lastMonth = m;
        }
    }

    // Render month labels
    monthsRow.innerHTML = '';
    monthPositions.forEach((mp, i) => {
        const span = document.createElement('span');
        span.textContent = mp.month;
        const nextWeek = (i + 1 < monthPositions.length) ? monthPositions[i + 1].week : totalWeeks;
        const widthWeeks = nextWeek - mp.week;
        span.style.minWidth = `${widthWeeks * 16}px`;
        monthsRow.appendChild(span);
    });

    // Generate contribution data with a realistic pattern
    let totalContributions = 0;
    const squares = [];

    for (let w = 0; w < totalWeeks; w++) {
        for (let d = 0; d < 7; d++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + w * 7 + d);

            if (date > now) continue;

            // Generate realistic-ish pattern
            const dayOfWeek = date.getDay();
            const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
            const baseChance = isWeekday ? 0.65 : 0.35;

            // Add some "streak" periods
            const weekOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
            const isActiveWeek = (weekOfYear % 4 !== 2); // Less active every 4th-ish week
            const chance = isActiveWeek ? baseChance : baseChance * 0.3;

            let level = 0;
            const rand = Math.random();
            if (rand < chance) {
                const intensity = Math.random();
                if (intensity < 0.4) level = 1;
                else if (intensity < 0.7) level = 2;
                else if (intensity < 0.9) level = 3;
                else level = 4;

                const contributions = level === 1 ? Math.floor(Math.random() * 3) + 1
                    : level === 2 ? Math.floor(Math.random() * 5) + 3
                    : level === 3 ? Math.floor(Math.random() * 8) + 6
                    : Math.floor(Math.random() * 12) + 10;
                totalContributions += contributions;
            }

            const square = document.createElement('div');
            square.className = 'contribution-square';
            square.setAttribute('data-level', level);

            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const contribText = level === 0 ? 'No contributions' : `${level === 1 ? '1-2' : level === 2 ? '3-7' : level === 3 ? '6-13' : '10+'} contributions`;
            square.setAttribute('data-tooltip', `${contribText} on ${dateStr}`);

            grid.appendChild(square);
            squares.push(square);
        }
    }

    // Update total
    document.getElementById('contributionCount').textContent = `${totalContributions.toLocaleString()} contributions`;

    // Animate squares popping in
    squares.forEach((sq, i) => {
        sq.style.opacity = '0';
        sq.style.transform = 'scale(0)';
        setTimeout(() => {
            sq.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            sq.style.opacity = '1';
            sq.style.transform = 'scale(1)';
        }, i * 2);
    });
}

/* ============ PROJECTS (GITHUB API + FALLBACK) ============ */
async function initProjects() {
    const grid = document.getElementById('projectsGrid');

    // Fallback projects (in case the API fails or user has few repos)
    const fallbackProjects = [
        {
            name: 'ride-share-app',
            description: 'A complete ride-sharing application with real-time tracking, built with Flutter and Firebase.',
            language: 'Dart',
            stars: 12,
            forks: 3,
            url: 'https://github.com/Niru-26016'
        },
        {
            name: 'interview-prep-ai',
            description: 'AI-powered interview preparation app with speech recognition and intelligent feedback.',
            language: 'JavaScript',
            stars: 8,
            forks: 2,
            url: 'https://github.com/Niru-26016'
        },
        {
            name: 'expense-tracker',
            description: 'Voice-enabled expense tracking app with AI categorization and group splitting.',
            language: 'Dart',
            stars: 15,
            forks: 5,
            url: 'https://github.com/Niru-26016'
        },
        {
            name: 'crm-dashboard',
            description: 'Modern CRM dashboard with lead management, call tracking, and analytics built with React.',
            language: 'JavaScript',
            stars: 6,
            forks: 1,
            url: 'https://github.com/Niru-26016'
        },
        {
            name: 'bus-tracking-system',
            description: 'Real-time bus tracking system with GPS speed calculation and ETA prediction.',
            language: 'Dart',
            stars: 10,
            forks: 4,
            url: 'https://github.com/Niru-26016'
        },
        {
            name: 'portfolio-website',
            description: 'My personal portfolio website — a GitHub-themed dark-mode experience. You\'re looking at it right now!',
            language: 'HTML',
            stars: 3,
            forks: 0,
            url: 'https://github.com/Niru-26016/Niru-26016.github.io'
        }
    ];

    try {
        const response = await fetch('https://api.github.com/users/Niru-26016/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('API failed');
        const repos = await response.json();

        if (repos.length >= 4) {
            renderProjects(grid, repos.map(repo => ({
                name: repo.name,
                description: repo.description || 'No description provided.',
                language: repo.language || 'Code',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                url: repo.html_url
            })));
        } else {
            renderProjects(grid, fallbackProjects);
        }
    } catch (e) {
        renderProjects(grid, fallbackProjects);
    }
}

function renderProjects(container, projects) {
    container.innerHTML = '';

    projects.forEach((project, index) => {
        const langClass = `lang-${project.language.toLowerCase().replace(/[^a-z]/g, '')}`;

        const card = document.createElement('a');
        card.href = project.url;
        card.target = '_blank';
        card.className = 'repo-card animate-on-scroll';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="repo-card__header">
                <svg class="repo-card__icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
                </svg>
                <span class="repo-card__name">${project.name}</span>
                <span class="repo-card__visibility">Public</span>
            </div>
            <p class="repo-card__description">${project.description}</p>
            <div class="repo-card__footer">
                <span class="repo-card__lang">
                    <span class="repo-card__lang-dot ${langClass}"></span>
                    ${project.language}
                </span>
                <span class="repo-card__stat">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
                    </svg>
                    ${project.stars}
                </span>
                <span class="repo-card__stat">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
                    </svg>
                    ${project.forks}
                </span>
            </div>
        `;

        container.appendChild(card);
    });

    // Trigger scroll animations for new cards
    setTimeout(() => initScrollAnimations(), 200);
}

/* ============ SCROLL ANIMATIONS ============ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Also animate sections
    document.querySelectorAll('.skill-badge, .contact__card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/* ============ MOBILE MENU ============ */
function initMobileMenu() {
    const hamburger = document.getElementById('navHamburger');
    const menu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (menu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking a link
    menu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

/* ============ SMOOTH SCROLL ============ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ============ HEADER SCROLL EFFECT ============ */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}
