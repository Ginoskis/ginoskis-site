// Déclaration des questions
const questions = [
    {
        text: "Croyez-vous en l'existence d'un être suprême ?",
        options: ["Oui", "Non", "Incertain"],
        name: "q1"
    },
    {
        text: "Pratiquez-vous une religion spécifique ?",
        options: ["Oui", "Non", "Parfois"],
        name: "q2"
    },
    // Ajoute plus de questions ici si nécessaire
];

let currentQuestionIndex = 0;

// Fonction pour charger une question
function loadQuestion(index) {
    const questionText = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options');

    // Met à jour le texte de la question
    questionText.textContent = questions[index].text;

    // Vide les options précédentes
    optionsContainer.innerHTML = "";

    // Ajoute les nouvelles options
    questions[index].options.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="${questions[index].name}" value="${option}" required> ${option}`;
        optionsContainer.appendChild(label);
    });
}

// Gestion du clic sur le bouton "Suivant"
document.getElementById('next-btn').addEventListener('click', () => {
    // Vérifie si une option est sélectionnée
    const selectedOption = document.querySelector(`input[name="${questions[currentQuestionIndex].name}"]:checked`);
    if (!selectedOption) {
        alert("Veuillez sélectionner une réponse avant de continuer.");
        return; // Ne pas avancer à la question suivante
    }
    
    // Passe à la question suivante
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        alert("Vous avez terminé le questionnaire !");
    }
});

// Charge la première question au démarrage de la page
window.onload = () => {
    loadQuestion(currentQuestionIndex);
};

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
