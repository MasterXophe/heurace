const INVENTAIRE_OBJETS = {
    "idee": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une idée qu'il me reste à trouver pour mon robot de combat."});
            }
        }
    },
    "idee_aspirobot": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_aspirobot,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "L'aspirateur-robot. Il se déplace et a des capteurs de proximité."});
            }
        }
    },
    "idee_voiture": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_voiture,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Ma voiture télécommandée, rapide et maniable."});
            }
        }
    },
    "idee_passoire": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_passoire,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une passoire, qui a la forme d'une carapace de tortue."});
            }
        }
    },
    "idee_planches": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_planches,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Du bois, toujours utile pour bricoler."});
            }
        }
    },
    "idee_tole": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_tole,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une tôle en acier, très costaud, mais lourd et pénible à découper."});
            }
        }
    },
    "idee_perceuse": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_perceuse,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La perceuse de mon papa. Elle peut tout percer (croyez-moi, j'ai essayé)."});
            }
        }
    },
    "idee_scie": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_scie,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La scie circulaire de mon papa. J'ai interdiction de m'en servir, parce qu'elle est hyper dangereuse."});
            }
        }
    },
    "idee_chalumeau": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_chalumeau,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Un chalumeau, qui brûle tout et n'importe quoi avec sa flamme à très haute température."});
            }
        }
    },
    "idee_moustikiller": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_moustikiller,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Le Mousti-killer inventé par mon père. Doté d'un capteur de mouvement couplé à un puissant laser, il sert à éliminer les moustiques."});
            }
        }
    },
    "idee_carte": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.idee_carte,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une carte électronique programmable. Ça me sert à piloter à peu près tout."});
            }
        }
    },
    "objectif_aspirobot": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.objectif_aspirobot,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il me faut l'aspirateur-robot comme chassis pour mon robot de combat."});
            }
        }
    },
    "objectif_toledecoupee": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.objectif_toledecoupee,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il faut que je trouve une plaque de tôle et que j'arrive à la découper suivant mes plans pour faire le blindage de mon robot de combat."});
            }
        }
    },
    "objectif_scie": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.objectif_scie,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il faut que je récupère la scie circulaire pour l'intégrer à mon robot de combat."});
            }
        }
    },
    "objectif_carte": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.objectif_carte,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Il faut que je prenne cette carte électronique pour piloter mon robot de combat."});
            }
        }
    },
    "carte": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.carte,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une carte électronique programmable. Je vais la programmer pour piloter le robot de combat."});
            }
        }
    },
    "tole": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.tole,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une tôle en acier pour le blindage du robot de combat. Mais comment la découper ?"});
            }
        }
    },
    "aspirobot": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.aspirobot,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "L'aspirateur-robot. Je vais m'en servir comme chassis pour mon robot de combat. Il se déplace et a des capteurs de proximité, c'est parfait !"});
            }
        }
    },
    "scie": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.scie,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La scie circulaire. C'est un outil très dangereux qui sera l'arme du robot de combat."});
            }
        }
    },
    "cd": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.cd,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est le CD qui contient la chanson préférée de maman."});
            }
        }
    },
    "carnet": function(jeu) {
        return {
            "sprite": jeu.sprites.inventaire.carnet,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est le carnet de papa, il y a le thé favori de maman noté dedans. Mais papa écrit trop mal et trop petit, je n'arrive pas à le lire ce qu'il a marqué !"});
            }
        }
    }
};