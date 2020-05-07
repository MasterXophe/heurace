const CUISINE_OBJETS = {
    "cuisine": function(jeu) {
        return {
            "sprite": jeu.sprites.cuisine.fond,
            "x": 0,
            "y": 0
        }
    },
    "portesalon": function(jeu) {
        return {
            "sprite": jeu.sprites.cuisine.portesalon,
            "x": 576,
            "y": 50,
            "seeCb": null,
            "useCb": function(jeu) {
                jeu.scene("salon");
            }
        }
    },
    "bouilloire": function(jeu) {
        return {
            "sprite": jeu.sprites.cuisine.bouilloirechaude,
            "x": 200,
            "y": 200,
            "seeCb": function(jeu) {

            },
            "useCb": function() {

            }
        }
    },
    "carnet": function(jeu) {
        if(jeu.model.carnet == null) {
            return {
                "sprite": jeu.sprites.cuisine.carnet,
                "x": 300,
                "y": 200,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "Hey, mais c'est le carnet de papa ! Il a du le ranger en même temps que les boîtes de thé."});
                },
                "useCb": function(jeu) {
                    jeu.texte({
                        "texte": "Je le prends, il y a le thé favori de maman noté dedans.", "cb": function(jeu) {
                            jeu.inventaireAjoute("carnet");
                            jeu.model.carnet = "trouve";
                        }
                    });
                }
            }
        }
        return null;
    },
    "passoire": function(jeu) {
        return {
            "sprite": jeu.sprites.cuisine.passoire,
            "x": 400,
            "y": 200,
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
                return {
                    "sprite": jeu.sprites.cuisine.blender,
                    "x": 100,
                    "y": 200,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Le blender dont maman se sert pour faire des jus ou des soupes. Je n'ai plus le droit de m'en servir pour mes expériences, parce qu'après il est cassé et papa doit le réparer."});
                    },
                    "useCb": function(jeu) {
                        jeu.model.cuisine.blender = "cailloux";
                    }
                }
            case "cailloux":
                return {
                    "sprite": jeu.sprites.cuisine.blendercailloux,
                    "x": 100,
                    "y": 200,
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
                                                    "texte": "Le blender n'a pas réussi à mixer mes cailloux en sable. Je vais enlever mes cailloux, sinon je vais me faire gronder !",
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
                    "x": 100,
                    "y": 200
                }
            case "cassecailloux":
                return {
                    "sprite": jeu.sprites.cuisine.blendercassecailloux,
                    "x": 100,
                    "y": 200
                }
            case "casse":
                return {
                    "sprite": jeu.sprites.cuisine.blendercasse,
                    "x": 100,
                    "y": 200,
                    "seeCb": function(jeu) {
                        jeu.texte({"texte": "Le blender est cassé, il va falloir que papa le répare à nouveau..."});
                    }
                }
        }
    }
}
