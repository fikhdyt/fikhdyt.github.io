document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");
    const backTop = document.getElementById("backTop");

    // Mobile menu
    menuButton?.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.innerHTML = open
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    menu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Sticky header + back to top
    const onScroll = () => {
        header?.classList.toggle("scrolled", window.scrollY > 10);
        backTop?.classList.toggle("visible", window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {passive:true});

    backTop?.addEventListener("click", () => {
        window.scrollTo({top:0, behavior:"smooth"});
    });

    // Animasi Reveal Dasar
    const items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, {threshold:0.12});
        items.forEach(item => observer.observe(item));
    } else {
        items.forEach(item => item.classList.add("show"));
    }

    // Animasi Muncul Berurutan (Stagger)
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const staggerElements = document.querySelectorAll(".js-stagger");
    const handleStagger = () => {
        let delay = 0;
        staggerElements.forEach((el) => {
            if (elementInView(el, 1.1) && !el.classList.contains("show")) {
                setTimeout(() => { el.classList.add("show"); }, delay);
                delay += 150; 
            }
        });
    };
    
    // Trigger animations immediately and on scroll
    setTimeout(handleStagger, 100);
    window.addEventListener("scroll", handleStagger);

    // Button press feedback
    document.querySelectorAll(".btn, .footer-contact-button").forEach(el => {
        el.addEventListener("pointerdown", () => el.style.transform = "translateY(1px) scale(.985)");
        el.addEventListener("pointerup", () => el.style.transform = "");
        el.addEventListener("pointerleave", () => el.style.transform = "");
    });
});