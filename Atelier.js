const Atelier = function () {
    this.sprites = {
        "atelier": null,
        "atelier_affiche": null,
        "atelier_casiers": null,
        "atelier_chalumeau": null,
        "atelier_masque": null,
        "atelier_moustikiller": null,
        "atelier_papa": null,
        "atelier_perceuse": null,
        "atelier_planches": null,
        "atelier_porte": null,
        "atelier_scie": null,
        "papa": null
    };
}
Atelier.prototype.nom = "atelier";
Atelier.prototype.getSprites = function () {
    return this.sprites;
}
Atelier.prototype.affiche = function (jeu) {
    jeu.afficheFond(this.sprites.atelier);
    jeu.ajouteObjet(
        this.sprites.atelier_perceuse,
        547,
        369,
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({
                    "texte": "Une perceuse, avec la bonne mèche, ça peut faire du dégât. C'est une idée.",
                    "cb": function () {
                        jeu.inventaireAjoute("inv_perceuse");
                    }
                });
            }
        },
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                jeu.texte({"texte": "Je n'ai pas le temps de faire des petits trous, je dois construire mon robot."});
            }
        }
    );
    jeu.ajouteObjet(
        this.sprites.atelier_affiche,
        393,
        108,
        function (jeu) {
            jeu.texte({"texte": "Les consignes de sécurité qu'il faut respecter dans l'atelier."});
        }
    );
    jeu.ajouteObjet(
        this.sprites.atelier_casiers,
        178,
        156,
        function (jeu) {
            jeu.texte({"texte": "Mon père passe des heures à ranger les vis, les boulons, les écrous et autres trucs bien chacun dans sa petite case."});
        },
        function (jeu) {
            jeu.choix({
                "texte1": "Et si je dérangeais un truc ?",
                "cb1": function (jeu) {
                    jeu.texte({
                        "texte": "Ok, c'est parti, revoyons légèrement le classement par mon ordre favori : l'ordre aléatoire !",
                        "cb": function (jeu) {
                            jeu._model.atelier.casiersDeranges = true;
                        }
                    });
                },
                "texte2": "Non, ce serait méchant... Et puis pourquoi faire ça ?"
            });
        }
    );
    if (jeu._model.atelier.masqueBouge) {
        jeu.ajouteObjet(
            this.sprites.atelier_masque,
            322,
            211,
            function (jeu) {
                jeu.texte({"texte": "C'est le masque qui sert avec le chalumeau pour la soudure."});
            }
        );
    }
    jeu.ajouteObjet(
        this.sprites.atelier_chalumeau,
        302,
        228,
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({
                    "texte": "Oh le beau chalumeau, comme il a l'air dangereux ! C'est une idée.",
                    "cb": function () {
                        jeu.inventaireAjoute("inv_chalumeau");
                    }
                });
            }
        },
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                jeu.texte({"texte": "Je n'ai pas le temps de jouer, je dois construire mon robot."});
            }
        }
    );
    if (!jeu._model.atelier.masqueBouge) {
        jeu.ajouteObjet(
            this.sprites.atelier_masque,
            304,
            219,
            function (jeu) {
                jeu.texte({"texte": "C'est un masque qui sert avec le chalumeau pour la soudure, mais je ne sais pas où est le chalumeau."});
            },
            function (jeu) {
                jeu._model.atelier.masqueBouge = true;
            }
        );
    }
    jeu.ajouteObjet(
        this.sprites.atelier_moustikiller,
        516,
        253,
        function (jeu) {
            jeu.texte({
                "texte": "Le Moustikiller, la dernière invention de mon père. Il a couplé un détecteur de mouvement très sensible avec un laser très puissant. Son rôle est de réperer et de cramer les moustiques...",
                "cb": function (jeu) {
                    jeu.texte({
                        "texte": "Le problème, c'est que le détecteur ne distingue pas un moustique d'un chat, et que le laser est suffisamment puissant pour tuer un chat... C'est pour ça qu'on a plus de chat.",
                        "cb": function (jeu) {
                            jeu.texte({
                                "texte": "Le contrôleur du Moustikiller est programmé pour détecter et tuer. C'est une idée.",
                                "cb": function (jeu) {
                                    jeu.inventaireAjoute("inv_moustikiller");
                                }
                            });
                        }
                    });
                }
            });
        },
        function (jeu) {
            jeu.texte({"texte": "Sérieusement, je préfère ne pas y toucher !"});
        }
    );
    jeu.ajouteObjet(
        this.sprites.atelier_papa,
        532,
        258,
        function (jeu) {
            jeu.texte({"texte": "Mon papa, il est inventeur."});
        },
        function (jeu) {
            jeu.choix({
                "texte1": "Non, rien"
            });
        }
    );
    jeu.ajouteObjet(
        this.sprites.atelier_planches,
        231,
        313,
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({
                    "texte": "Avec du bois, je pourrais faire une protection pour mon robot. C'est une idée.",
                    "cb": function () {
                        jeu.inventaireAjoute("inv_planches");
                    }
                });
            }
        },
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                jeu.texte({"texte": "Je n'en ai pas besoin."});
            }
        }
    );
    jeu.ajouteObjet(
        this.sprites.atelier_porte,
        16,
        78,
        function (jeu) {
            jeu.texte({"texte": "Le salon"});
        },
        function (jeu) {
            jeu.scene("salon");
        }
    );
    jeu.ajouteObjet(
        this.sprites.atelier_scie,
        185,
        308,
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({
                    "texte": "Une scie circulaire. Ça découpe n'importe quoi, souvent même ce qu'on ne veut pas. C'est une idée.",
                    "cb": function () {
                        jeu.inventaireAjoute("inv_scie");
                    }
                });
            }
        },
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                jeu.texte({"qui": "papa", "texte": "Ne touche pas à ça, c'est dangereux !"});
            }
        }
    );
};