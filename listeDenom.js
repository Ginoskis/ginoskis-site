document.getElementById('denomination-group').addEventListener('change', function() {
    const selectedGroup = this.value; // Récupère la valeur sélectionnée

    // Récupère toutes les lignes du tableau
    const rows = document.querySelectorAll('#denominations-table tbody tr');

    // Parcourt chaque ligne pour afficher ou masquer en fonction du groupe sélectionné
    rows.forEach(row => {
        // Si le groupe sélectionné est "all", on affiche tout
        if (selectedGroup === 'all') {
            row.style.display = ''; // Affiche la ligne
        } else {
            // Si la classe de la ligne correspond au groupe sélectionné, on l'affiche
            if (row.classList.contains(selectedGroup)) {
                row.style.display = ''; // Affiche la ligne
            } else {
                row.style.display = 'none'; // Masque la ligne
            }
        }
    });
});