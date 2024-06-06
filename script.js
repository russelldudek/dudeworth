document.addEventListener("DOMContentLoaded", () => {
    const heroKeywords = [
        { text: "Business", color: "#FF073A" }, // Neon Red
        { text: "Logistics", color: "#FF7F00" }, // Neon Orange
        { text: "Education", color: "#FFFF00" }, // Neon Yellow
        { text: "Healthcare", color: "#BFFF00" }, // Neon Lime
        { text: "Finance", color: "#00FF00" }, // Neon Green
        { text: "Retail", color: "#00FFFF" }, // Neon Cyan
        { text: "Manufacturing", color: "#7FFFD4" }, // Neon Aqua
        { text: "Energy", color: "#007FFF" }, // Neon Blue
        { text: "Transportation", color: "#8A2BE2" }, // Neon Violet
        { text: "Agriculture", color: "#FF1493" }, // Neon Pink
        { text: "Safety", color: "#FF00FF" } // Neon Magenta
    ];

    const roadmapThemes = [
        { text: "Innovation", color: "#FF7F00" }, // Neon Orange
        { text: "Growth", color: "#00FFFF" }, // Neon Cyan
        { text: "Resilience", color: "#FF1493" } // Neon Pink
    ];

    let heroIndex = 0;
    let roadmapIndex = 0;
    let serviceThemeIndex = 0;
    const dynamicKeyword = document.getElementById("dynamic-keyword");
    const dynamicTheme = document.getElementById("dynamic-theme");
    const dynamicServiceTheme = document.getElementById("dynamic-service-theme");
    const dynamicFaqTheme = document.getElementById("dynamic-faq-theme");

    setInterval(() => {
        dynamicKeyword.textContent = heroKeywords[heroIndex].text;
        dynamicKeyword.style.color = heroKeywords[heroIndex].color;
        heroIndex = (heroIndex + 1) % heroKeywords.length;
    }, 2000); // Change every 2 seconds

    setInterval(() => {
        dynamicTheme.textContent = roadmapThemes[roadmapIndex].text;
        dynamicTheme.style.color = roadmapThemes[roadmapIndex].color;
        roadmapIndex = (roadmapIndex + 1) % roadmapThemes.length;
    }, 2000); // Change every 2 seconds

    setInterval(() => {
        dynamicServiceTheme.textContent = roadmapThemes[serviceThemeIndex].text;
        dynamicServiceTheme.style.color = roadmapThemes[serviceThemeIndex].color;
        serviceThemeIndex = (serviceThemeIndex + 1) % roadmapThemes.length;
    }, 2000); // Change every 2 seconds

    setInterval(() => {
        dynamicFaqTheme.textContent = roadmapThemes[roadmapIndex].text;
        dynamicFaqTheme.style.color = roadmapThemes[roadmapIndex].color;
        roadmapIndex = (roadmapIndex + 1) % roadmapThemes.length;
    }, 2000); // Change every 2 seconds

    const collapsibles = document.querySelectorAll(".collapsible");
    const contents = document.querySelectorAll(".content");
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

    // Smooth scrolling for links
    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offset = 120; // Offset for sticky header

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

    // FAQ toggle functionality
    const toggleFaqButton = document.getElementById("toggle-faq");
    const faqCollapsibles = document.querySelectorAll("#faq .collapsible-card");

    // Initially hide all FAQ cards
    faqCollapsibles.forEach(card => {
        card.style.display = "none";
    });

    toggleFaqButton.addEventListener("click", function () {
        const isAnyVisible = Array.from(faqCollapsibles).some(card => card.style.display === "block");
        faqCollapsibles.forEach(card => {
            card.style.display = isAnyVisible ? "none" : "block";
        });
        this.textContent = isAnyVisible ? "Expand All" : "Collapse All";
    });
});

function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('show');
}

