document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. NAVIGATION MOBILE --- */
    const navLinks = document.querySelector(".nav-links");
    const menuOpenBtn = document.querySelector(".navbar .bx-menu");
    const menuCloseBtn = document.querySelector(".nav-links .bx-x");

    if (menuOpenBtn) {
        menuOpenBtn.onclick = () => { navLinks.style.left = "0"; }
    }
    if (menuCloseBtn) {
        menuCloseBtn.onclick = () => { navLinks.style.left = "-100%"; }
    }

    const allArrows = document.querySelectorAll(".arrow");
    allArrows.forEach(arrow => {
        arrow.addEventListener("click", (e) => {
            e.preventDefault();
            let parentLi = arrow.closest("li");
            parentLi.classList.toggle("showMenu");
        });
    });

    /* --- 2. FILTRAGE "liste-denominations.html" --- */
    const groupSelect = document.getElementById('denomination-group');
    if (groupSelect) {
        groupSelect.addEventListener('change', function() {
            const selectedGroup = this.value;
            const rows = document.querySelectorAll('#denominations-table tbody tr');
            rows.forEach(row => {
                row.style.display = (selectedGroup === 'all' || row.classList.contains(selectedGroup)) ? '' : 'none';
            });
        });
    }

    /* --- 3. FILTRAGE "comparatif.html" --- */
    const denomFilters = document.querySelectorAll('#denomination-filters input[type="checkbox"]');
    const themeFilters = document.querySelectorAll('#theme-filters input[type="checkbox"]');

    // Initialisation et écouteurs pour les dénominations (Colonnes)
    if (denomFilters.length > 0) {
        denomFilters.forEach(checkbox => {
            checkbox.addEventListener('change', filterDenominations);
        });
        filterDenominations(); 
    }

    // Initialisation et écouteurs pour les thématiques (Lignes)
    if (themeFilters.length > 0) {
        themeFilters.forEach(checkbox => {
            checkbox.addEventListener('change', filterThemes);
        });
        filterThemes();
    }
});

/* --- FONCTIONS GLOBALES (Comparatif) --- */

/**
 * Gère l'affichage des colonnes (Dénominations)
 */
function filterDenominations() {
    const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
    const selectedDenoms = Array.from(checkedBoxes).map(cb => cb.value);
    const table = document.getElementById('comparison-table');
    
    if (!table) return;

    const ths = table.querySelectorAll('thead th');

    ths.forEach((th, index) => {
        if (index === 0) return; // Toujours afficher la colonne "Thématique"
        
        const denomClass = th.classList[0];
        const show = selectedDenoms.includes(denomClass);
        
        // Cible la cellule d'en-tête et toutes les cellules correspondantes dans le corps du tableau
        const cells = document.querySelectorAll(`#comparison-table th:nth-child(${index + 1}), #comparison-table td:nth-child(${index + 1})`);
        
        cells.forEach(cell => {
            cell.style.display = show ? 'table-cell' : 'none';
        });
    });
}

/**
 * Gère l'affichage des lignes (Thématiques) avec sélection multiple
 */
function filterThemes() {
    const checkedThemes = document.querySelectorAll('#theme-filters input[type="checkbox"]:checked');
    const selectedThemes = Array.from(checkedThemes).map(cb => cb.value);
    const rows = document.querySelectorAll('#comparison-table tbody tr');
    
    if (rows.length === 0) return;

    rows.forEach(row => {
        // La ligne est affichée si au moins une de ses classes correspond à un thème coché
        const isVisible = selectedThemes.some(theme => row.classList.contains(theme));
        row.style.display = isVisible ? 'table-row' : 'none';
    });
}
