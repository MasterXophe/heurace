const COMMON = {
    isCollecteTerminee: function(jeu) {
        if(jeu.inventaireContient("tole") && jeu.model.tole === "soudee"
            && jeu.inventaireContient("aspirobot")
            && jeu.inventaireContient("carte")
            && jeu.inventaireContient("scie")) {
            jeu.texte({"texte": "Ça y est, j'ai tout ce qu'il faut pour mon robot ! Je dois trouver le bon endroit pour l'assembler et le programmer."});
            jeu.model.etape = "fabrication";
        }
    },
}