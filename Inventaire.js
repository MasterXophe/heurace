const INVENTAIRE_OBJETS = {
    "idee": function(jeu) {
        return {
            "nom": "idee",
            "sprite": jeu.sprites.inventaire.idee,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une idée qu'il me reste à trouver pour mon robot de combat."});
            }
        }
    },
    "idee_aspirobot": function(jeu) {
        return {
            "nom": "idee_aspirobot",
            "sprite": jeu.sprites.inventaire.idee_aspirobot,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "L'aspirateur-robot. Il se déplace et a des capteurs de proximité."});
            }
        }
    },
    "idee_voiture": function(jeu) {
        return {
            "nom": "idee_voiture",
            "sprite": jeu.sprites.inventaire.idee_voiture,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Ma voiture télécommandée, rapide et maniable."});
            }
        }
    },
    "idee_passoire": function(jeu) {
        return {
            "nom": "idee_passoire",
            "sprite": jeu.sprites.inventaire.idee_passoire,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une passoire, qui a la forme d'une carapace de tortue."});
            }
        }
    },
    "idee_planches": function(jeu) {
        return {
            "nom": "idee_planches",
            "sprite": jeu.sprites.inventaire.idee_planches,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Du bois, toujours utile pour bricoler."});
            }
        }
    },
    "idee_tole": function(jeu) {
        return {
            "nom": "idee_tole",
            "sprite": jeu.sprites.inventaire.idee_tole,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une tôle en acier, très costaud, mais lourd et pénible à découper."});
            }
        }
    },
    "idee_perceuse": function(jeu) {
        return {
            "nom": "idee_perceuse",
            "sprite": jeu.sprites.inventaire.idee_perceuse,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La perceuse de mon papa. Elle peut tout percer (croyez-moi, j'ai essayé)."});
            }
        }
    },
    "idee_scie": function(jeu) {
        return {
            "nom": "idee_scie",
            "sprite": jeu.sprites.inventaire.idee_scie,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La scie circulaire de mon papa. J'ai interdiction de m'en servir, parce qu'elle est hyper dangereuse."});
            }
        }
    },
    "idee_chalumeau": function(jeu) {
        return {
            "nom": "idee_chalumeau",
            "sprite": jeu.sprites.inventaire.idee_chalumeau,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Un chalumeau, qui brûle tout et n'importe quoi avec sa flamme à très haute température."});
            }
        }
    },
    "idee_moustikiller": function(jeu) {
        return {
            "nom": "idee_moustikiller",
            "sprite": jeu.sprites.inventaire.idee_moustikiller,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Le Mousti-killer inventé par mon père. Doté d'un capteur de mouvement couplé à un puissant laser, il sert à éliminer les moustiques."});
            }
        }
    },
    "idee_carte": function(jeu) {
        return {
            "nom": "idee_carte",
            "sprite": jeu.sprites.inventaire.idee_carte,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une carte électronique programmable. Ça me sert à piloter à peu près tout."});
            }
        }
    },
    "objectif_aspirobot": function(jeu) {
        return {
            "nom": "objectif_aspirobot",
            "sprite": jeu.sprites.inventaire.objectif_aspirobot,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il me faut l'aspirateur-robot comme chassis pour mon robot de combat."});
            }
        }
    },
    "objectif_toledecoupee": function(jeu) {
        return {
            "nom": "objectif_toledecoupee",
            "sprite": jeu.sprites.inventaire.objectif_toledecoupee,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il faut que je trouve une plaque de tôle et que j'arrive à la découper suivant mes plans pour faire le blindage de mon robot de combat."});
            }
        }
    },
    "objectif_scie": function(jeu) {
        return {
            "nom": "objectif_scie",
            "sprite": jeu.sprites.inventaire.objectif_scie,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il faut que je récupère la scie circulaire pour l'intégrer à mon robot de combat."});
            }
        }
    },
    "objectif_carte": function(jeu) {
        return {
            "nom": "objectif_carte",
            "sprite": jeu.sprites.inventaire.objectif_carte,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il faut que je prenne cette carte électronique pour piloter mon robot de combat."});
            }
        }
    },
    "carte": function(jeu) {
        return {
            "nom": "carte",
            "sprite": jeu.sprites.inventaire.carte,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une carte électronique programmable. Je vais la programmer pour piloter le robot de combat."});
            }
        }
    },
    "tole": function(jeu) {
        switch(jeu.model.tole) {
            case undefined:
                return {
                    "nom": "tole",
                    "sprite": jeu.sprites.inventaire.tole,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Une tôle en acier pour le blindage du robot de combat. Mais comment la découper ?"});
                    },
                    "useWithCb": function(jeu, objet) {
                        if(objet === "crayon") {
                            jeu.texte({"texte": "Pourquoi pas ! Je vais dessiner les parties que je dois découper avec du miel."});
                            jeu.model.tole = "miel";
                            return;
                        }
                        jeu.texte({"texte": "Ça ne fait rien."});
                    }
                }
            case "miel":
                return {
                    "nom": "tole",
                    "sprite": jeu.sprites.inventaire.tolemiel,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Une tôle en acier pour le blindage du robot de combat. J'ai tracé les pièces à découper avec du miel, mais comment la découper ?"});
                    },
                    "useWithCb": function(jeu, objet) {
                        if(objet === "terrarium") {
                            jeu.model.chambre.terrarium = "tole";
                            jeu.texte({
                                "texte": "Je mets la tôle dans terrarium un moment...",
                                "cb": function(jeu) {
                                    jeu.model.chambre.terrarium = "tolefourmis";
                                    jeu.texte({
                                        "texte": "Les fourmis se précipitent sur le miel !",
                                        "cb": function(jeu) {
                                            jeu.model.chambre.terrarium = null;
                                            jeu.texte({"texte": "J'ai maintenant un tracé grouillant de fourmis... C'est cool et un peu dégueu à la fois. La question, c'est : et maintenant ?"});
                                            jeu.model.tole = "fourmis";
                                        }
                                    });
                                }
                            });
                            jeu.model.chambre.terrarium = "tole";
                            return;
                        }
                        jeu.texte({"texte": "Ça ne fait rien."});
                    }
                }
            case "fourmis":
                return {
                    "nom": "tole",
                    "sprite": jeu.sprites.inventaire.tolefourmis,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Une tôle en acier pour le blindage du robot de combat. Le tracé des pièces à découper est recouvert de fourmis, mais comment la découper ?"});
                    },
                    "useWithCb": function(jeu, objet) {
                        if(objet === "moustikiller") {
                            if(jeu.model.papa !== "cuisine") {
                                jeu.texte({"texte": "Je ne peux pas toucher au moustikiller tant que papa est dans l'atelier."});
                                return;
                            }
                            jeu.texte({
                                "texte": "Ooohhhh... terrible ! Je place la tôle devant le moustikiller...",
                                "cb": function(jeu) {
                                    jeu.model.atelier.moustikiller = "tole";
                                    jeu.texte({
                                        "texte": "...je me place DERRIÈRE le moustikiller et je l'allume...",
                                        "cb": function(jeu) {
                                            jeu.model.atelier.moustikiller = "pret";
                                            jeu.texte({
                                                "qui": jeu.sprites.qui.moustikiller,
                                                "texte": "Clic. Bzz. Gni ?",
                                                "cb": function(jeu) {
                                                    jeu.model.atelier.moustikiller = "tire";
                                                    jeu.texte({
                                                        "qui": jeu.sprites.qui.moustikiller,
                                                        "texte": "BZZAAAPPP !!!",
                                                        "cb": function(jeu) {
                                                            jeu.model.atelier.moustikiller = null;
                                                            jeu.texte({
                                                                "texte": "Wow ! Le moustikiller a dézingué les pauvres fourmis en un éclair ! C'est moche, mais ça a découpé la tôle tout comme il faut ! J'éteins cet engin de mort et je récupère mes pièces.",
                                                                "cb": function(jeu) {
                                                                    jeu.model.tole = "decoupee";
                                                                    jeu.inventaireRetire("tole");
                                                                    jeu.inventaireRemplace("objectif_toledecoupee", "tole");
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
                            return;
                        }
                        jeu.texte({"texte": "Ça ne fait rien."});
                    }
                }
            case "decoupee":
                return {
                    "nom": "tole",
                    "sprite": jeu.sprites.inventaire.toledecoupee,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Les morceaux de tôle en acier pour le blindage du robot de combat."});
                    }
                }
        }
    },
    "aspirobot": function(jeu) {
        return {
            "nom": "aspirobot",
            "sprite": jeu.sprites.inventaire.aspirobot,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "L'aspirateur-robot. Je vais m'en servir comme chassis pour mon robot de combat. Il se déplace et a des capteurs de proximité, c'est parfait !"});
            }
        }
    },
    "scie": function(jeu) {
        return {
            "nom": "scie",
            "sprite": jeu.sprites.inventaire.scie,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La scie circulaire. C'est un outil très dangereux qui sera l'arme du robot de combat."});
            }
        }
    },
    "cd": function(jeu) {
        return {
            "nom": "cd",
            "sprite": jeu.sprites.inventaire.cd,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est le CD qui contient la chanson préférée de maman."});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "chaine") {
                    jeu.texte({
                        "texte": "Je vais mettre la chanson préférée de maman : Morgen Mergen par Mørgen band, de l'album Margen Murgen !",
                        "cb": function(jeu) {
                            jeu.model.salon.mamanChanson = "joue";
                            jeu.inventaireRetire("cd");
                            jeu.texte({
                                "qui": jeu.sprites.qui.maman,
                                "texte": "Oh, j'adore cette chanson !.",
                                "cb": function(jeu) {
                                    if(jeu.model.salon.mamanThe === "ok") {
                                        jeu.texte({
                                            "texte": "Avec son thé et sa chanson, elle va s'endormir rapidement, ça ne rate jamais !",
                                            "cb": function(jeu) {
                                                jeu.model.mamanDort = true
                                            }
                                        });
                                    } else {
                                        jeu.texte({"texte": "Et maintenant, il ne reste plus qu'à lui préparer son thé préféré !"});
                                    }
                                }
                            });
                        }
                    });
                    return;
                }
                jeu.texte({"texte": "Ça ne fait rien."});
            }
        }
    },
    "carnet": function(jeu) {
        return {
            "nom": "carnet",
            "sprite": jeu.sprites.inventaire.carnet,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est le carnet de papa, il y a le thé favori de maman noté dedans. Mais papa écrit trop mal et trop petit, je n'arrive pas à le lire ce qu'il a marqué !"});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "papa") {
                    jeu.texte({
                        "texte": "Papa ! J'ai retrouvé ton carnet, le voilà !",
                        "cb": function(jeu) {
                            jeu.texte({
                                "qui": jeu.sprites.qui.papa,
                                "texte": "Ah formidable ! J'ai noté des choses dont je dois me souvenir dans ce carnet. Des choses... dont je ne me souviens plus."
                            });
                            jeu.inventaireRetire("carnet");
                            jeu.model.the = "carnetpapa";
                        }
                    });
                }
            }
        }
    },
    "cailloux": function(jeu) {
        return {
            "nom": "cailloux",
            "sprite": jeu.sprites.inventaire.cailloux,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Ma collection de cailloux, que je pense mixer pour obtenir du sable... ou casser le blender ?"});
            },
            "useWithCb": jeu.model.cuisine.blender === "explication" ? function(jeu, objet) {
                if(objet === "blender") {
                    jeu.texte({"texte": "Je mets les cailloux dans le blender."});
                    jeu.model.cuisine.blender = "cailloux"
                    jeu.inventaireRetire("cailloux");
                    return;
                }
                jeu.texte({"texte": "Ça ne fait rien."});
            } : null
        }
    },
    "potmiel": function(jeu) {
        return {
            "nom": "potmiel",
            "sprite": jeu.sprites.inventaire.potmiel,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est le pot de miel dont je me suis servi pour attirer les fourmis de mon terrarium. Je devrais peut-être leur en donner un peu ?"});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "terrarium") {
                    jeu.texte({
                        "texte": "Je mets au fourmi un filet de miel en zigzag.",
                        "cb": function(jeu) {
                            jeu.texte({"texte": "Oh, c'est amusant ! Les fourmis se sont toutes agglutinées sur le filet de miel. Ça fait comme un dessin grouillant !"});
                        }
                    });
                    return;
                }
                if(objet === "tole") {
                    jeu.texte({"texte": "Je veux bien mettre du miel sur la tôle, mais il me faut un moyen de le faire avec précision."});
                    jeu.model.crayon = "miel";
                    return;
                }
                if(objet === "crayon") {
                    jeu.texte({"texte": "Je remplis le crayon avec du miel, ça me permettra de faire des dessins en miel."});
                    jeu.model.crayon = "miel";
                    return;
                }
                jeu.texte({"texte": "Ça ne fait rien."});
            }
        }
    },
    "crayon": function(jeu) {
        switch(jeu.model.crayon) {
            case undefined:
                return null;
            case "pris":
                return {
                    "nom": "crayon",
                    "sprite": jeu.sprites.inventaire.crayonvide,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "C'est un crayon vide. On ne sait jamais j'aurais peut-être envie de le remplir avec un liquide quelconque et dessiner avec."});
                    },
                    "useWithCb": function(jeu, objet) {
                        if(objet === "potmiel") {
                            jeu.texte({"texte": "Je remplis le crayon avec du miel, ça me permettra de faire des dessins en miel."});
                            jeu.model.crayon = "miel";
                            return;
                        }
                        jeu.texte({"texte": "Ça ne fait rien."});
                    }
                }
            case "miel":
                return {
                    "nom": "crayon",
                    "sprite": jeu.sprites.inventaire.crayonmiel,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "C'est un crayon que j'ai rempli avec du miel. Je peux maintenant faire des dessins en miel !"});
                    },
                    "useWithCb": function(jeu, objet) {
                        if(objet === "tole" && jeu.model.tole == null) {
                            jeu.texte({"texte": "Pourquoi pas ! Je vais dessiner les parties que je dois découper avec du miel."});
                            jeu.model.tole = "miel";
                            return;
                        }
                        jeu.texte({"texte": "Ça ne fait rien."});
                    }
                }
        }
    },
    "bouilloire": function(jeu) {
        return {
            "nom": "bouilloire",
            "sprite": jeu.sprites.inventaire.bouilloire,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La bouilloire. Puisque je l'ai, je pourrai la remplir."});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "bouilloiresocle") {
                    jeu.texte({"texte": "Je devrais la remplir avant de la remettre."});
                    return;
                }
                if(objet === "evier") {
                    jeu.texte({"texte": "Je l'ai remplie, mais pas trop."});
                    jeu.inventaireRemplace("bouilloire", "bouilloirepleine");
                    return;
                }
                jeu.texte({"texte": "Ça ne fait rien."});
            }
        }
    },
    "bouilloirepleine": function(jeu) {
        return {
            "nom": "bouilloirepleine",
            "sprite": jeu.sprites.inventaire.bouilloirepleine,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La bouilloire, remplie d'eau. Je pourrais la remettre sur son socle. Ou je pourrais arroser des choses ou des gens avec !"});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "papa") {
                    jeu.texte({"texte": "Je pourrais l'arroser, mais je ne crois pas qu'il soit d'humeur."});
                    return;
                }
                if(objet === "terrarium") {
                    jeu.texte({"texte": "C'est un terrarium, pas un aquarium !"});
                    return;
                }
                if(objet === "bouilloiresocle") {
                    jeu.inventaireRetire("bouilloirepleine");
                    jeu.model.bouilloire = "pleine";
                    return;
                }
                jeu.texte({"texte": "Ça ne fait rien."});
            }
        }
    },
    "tasse": function(jeu) {
        return {
            "nom": "tasse",
            "sprite": jeu.sprites.inventaire.tasse,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La tasse préférée de maman, je l'ai prise pour lui préparer un thé."});
            }
        }
    },
    "tassepleine": function(jeu) {
        return {
            "nom": "tassepleine",
            "sprite": jeu.sprites.inventaire.tassepleine,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une tasse du thé préféré de Maman."});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "maman") {
                    jeu.texte({
                        "texte": "Tiens, Maman, je t'ai préparé ton thé préféré !",
                        "cb": function(jeu) {
                            jeu.inventaireRetire("tassepleine");
                            jeu.texte({
                                "texte": "Oh, merci mon chéri, c'est adorable !",
                                "qui": jeu.sprites.qui.maman,
                                "cb": function(jeu) {
                                    jeu.model.salon.mamanThe = "ok";
                                    if(jeu.model.salon.mamanChanson === "joue") {
                                        jeu.texte({
                                            "texte": "Le thé, la chanson, elle va s'endormir, c'est sûr !",
                                            "cb": function(jeu) {
                                                jeu.model.salon.mamanDort = true;
                                            }
                                        });
                                    } else {
                                        jeu.texte({"texte": "Voilà pour le thé, ne reste plus qu'à mettre sa chanson."});
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
    },
    "tassesachet": function(jeu) {
        return {
            "nom": "tassesachet",
            "sprite": jeu.sprites.inventaire.tassesachet,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La tasse avec le sachet, il ne manque que l'eau chaude !"});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "bouilloire") {
                    if(jeu.model.bouilloire !== "bouillie") {
                        jeu.texte({"texte": "Il faut que la bouilloire soit pleine d'eau chaude."});
                        return;
                    }
                    jeu.inventaireRetire("tassesachet");
                    jeu.inventaireAjoute("tassepleine");
                    jeu.texte({"texte": "Je verse l'eau, et voilà, le thé préféré de Maman est prêt !"});
                    return;
                }
                if(objet === "potmiel") {
                    jeu.texte({"texte": "Non, elle ne prend pas de miel dans son thé."});
                    return;
                }
                if(objet === "evier") {
                    jeu.texte({"texte": "Non, il faut de l'eau chaude."});
                    return;
                }
                jeu.texte({"texte": "Ça ne fait rien."});
            }
        }
    },
    "sachetthe": function(jeu) {
        return {
            "nom": "sachetthe",
            "sprite": jeu.sprites.inventaire.sachetthe,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Un sachet du thé préféré de maman, je l'ai pris pour lui en préparer une tasse."});
            },
            "useWithCb": function(jeu, objet) {
                if(objet === "tasse") {
                    jeu.inventaireRetire("sachetthe");
                    jeu.inventaireRetire("tasse");
                    jeu.inventaireAjoute("tassesachet");
                    jeu.texte({"texte": "Je mets le sachet dans la tasse."});
                    return;
                }
                if(objet === "boiteathe") {
                    jeu.texte({"texte": "Pourquoi le remettre dedans ? J'en ai besoin pour préparer le thé pour Maman."});
                    return;
                }
                if(objet === "terrarium") {
                    jeu.texte({"texte": "Je ne pense pas que les fourmis aiment le thé..."});
                    return;
                }
                if(objet === "bouilloire" || objet === "bouilloirechaude" || objet === "bouilloirepleine") {
                    jeu.texte({"texte": "Hmmm... Je suis quasiment sûr que le sachet ne se met pas directement dans la bouilloire."});
                    return;
                }
                jeu.texte({"texte": "Ça ne fait rien."});
            }
        }
    }
};