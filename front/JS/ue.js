document.addEventListener("DOMContentLoaded", function() {
    loadMentions();
    document.getElementById("search-button").addEventListener("click", searchUE);
    document.getElementById("apply-filters-button").addEventListener("click", applyFilters);
    document.getElementById("mention-select").addEventListener("change", loadParcoursByMention);
});

function loadMentions() {
    // Remplacez l'URL par celle de votre API
    fetch('https://api.example.com/mentions')
        .then(response => response.json())
        .then(data => {
            const mentionSelect = document.getElementById("mention-select");
            data.forEach(mention => {
                const option = document.createElement("option");
                option.value = mention.id;
                option.textContent = mention.nom;
                mentionSelect.appendChild(option);
            });
        });
}

function loadParcoursByMention() {
    const mentionId = document.getElementById("mention-select").value;
    const parcoursSelect = document.getElementById("parcours-select");
    parcoursSelect.innerHTML = '<option value="">Tous les parcours</option>'; // Reset parcours options

    if (mentionId) {
        // Remplacez l'URL par celle de votre API
        fetch(`https://api.example.com/mentions/${mentionId}/parcours`)
            .then(response => response.json())
            .then(data => {
                data.forEach(parcours => {
                    const option = document.createElement("option");
                    option.value = parcours.id;
                    option.textContent = parcours.nom;
                    parcoursSelect.appendChild(option);
                });
            });
    }
}

function searchUE() {
    const ueId = document.getElementById("search-ue-id").value;
    const ueName = document.getElementById("search-ue-name").value;
    // Remplacez l'URL par celle de votre API
    fetch(`https://api.example.com/ues?ueId=${ueId}&ueName=${ueName}`)
        .then(response => response.json())
        .then(data => {
            displayUETable(data);
        });
}

function applyFilters() {
    const mentionId = document.getElementById("mention-select").value;
    const parcoursId = document.getElementById("parcours-select").value;
    // Remplacez l'URL par celle de votre API
    fetch(`https://api.example.com/ues?mentionId=${mentionId}&parcoursId=${parcoursId}`)
        .then(response => response.json())
        .then(data => {
            displayUETable(data);
        });
}

function displayUETable(data) {
    const ueTableContainer = document.getElementById("ue-table-container");
    ueTableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Crédits</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(ue => `
                    <tr>
                        <td>${ue.id}</td>
                        <td>${ue.nom}</td>
                        <td>${ue.credits}</td>
                        <td><a href="ue_detail.html?id=${ue.id}">Détails</a></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
