import pool from "../back/connexion-bd";

fetch('//api')
    .then(res => res.json())
    .then(data => listeEtu.src = data)


ajouterE.onclick = function () {};





pool.query("select * from etudiant", (err, rows, fields) => {
    if (err) throw err
})
pool.end();