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
        return {
            "nom": "tole",
            "sprite": jeu.sprites.inventaire.tole,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une tôle en acier pour le blindage du robot de combat. Mais comment la découper ?"});
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
                            jeu.texte({"qui": jeu.sprites.qui.maman, "texte": "Oh, j'adore cette chanson !."});
                        }
                    });
                    jeu.model.mamanChanson = "joue";
                    jeu.inventaireRetire("cd");
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
    }
};