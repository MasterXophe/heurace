const SALON_OBJETS = {
    "salon": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.fond,
            "x": 0,
            "y": 0
        }
    },
    "porteatelier": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.porteatelier,
            "x": 524,
            "y": 102,
            "useCb": function(jeu) {
                jeu.scene("atelier");
            }
        }
    },
    "portechambre": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.portechambre,
            "x": 326,
            "y": 115,
            "useCb": function(jeu) {
                jeu.scene("chambre");
            }
        }
    },
    "portecuisine": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.portecuisine,
            "x": 0,
            "y": 81,
            "useCb": function(jeu) {
                jeu.scene("cuisine");
            }
        }
    },
    "baseaspirobot": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.baseaspirobot,
            "x": 69,
            "y": 314,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est la base de l'aspirateur-robot, il y revient de temps en temps se recharger. Il faut que je le trouve, ça pourrait être une idée."});
                jeu.model.salon.aspiCherche = true;
            }
        }
    },
    "chaine": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.chaine,
            "x": 144,
            "y": 236,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est la chaîne Hi-Fi, on écoute la radio ou bien des CDs."});
            }
        }
    },
    "araignee": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.araignee,
            "x": 72,
            "y": 86,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une toile d'araignée. L'aspirateur-robot ne va pas jusque là. J'ai proposé aux parents de l'améliorer pour qu'il puisse grimper mur, mais ils n'ont pas eu l'air emballés..."});
            },
            "useCb": function(jeu) {
                jeu.texte({"texte": "Je ne peux pas l'atteindre."});
            }
        }
    },
    "cds": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.cds,
            "x": 121,
            "y": 279,
            "seeCb": function(jeu) {
                if(jeu.model.salon.robotSousMeuble && !jeu.model.salon.robotDecoince) {
                    jeu.texte({"texte": "Hey, l'aspirateur-robot est dessous. Je vais le décoincer."});
                    jeu.model.salon.robotDecoince = true;
                    return;
                }
                if(jeu.model.mamanChanson === "groupe") {
                    jeu.texte({
                        "texte": "Je vais chercher s'il y a des albums d'un groupe Morgen quelque chose, le groupe préféré de maman.",
                        "cb": function(jeu) {
                            jeu.texte({"texte": "Ah voilà, Mørgen band ! Mais il y cinq albums, quelle est la bonne chanson !?!"});
                            jeu.model.mamanChanson = "chanson";
                        }
                    });
                    return;
                }
                jeu.texte({"texte": "La collection de CDs de mes parents, il y en a tellement ! Tout ça tient dans une clé USB, mais c'est moins joli."});
            },
            "useCb": function(jeu) {
                if(jeu.model.mamanChanson === "trouve") {
                    jeu.texte({
                        "texte": "Je vais mettre la chanson préférée de maman : Morgen Mergen par Mørgen band, de l'album Margen Murgen !",
                        "cb": function(jeu) {
                            jeu.texte({"qui": jeu.sprites.qui.maman, "texte": "Oh, j'adore cette chanson !."});
                        }
                    });
                    jeu.inventaireAjoute("cd");
                    jeu.model.mamanChanson = "joue";
                    return;
                }
                if(jeu.model.mamanChanson === "joue") {
                    jeu.texte({"texte": "J'ai déjà mis la chanson préférée de maman, je vais la laisser."});
                    return;
                }
                if(jeu.model.mamanChanson != null) {
                    jeu.texte({
                        "texte": "Je ne connais pas la chanson préférée de maman, je vais en mettre une au hasard.",
                        "cb": function(jeu) {
                            jeu.texte({
                                "qui": "maman",
                                "texte": "Heurace, j'aimerais un peu de silence, tu veux bien éteindre cette musique ?"
                            });
                        }
                    });
                }
                jeu.texte({"texte": "Je n'ai pas de temps d'écouter de la musique, je dois construire mon robot."});
            }
        }
    },
    "maman": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.maman,
            "x": 459,
            "y": 324,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Ma maman. Elle se repose, elle a beaucoup travaillé aujourd'hui."});
            },
            "talkCb": function(jeu) {
                let choix = [];
                if(jeu.model.salon.aspiCherche && !jeu.model.salon.robotDecoince) {
                    choix.push({
                        "texte": "Maman, tu sais où est l'aspirateur-robot ?",
                        "cb": function(jeu) {
                            jeu.texte({
                                "qui": jeu.sprites.qui.maman,
                                "texte": "Je ne sais pas, peut-être sous le meuble de la chaîne, il se coince parfois dessous."
                            });
                            jeu.model.salon.robotSousMeuble = true;
                        }
                    });
                }
                choix.push({
                    "texte": "Non, rien."
                });
                jeu.choix({
                    "choix": choix
                });
            }
        }
    },
    "yeuxmaman": function(jeu) {
        return {
            "sprite": jeu.sprites.salon.yeuxmaman,
            "x": 585,
            "y": 348
        }
    },
    "aspirobot": function(jeu) {
        if(jeu.model.salon.robotDecoince) {
            return {
                "sprite": jeu.sprites.inventaire.aspirobot,
                "x": 150,
                "y": 345,
                "seeCb": function(jeu) {
                    if(jeu.model.etape === "recherche" && !jeu.inventaireContient("idee_aspirobot")) {
                        jeu.texte({"texte": "L'apirateur-robot a des capteurs de proximité, un moteur, une bonne batterie... C'est une idée."});
                        jeu.inventaireRemplace("idee", "idee_aspirobot");
                    } else {
                        jeu.texte({"texte": "L'apirateur-robot. Il se promène dans la maison pour aspirer la poussière. Je l'aime bien."});
                    }
                },
                "useCb": function(jeu) {
                    if(jeu.model.etape === "recherche") {
                        jeu.texte({"texte": "Pour l'instant, je cherche des idées, je ne prends rien."});
                    } else {
                        jeu.texte({
                            "qui": jeu.sprites.qui.maman,
                            "texte": "Laisse cet aspirateur tranquille ! Il est très bien comme il est !",
                            "cb": function(jeu) {
                                jeu.texte({"texte": "Maman ne va pas partir. Ma seule chance est qu'elle s'endorme, et pour ça il lui faut sa musique et son thé préféré... mais je ne les connais pas !"});
                                jeu.model.mamanThe = "quoi";
                                jeu.model.mamanChanson = "quoi";
                            }
                        });
                    }
                }
            }
        }
    },
    "musique": function(jeu) {
        if(jeu.model.mamanChanson === "joue") {
            return {
                "sprite": jeu.sprites.salon.musique,
                "x": 226,
                "y": 193
            }
        }
        return null;
    }
}