// Sélection de toutes les flèches
let allArrows = document.querySelectorAll(".arrow");

allArrows.forEach(arrow => {
    arrow.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Évite de fermer immédiatement le menu qu'on vient d'ouvrir
        
        let li = e.target.closest("li");
        
        // Ferme les autres menus
        document.querySelectorAll(".links li").forEach(item => {
            if (item !== li) item.classList.remove("showMenu");
        });

        li.classList.toggle("showMenu");
    });
});

// FERMETURE INTELLIGENTE : clic n'importe où ailleurs
document.addEventListener("click", (e) => {
    // Si le clic n'est pas sur un élément du menu, on ferme tout
    if (!e.target.closest(".links")) {
        document.querySelectorAll(".links li").forEach(li => {
            li.classList.remove("showMenu");
        });
    }
});
