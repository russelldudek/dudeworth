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
                <div class="collapsible-card">
                    <h3 class="collapsible" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${data.missionHeading}</h3>
                    <div class="content">
                        <p>${data.missionDescription}</p>
                    </div>
                </div>
                <div class="collapsible-card">
                    <h3 class="collapsible" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${data.visionHeading}</h3>
                    <div class="content">
                        <p>${data.visionDescription}</p>
                    </div>
                </div>
                <div class="collapsible-card">
                    <h3 class="collapsible" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${data.callToActionHeading}</h3>
                    <div class="content">
                        <p>${data.callToActionDescription}</p>
                    </div>
                </div>
            `;

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
        });

    // Fetch and load Services section
    fetch('services.json')
        .then(response => response.json())
        .then(data => {
            const servicesSection = document.getElementById("services");
            servicesSection.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
            `;

            data.tiers.forEach((tier, index) => {
                const collapsibleCard = document.createElement('div');
                collapsibleCard.classList.add('collapsible-card');
                collapsibleCard.innerHTML = `
                    <h3 class="collapsible" style="color: ${tier.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${tier.title}</h3>
                    <div class="content">
                        <p>${tier.content}</p>
                        <ul>${tier.items.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                `;
                servicesSection.appendChild(collapsibleCard);
            });

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
        });

    // Fetch and load Roadmap section
    fetch('roadmap.json')
        .then(response => response.json())
        .then(data => {
            const roadmapSection = document.getElementById("introduction");
            roadmapSection.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
            `;

            data.steps.forEach((step, index) => {
                const collapsibleCard = document.createElement('div');
                collapsibleCard.classList.add('collapsible-card');
                collapsibleCard.innerHTML = `
                    <h3 class="collapsible" style="color: ${step.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${index + 1}. ${step.title}</h3>
                    <div class="content">
                        <p>${step.content}</p>
                    </div>
                `;
                roadmapSection.appendChild(collapsibleCard);
            });

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
        });

    // Fetch and load FAQ section
    fetch('faq.json')
        .then(response => response.json())
        .then(data => {
            const faqSection = document.getElementById("faq");
            faqSection.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <button id="collapse-faq" class="cta-button">Collapse All</button>
            `;

            data.questions.forEach((question, index) => {
                const collapsibleCard = document.createElement('div');
                collapsibleCard.classList.add('collapsible-card');
                collapsibleCard.innerHTML = `
                    <h3 class="collapsible" style="color: ${question.color}; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${index + 1}. ${question.title}</h3>
                    <div class="content">
                        <p>${question.content}</p>
                    </div>
                `;
                faqSection.appendChild(collapsibleCard);
            });

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

            document.getElementById("collapse-faq").addEventListener("click", () => {
                collapsibles.forEach(collapsible => {
                    const content = collapsible.nextElementSibling;
                    if (content.style.display === "block") {
                        content.style.display = "none";
                    }
                });
            });
        });
});

function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('show');
}

