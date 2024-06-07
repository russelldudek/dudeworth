document.addEventListener("DOMContentLoaded", () => {
    const heroKeywords = [
        { text: "Business", color: "#FF073A" },
        { text: "Logistics", color: "#FF7F00" },
        { text: "Education", color: "#FFFF00" },
        { text: "Healthcare", color: "#BFFF00" },
        { text: "Finance", color: "#00FF00" },
        { text: "Retail", color: "#00FFFF" },
        { text: "Manufacturing", color: "#7FFFD4" },
        { text: "Energy", color: "#007FFF" },
        { text: "Transportation", color: "#8A2BE2" },
        { text: "Agriculture", color: "#FF1493" },
        { text: "Safety", color: "#FF00FF" }
    ];

    const roadmapThemes = [
        { text: "Innovation", color: "#FF7F00" },
        { text: "Growth", color: "#00FFFF" },
        { text: "Resilience", color: "#FF1493" }
    ];

    let heroIndex = 0;
    let roadmapIndex = 0;

    const dynamicKeyword = document.getElementById("dynamic-keyword");

    setInterval(() => {
        dynamicKeyword.textContent = heroKeywords[heroIndex].text;
        dynamicKeyword.style.color = heroKeywords[heroIndex].color;
        heroIndex = (heroIndex + 1) % heroKeywords.length;
    }, 2000);

    setInterval(() => {
        const dynamicTheme = document.getElementById("dynamic-theme");
        dynamicTheme.textContent = roadmapThemes[roadmapIndex].text;
        dynamicTheme.style.color = roadmapThemes[roadmapIndex].color;
        roadmapIndex = (roadmapIndex + 1) % roadmapThemes.length;
    }, 2000);

    fetch('about.json')
        .then(response => response.json())
        .then(data => {
            const aboutContent = document.getElementById('about-content');
            aboutContent.innerHTML = `
                <p>${data.introduction}</p>
                ${data.sections.map(section => `
                    <div class="collapsible-card">
                        <h3 class="collapsible" style="color: ${section.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${section.title}</h3>
                        <div class="content">${section.content}</div>
                    </div>
                `).join('')}
                <h3>${data.callToAction}</h3>
                <p>${data.finalNote}</p>
            `;

            document.querySelectorAll('.collapsible').forEach(collapsible => {
                collapsible.addEventListener('click', () => {
                    collapsible.classList.toggle('active');
                    const content = collapsible.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });
        });

    fetch('services.json')
        .then(response => response.json())
        .then(data => {
            const servicesContent = document.getElementById('services-content');
            servicesContent.innerHTML = `
                <p>${data.introduction}</p>
                ${data.tiers.map(tier => `
                    <div class="collapsible-card">
                        <h3 class="collapsible" style="color: ${tier.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${tier.title}</h3>
                        <div class="content">
                            <p>${tier.description}</p>
                            <ul>${tier.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
                        </div>
                    </div>
                `).join('')}
                <h3>${data.callToAction}</h3>
                <p>${data.finalNote}</p>
            `;

            document.querySelectorAll('.collapsible').forEach(collapsible => {
                collapsible.addEventListener('click', () => {
                    collapsible.classList.toggle('active');
                    const content = collapsible.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });
        });

    fetch('roadmap.json')
        .then(response => response.json())
        .then(data => {
            const roadmapContent = document.getElementById('roadmap-content');
            roadmapContent.innerHTML = `
                ${data.steps.map(step => `
                    <div class="roadmap-step">
                        <h3 class="collapsible" style="color: ${step.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${step.title}</h3>
                        <div class="content">${step.content}</div>
                        <div class="arrow">↓</div>
                    </div>
                `).join('')}
            `;

            document.querySelectorAll('.collapsible').forEach(collapsible => {
                collapsible.addEventListener('click', () => {
                    collapsible.classList.toggle('active');
                    const content = collapsible.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });
        });

    fetch('faq.json')
        .then(response => response.json())
        .then(data => {
            const faqContent = document.getElementById('faq-content');
            faqContent.innerHTML = data.map(item => `
                <div class="collapsible-card">
                    <h3 class="collapsible" style="color: ${item.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${item.question}</h3>
                    <div class="content">${item.answer}</div>
                </div>
            `).join('');

            document.querySelectorAll('.collapsible').forEach(collapsible => {
                collapsible.addEventListener('click', () => {
                    collapsible.classList.toggle('active');
                    const content = collapsible.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });
        });

    const toggleFaq = document.getElementById('toggle-faq');
    toggleFaq.addEventListener('click', () => {
        const faqContent = document.getElementById('faq-content');
        const contents = faqContent.querySelectorAll('.content');
        const isHidden = toggleFaq.textContent === 'Show All';
        contents.forEach(content => {
            content.style.display = isHidden ? 'block' : 'none';
        });
        toggleFaq.textContent = isHidden ? 'Hide All' : 'Show All';
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const submitButton = contactForm.querySelector("button[type='submit']");
        submitButton.textContent = "Thank You";
    });

    // Smooth scrolling for links
    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offset = 30; // Offset for sticky header
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});

function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('show');
}

