const SALON_OBJETS = {
    "salon": function(jeu) {
        return {
            "nom": "salon",
            "sprite": jeu.sprites.salon.fond,
            "x": 0,
            "y": 0
        }
    },
    "porteatelier": function(jeu) {
        return {
            "nom": "porteatelier",
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
            "nom": "portechambre",
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
            "nom": "portecuisine",
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
            "nom": "baseaspirobot",
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
            "nom": "chaine",
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
            "nom": "araignee",
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
            "nom": "cds",
            "sprite": jeu.sprites.salon.cds,
            "x": 121,
            "y": 279,
            "seeCb": function(jeu) {
                if(jeu.model.salon.robotSousMeuble && !jeu.model.salon.robotDecoince) {
                    jeu.texte({"texte": "Hey, l'aspirateur-robot est dessous. Je vais le décoincer."});
                    jeu.model.salon.robotDecoince = true;
                    return;
                }
                if(jeu.model.salon.mamanChanson === "groupe") {
                    jeu.texte({
                        "texte": "Je vais chercher s'il y a des albums d'un groupe Morgen quelque chose, le groupe préféré de maman.",
                        "cb": function(jeu) {
                            jeu.texte({"texte": "Ah voilà, Mørgen band ! Mais il y cinq albums, quelle est la bonne chanson !?!"});
                            jeu.model.salon.mamanChanson = "chanson";
                        }
                    });
                    return;
                }
                jeu.texte({"texte": "La collection de CDs de mes parents, il y en a tellement ! Tout ça tient dans une clé USB, mais c'est moins joli."});
            },
            "useCb": function(jeu) {
                if(jeu.model.salon.mamanChanson === "trouve" && !jeu.inventaireContient("cd")) {
                    jeu.texte({"texte": "Voilà le CD avec la chanson préférée de maman, je le prends."});
                    jeu.inventaireAjoute("cd");
                    return;
                }
                if(jeu.model.salon.mamanChanson === "joue") {
                    jeu.texte({"texte": "J'ai déjà pris le CD avec la chanson préférée de maman, je ne vais pas en prendre un autre."});
                    return;
                }
                if(jeu.model.salon.mamanChanson != null) {
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
            "nom": "maman",
            "sprite": jeu.sprites.salon.maman,
            "x": 459,
            "y": 324,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Ma maman. Elle se repose, elle a beaucoup travaillé aujourd'hui."});
            },
            "talkCb": function(jeu) {
                if(jeu.model.salon.mamanDort === true) {
                    jeu.texte({"texte": "Elle dort, je ne veux pas la réveiller."});
                    return;
                }
                jeu.choix({
                    "choix": [{
                        "texte": "À propos de l'aspirateur-robot...",
                        "cb": function(jeu) {
                            let choix = [{
                                "texte": "Pourquoi on en a un ?",
                                "cb": function(jeu) {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.maman,
                                        "texte": "Parce qu'il faut faire le ménage, mais que personne n'aime le faire."
                                    });
                                    jeu.model.salon.robotSousMeuble = true;
                                }
                            }, {
                                "texte": "Je peux le prendre ?",
                                "cb": function(jeu) {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.maman,
                                        "texte": "Ne. Touche. Pas. Cet. Aspirateur."
                                    });
                                }
                            }];
                            if(jeu.model.salon.aspiCherche && !jeu.model.salon.robotDecoince) {
                                choix.push({
                                    "texte": "Tu sais où il est ?",
                                    "cb": function(jeu) {
                                        jeu.texte({
                                            "qui": jeu.sprites.qui.maman,
                                            "texte": "Je ne sais pas, peut-être sous le meuble de la chaîne, il se coince parfois dessous."
                                        });
                                        jeu.model.salon.robotSousMeuble = true;
                                    }
                                });
                            }
                            choix.push({ "texte": "Non, rien." });
                            jeu.choix({"choix":choix});
                        }
                    }, {
                        "texte": "À propos du blender...",
                        "cb": function(jeu) {
                            let choix = [{
                                "texte": "Je peux m'en servir pour faire quelque chose ?",
                                "cb": function(jeu) {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.maman,
                                        "texte": "Je préfère que tu n'y touches pas."
                                    });
                                }
                            }];
                            if(jeu.model.cuisine.blender === "comment") {
                                choix.push({
                                    "texte": "Tu te rappelles comment je l'ai cassé ?",
                                    "cb": function(jeu) {
                                        jeu.texte({
                                            "qui": jeu.sprites.qui.maman,
                                            "texte": "Oh oui ! Tu as voulu mixer des cailloux pour faire du sable. Ça a pris des heures à ton père pour le réparer."
                                        });
                                        jeu.model.cuisine.blender = "explication";
                                    }
                                });
                            }
                            choix.push({"texte": "Non, rien."});
                            jeu.choix({"choix":choix});
                        }
                    }, {
                        "texte": "Non, rien."
                    }]
                });
            }
        }
    },
    "yeuxmaman": function(jeu) {
        if(jeu.model.salon.mamanDort === true) {
            return null;
        }
        return {
            "nom": "yeuxmaman",
            "sprite": jeu.sprites.salon.yeuxmaman,
            "x": 585,
            "y": 348
        }
    },
    "aspirobot": function(jeu) {
        if(jeu.model.salon.robotDecoince && !jeu.inventaireContient("aspirobot")) {
            return {
                "nom": "aspirobot",
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
                        if(jeu.model.salon.mamanDort === true) {
                            jeu.texte({
                                "texte": "Maman dort, je peux enfin prendre l'aspirateur-robot... doucement... sans faire de bruit... comme quelqu'un qui n'est pas en train de faire une bêtise...",
                                "cb": function(jeu) {
                                    jeu.inventaireRemplace("objectif_aspirobot", "aspirobot");
                                }
                            });
                        } else {
                            jeu.texte({
                                "qui": jeu.sprites.qui.maman,
                                "texte": "Laisse cet aspirateur tranquille ! Il est très bien comme il est !",
                                "cb": function(jeu) {
                                    jeu.texte({"texte": "Maman ne va pas partir. Ma seule chance est qu'elle s'endorme, et pour ça il lui faut sa musique et son thé préféré... mais je ne les connais pas !"});
                                    if(jeu.model.salon.mamanDort !== true) {
                                        jeu.model.salon.mamanThe = "quoi";
                                        jeu.model.salon.mamanChanson = "quoi";
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }
    },
    "musique": function(jeu) {
        if(jeu.model.salon.mamanChanson === "joue") {
            return {
                "nom": "musique",
                "sprite": jeu.sprites.salon.musique,
                "x": 226,
                "y": 193
            }
        }
        return null;
    }
}