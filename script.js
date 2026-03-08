document.addEventListener("DOMContentLoaded", () => {
    
    /* --- NAVIGATION MOBILE --- */
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

    /* --- FILTRAGE "liste-denominations.html" --- */
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

    /* --- FILTRAGE "comparatif.html" --- */
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

// Fonctions Globales pour le comparatif
function filterDenominations() {
    const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
    const selectedDenoms = Array.from(checkedBoxes).map(cb => cb.value);
    const ths = document.querySelectorAll('#comparison-table th');

    ths.forEach((th, index) => {
        if (index === 0) return; 
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
