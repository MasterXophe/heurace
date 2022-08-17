const CUISINE_OBJETS = {
    "cuisine": function(jeu) {
        return {
            "nom": "cuisine",
            "sprite": jeu.sprites.cuisine.fond,
            "x": 0,
            "y": 0
        }
    },
    "portesalon": function(jeu) {
        return {
            "nom": "portesalon",
            "sprite": jeu.sprites.cuisine.portesalon,
            "x": 576,
            "y": 130,
            "seeCb": null,
            "useCb": function(jeu) {
                jeu.scene("salon");
            }
        }
    },
    "bouilloiresocle": function(jeu) {
        return {
            "nom": "bouilloiresocle",
            "sprite": jeu.sprites.cuisine.bouilloiresocle,
            "x": 300,
            "y": 230,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Le socle de la bouilloire. On pose la bouilloire dessus, on appuie sur le bouton, et l'eau bout. C'est... plutôt simple."});
            }
        }
    },
    "bouilloire": function(jeu) {
        if(jeu.inventaireContient("bouilloire") || jeu.inventaireContient("bouilloirepleine")) {
            return null;
        }
        if(jeu.model.cuisine.bouilloire === "chaude") {
            return {
                "nom": "bouilloire",
                "sprite": jeu.sprites.cuisine.bouilloirechaude,
                "x": 294,
                "y": 221,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "La bouilloire, pleine d'eau chaude."});
                }
            }
        }
        if(jeu.model.cuisine.bouilloire === "pleine") {
            return {
                "nom": "bouilloire",
                "sprite": jeu.sprites.cuisine.bouilloirepleine,
                "x": 299,
                "y": 232,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "La bouilloire, que j'ai remplie d'eau."});
                },
                "useCb": function() {
                    jeu.texte({
                        "texte": "Je l'allume, l'eau va bouillir.",
                        "cb": function(jeu) {
                            jeu.texte({
                                "qui": jeu.sprites.cuisine.bouilloirepleine,
                                "texte": "(pssssssssch)",
                                "cb": function(jeu) {
                                    jeu.texte({
                                        "qui": jeu.sprites.cuisine.bouilloirepleine,
                                        "texte": "fschhsccchchshchchsschh",
                                        "cb": function(jeu) {
                                            jeu.texte({
                                                "qui": jeu.sprites.cuisine.bouilloirepleine,
                                                "texte": "FSSSSCCCCHHHHHHH",
                                                "cb": function(jeu) {
                                                    jeu.model.cuisine.bouilloire = "chaude";
                                                    jeu.texte({
                                                        "qui": jeu.sprites.cuisine.bouilloirepleine,
                                                        "texte": "BLUBORGLURBLORGLABULBULGLRB... cloc !",
                                                        "cb": function(jeu) {
                                                            jeu.texte({"texte": "Voilà ! L'eau est chaude !"});
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
                }
            }
        }
        return {
            "nom": "bouilloire",
            "sprite": jeu.sprites.cuisine.bouilloire,
            "x": 299,
            "y": 232,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une bouilloire. Pour faire boullir de l'eau, et rien que de l'eau, sinon je suis puni."});
            },
            "useCb": function() {
                if(jeu.model.etape === "collecte") {
                    jeu.texte({"texte": "Elle est vide, je la prends, je pourrai la remplir."});
                    jeu.inventaireAjoute("bouilloire");
                } else {
                    jeu.texte({"texte": "Pour l'instant, je cherche des idées."});
                }
            }
        }
    },
    "carnet": function(jeu) {
        switch(jeu.model.carnet) {
            case null:
                return {
                    "nom": "carnet",
                    "sprite": jeu.sprites.cuisine.carnet,
                    "x": 388,
                    "y": 162,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Un vieux carnet, peut-être de cuisine."});
                    }
                }
            case "recherche":
                return {
                    "nom": "carnet",
                    "sprite": jeu.sprites.cuisine.carnet,
                    "x": 388,
                    "y": 162,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Hey, mais ce carnet, c'est le carnet de papa ! Il a du le ranger là en même temps que les livres de cuisine."});
                        jeu.model.carnet = "trouve";
                    }
                }
            case "trouve":
                return {
                    "nom": "carnet",
                    "sprite": jeu.sprites.cuisine.carnet,
                    "x": 388,
                    "y": 162,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "C'est le carnet de papa, je devrais lui ramener."});
                    },
                    "useCb": function(jeu) {
                        jeu.texte({
                            "texte": "C'est le carnet de papa ! Je le prends, il y a le thé favori de maman noté dedans.",
                            "cb": function(jeu) {
                                jeu.inventaireAjoute("carnet");
                                jeu.model.carnet = "pris";
                            }
                        });
                    }
                }
        }
        return null;
    },
    "blender": function(jeu) {
        switch(jeu.model.cuisine.blender) {
            case null:
            case "comment":
                return {
                    "nom": "blender",
                    "sprite": jeu.sprites.cuisine.blender,
                    "x": 120,
                    "y": 230,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Le blender dont maman se sert pour faire des jus ou des soupes. Papa a du le réparer une fois parce que je l'avais cassé, mais je ne sais plus comment."});
                        jeu.model.cuisine.blender = "comment";
                    }
                }
            case "explication":
                return {
                    "nom": "blender",
                    "sprite": jeu.sprites.cuisine.blender,
                    "x": 120,
                    "y": 230,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Le blender dont maman se sert pour faire des jus ou des soupes. Papa a du le réparer une fois parce que je l'avais cassé en essayant de mixer des cailloux."});
                    }
                }
            case "cailloux":
                return {
                    "nom": "cailloux",
                    "sprite": jeu.sprites.cuisine.blendercailloux,
                    "x": 120,
                    "y": 230,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "J'ai mis ma collection de cailloux dans le blender. S'il est assez puissant, cela va faire du sable. S'il ne l'est pas, il va probablement se casser. Dans les deux cas, ce sera amusant !"});
                    },
                    "useCb": function(jeu) {
                        jeu.choix({
                            "choix": [{
                                "texte": "Mettre en marche",
                                "cb": function(jeu) {
                                    jeu.model.cuisine.blender = "marche";
                                    jeu.texte({
                                        "texte": "Houlà, ça fait un drôle de bruit !", "cb": function(jeu) {
                                            jeu.model.cuisine.blender = "cassecailloux";
                                            jeu.texte({
                                                "texte": "Le blender n'a pas réussi à mixer mes cailloux en sable. Je vais remettre mes cailloux dans ma chambre, sinon je vais me faire gronder !",
                                                "cb": function(jeu) {
                                                    jeu.model.cuisine.blender = "casse";
                                                }
                                            });
                                        }
                                    });
                                }
                            }, {
                                "texte": "Ne rien faire"
                            }]
                        });
                    }
                }
            case "marche":
                return {
                    "sprite": jeu.sprites.cuisine.blendermarche,
                    "x": 120,
                    "y": 230
                }
            case "cassecailloux":
                return {
                    "sprite": jeu.sprites.cuisine.blendercassecailloux,
                    "x": 120,
                    "y": 230
                }
            case "casse":
                return {
                    "sprite": jeu.sprites.cuisine.blendercasse,
                    "x": 120,
                    "y": 230,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Le blender est cassé, il va falloir que papa le répare à nouveau..."});
                    }
                }
        }
    },
    "potmiel": function(jeu) {
        if(jeu.model.cuisine.potmielpris) {
            return null;
        }
        return {
            "nom": "potmiel",
            "sprite": jeu.sprites.inventaire.potmiel,
            "x": 160,
            "y": 155,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est le pot de miel dont je me suis servi pour attirer les fourmis de mon terrarium. Curieusement, plus personne ne veut en manger maintenant. Je devrais peut-être leur en donner un peu ?"});
            },
            "useCb": function(jeu) {
                if(jeu.model.etape === "collecte") {
                    jeu.texte({
                        "texte": "Ok, je le prends.", "cb": function(jeu) {
                            jeu.inventaireAjoute("potmiel");
                            jeu.model.cuisine.potmielpris = true;
                        }
                    });
                } else {
                    jeu.texte({"texte": "Pour le moment, je cherche des idées."});
                }
            }
        }
    },
    "evier": function(jeu) {
        return {
            "nom": "evier",
            "sprite": jeu.sprites.cuisine.evier,
            "x": 400,
            "y": 230,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est l'évier de la cuisine."});
            }
        }
    },
    "tasse": function(jeu) {
        if(jeu.model.cuisine.tasse === "prise") {
            return null;
        }
        return {
            "nom": "tasse",
            "sprite": jeu.sprites.inventaire.tasse,
            "x": 230,
            "y": 220,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La tasse préférée de maman."});
            },
            "useCb": function(jeu) {
                if(jeu.model.salon.mamanThe === "recette") {
                    jeu.texte({"texte": "Je la prends, je dois lui préparer son thé préféré."});
                    jeu.model.cuisine.tasse = "prise";
                    jeu.inventaireAjoute("tasse");
                    return;
                }
                jeu.texte({"texte": "Je ne vais pas y toucher sans raison."});
            }
        }
    },
    "boiteathe": function(jeu) {
        return {
            "nom": "boiteathe",
            "sprite": jeu.sprites.cuisine.boiteathe,
            "x": 5,
            "y": 220,
            "seeCb": function(jeu) {
                if(jeu.model.salon.mamanThe === "recette") {
                    jeu.texte({"texte": "Le thé préféré de Maman est le Rooibos-cannelle-gingembre."});
                } else {
                    jeu.texte({"texte": "C'est une boîte avec plein de sachets de thé différents."});
                }
            },
            "useCb": function(jeu) {
                switch(jeu.model.salon.mamanThe) {
                    case "recette":
                        jeu.texte({"texte": "Je prends un sachet de Rooibos-cannelle-gingembre."});
                        jeu.inventaireAjoute("sachetthe");
                        break;
                    case "quoi":
                        jeu.texte({"texte": "Il y a tellement de sachets différents ! Je ne sais pas quel est le préféré de Maman..."});
                        break;
                    default:
                        jeu.texte({"texte": "Le thé, ce n'est pas trop mon truc."});
                        break;
                }
            }
        }
    },
    "porteouverte": function(jeu) {
        if(!jeu.model.cuisine.porteouverte) {
            return null;
        }
        return {
            "nom": "porteouverte",
            "sprite": jeu.sprites.cuisine.porteouverte,
            "x": 475,
            "y": 298,
            "useCb": function(jeu) {
                jeu.model.cuisine.porteouverte = false;
            }
        }
    },
    "portefermee": function(jeu) {
        if(jeu.model.cuisine.porteouverte) {
            return null;
        }
        return {
            "nom": "portefermee",
            "sprite": jeu.sprites.cuisine.portefermee,
            "x": 475,
            "y": 299,
            "useCb": function(jeu) {
                jeu.model.cuisine.porteouverte = true;
            }
        }
    },
    "passoire": function(jeu) {
        if(!jeu.model.cuisine.porteouverte) {
            return null;
        }
        return {
            "nom": "passoire",
            "sprite": jeu.sprites.cuisine.passoire,
            "x": 500,
            "y": 335,
            "seeCb": function(jeu) {
                if(jeu.model.etape === "recherche") {
                    if(!jeu.inventaireContient("idee_passoire")) {
                        jeu.texte({"texte": "Cette passoire peut offrir une protection, elle a la bonne taille. C'est une idée."});
                        jeu.inventaireRemplace("idee", "idee_passoire");
                    }
                } else {
                    jeu.texte({"texte": "C'est une passoire."});
                }
            },
            "useCb": function(jeu) {
                jeu.texte({"texte": "Je la prendrais si je veux me faire des pâtes."});
            }
        }
    }
}
