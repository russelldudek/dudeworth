document.addEventListener("DOMContentLoaded", () => {
    const heroKeywords = [
        { text: "Business", color: "#FF073A" },
        { text: "Logistics", color: "#FF7F00" },
        { text: "Education", color: "#FFFF00" },
        { text: "Healthcare", color: "#BFFF00" },
        { text: "Finance", color: "#00FF00" },
        { text: "Retail", color: "#00FFFF" },
        { text: "Manufacturing", color: "#007FFF" },
        { text: "Energy", color: "#8A2BE2" },
        { text: "Transportation", color: "#FF1493" },
        { text: "Agriculture", color: "#FF00FF" },
        { text: "Safety", color: "#FF073A" }
    ];

    const roadmapThemes = [
        { text: "Innovation", color: "#FF7F00" },
        { text: "Growth", color: "#00FFFF" },
        { text: "Resilience", color: "#FF1493" }
    ];

    let heroIndex = 0;
    let roadmapIndex = 0;
    let serviceThemeIndex = 0;
    const dynamicKeyword = document.getElementById("dynamic-keyword");
    const dynamicTheme = document.getElementById("dynamic-theme");
    const dynamicServiceTheme = document.getElementById("dynamic-service-theme");

    setInterval(() => {
        dynamicKeyword.textContent = heroKeywords[heroIndex].text;
        dynamicKeyword.style.color = heroKeywords[heroIndex].color;
        heroIndex = (heroIndex + 1) % heroKeywords.length;
    }, 2000);

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

    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener("click", () => {
            collapsible.classList.toggle("active");
            const content = collapsible.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    const contactToggle = document.getElementById("contact-toggle");
    contactToggle.addEventListener("click", (event) => {
        event.preventDefault();
        const contactSection = document.getElementById("contact-section");
        if (contactSection.style.display === "none" || contactSection.style.display === "") {
            contactSection.style.display = "flex";
            contactToggle.textContent = "Hide Contact Form";
        } else {
            contactSection.style.display = "none";
            contactToggle.textContent = "Contact Us Today";
        }
    });

    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offset = 30;

            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const submitButton = contactForm.querySelector("button[type='submit']");
        submitButton.textContent = "Thank You";
    });

    // Fetch and load About section
    fetch('about.json')
        .then(response => response.json())
        .then(data => {
            const aboutSection = document.getElementById("about");
            aboutSection.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                ${data.collapsibleCards.map(card => `
                    <div class="collapsible-card">
                        <h3 class="collapsible" style="color: ${card.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${card.title}</h3>
                        <div class="content">
                            <p>${card.content}</p>
                        </div>
                    </div>
                `).join('')}
                <h3>${data.callToAction.title}</h3>
                <p>${data.callToAction.content}</p>
            `;
        });

    // Fetch and load FAQ section
    fetch('faq.json')
        .then(response => response.json())
        .then(data => {
            const faqSection = document.getElementById("faq");
            faqSection.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <button id="collapse-faq" class="cta-button">${data.buttonText}</button>
                ${data.questions.map(question => `
                    <div class="collapsible-card">
                        <h3 class="collapsible" style="color: ${question.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${question.title}</h3>
                        <div class="content">
                            <p>${question.answer}</p>
                        </div>
                    </div>
                `).join('')}
            `;

            const faqCollapseButton = document.getElementById("collapse-faq");
            faqCollapseButton.addEventListener("click", () => {
                document.querySelectorAll("#faq .collapsible-card .content").forEach(content => {
                    content.style.display = content.style.display === "block" ? "none" : "block";
                });
            });

            document.querySelectorAll("#faq .collapsible").forEach(collapsible => {
                collapsible.addEventListener("click", () => {
                    collapsible.classList.toggle("active");
                    const content = collapsible.nextElementSibling;
                    if (content.style.display === "block") {
                        content.style.display = "none";
                    } else {
                        content.style.display = "block";
                    }
                });
            });
        });
});

function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('show');
}
