/* ==========================================================================
   1. GESTION DE LA NAVIGATION (MENU MOBILE & CLIC SOUS-MENUS)
   ========================================================================== */

// Sidebar Mobile
let navLinksContainer = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");

if(menuOpenBtn) {
    menuOpenBtn.onclick = function() {
        navLinksContainer.style.left = "0";
    }
}
if(menuCloseBtn) {
    menuCloseBtn.onclick = function() {
        navLinksContainer.style.left = "-100%";
    }
}

// Sous-menus : Ouverture au clic sur la flèche UNIQUEMENT
let allArrows = document.querySelectorAll(".arrow");

allArrows.forEach(arrow => {
    arrow.addEventListener("click", (e) => {
        // Empêche le lien parent de s'activer si c'est un lien
        e.preventDefault(); 
        
        let arrowParent = e.target.closest("li"); // On remonte au parent 'li'
        
        // Fermer les autres menus ouverts pour éviter les superpositions
        document.querySelectorAll(".links li").forEach(li => {
            if (li !== arrowParent) li.classList.remove("showMenu");
        });

        // Alterne la classe pour afficher/masquer
        arrowParent.classList.toggle("showMenu");
    });
});

/* ==========================================================================
   2. FILTRES POUR TABLEAUX COMPARATIFS
   ========================================================================== */

function filterDenominations() {
  const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
  const selectedDenominations = Array.from(checkedBoxes).map(checkbox => checkbox.value);
  const columns = document.querySelectorAll('#comparison-table th');

  columns.forEach((th, index) => {
    if (index === 0) return; 
    const denominationClass = th.classList[0];
    const displayColumn = selectedDenominations.includes(denominationClass);

    document.querySelectorAll(`#comparison-table th:nth-child(${index + 1}), #comparison-table td:nth-child(${index + 1})`).forEach(cell => {
      cell.style.display = displayColumn ? '' : 'none';
    });
  });
}

function filterThemes() {
  const filterElement = document.getElementById('theme-filter');
  if(!filterElement) return;

  const selectedTheme = filterElement.value;
  const rows = document.querySelectorAll('#comparison-table tbody tr');

  rows.forEach(row => {
    const themeClass = row.classList[0];
    row.style.display = (selectedTheme === 'all' || themeClass === selectedTheme) ? '' : 'none';
  });
}

// Écouteurs pour le tableau
document.querySelectorAll('#denomination-filters input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', filterDenominations);
});

const themeFilter = document.getElementById('theme-filter');
if(themeFilter) {
    themeFilter.addEventListener('change', filterThemes);
}

/* ==========================================================================
   3. INITIALISATION
   ========================================================================== */
window.onload = () => {
    if(document.getElementById('comparison-table')) {
        filterDenominations();
        filterThemes();
    }
};
