// Gestion du menu mobile (Hamburger)
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
let navLinksContainer = document.querySelector(".nav-links");

if (menuOpenBtn) {
    menuOpenBtn.addEventListener("click", () => {
        navLinksContainer.style.left = "0";
    });
}

if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", () => {
        navLinksContainer.style.left = "-100%";
    });
}

// Gestion des sous-menus au clic sur la flèche
let allArrows = document.querySelectorAll(".arrow");

allArrows.forEach(arrow => {
    arrow.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche de suivre un lien vide
        let li = e.target.closest("li");
        
        // Ferme les autres menus ouverts
        document.querySelectorAll(".links li").forEach(item => {
            if (item !== li) item.classList.remove("showMenu");
        });

        li.classList.toggle("showMenu");
    });
});
