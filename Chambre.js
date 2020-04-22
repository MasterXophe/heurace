const Chambre = function () {
    this.sprites = {
        "chambre": null,
        "chambre_crayons": null,
        "chambre_terrarium": null,
        "chambre_livres": null,
        "chambre_porte": null,
        "chambre_cailloux": null,
        "chambre_tapis": null,
        "chambre_poster": null,
        "chambre_fenetre": null,
        "chambre_lit": null,
        "chambre_tiroirlit": null,
        "chambre_ordinateur": null,
        "chambre_bazaravec": null,
        "chambre_bazarsans": null
    }
};
Chambre.prototype.nom = "chambre";
Chambre.prototype.getSprites = function() {
    return this.sprites;
}
Chambre.prototype.affiche = function (jeu) {
    let that = this;
    jeu.afficheFond(this.sprites.chambre);
    jeu.ajouteObjet(
        this.sprites.chambre_crayons,
        259,
        274,
        function (jeu) {
            jeu.texte("Mes crayons. Il y a des noirs, des bleus, un rouge, un vert et un vide.");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_terrarium,
        115,
        268,
        function (jeu) {
            jeu.texte("Mon terrarium, qui abrite une colonie de fourmis.");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_livres,
        81,
        313,
        function (jeu) {
            jeu.texte("Mes livres. Ce ne sont que des livres de sciences.");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_porte,
        0,
        88,
        function (jeu) {
            jeu.texte("La porte de ma chambre. Derrière, c'est le salon.");
        },
        function(jeu) {
            jeu.scene("salon");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_cailloux,
        89,
        158,
        function (jeu) {
            jeu.texte("Ma collection de cailloux.");
        },
        function (jeu) {
            if (jeu._model.etape === "recherche") {
                jeu.texte("Pour l'instant, je cherche juste des idées.");
                return;
            }
            jeu.texte("Je les aime beaucoup, mais de là à me les trimballer sans raison...");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_tapis,
        158,
        363,
        function (jeu) {
            jeu.texte("Tiens, un tapis !?! Je ne l'avais jamais remarqué...");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_poster,
        431,
        94,
        function (jeu) {
            jeu.texte("C'est un poster d'explosion atomique. Les explosions atomiques, c'est ce que je préfère. J'économise pour acheter du plutonium et en faire exploser une dans le jardin. Mais chut ! c'est une surprise pour mes parents.");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_fenetre,
        566,
        103,
        function (jeu) {
            if (jeu._model.chambre.fenetreRegardee) {
                jeu.texte("Je ne vois rien d'intéressant dehors.");
            } else {
                jeu.texte("La fenêtre");
                jeu._model.chambre.fenetreRegardee = true;
            }
        },
        function (jeu) {
            jeu.texte("Je préfère ne pas l'ouvrir, qui sait ce qu'il y a dehors ?");
        }
    );
    jeu.ajouteObjet(
        this.sprites.chambre_lit,
        490,
        293,
        function (jeu) {
            jeu.texte("Mon lit. Il y a un grand tiroir dessous où je peux ranger mes inventions.");
        },
        function (jeu) {
            jeu._model.chambre.litOuvert = !jeu._model.chambre.litOuvert;
        }
    );
    if (jeu._model.chambre.litOuvert) {
        jeu.ajouteObjet(
            this.sprites.chambre_tiroirlit,
            474,
            309,
            function (jeu) {
                if (jeu._model.chambre.tiroirCherche) {
                    if (jeu.inventaireContient("ideeVoiture")) {
                        jeu.texte("J'ai bien cherché, il n'y a plus rien d'intéressant.");
                    } else {
                        jeu.texte("Ok, je vais fouiller un peu. Oh, ma voiture télécommandée ! C'est une idée.");
                        jeu.inventaireAjoute("ideeVoiture");
                    }
                } else {
                    jeu.texte("Il y a beaucoup de choses dans ce tiroir. Au premier coup d'oeil, je ne vois rien d'intéressant.");
                    jeu._model.chambre.tiroirCherche = true;
                }
            },
            function (jeu) {
                jeu._model.chambre.litOuvert = false;
            }
        );
    }
    jeu.ajouteObjet(
        this.sprites.chambre_ordinateur,
        308,
        229,
        function (jeu) {
            jeu.texte("Mon ordinateur.\nJe passe la moitié de mon temps à travailler dessus... et l'autre moitié à me divertir dessus.");
        },
        function (jeu) {
            that._utiliserOrdinateur(jeu);
        }
    );
    if (jeu._model.chambre.cartePrise) {
        jeu.ajouteObjet(
            this.sprites.chambre_bazarsans,
            146,
            153,
            function (jeu) {
                jeu.texte("Une caisse avec du bazar. Mais du bazar rangé.");
            }
        );
    } else {
        jeu.ajouteObjet(
            this.sprites.chambre_bazaravec,
            146,
            153,
            function (jeu) {
                if (jeu._model.etape === "recherche") {
                    jeu.texte("Une caisse avec du bazar. Ah, une carte électronique que je peux programmer ! C'est une idée.");
                    jeu.inventaireAjoute("ideeCarte");
                } else {
                    jeu.texte("Une caisse avec du bazar. Mais du bazar rangé.");
                }
            },
            function (jeu) {
                if (jeu._model.etape === "recherche") {
                    jeu.texte("Je ne vais rien prendre pour l'instant, j'attends de savoir ce qu'il me faut.");
                } else {
                    jeu.texte("Je prends la carte électronique.", function () {
                        jeu.inventaireAjoute("carte");
                        jeu._model.chambre.cartePrise = true;
                    });
                }
            }
        );
    }
    if (!jeu._model.debut) {
        jeu.texte("Nouveau mail : Grand concours de robots de combat !", function () {
            jeu.texte("Génialique ! Voilà un défi pour moi ! Je vais construire un robot de combat hypra-super-mortel et remporter ce concours.\nVoyons, il me faut un chassis, une arme, un blindage et un contrôleur. Je vais fouiller la maison pour voir ce que je pourrais utiliser.");
        });
        jeu._model.debut = true;
        jeu._model.etape = "recherche";
        // TODO test
        jeu.inventaireAjoute("ideeAspirobot");
        jeu.inventaireAjoute("ideePassoire");
        jeu.inventaireAjoute("ideePlanches");
        jeu.inventaireAjoute("ideeTole");
        jeu.inventaireAjoute("ideePerceuse");
        jeu.inventaireAjoute("ideeScie");
        jeu.inventaireAjoute("ideeChalumeau");
        jeu.inventaireAjoute("ideeMoustikiller");
    }
};
Chambre.prototype._utiliserOrdinateur = function (jeu) {
    let that = this;
    jeu.choix({
        "texte1": "Mail...",
        "cb1": function () {
            jeu.choix({
                "texte1": "Lire le mail du concours",
                "cb1": function () {
                    jeu.texte("Je ne me lasse pas de le relire. C'est comme un cadeau de Noël !");
                },
                "texte2": "Répondre au mail du concours",
                "cb2": function () {
                    if (jeu._model.etape === "termine") {
                        jeu.texte("Et voilà, je suis inscrit ! Muhahaha, que j'ai hâte !", function () {
                            jeu.scene("fin");
                        });
                    } else {
                        jeu.texte("Mon robot n'est pas encore prêt ! Il faut d'abord que je le termine.");
                    }
                },
                "texte3": "Quitter",
                "cb3": function () {
                    that._utiliserOrdinateur(jeu);
                }
            });
        },
        "texte2": "Navigateur web...",
        "cb2": function () {
            jeu.texte("Je n'ai rien à rechercher, et je n'ai pas de temps à perdre avec des vidéos de chat pour le moment : je dois terminer mon robot !");
        },
        "texte3": "Concevoir un plan...",
        "cb3": function () {
            switch (jeu._model.etape) {
                case "recherche": {
                    if (jeu.inventaireContient("ideeAspirobot")
                        && jeu.inventaireContient("ideeVoiture")
                        && jeu.inventaireContient("ideePassoire")
                        && jeu.inventaireContient("ideePlanches")
                        && jeu.inventaireContient("ideeTole")
                        && jeu.inventaireContient("ideePerceuse")
                        && jeu.inventaireContient("ideeScie")
                        && jeu.inventaireContient("ideeChalumeau")
                        && jeu.inventaireContient("ideeMoustikiller")
                        && jeu.inventaireContient("ideeCarte")
                    ) {
                        jeu.texte("J'ai assez d'idées. Je dois choisir le chassis, le blindage, l'arme et le contrôleur qui ensemble formeront mon supra robot de combat.", function () {
                            that._conceptionChassis(jeu);
                        });
                    } else {
                        jeu.texte("Il me faut plus d'idées avant de commencer à concevoir un plan.");
                    }
                    break;
                }
                case "collecte": {
                    jeu.texte("J'ai le plan : il me faut maintenant l'aspirateur-robot, la plaque de tôle découpée, la scie circulaire et la carte électronique.");
                    break;
                }
                default:
                    break;
            }
        },
        "texte4": "Quitter"
    });
}
Chambre.prototype._conceptionChassis = function (jeu) {
    let that = this;
    jeu.choix({
        "texte1": "Chassis : aspirateur-robot",
        "cb1": function () {
            that._conceptionBlindage(jeu, "a");
        },
        "texte2": "Chassis : voiture télécommandée",
        "cb2": function () {
            that._conceptionBlindage(jeu, "v");
        }
    });
}
Chambre.prototype._conceptionBlindage = function (jeu, plan) {
    let that = this;
    jeu.choix({
        "texte1": "Blindage : passoire",
        "cb1": function () {
            that._conceptionArme(jeu, plan + "p");
        },
        "texte2": "Blindage : planche de bois",
        "cb2": function () {
            that._conceptionArme(jeu, plan + "b");
        },
        "texte3": "Blindage : plaque de tôle",
        "cb3": function () {
            that._conceptionArme(jeu, plan + "t");
        }
    });
}
Chambre.prototype._conceptionArme = function (jeu, plan) {
    let that = this;
    jeu.choix({
        "texte1": "Arme : perceuse",
        "cb1": function () {
            that._conceptionControleur(jeu, plan + "p");
        },
        "texte2": "Arme : scie circulaire",
        "cb2": function () {
            that._conceptionControleur(jeu, plan + "s");
        },
        "texte3": "Arme : chalumeau",
        "cb3": function () {
            that._conceptionControleur(jeu, plan + "c");
        }
    });
}
Chambre.prototype._conceptionControleur = function (jeu, plan) {
    let that = this;
    jeu.choix({
        "texte1": "Contrôleur : contrôleur du mousti-killer",
        "cb1": function () {
            that._conceptionFinale(jeu, plan + "m");
        },
        "texte2": "Contrôleur : carte électronique",
        "cb2": function () {
            that._conceptionFinale(jeu, plan + "c");
        }
    });
}
Chambre.prototype._conceptionFinale = function (jeu, plan) {
    let that = this;
    switch (plan) {
        case "appm":
        case "appc":
        case "apsm":
        case "apsc":
        case "apcm":
        case "apcc":
        case "vppm":
        case "vppc":
        case "vpsm":
        case "vpsc":
        case "vpcm":
        case "vpcc":
            jeu.texte("J'ai peur que la passoire ne protège pas assez.\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
        case "abpm":
        case "abpc":
        case "atpm":
        case "atpc":
        case "vbpm":
        case "vbpc":
        case "vtpm":
        case "vtpc":
            jeu.texte("La perceuse, c'est un peu léger comme arme.\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
        case "absm":
        case "absc":
            jeu.texte("Pas mal. Mais si on m'attaque au chalumeau ?\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
        case "abcm":
        case "vbcm":
        case "abcc":
        case "vbcc":
            jeu.texte("Une protection en bois avec un chalumeau ? Pas l'idée du siècle...\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
        case "atsm":
            jeu.texte("Ça me plaît... mais j'aimerais avoir le contrôle, et je ne sais pas trop comment réagit le Moustikiller.\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
        case "atsc": {
            jeu.texte("Ouais, ça tient la route ! L'aspirateur est robuste, la tôle offrira une bonne protection, la scie circulaire sera meurtrière et je pourrai le programmer comme je le souhaite.", function () {
                jeu.texte("Il me faut maintenant rassembler tous les éléments nécessaires, découper la tôle suivant mes plans et assembler le robot !");
            });
            jeu._model.etape = "collecte";
            jeu.inventaireRetire("ideeAspirobot");
            jeu.inventaireRetire("ideeVoiture");
            jeu.inventaireRetire("ideePassoire");
            jeu.inventaireRetire("ideePlanches");
            jeu.inventaireRetire("ideeTole");
            jeu.inventaireRetire("ideePerceuse");
            jeu.inventaireRetire("ideeScie");
            jeu.inventaireRetire("ideeChalumeau");
            jeu.inventaireRetire("ideeMoustikiller");
            jeu.inventaireRetire("ideeCarte");
            return;
        }
        case "atcm":
        case "atcc":
            jeu.texte("C'est bien, mais je doute sur le chalumeau. C'est impressionnant, mais est-ce vraiment si destructeur ?\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
        case "vbsm":
        case "vbsc":
            jeu.texte("Ça fait un robot rapide et réactif, mais peut-être un peu léger pour tenir le choc face à des adversaires plus costauds.\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
        case "vtsm":
        case "vtsc":
        case "vtcm":
        case "vtcc":
            jeu.texte("Ma petite voiture télécommandée ne supportera pas le poids de la tôle. Il me faut un chassis plus robuste ou un blindage pluis léger.\nRecommençons !", function () {
                that._conceptionChassis(jeu);
            });
            break;
    }
}