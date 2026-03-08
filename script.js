/* ==========================================================================
   1. GESTION DE LA NAVIGATION (MENU, SIDEBAR & CLIC EXTÉRIEUR)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    
    // Éléments pour la Sidebar Mobile
    const navLinks = document.querySelector(".nav-links");
    const menuOpenBtn = document.querySelector(".navbar .bx-menu");
    const menuCloseBtn = document.querySelector(".nav-links .bx-x");

    // Ouverture de la sidebar
    if (menuOpenBtn) {
        menuOpenBtn.onclick = function() {
            navLinks.style.left = "0";
        }
    }

    // Fermeture de la sidebar
    if (menuCloseBtn) {
        menuCloseBtn.onclick = function() {
            navLinks.style.left = "-100%";
        }
    }

    // Gestion du clic sur les flèches (Sous-menus mobile)
    const allArrows = document.querySelectorAll(".arrow");
    allArrows.forEach(arrow => {
        arrow.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let parentLi = arrow.closest("li");
            
            // Ferme les autres sous-menus ouverts
            document.querySelectorAll(".links li").forEach(li => {
                if (li !== parentLi) li.classList.remove("showMenu");
            });
            
            // Bascule l'affichage du sous-menu actuel
            parentLi.classList.toggle("showMenu");
        });
    });

    // Fermeture des sous-menus si on clique ailleurs sur la page
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".links")) {
            document.querySelectorAll(".links li").forEach(li => {
                li.classList.remove("showMenu");
            });
        }
    });

    /* ==========================================================================
       2. FILTRAGE POUR "liste-denominations.html" (Menu Déroulant)
       ========================================================================== */
    const groupSelect = document.getElementById('denomination-group');
    if (groupSelect) {
        groupSelect.addEventListener('change', function() {
            const selectedGroup = this.value;
            const rows = document.querySelectorAll('#denominations-table tbody tr');

            rows.forEach(row => {
                if (selectedGroup === 'all' || row.classList.contains(selectedGroup)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    /* ==========================================================================
       3. FILTRAGE POUR "comparatif.html" (Cases à cocher & Thèmes)
       ========================================================================== */
    const denomFilters = document.querySelectorAll('#denomination-filters input[type="checkbox"]');
    if (denomFilters.length > 0) {
        denomFilters.forEach(checkbox => {
            checkbox.addEventListener('change', filterDenominations);
        });
    }

    const themeFilter = document.getElementById('theme-filter');
    if (themeFilter) {
        themeFilter.addEventListener('change', filterThemes);
    }
});

/* ==========================================================================
   4. FONCTIONS GLOBALES (POUR LE COMPARATIF)
   ========================================================================== */

/**
 * Filtre les colonnes des dénominations dans le tableau comparatif
 */
function filterDenominations() {
    const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
    const selectedDenoms = Array.from(checkedBoxes).map(cb => cb.value);
    const ths = document.querySelectorAll('#comparison-table th');

    ths.forEach((th, index) => {
        if (index === 0) return; // On ignore toujours la première colonne (Thématiques)
        
        const denomClass = th.classList[0]; // Récupère la classe de la dénomination
        const show = selectedDenoms.includes(denomClass);
        
        // Sélectionne l'en-tête et toutes les cellules de la colonne correspondante (index + 1)
        const columnCells = document.querySelectorAll(`#comparison-table th:nth-child(${index + 1}), #comparison-table td:nth-child(${index + 1})`);
        
        columnCells.forEach(cell => {
            cell.style.display = show ? '' : 'none';
        });
    });
}

/**
 * Filtre les lignes thématiques dans le tableau comparatif
 */
function filterThemes() {
    const themeSelector = document.getElementById('theme-filter');
    if (!themeSelector) return;

    const selectedTheme = themeSelector.value;
    const rows = document.querySelectorAll('#comparison-table tbody tr');

    rows.forEach(row => {
        const themeClass = row.classList[0];
        row.style.display = (selectedTheme === 'all' || themeClass === selectedTheme) ? '' : 'none';
    });
}
