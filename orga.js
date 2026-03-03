const treeData = {
  "name": "Christianisme",
  "children": [
    {
      "name": "Église de l'Orient",
      "children": [
        {"name": "Église apostolique assyrienne de l'Orient"}
      ]
    },
    {
      "name": "Églises orthodoxes orientales",
      "children": [
        {"name": "Église Copte Orthodoxe"},
        {"name": "Église Ethiopienne Orthodoxe"}
      ]
    },
    {
      "name": "Église Orthodoxe",
      "children": [
        {"name": "Église Orthodoxe Russe"},
        {"name": "Église Orthodoxe Grecque"}
      ]
    },
    {
      "name": "Catholicisme romain",
      "children": [
        {"name": "Église Catholique"}
      ]
    },
    {
      "name": "Protestantisme",
      "children": [
        {
          "name": "Adventisme"
        },
        {
          "name": "Anabaptisme",
          "children": [
            {"name": "Amish"},
            {"name": "Mennonite"}
          ]
        },
        {"name": "Anglicanisme"},
        {"name": "Baptiste"},
        {"name": "Lutheranisme"},
        {"name": "Methodisme"},
        {"name": "Pentecotisme"},
        {"name": "Les Réformés/Calvinistes"}
      ]
    },
    {
      "name": "Restorationisme",
      "children": [
        {"name": "Les témoins de Jéhovah"},
        {"name": "Églises des Saints des derniers jours(Mormons)"}
      ]
    }
  ]
};


/*

// Définir les dimensions et les marges du diagramme
const margin = {top: 20, right: 120, bottom: 20, left: 90},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// Créer un canvas SVG responsive
const svg = d3.select("#tree-container").append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const root = d3.hierarchy(treeData);
const treeLayout = d3.tree().size([height, width]);

treeLayout(root);

// Liens entre les nœuds
svg.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x));


// Nœuds
const node = svg.selectAll('.node')
  .data(root.descendants())
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', d => `translate(${d.y},${d.x})`);

// Cercle pour chaque nœud
node.append('circle')
  .attr('r', 5);

// Étiquettes pour chaque nœud
node.append('text')
  .attr('class', 'label')
  .attr('x', 10)  // Décale le texte horizontalement (ajuster cette valeur pour éviter le chevauchement)
  .attr('dy', '.35em')
  .text(d => d.data.name);

*/

/*
// Définir les dimensions et les marges du diagramme
const margin = {top: 20, right: 120, bottom: 20, left: 90},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// Créer un canvas SVG responsive
const svg = d3.select("#tree-container").append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Positionner l'arbre en haut

const root = d3.hierarchy(treeData);
const treeLayout = d3.tree().size([width, height]);

treeLayout(root);

// Liens entre les nœuds (haut-bas)
svg.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d3.linkVertical() // Utilisation de "linkVertical" pour des liens de haut en bas
        .x(d => d.x)  // Garde l'axe x tel quel
        .y(d => d.y)) // Garde l'axe y pour descendre de haut en bas
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2);

// Nœuds
const node = svg.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`); // Positionne chaque nœud

// Cercle pour chaque nœud
node.append('circle')
    .attr('r', 5)
    .attr('fill', 'steelblue');

// Étiquettes pour chaque nœud
node.append('text')
    .attr('class', 'label')
    .attr('x', 10)
    .attr('dy', '.35em')
    .text(d => d.data.name);

*/


// Définir les dimensions et les marges du diagramme
const margin = {top: 20, right: 120, bottom: 20, left: 90},
      width = 1000 - margin.left - margin.right,  // Augmente la largeur totale
      height = 800 - margin.top - margin.bottom;  // Augmente la hauteur pour plus d'espace entre les nœuds

// Créer un canvas SVG responsive
const svg = d3.select("#tree-container").append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const root = d3.hierarchy(treeData);
const treeLayout = d3.tree().size([width, height]);  // Définit l'espace vertical et horizontal

treeLayout(root);

// Fonction pour dessiner des lignes droites (horizontales et verticales)
function elbow(d) {
    return "M" + d.source.x + "," + d.source.y
        + "V" + d.target.y + "H" + d.target.x;
}

// Ajouter des lignes droites entre les nœuds
svg.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', elbow)
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2);

