document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("primary-nav");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = nav ? nav.querySelectorAll("a") : [];

    if (nav && navToggle) {
        navToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) {
            return;
        }
        const target = href.split("#")[0].split("?")[0];
        link.classList.toggle("active", target === currentPage);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }
            const section = document.querySelector(targetId);
            if (!section) {
                return;
            }
            event.preventDefault();
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const revealTargets = document.querySelectorAll(
        ".hero-card, .card, .story-card, .feature-card, .award-card, .team-card, .menu-card, .contact-card, .reservation-card, .map-card, .info-card, .reservation-form"
    );

    if ("IntersectionObserver" in window && revealTargets.length) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.16 }
        );

        revealTargets.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }

    const filterTools = document.querySelector(".menu-tools");
    const filterButtons = filterTools ? filterTools.querySelectorAll("[data-filter]") : [];
    const menuCards = document.querySelectorAll(".menu-card[data-category]");

    if (filterTools && filterButtons.length && menuCards.length) {
        const setActiveFilter = (filter) => {
            filterButtons.forEach((button) => {
                button.classList.toggle("active", button.getAttribute("data-filter") === filter);
            });
        };

        const applyFilter = (filter) => {
            menuCards.forEach((card) => {
                const matches = filter === "all" || card.getAttribute("data-category") === filter;
                card.classList.toggle("is-hidden", !matches);
            });
        };

        filterTools.addEventListener("click", (event) => {
            const button = event.target.closest("[data-filter]");
            if (!button || !filterTools.contains(button)) {
                return;
            }

            const filter = button.getAttribute("data-filter") || "all";
            setActiveFilter(filter);
            applyFilter(filter);
        });
    }

    const reservationForm = document.getElementById("reservation-form");
    const reservationStatus = document.getElementById("reservation-status");

    if (reservationForm && reservationStatus) {
        reservationForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("reservation-name");
            const phone = document.getElementById("reservation-phone");
            const date = document.getElementById("reservation-date");
            const time = document.getElementById("reservation-time");
            const guests = document.getElementById("reservation-guests");

            if (!name || !phone || !date || !time || !guests) {
                return;
            }

            const nameValue = name.value.trim();
            const phoneValue = phone.value.trim();
            const dateValue = date.value.trim();
            const timeValue = time.value.trim();
            const guestsValue = guests.value.trim();

            if (!nameValue || !phoneValue || !dateValue || !timeValue || !guestsValue) {
                reservationStatus.textContent = "Please complete the required reservation details.";
                return;
            }

            reservationStatus.textContent = "Reservation request saved. Please call us if you need a same-day confirmation.";
            reservationForm.reset();
        });
    }
});
