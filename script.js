document.addEventListener('DOMContentLoaded', async () => {
    await loadContent();
    setupToggleButtons();
    setupSmoothScroll();
    setupDynamicSentences();
});

async function loadContent() {
    try {
        const aboutData = await fetchJSON('about.json');
        updateAboutSection(aboutData);

        const servicesData = await fetchJSON('services.json');
        updateServicesSection(servicesData);

        const roadmapData = await fetchJSON('roadmap.json');
        updateRoadmapSection(roadmapData);

        const faqData = await fetchJSON('faq.json');
        updateFaqSection(faqData);

        const heroData = await fetchJSON('hero.json');
        setupDynamicKeywords(heroData); // Call this function correctly here

        const contactData = await fetchJSON('contact.json');
        updateContactSection(contactData);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
}

function updateAboutSection(data) {
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = data.introduction + data.sections.map(section => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${section.color};">${section.title}</h3>
            <div class="content hidden">${section.content}</div>
        </div>
    `).join('') + `
        <div class="call-to-action">
            <h2>${data.callToAction.title}</h2>
            <p>${data.callToAction.body}</p>
        </div>
    `;
}

function updateServicesSection(data) {
    const servicesContent = document.getElementById('services-content');
    servicesContent.innerHTML = data.introduction + data.tiers.map(tier => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${tier.color};">${tier.title}</h3>
            <div class="content hidden">
                <p>${tier.description}</p>
                <ul>${tier.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
            </div>
        </div>
    `).join('');
}

function updateRoadmapSection(data) {
    const roadmapContent = document.getElementById('roadmap-content');
    roadmapContent.innerHTML = data.introduction + data.steps.map(step => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${step.color};">${step.title}</h3>
            <div class="content hidden">${step.content}</div>
        </div>
    `).join('');
}

function updateFaqSection(data) {
    const faqIntro = document.getElementById('faq-intro');
    faqIntro.innerHTML = data.body;

    const faqContent = document.getElementById('faq-content');
    faqContent.innerHTML = data.questions.map(faq => `
        <div class="collapsible-card">
            <h3 class="collapsible" style="color: ${faq.color};">${faq.question}</h3>
            <div class="content hidden">${faq.answer}</div>
        </div>
    `).join('');
}

function updateContactSection(data) {
    const contactTitle = document.getElementById('contact-title');
    const contactBody = document.getElementById('contact-body');
    contactTitle.textContent = data.title;
    contactBody.innerHTML = data.body;
}

function setupToggleButtons() {
    const faqButton = document.getElementById('toggle-faq');
    const contactButton = document.getElementById('toggle-contact');
    const faqContent = document.getElementById('faq-content');
    const contactForm = document.getElementById('contact-form');

    faqButton.addEventListener('click', () => {
        faqContent.classList.toggle('hidden');
    });

    contactButton.addEventListener('click', () => {
        contactForm.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('collapsible')) {
            event.target.classList.toggle('active');
            event.target.nextElementSibling.classList.toggle('hidden');
        }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupDynamicKeywords(heroData) {
    const dynamicKeywords = heroData.keywords;
    const dynamicKeywordElement = document.getElementById('dynamic-keyword');
    let heroIndex = 0;

    setInterval(() => {
        dynamicKeywordElement.textContent = dynamicKeywords[heroIndex].text;
        dynamicKeywordElement.style.color = dynamicKeywords[heroIndex].color;
        heroIndex = (heroIndex + 1) % dynamicKeywords.length;
    }, 2000);
}

function setupDynamicSentences() {
    const roadmapThemes = [
        { text: "Innovation", color: "#FF7F00" },
        { text: "Growth", color: "#00FFFF" },
        { text: "Resilience", color: "#FF1493" }
    ];

    let roadmapIndex = 0;
    let serviceThemeIndex = 0;
    const dynamicTheme = document.getElementById("dynamic-theme");
    const dynamicServiceTheme = document.getElementById("dynamic-service-theme");
    const dynamicFaqTheme = document.getElementById("dynamic-faq-theme");

    setInterval(() => {
        dynamicTheme.textContent = roadmapThemes[roadmapIndex].text;
        dynamicTheme.style.color = roadmapThemes[roadmapIndex].color;
        roadmapIndex = (roadmapIndex + 1) % roadmapThemes.length;
    }, 2000);

    setInterval(() => {
        dynamicServiceTheme.textContent = roadmapThemes[serviceThemeIndex].text;
        dynamicServiceTheme.style.color = roadmapThemes[serviceThemeIndex].color;
        serviceThemeIndex = (serviceThemeIndex + 1) % roadmapThemes.length;
    }, 2000);

    setInterval(() => {
        dynamicFaqTheme.textContent = roadmapThemes[serviceThemeIndex].text;
        dynamicFaqTheme.style.color = roadmapThemes[serviceThemeIndex].color;
        serviceThemeIndex = (serviceThemeIndex + 1) % roadmapThemes.length;
    }, 2000);
}
