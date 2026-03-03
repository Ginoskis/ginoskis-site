/* ==========================================================================
   GESTION DES MENUS DÉROULANTS
   ========================================================================== */

let allArrows = document.querySelectorAll(".arrow");

allArrows.forEach(arrow => {
    arrow.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Empêche le clic de se propager au document
        
        let li = e.target.closest("li");
        
        // Ferme les autres menus
        document.querySelectorAll(".links li").forEach(item => {
            if (item !== li) item.classList.remove("showMenu");
        });

        li.classList.toggle("showMenu");
    });
});

/* FERMETURE AU CLIC À L'EXTÉRIEUR */
document.addEventListener("click", (e) => {
    // Si le clic n'est pas à l'intérieur de la navigation
    if (!e.target.closest(".links")) {
        document.querySelectorAll(".links li").forEach(li => {
            li.classList.remove("showMenu");
        });
    }
});

/* GESTION MOBILE (Optionnel si tu réactives le hamburger plus tard) */
let navLinksContainer = document.querySelector(".nav-links");
// ... le reste de tes fonctions (tableaux, etc.) ...
