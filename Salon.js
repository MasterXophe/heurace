const Salon = function () {
    this.sprites = {
        "salon": null,
        "salon_porteatelier": null,
        "salon_portechambre": null,
        "salon_portecuisine": null,
        "salon_baseaspirobot": null,
        "salon_chaine": null,
        "salon_araignee": null,
        "salon_cds": null,
        "salon_maman": null,
        "salon_yeuxmaman": null,
        "inv_aspirobot": null
    };
}
Salon.prototype.nom = "salon";
Salon.prototype.getSprites = function () {
    return this.sprites;
}
Salon.prototype.affiche = function (jeu) {
    jeu.afficheFond(this.sprites.salon);
    jeu.ajouteObjet(
        this.sprites.salon_porteatelier,
        524,
        102,
        function (jeu) {
            jeu.texte("L'atelier de mon père.");
        },
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte("Il y a plein de choses, c'est autant d'idées.");
                jeu.inventaireAjoute("inv_planches");
                jeu.inventaireAjoute("inv_tole");
                jeu.inventaireAjoute("inv_perceuse");
                jeu.inventaireAjoute("inv_scie");
                jeu.inventaireAjoute("inv_chalumeau");
                jeu.inventaireAjoute("inv_moustikiller");
            } else {
                jeu.texte("Je ne peux pas y aller.");
            }
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_portechambre,
        326,
        115,
        function (jeu) {
            jeu.texte("Ma chambre.");
        },
        function (jeu) {
            jeu.scene("chambre");
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_portecuisine,
        0,
        81,
        function (jeu) {
            jeu.texte("La cuisine.");
        },
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte("Il y a une passoire, c'est une idée.");
                jeu.inventaireAjoute("inv_passoire");
            } else {
                jeu.texte("Je n'ai rien à y faire.");
            }
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_baseaspirobot,
        69,
        314,
        function (jeu) {
            jeu.texte("C'est la base de l'aspirateur-robot, il y revient de temps en temps se recharger.");
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_chaine,
        144,
        236,
        function (jeu) {
            jeu.texte("C'est la chaîne Hi-Fi, on écoute la radio ou bien des CDs.");
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_araignee,
        72,
        86,
        function (jeu) {
            jeu.texte("Une toile d'araignée. L'aspirateur-robot ne va pas jusque là. J'ai proposé aux parents de l'améliorer pour qu'il puisse grimper mur, mais ils n'ont pas eu l'air emballés...");
        },
        function (jeu) {
            jeu.texte("Je ne peux pas l'atteindre.");
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_cds,
        121,
        279,
        function (jeu) {
            if (jeu._model.salon.robotSousMeuble) {
                jeu.texte("Hey, l'aspirateur-robot est dessous. Je vais le décoincer.", function () {
                    jeu._model.salon.robotDecoince = true;
                });
            } else {
                jeu.texte("La collection de CDs de mes parents, il y en a tellement ! Tout ça tient dans une clé USB, mais c'est moins joli.");
            }
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_maman,
        459,
        324,
        function (jeu) {
            jeu.texte("Ma maman. Elle se repose, elle a beaucoup travaillé aujourd'hui.");
        },
        function (jeu) {
            jeu.choix({
                "texte1": "Maman, tu sais où est l'aspirateur-robot ?",
                "cb1": function (jeu) {
                    jeu.texte("Je ne sais pas, peut-être sous le meuble de la chaîne, il se coince parfois dessous.");
                    jeu._model.salon.robotSousMeuble = true;
                },
                "texte2": "Non, rien."
            });
        }
    );
    jeu.ajouteObjet(
        this.sprites.salon_yeuxmaman,
        585,
        348
    );
    if (jeu._model.salon.robotDecoince) {
        jeu.ajouteObjet(
            this.sprites.inv_aspirobot,
            150,
            345,
            function (jeu) {
                if (jeu._model.etape === "recherche") {
                    jeu.texte("L'apirateur-robot a des capteurs de proximité, un moteur, une bonne batterie... C'est une idée.");
                    jeu.inventaireAjoute("inv_aspirobot");
                }
            },
            function (jeu) {
                if (jeu._model.etape === "recherche") {
                    jeu.texte("Pour l'instant, je cherche des idées, je ne prends rien.");
                } else {
                    jeu.texte("Laisse cet aspirateur tranquille ! Il est très bien comme il est !");
                }
            }
        );
    }
};