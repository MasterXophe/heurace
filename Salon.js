const Salon = function() {
}
Salon.prototype.nom = "salon";
Salon.prototype.affiche = function(jeu) {
    let that = this;
    jeu.afficheFond(jeu.sprites.salon.fond);
    jeu.ajouteObjet(
        jeu.sprites.salon.porteatelier,
        524,
        102,
        function(jeu) {
            jeu.texte({"texte": "L'atelier de mon père."});
        },
        function(jeu) {
            jeu.scene("atelier");
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.portechambre,
        326,
        115,
        function(jeu) {
            jeu.texte({"texte": "Ma chambre."});
        },
        function(jeu) {
            jeu.scene("chambre");
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.portecuisine,
        0,
        81,
        function(jeu) {
            jeu.texte({"texte": "La cuisine."});
        },
        function(jeu) {
            if(jeu._model.etape === "recherche") {
                if(!jeu.inventaireContient("idee_passoire")) {
                    jeu.texte({"texte": "Il y a une passoire, c'est une idée."});
                    jeu.inventaireRemplace("idee", "idee_passoire");
                }
            } else {
                jeu.texte({"texte": "Je n'ai rien à y faire."});
            }
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.baseaspirobot,
        69,
        314,
        function(jeu) {
            jeu.texte({"texte": "C'est la base de l'aspirateur-robot, il y revient de temps en temps se recharger."});
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.chaine,
        144,
        236,
        function(jeu) {
            jeu.texte({"texte": "C'est la chaîne Hi-Fi, on écoute la radio ou bien des CDs."});
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.araignee,
        72,
        86,
        function(jeu) {
            jeu.texte({"texte": "Une toile d'araignée. L'aspirateur-robot ne va pas jusque là. J'ai proposé aux parents de l'améliorer pour qu'il puisse grimper mur, mais ils n'ont pas eu l'air emballés..."});
        },
        function(jeu) {
            jeu.texte({"texte": "Je ne peux pas l'atteindre."});
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.cds,
        121,
        279,
        function(jeu) {
            if(jeu._model.salon.robotSousMeuble && !jeu._model.salon.robotDecoince) {
                jeu.texte({"texte": "Hey, l'aspirateur-robot est dessous. Je vais le décoincer."});
                jeu._model.salon.robotDecoince = true;
            } else {
                jeu.texte({"texte": "La collection de CDs de mes parents, il y en a tellement ! Tout ça tient dans une clé USB, mais c'est moins joli."});
            }
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.maman,
        459,
        324,
        function(jeu) {
            jeu.texte({"texte": "Ma maman. Elle se repose, elle a beaucoup travaillé aujourd'hui."});
        },
        function(jeu) {
            jeu.choix({
                "choix": [{
                    "texte": "Maman, tu sais où est l'aspirateur-robot ?",
                    "cb": function(jeu) {
                        jeu.texte({
                            "qui": jeu.sprites.qui.maman,
                            "texte": "Je ne sais pas, peut-être sous le meuble de la chaîne, il se coince parfois dessous."
                        });
                        jeu._model.salon.robotSousMeuble = true;
                    }
                }, {
                    "texte": "Non, rien."
                }]
            });
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.salon.yeuxmaman,
        585,
        348
    );
    if(jeu._model.salon.robotDecoince) {
        jeu.ajouteObjet(
            jeu.sprites.inventaire.aspirobot,
            150,
            345,
            function(jeu) {
                if(jeu._model.etape === "recherche" && !jeu.inventaireContient("idee_aspirobot")) {
                    jeu.texte({"texte": "L'apirateur-robot a des capteurs de proximité, un moteur, une bonne batterie... C'est une idée."});
                    jeu.inventaireRemplace("idee", "idee_aspirobot");
                } else {
                    jeu.texte({"texte": "L'apirateur-robot. Il se promène dans la maison pour aspirer la poussière. Je l'aime bien."});
                }
            },
            function(jeu) {
                if(jeu._model.etape === "recherche") {
                    jeu.texte({"texte": "Pour l'instant, je cherche des idées, je ne prends rien."});
                } else {
                    jeu.texte({
                        "qui": jeu.sprites.qui.maman,
                        "texte": "Laisse cet aspirateur tranquille ! Il est très bien comme il est !"
                    });
                }
            }
        );
    }
};