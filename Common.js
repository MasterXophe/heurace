const COMMON = {
    isCollecteTerminee: function(jeu) {
        if(jeu.inventaireContient("tole") && jeu.model.tole === "soudee"
            && jeu.inventaireContient("aspirobot")
            && jeu.inventaireContient("carte")
            && jeu.inventaireContient("scie")) {
            jeu.texte({"texte": "Ça y est, j'ai tout ce qu'il faut pour mon robot ! Je dois aller dans ma chambre pour l'assembler et le programmer."});
            jeu.model.etape = "fabrication";
        }
    },

    fin: function(jeu) {
        jeu.texte({
            "texte": "C'est l'heure de l'assemblage !",
            "cb": function(jeu) {
                jeu.texte({
                    "texte": "Je démonte l'aspirobot, et j'y branche ma carte électronique...",
                    "cb": function(jeu) {
                        jeu.texte({
                            "texte": "...je fixe la tôle dessus...",
                            "cb": function(jeu) {
                                jeu.texte({
                                    "texte": "...et enfin je fixe la scie circulaire.",
                                    "cb": function(jeu) {
                                        jeu.texte({
                                            "texte": "Un peu de programmation...",
                                            "cb": function(jeu) {
                                                jeu.texte({
                                                    "texte": "...et voilà !",
                                                    "cb": function(jeu) {
                                                        jeu.scene("fin");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}