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
            "y": 50,
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
            "y": 250,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Le socle de la bouilloire. On pose la bouilloire dessus, on appuie sur le bouton, et l'eau bout. C'est... plutôt simple."});
            }
        }
    },
    "bouilloire": function(jeu) {
        if(jeu.inventaireContient("bouilloire") || jeu.inventaireContient("bouilloirepleine")) {
            return null;
        }
        if(jeu.model.bouilloire === "chaude") {
            return {
                "nom": "bouilloire",
                "sprite": jeu.sprites.cuisine.bouilloirechaude,
                "x": 294,
                "y": 241,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "La bouilloire, pleine d'eau chaude."});
                }
            }
        }
        if(jeu.model.bouilloire === "pleine") {
            return {
                "nom": "bouilloire",
                "sprite": jeu.sprites.cuisine.bouilloirepleine,
                "x": 299,
                "y": 252,
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
                                                    jeu.model.bouilloire = "chaude";
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
            "y": 252,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "Une bouilloire. Pour faire boullir de l'eau, et rien que de l'eau, sinon je suis puni."});
            },
            "useCb": function() {
                jeu.texte({"texte": "Elle est vide, je la prends, je pourrai la remplir."});
                jeu.inventaireAjoute("bouilloire");
            }
        }
    },
    "carnet": function(jeu) {
        if(jeu.model.the == null) {
            return {
                "nom": "carnet",
                "sprite": jeu.sprites.cuisine.carnet,
                "x": 300,
                "y": 100,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "Hey, mais c'est le carnet de papa ! Il a du le ranger en même temps que les boîtes de thé."});
                },
                "useCb": function(jeu) {
                    jeu.texte({
                        "texte": "C'est le carnet de papa ! Je le prends, il y a le thé favori de maman noté dedans.",
                        "cb": function(jeu) {
                            jeu.inventaireAjoute("carnet");
                            jeu.model.the = "carnet";
                        }
                    });
                }
            }
        }
        return null;
    },
    "passoire": function(jeu) {
        return {
            "nom": "passoire",
            "sprite": jeu.sprites.cuisine.passoire,
            "x": 480,
            "y": 360,
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
    },
    "blender": function(jeu) {
        switch(jeu.model.cuisine.blender) {
            case undefined:
            case "comment":
                return {
                    "nom": "blender",
                    "sprite": jeu.sprites.cuisine.blender,
                    "x": 120,
                    "y": 250,
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
                    "y": 250,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Le blender dont maman se sert pour faire des jus ou des soupes. Papa a du le réparer une fois parce que je l'avais cassé en essayant de mixer des cailloux."});
                    }
                }
            case "cailloux":
                return {
                    "nom": "cailloux",
                    "sprite": jeu.sprites.cuisine.blendercailloux,
                    "x": 120,
                    "y": 250,
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
                                    "texte":
                                        "Ne rien faire"
                                }]
                            }
                        );
                    }
                }
            case "marche":
                return {
                    "sprite": jeu.sprites.cuisine.blendermarche,
                    "x": 120,
                    "y": 250
                }
            case "cassecailloux":
                return {
                    "sprite": jeu.sprites.cuisine.blendercassecailloux,
                    "x": 120,
                    "y": 250
                }
            case "casse":
                return {
                    "sprite": jeu.sprites.cuisine.blendercasse,
                    "x": 120,
                    "y": 250,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Le blender est cassé, il va falloir que papa le répare à nouveau..."});
                    }
                }
        }
    },
    "potmiel": function(jeu) {
        if(jeu.model.potmiel != null) {
            return null;
        }
        return {
            "nom": "potmiel",
            "sprite": jeu.sprites.inventaire.potmiel,
            "x": 200,
            "y": 200,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est le pot de miel dont je me suis servi pour attirer les fourmis de mon terrarium. Curieusement, plus personne ne veut en manger maintenant. Je devrais peut-être leur en donner un peu ?"});
            },
            "useCb": function(jeu) {
                jeu.texte({
                    "texte": "Ok, je le prends.", "cb": function(jeu) {
                        jeu.inventaireAjoute("potmiel");
                        jeu.model.potmiel = "pris";
                    }
                });
            }
        }
    },
    "evier": function(jeu) {
        return {
            "nom": "evier",
            "sprite": jeu.sprites.cuisine.evier,
            "x": 400,
            "y": 250,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "C'est l'évier de la cuisine."});
            }
        }
    },
    "tasse": function(jeu) {
        if(jeu.model.tasse === "prise") {
            return null;
        }
        return {
            "nom": "tasse",
            "sprite": jeu.sprites.inventaire.tasse,
            "x": 500,
            "y": 300,
            "seeCb": function(jeu) {
                jeu.texte({"texte": "La tasse préférée de maman."});
            },
            "useCb": function(jeu) {
                if(jeu.model.mamanThe === "quoi") {
                    jeu.texte({"texte": "Je la prends, je dois lui préparer son thé préféré."});
                    jeu.model.tasse = "prise";
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
            "x": 20,
            "y": 250,
            "seeCb": function(jeu) {
                if(jeu.model.the === "recette") {
                    jeu.texte({"texte": "Le thé préféré de Maman est le Rooibos-cannelle-gingembre."});
                } else {
                    jeu.texte({"texte": "Il y a tellement de sachets différents ! Je ne sais pas quel est le préféré de Maman..."});
                }
            },
            "useCb": function(jeu) {
                if(jeu.model.the === "recette") {
                    jeu.texte({"texte": "Je prends un sachet de Rooibos-cannelle-gingembre."});
                    jeu.inventaireAjoute("sachetthe");
                } else {
                    jeu.texte({"texte": "Il y a tellement de sachets différents ! Je ne sais pas quel est le préféré de Maman..."});
                }
            }
        }
    }
}
