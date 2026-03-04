/* ==========================================================================
   1. GESTION DE LA NAVIGATION (SOUS-MENUS & CLIC EXTÉRIEUR)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const allArrows = document.querySelectorAll(".arrow");

    // Gestion du clic sur les chevrons (Mobile et Desktop)
    allArrows.forEach(arrow => {
        arrow.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // Empêche la fermeture immédiate via le listener du document
            
            let parentLi = arrow.closest("li");
            
            // Ferme les autres menus ouverts
            document.querySelectorAll(".links li").forEach(li => {
                if (li !== parentLi) li.classList.remove("showMenu");
            });

            // Bascule le menu actuel
            parentLi.classList.toggle("showMenu");
        });
    });

    // FERMETURE INTELLIGENTE : Si on clique n'importe où en dehors du menu
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".links")) {
            document.querySelectorAll(".links li").forEach(li => {
                li.classList.remove("showMenu");
            });
        }
    });
});

/* ==========================================================================
   2. FONCTIONS DE FILTRAGE (TABLEAUX COMPARATIFS)
   ========================================================================== */

function filterDenominations() {
    const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
    const selectedDenominations = Array.from(checkedBoxes).map(cb => cb.value);
    const table = document.getElementById('comparison-table');
    
    if (!table) return;

    const ths = table.querySelectorAll('th');
    ths.forEach((th, index) => {
        if (index === 0) return; // Ignore la colonne thématique
        
        const denomClass = th.classList[0];
        const show = selectedDenominations.includes(denomClass);
        
        table.querySelectorAll(`tr td:nth-child(${index + 1}), tr th:nth-child(${index + 1})`).forEach(cell => {
            cell.style.display = show ? '' : 'none';
        });
    });
}

function filterThemes() {
    const filter = document.getElementById('theme-filter');
    if (!filter) return;
    
    const theme = filter.value;
    const rows = document.querySelectorAll('#comparison-table tbody tr');

    rows.forEach(row => {
        const rowTheme = row.classList[0];
        row.style.display = (theme === 'all' || rowTheme === theme) ? '' : 'none';
    });
}

// Initialisation des écouteurs de tableaux si présents sur la page
const denomContainer = document.getElementById('denomination-filters');
if (denomContainer) {
    denomContainer.addEventListener('change', filterDenominations);
}

const themeSelect = document.getElementById('theme-filter');
if (themeSelect) {
    themeSelect.addEventListener('change', filterThemes);
}
