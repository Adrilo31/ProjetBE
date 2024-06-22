const pool = require('../connexion-bd.js');

//stats pr le tableau de bord
const getEtudiantsStats = (req,res) => {
    pool.query('SELECT COUNT(*) as etudiants from Etudiants', (error, results) => {
        if (error) throw error;
        res.status(200).json(results)
    });
};

const getMentionsStats = (req,res) => {
    pool.query('SELECT COUNT(*) as mentions from Mentions', (error, results) => {
        if (error) throw error;
        res.status(200).json(results)
    });
};

const getParcoursStats = (req,res) => {
    pool.query('SELECT COUNT(*) as parcours from Parcours', (error, results) => {
        if (error) throw error;
        res.status(200).json(results)
    });
};

const getUesStats = (req,res) => {
    pool.query('SELECT COUNT(*) as UEs from Unitesenseignement', (error, results) => {
        if (error) throw error;
        res.status(200).json(results)
    });
};


module.exports = {
    getEtudiantsStats,
    getMentionsStats,
    getParcoursStats,
    getUesStats,
}