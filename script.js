document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    setupToggleButtons();
    setupSmoothScroll();
});

function loadContent() {
    fetch('about.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('about-content').innerHTML = data.introduction + data.sections.map(section => `
                <div class="collapsible-card">
                    <h3 class="collapsible" style="color: ${section.color};">${section.title}</h3>
                    <div class="content">${section.content}</div>
                </div>
            `).join('');
        });

    fetch('services.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('services-content').innerHTML = data.introduction + data.tiers.map(tier => `
                <div class="collapsible-card">
                    <h3 class="collapsible" style="color: ${tier.color};">${tier.title}</h3>
                    <div class="content">
                        <p>${tier.description}</p>
                        <ul>${tier.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
                    </div>
                </div>
            `).join('');
        });

    fetch('roadmap.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('roadmap-content').innerHTML = data.introduction + data.steps.map(step => `
                <div class="roadmap-step">
                    <h3 class="collapsible" style="color: ${step.color};">${step.title}</h3>
                    <div class="content">${step.content}</div>
                </div>
            `).join('');
        });

    fetch('faq.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('faq-content').innerHTML = data.map(faq => `
                <div class="collapsible-card">
                    <h3 class="collapsible" style="color: ${faq.color};">${faq.question}</h3>
                    <div class="content">${faq.answer}</div>
                </div>
            `).join('');
        });
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

    document.querySelectorAll('.collapsible').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            item.nextElementSibling.classList.toggle('hidden');
        });
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
