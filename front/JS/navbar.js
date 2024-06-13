document.addEventListener('DOMContentLoaded', (event) => {
    // Récupère tous les liens de la barre de navigation
    const navLinks = document.querySelectorAll('nav a');

    // Parcourt chaque lien
    navLinks.forEach(link => {
        // Vérifie si le href du lien correspond à l'URL actuelle sans les paramètres de requête
        if (link.href === window.location.href.split(/[?#]/)[0]) {
            // Ajoute la classe 'active' au lien correspondant
            link.classList.add('active');
        }
    });
});