// Nœuds
const node = svg.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`);

// Ajouter des rectangles pour chaque nœud
node.append('rect')
    .attr('x', -60)  // Centrer le rectangle autour du texte
    .attr('y', -15)
    .attr('width', 120)  // Largeur fixe pour chaque nœud
    .attr('height', 30)  // Hauteur fixe pour chaque nœud
    .attr('rx', 5)  // Bords arrondis
    .attr('ry', 5)  // Bords arrondis
    .attr('fill', 'lightblue')  // Couleur de fond
    .attr('stroke', 'steelblue')  // Bordure
    .attr('stroke-width', 2);

// Ajouter des étiquettes (textes) pour chaque nœud
node.append('text')
    .attr('dy', 5)  // Ajuster la position verticale du texte
    .attr('text-anchor', 'middle')  // Centrer le texte horizontalement
    .text(d => d.data.name)
    .attr('font-size', '12px')  // Taille de police
    .attr('fill', '#333');  // Couleur du texte


// Tags dynamiques
node.on("click", function(event, d) {
    const tagsContainer = d3.select("#tags");
    tagsContainer.html("");  // Efface les anciens tags
    const tags = getTagsForDenomination(d.data.name); // Récupère les tags pour la dénomination
    tags.forEach(tag => {
        tagsContainer.append("span")
            .attr("class", "tag")
            .style("display", "inline-block")
            .style("margin", "5px")
            .style("padding", "5px 10px")
            .style("background-color", "#f0f0f0")
            .style("border-radius", "5px")
            .text(tag);
    });
});

// Informations sur la dénomination
node.on("click", function(event, d) {
    const denominationInfo = getDenominationInfo(d.data.name);
    d3.select("#modal-title").text(d.data.name);
    d3.select("#modal-body").html(denominationInfo);
    d3.select("#modal").style("display", "block");
});

// Fermer la modale
d3.select(".close").on("click", function() {
    d3.select("#modal").style("display", "none");
});

// Fermer la modale si on clique en dehors
window.onclick = function(event) {
    if (event.target == document.getElementById("modal")) {
        d3.select("#modal").style("display", "none");
    }
};

// Fonction pour obtenir les informations sur la dénomination, y compris les liens
function getDenominationInfo(denomination) {
    const info = {
        "Christianisme": `
              Le christianisme est la première religion au monde en nombre de fidèles...
              <br>
              <a href="adventismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
          `,  
        "Adventisme": `
              L'adventisme est un mouvement...
              <br>
              <a href="adventismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
          `,
        "Anabaptisme": `
              Le mouvement anabaptiste est...
              <br>
              <a href="pentecotismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
          `,
        // Ajoutez d'autres dénominations ici
    };
    return info[denomination] || "Informations indisponibles pour cette dénomination.";
}


// Aucune modification dans la logique des tags ou des modales



node.on("click", function(event, d) {
  // Récupère les informations spécifiques pour chaque dénomination
  const denominationInfo = getDenominationInfo(d.data.name);

  // Met à jour le contenu de la modale
  d3.select("#modal-title").text(d.data.name);
  d3.select("#modal-body").html(denominationInfo);

  // Affiche la modale
  d3.select("#modal").style("display", "block");
});

// Ferme la modale lorsque l'utilisateur clique sur le bouton 'x'
d3.select(".close").on("click", function() {
  d3.select("#modal").style("display", "none");
});

// Ferme la modale si l'utilisateur clique en dehors de la boîte
window.onclick = function(event) {
  if (event.target == document.getElementById("modal")) {
      d3.select("#modal").style("display", "none");
  }
};

// Fonction pour obtenir les informations sur la dénomination, y compris les liens
function getDenominationInfo(denomination) {
  const info = {
    "Christianisme": `
          Le christianisme est la première religion au monde en nombre de fidèles. Cette religion issue du judaïsme, apparaît en Palestine au 1er siècle après Jésus-Christ dont la vie, les enseignements et la personne en sont les fondements.     
          <br>
          <a href="adventismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,  
    "Adventisme": `
          L'adventisme  
          <br>
          <a href="adventismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
      "Anabaptisme": `
          Le mouvement anabaptiste est .
          <br>
          <a href="pentecotismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
      "Anglicanisme": `
          L'anglicanisme.
          <br>
          <a href="pentecotismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
      "Baptisme": `
          Le mouvement baptiste.
          <br>
          <a href="pentecotismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
      "Lutheranisme": `
          Le luthéranisme est une branche du protestantisme qui tire son nom de Martin Luther.
          <br>
          <a href="lutheranisme-fiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
      "Methodisme": `
          Le méthodisme.
          <br>
          <a href="pentecotismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
      "Pentecotisme": `
      Le pentecôtisme est un mouvement protestant évangélique, axé sur l'expérience personnelle du Saint-Esprit.
      <br>
      <a href="pentecotismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
      "Les Réformés/Calvinistes": `
          Les Réformés ou Calvinistes 
          <br>
          <a href="pentecotismeFiche.html" target="_blank">Voir la fiche doctrinale complète</a>
      `,
    
      
      // Ajoute plus d'infos ici
  };
  return info[denomination] || "Informations indisponibles pour cette dénomination.";
}
