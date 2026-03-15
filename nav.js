/**
 * nav.js — Navigation centralisée Ginoskis
 * Injecte automatiquement le menu et initialise les interactions mobile.
 * Inclure ce fichier dans le <head> ou en fin de <body> sur chaque page.
 */

(function () {

  const NAV_HTML = `
  <nav>
    <div class="navbar">
      <i class='bx bx-menu' id="menu-open-btn"></i>

      <div class="logo">
        <a href="index.html">Ginoskis</a>
      </div>

      <div class="nav-links" id="nav-links">
        <div class="sidebar-logo">
          <span class="logo-name">Ginoskis</span>
          <i class='bx bx-x' id="menu-close-btn"></i>
        </div>

        <ul class="links">
          <li><a href="index.html">ACCUEIL</a></li>

          <li>
            <a href="votre-foi-main.html">VOTRE FOI</a>
            <i class='bx bxs-chevron-down arrow'></i>
            <ul class="sub-menu">
              <li><a href="kyf-hub.html">Nos questionnaires KYF</a></li>
              <li><a href="profil-apprenant.html">Votre profil apprenant</a></li>
              <li><a href="trouver-eglise.html">Trouver une église</a></li>
              <li><a href="edification.html">Édification personnelle</a></li>
            </ul>
          </li>

          <li>
            <a href="#">CHRÉTIENS EN FRANCE</a>
            <i class='bx bxs-chevron-down arrow'></i>
            <ul class="sub-menu">
              <li><a href="liste-denominations.html">Liste &amp; Chiffres clés</a></li>
              <li><a href="comparatif.html">Tableaux comparatifs</a></li>
              <li><a href="diagramme.html">Diagramme</a></li>
              <li><a href="interviews.html">Interviews "À la source"</a></li>
            </ul>
          </li>

          <li>
            <a href="#">RESSOURCES</a>
            <i class='bx bxs-chevron-down arrow'></i>
            <ul class="sub-menu">
              <li><a href="quizz-bibliques.html">Quizz bibliques</a></li>
              <li><a href="quizz-autres.html">En quoi croient-ils ?</a></li>
              <li><a href="personnalites.html">Personnalités &amp; Croyances</a></li>
              <li><a href="monde.html">Le christianisme dans le monde</a></li>
              <li><a href="lexique.html">Lexique &amp; Fiches doctrinales</a></li>
              <li><a href="peres-eglise.html">Les Pères de l'Église</a></li>
            </ul>
          </li>

          <li>
            <a href="#">À PROPOS &amp; CONTACT</a>
            <i class='bx bxs-chevron-down arrow'></i>
            <ul class="sub-menu">
              <li><a href="histoire.html">Notre histoire</a></li>
              <li><a href="independance.html">Déclaration d'indépendance</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="contact.html">Contactez-nous</a></li>
              <li><a href="soutien.html">Soutenez Ginoskis</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;

  /* --- Injection dans tous les <header> existants --- */
  document.addEventListener("DOMContentLoaded", function () {

    // Injecter le nav dans les headers qui n'ont pas encore de nav
    document.querySelectorAll("header").forEach(function (header) {
      if (!header.querySelector("nav")) {
        header.insertAdjacentHTML("afterbegin", NAV_HTML);
      }
    });

    /* --- Menu mobile : ouverture / fermeture --- */
    const navLinks   = document.getElementById("nav-links");
    const openBtn    = document.getElementById("menu-open-btn");
    const closeBtn   = document.getElementById("menu-close-btn");

    if (openBtn && navLinks) {
      openBtn.addEventListener("click", function () {
        navLinks.style.left = "0";
      });
    }

    if (closeBtn && navLinks) {
      closeBtn.addEventListener("click", function () {
        navLinks.style.left = "-100%";
      });
    }

    /* --- Sous-menus mobiles (toggle au clic sur chevron) --- */
    document.querySelectorAll(".arrow").forEach(function (arrow) {
      arrow.addEventListener("click", function (e) {
        e.preventDefault();
        var parentLi = arrow.closest("li");
        if (parentLi) parentLi.classList.toggle("showMenu");
      });
    });

    /* --- Marquer le lien actif selon l'URL courante --- */
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".links a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href && href !== "#" && href === currentPage) {
        link.style.color = "#3e8da8";
        link.style.fontWeight = "700";
      }
    });

  });

})();
