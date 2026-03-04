/* ==========================================================================
   1. GESTION DE LA NAVIGATION (MENU & CLIC EXTÉRIEUR)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Gestion du clic sur les flèches pour mobile/tablette
    const allArrows = document.querySelectorAll(".arrow");
    allArrows.forEach(arrow => {
        arrow.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let parentLi = arrow.closest("li");
            document.querySelectorAll(".links li").forEach(li => {
                if (li !== parentLi) li.classList.remove("showMenu");
            });
            parentLi.classList.toggle("showMenu");
        });
    });

    // Fermeture si on clique ailleurs
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
       3. FILTRAGE POUR "comparatif.html" (Cases à cocher)
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

// Fonctions globales pour le comparatif
function filterDenominations() {
    const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
    const selectedDenoms = Array.from(checkedBoxes).map(cb => cb.value);
    const ths = document.querySelectorAll('#comparison-table th');

    ths.forEach((th, index) => {
        if (index === 0) return; // Ignore la colonne thématique
        const denomClass = th.classList[0];
        const show = selectedDenoms.includes(denomClass);
        
        document.querySelectorAll(`#comparison-table th:nth-child(${index + 1}), #comparison-table td:nth-child(${index + 1})`).forEach(cell => {
            cell.style.display = show ? '' : 'none';
        });
    });
}

function filterThemes() {
    const selectedTheme = document.getElementById('theme-filter').value;
    const rows = document.querySelectorAll('#comparison-table tbody tr');

    rows.forEach(row => {
        const themeClass = row.classList[0];
        row.style.display = (selectedTheme === 'all' || themeClass === selectedTheme) ? '' : 'none';
    });
}
