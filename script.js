// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");
searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});
// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}
// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}

// Fonction pour filtrer les dénominations sélectionnées
function filterDenominations() {
  const checkedBoxes = document.querySelectorAll('#denomination-filters input[type="checkbox"]:checked');
  const selectedDenominations = Array.from(checkedBoxes).map(checkbox => checkbox.value);
  
  // Récupérer toutes les colonnes du tableau (index des th correspondants)
  const columns = document.querySelectorAll('#comparison-table th');

  columns.forEach((th, index) => {
    if (index === 0) return; // Ignorer la première colonne (celle des thématiques)
    
    const denominationClass = th.classList[0]; // Ex: "Amish", "Catholic", "Baptist"
    const displayColumn = selectedDenominations.includes(denominationClass);

    // Afficher ou masquer les colonnes selon la sélection
    document.querySelectorAll(`#comparison-table th:nth-child(${index + 1}), #comparison-table td:nth-child(${index + 1})`).forEach(cell => {
      cell.style.display = displayColumn ? '' : 'none';
    });
  });
}

// Fonction pour filtrer par thématique
function filterThemes() {
  const selectedTheme = document.getElementById('theme-filter').value;

  // Récupérer toutes les lignes du tableau
  const rows = document.querySelectorAll('#comparison-table tbody tr');

  rows.forEach(row => {
    const themeClass = row.classList[0]; // Ex: "doctrine", "sacrements", "pratiques"
    if (selectedTheme === 'all' || themeClass === selectedTheme) {
      row.style.display = ''; // Afficher la ligne
    } else {
      row.style.display = 'none'; // Masquer les autres lignes
    }
  });
}

// Ajouter les écouteurs d'événement pour les filtres
document.querySelectorAll('#denomination-filters input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', filterDenominations);
});

document.getElementById('theme-filter').addEventListener('change', filterThemes);

// Initialiser les filtres dès le chargement de la page
filterDenominations();
filterThemes();