const CHAMBRE_OBJETS = {
    "chambre": function(jeu) {
        return {
            "nom": "chambre",
            "sprite": jeu.sprites.chambre.fond,
            "x": 0,
            "y": 0
        }
    },
    "crayons": function(jeu) {
        return {
            "nom": "crayons",
            "sprite": jeu.sprites.chambre.crayons,
            "x": 259,
            "y": 274,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Mes crayons. Il y a des noirs, des bleus, un rouge, un vert et un vide."});
            }
        }
    },
    "terrarium": function(jeu) {
        return {
            "nom": "terrarium",
            "sprite": jeu.sprites.chambre.terrarium,
            "x": 115,
            "y": 268,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Mon terrarium, qui abrite une colonie de fourmis."});
            }
        }
    },
    "livres": function(jeu) {
        return {
            "nom": "livres",
            "sprite": jeu.sprites.chambre.livres,
            "x": 81,
            "y": 313,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Mes livres. Ce ne sont que des livres de sciences."});
            }
        }
    },
    "porte": function(jeu) {
        return {
            "nom": "porte",
            "sprite": jeu.sprites.chambre.porte,
            "x": 0,
            "y": 88,
            "useCb": function(jeu) {
                jeu.scene("salon");
            }
        }
    },
    "cailloux": function(jeu) {
        if(jeu.inventaireContient("cailloux") || jeu.model.cuisine.blender === "cailloux") {
            return null;
        }
        return {
            "nom": "cailloux",
            "sprite": jeu.sprites.chambre.cailloux,
            "x": 89,
            "y": 158,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Ma collection de cailloux."});
            },
            "useCb": function(jeu) {
                if(jeu.model.etape === "recherche") {
                    jeu.texte({"texte": "Pour l'instant, je cherche juste des idées."});
                    return;
                }
                if(jeu.model.cuisine.blender === "explication") {
                    jeu.texte({"texte": "Je vais peut-être retenter l'expérience du blender..."});
                    jeu.inventaireAjoute("cailloux");
                    return;
                }
                jeu.texte({"texte": "Je les aime beaucoup, mais de là à me les trimballer sans raison..."});
            }
        }
    },
    "tapis": function(jeu) {
        return {
            "nom": "tapis",
            "sprite": jeu.sprites.chambre.tapis,
            "x": 158,
            "y": 363,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Tiens, un tapis !?! Je ne l'avais jamais remarqué..."});
            }
        }
    },
    "poster": function(jeu) {
        return {
            "nom": "poster",
            "sprite": jeu.sprites.chambre.poster,
            "x": 431,
            "y": 94,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est un poster d'explosion atomique. Les explosions atomiques, c'est ce que je préfère. J'économise pour acheter du plutonium et en faire exploser une dans le jardin. Mais chut ! c'est une surprise pour mes parents."});
            }
        }
    },
    "fenetre":function(jeu) {
        return {
            "nom": "fenetre",
            "sprite": jeu.sprites.chambre.fenetre,
            "x": 566,
            "y": 103,
            "seeCb": function(jeu) {
                if(jeu.model.chambre.fenetreRegardee) {
                    jeu.texte({"texte": "Je ne vois rien d'intéressant dehors."});
                } else {
                    jeu.texte({"texte": "La fenêtre"});
                    jeu.model.chambre.fenetreRegardee = true;
                }
            },
            "useCb": function(jeu) {
                jeu.texte({"texte": "Je préfère ne pas l'ouvrir, qui sait ce qu'il y a dehors ?"});
            }
        }
    },
    "lit": function(jeu) {
        return {
            "nom": "lit",
            "sprite": jeu.sprites.chambre.lit,
            "x": 490,
            "y": 293,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Mon lit. Il y a un grand tiroir dessous où je peux ranger mes inventions."});
            },
            "useCb": function(jeu) {
                jeu.model.chambre.litOuvert = !jeu.model.chambre.litOuvert;
            }

        }
    },
    "tiroirlit": function(jeu) {
        if(jeu.model.chambre.litOuvert) {
            return {
                "nom": "tiroirlit",
                "sprite": jeu.sprites.chambre.tiroirlit,
                "x": 474,
                "y": 309,
                "seeCb": function(jeu) {
                    if(jeu.model.chambre.tiroirCherche) {
                        if(jeu.inventaireContient("idee_voiture")) {
                            jeu.texte({"texte": "J'ai bien cherché, il n'y a plus rien d'intéressant."});
                        } else {
                            jeu.texte({"texte": "Ok, je vais fouiller un peu. Oh, ma voiture télécommandée ! C'est une idée."});
                            jeu.inventaireRemplace("idee", "idee_voiture");
                        }
                    } else {
                        jeu.texte({"texte": "Il y a beaucoup de choses dans ce tiroir. Au premier coup d'oeil, je ne vois rien d'intéressant."});
                        jeu.model.chambre.tiroirCherche = true;
                    }
                },
                "useCb": function(jeu) {
                    jeu.model.chambre.litOuvert = false;
                }
            }
        }
        return null;
    },
    "ordinateur": function(jeu) {
        const _utiliserOrdinateur = function(jeu) {
            jeu.choix({
                "qui": jeu.sprites.chambre.ordinateur,
                "choix": [{
                    "texte": "Mail...",
                    "cb": function() {
                        jeu.choix({
                            "qui": jeu.sprites.chambre.ordinateur,
                            "choix": [{
                                "texte": "Lire le mail du concours",
                                "cb": function() {
                                    jeu.texte({"texte": "Je ne me lasse pas de le relire. C'est comme un cadeau de Noël !"});
                                }
                            }, {
                                "texte": "Répondre au mail du concours",
                                "cb": function() {
                                    if(jeu.model.etape === "termine") {
                                        jeu.texte({
                                            "texte": "Et voilà, je suis inscrit ! Muhahaha, que j'ai hâte !", "cb": function() {
                                                jeu.scene("fin");
                                            }
                                        });
                                    } else {
                                        jeu.texte({"texte": "Mon robot n'est pas encore prêt ! Il faut d'abord que je le termine."});
                                    }
                                }
                            }, {
                                "texte": "Quitter",
                                "cb": function() {
                                    _utiliserOrdinateur(jeu);
                                }
                            }]
                        });
                    }
                }, {
                    "texte": "Navigateur web...",
                    "cb": function() {
                        if(jeu.model.mamanChanson === "titre") {
                            jeu.choix({
                                "choix": [{
                                    "texte": "Recherche : morgen band couple balade fjord",
                                    "cb": function(jeu) {
                                        jeu.texte({
                                            "qui": jeu.sprites.qui.ordinateur,
                                            "texte": "Morgen Mergen par Mørgen band, de l'album Margen Murgen (1997).",
                                            "cb": function(jeu) {
                                                jeu.texte({"texte": "Voila, j'ai trouvé !"});
                                                jeu.model.mamanChanson = "trouve";
                                            }
                                        });
                                    }
                                }]
                            });
                            return;
                        }
                        jeu.texte({"texte": "Je n'ai rien à rechercher, et je n'ai pas de temps à perdre avec des vidéos de chat pour le moment : je dois terminer mon robot !"});
                    }
                }, {
                    "texte": "Concevoir un plan...",
                    "cb": function() {
                        switch(jeu.model.etape) {
                            case "recherche": {
                                if(jeu.inventaireContient("idee_aspirobot")
                                    && jeu.inventaireContient("idee_voiture")
                                    && jeu.inventaireContient("idee_passoire")
                                    && jeu.inventaireContient("idee_planches")
                                    && jeu.inventaireContient("idee_tole")
                                    && jeu.inventaireContient("idee_perceuse")
                                    && jeu.inventaireContient("idee_scie")
                                    && jeu.inventaireContient("idee_chalumeau")
                                    && jeu.inventaireContient("idee_moustikiller")
                                    && jeu.inventaireContient("idee_carte")
                                ) {
                                    jeu.texte({
                                        "texte": "J'ai assez d'idées. Je dois choisir le chassis, le blindage, l'arme et le contrôleur qui ensemble formeront mon supra robot de combat.",
                                        "cb": function() {
                                            _conceptionChassis(jeu);
                                        }
                                    });
                                } else {
                                    jeu.texte({"texte": "Il me faut plus d'idées avant de commencer à concevoir un plan."});
                                }
                                break;
                            }
                            case "collecte": {
                                jeu.texte({"texte": "J'ai le plan : il me faut maintenant l'aspirateur-robot, la plaque de tôle découpée, la scie circulaire et la carte électronique."});
                                break;
                            }
                            default:
                                break;
                        }
                    }
                }, {
                    "texte": "Quitter"
                }]
            });
        }
        const _conceptionChassis = function(jeu) {
            jeu.choix({
                "qui": jeu.sprites.chambre.ordinateur,
                "choix": [{
                    "texte": "Chassis : aspirateur-robot",
                    "cb": function() {
                        _conceptionBlindage(jeu, "a");
                    }
                }, {
                    "texte": "Chassis : voiture télécommandée",
                    "cb": function() {
                        _conceptionBlindage(jeu, "v");
                    }
                }]
            });
        }
        const _conceptionBlindage = function(jeu, plan) {
            jeu.choix({
                "qui": jeu.sprites.chambre.ordinateur,
                "choix": [{
                    "texte": "Blindage : passoire",
                    "cb": function() {
                        _conceptionArme(jeu, plan + "p");
                    }
                }, {
                    "texte": "Blindage : planche de bois",
                    "cb": function() {
                        _conceptionArme(jeu, plan + "b");
                    }
                }, {
                    "texte": "Blindage : plaque de tôle",
                    "cb": function() {
                        _conceptionArme(jeu, plan + "t");
                    }
                }]
            });
        }
        const _conceptionArme = function(jeu, plan) {
            jeu.choix({
                "qui": jeu.sprites.chambre.ordinateur,
                "choix": [{
                    "texte": "Arme : perceuse",
                    "cb": function() {
                        _conceptionControleur(jeu, plan + "p");
                    }
                }, {
                    "texte": "Arme : scie circulaire",
                    "cb": function() {
                        _conceptionControleur(jeu, plan + "s");
                    }
                }, {
                    "texte": "Arme : chalumeau",
                    "cb": function() {
                        _conceptionControleur(jeu, plan + "c");
                    }
                }]
            });
        }
        const _conceptionControleur = function(jeu, plan) {
            jeu.choix({
                "qui": jeu.sprites.chambre.ordinateur,
                "choix": [{
                    "texte": "Contrôleur : carte électronique",
                    "cb": function() {
                        _conceptionFinale(jeu, plan + "c");
                    }
                }, {
                    "texte": "Contrôleur : contrôleur du mousti-killer",
                    "cb": function() {
                        _conceptionFinale(jeu, plan + "m");
                    }
                }]
            });
        }
        const _conceptionFinale = function(jeu, plan) {
            switch(plan) {
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
                    jeu.texte({
                        "texte": "J'ai peur que la passoire ne protège pas assez.\nRecommençons !", "cb": function() {
                            _conceptionChassis(jeu);
                        }
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
                    jeu.texte({
                        "texte": "La perceuse, c'est un peu léger comme arme.\nRecommençons !", "cb": function() {
                            _conceptionChassis(jeu);
                        }
                    });
                    break;
                case "absm":
                case "absc":
                    jeu.texte({
                        "texte": "Pas mal. Mais si on m'attaque au chalumeau ?\nRecommençons !", "cb": function() {
                            _conceptionChassis(jeu);
                        }
                    });
                    break;
                case "abcm":
                case "vbcm":
                case "abcc":
                case "vbcc":
                    jeu.texte({
                        "texte": "Une protection en bois avec un chalumeau ? Pas l'idée du siècle...\nRecommençons !",
                        "cb": function() {
                            _conceptionChassis(jeu);
                        }
                    });
                    break;
                case "atsm":
                    jeu.texte({
                        "texte": "Ça me plaît... mais j'aimerais avoir le contrôle, et je ne sais pas trop comment réagit le Moustikiller.\nRecommençons !",
                        "cb": function() {
                            _conceptionChassis(jeu);
                        }
                    });
                    break;
                case "atsc": {
                    jeu.texte({
                        "texte": "Ouais, ça tient la route ! L'aspirateur est robuste, la tôle offrira une bonne protection, la scie circulaire sera meurtrière et je pourrai le programmer comme je le souhaite.",
                        "cb": function() {
                            jeu.texte({"texte": "Il me faut maintenant rassembler tous les éléments nécessaires, découper la tôle suivant mes plans et assembler le robot !"});
                        }
                    });
                    jeu.model.etape = "collecte";
                    jeu.inventaireRetire("idee_aspirobot");
                    jeu.inventaireRetire("idee_voiture");
                    jeu.inventaireRetire("idee_passoire");
                    jeu.inventaireRetire("idee_planches");
                    jeu.inventaireRetire("idee_tole");
                    jeu.inventaireRetire("idee_perceuse");
                    jeu.inventaireRetire("idee_scie");
                    jeu.inventaireRetire("idee_chalumeau");
                    jeu.inventaireRetire("idee_moustikiller");
                    jeu.inventaireRetire("idee_carte");
                    jeu.inventaireAjoute("objectif_aspirobot");
                    jeu.inventaireAjoute("objectif_toledecoupee");
                    jeu.inventaireAjoute("objectif_scie");
                    jeu.inventaireAjoute("objectif_carte");
                    return;
                }
                case "atcm":
                case "atcc":
                    jeu.texte({
                        "texte": "C'est bien, mais je doute sur le chalumeau. C'est impressionnant, mais est-ce vraiment si destructeur ?\nRecommençons !",
                        "cb": function() {
                            _conceptionChassis(jeu);
                        }
                    });
                    break;
                case "vbsm":
                case "vbsc":
                    jeu.texte({
                        "texte": "Ça fait un robot rapide et réactif, mais peut-être un peu léger pour tenir le choc face à des adversaires plus costauds.\nRecommençons !",
                        "cb": function() {
                            _conceptionChassis(jeu);
                        }
                    });
                    break;
                case "vtsm":
                case "vtsc":
                case "vtcm":
                case "vtcc":
                    jeu.texte({
                        "texte": "Ma petite voiture télécommandée ne supportera pas le poids de la tôle. Il me faut un chassis plus robuste ou un blindage pluis léger.\nRecommençons !",
                        "cb": function() {
                            _conceptionChassis(jeu);
                        }
                    });
                    break;
            }
        }
        return {
            "nom": "ordinateur",
            "sprite": jeu.sprites.chambre.ordinateur,
            "x": 308,
            "y": 229,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Mon ordinateur.\nJe passe la moitié de mon temps à travailler dessus... et l'autre moitié à me divertir dessus."});
            },
            "useCb": function(jeu) {
                _utiliserOrdinateur(jeu);
            }
        }
    },
    "bazar": function(jeu) {
        if(jeu.inventaireContient("carte")) {
            return {
                "nom": "bazar",
                "sprite": jeu.sprites.chambre.bazarsans,
                "x": 146,
                "y": 153,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "Une caisse avec du bazar. Mais du bazar rangé."});
                }
            }
        } else {
            return {
                "nom": "bazar",
                "sprite": jeu.sprites.chambre.bazaravec,
                "x": 146,
                "y": 153,
                "seeCb": function(jeu) {
                    if(jeu.model.etape === "recherche") {
                        if(jeu.inventaireContient("idee_carte")) {
                            jeu.texte({"texte": "Une caisse avec du bazar, mais rien d'autre d'intéressant."});
                        } else {
                            jeu.texte({"texte": "Une caisse avec du bazar. Ah, une carte électronique que je peux programmer ! C'est une idée."});
                            jeu.inventaireRemplace("idee", "idee_carte");
                        }
                    } else {
                        jeu.texte({"texte": "Une caisse avec du bazar. Mais du bazar rangé."});
                    }
                },
                "useCb": function(jeu) {
                    if(jeu.model.etape === "recherche") {
                        jeu.texte({"texte": "Je ne vais rien prendre pour l'instant, j'attends de savoir ce qu'il me faut."});
                    } else {
                        if(!jeu.inventaireContient("carte")) {
                            jeu.texte({
                                "texte": "Je prends la carte électronique.", "cb": function() {
                                    jeu.inventaireRemplace("objectif_carte", "carte");
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}