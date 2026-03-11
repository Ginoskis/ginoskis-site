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

    // Gestion des flèches sous-menus mobile
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
    const themeFilter = document.getElementById('theme-filter');

    if (denomFilters.length > 0) {
        denomFilters.forEach(checkbox => {
            checkbox.addEventListener('change', filterDenominations);
        });
        // Initialisation au chargement pour appliquer les 2 cases cochées par défaut
        filterDenominations(); 
    }

    if (themeFilter) {
        themeFilter.addEventListener('change', filterThemes);
    }
});

/* --- FONCTIONS GLOBALES (Comparatif) --- */

function filterDenominations() {
    const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
    const selectedDenoms = Array.from(checkedBoxes).map(cb => cb.value);
    const table = document.getElementById('comparison-table');
    
    if (!table) return;

    const ths = table.querySelectorAll('th');

    ths.forEach((th, index) => {
        if (index === 0) return; // Ignore la colonne "Thématique"
        
        // On récupère la classe de l'en-tête (ex: ortho, cath-rom...)
        const denomClass = th.classList[0];
        const show = selectedDenoms.includes(denomClass);
        
        // Sélectionne l'en-tête et toutes les cellules de cette colonne
        const cells = document.querySelectorAll(`#comparison-table th:nth-child(${index + 1}), #comparison-table td:nth-child(${index + 1})`);
        
        cells.forEach(cell => {
            cell.style.display = show ? 'table-cell' : 'none';
        });
    });
}

function filterThemes() {
    const themeSelect = document.getElementById('theme-filter');
    if (!themeSelect) return;

    const selectedTheme = themeSelect.value;
    const rows = document.querySelectorAll('#comparison-table tbody tr');
    
    rows.forEach(row => {
        // Vérifie si la ligne contient la classe du thème sélectionné
        const isMatch = selectedTheme === 'all' || row.classList.contains(selectedTheme);
        row.style.display = isMatch ? 'table-row' : 'none';
    });
}
