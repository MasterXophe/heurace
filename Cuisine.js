const Cuisine = function() {
}
Cuisine.prototype.nom = "cuisine";
Cuisine.prototype.affiche = function(jeu) {
    jeu.afficheFond(jeu.sprites.cuisine.fond);
    jeu.ajouteObjet(
        jeu.sprites.cuisine.portesalon,
        576,
        50,
        null,
        function(jeu) {
            jeu.scene("salon");
        }
    );
    switch(jeu.model.cuisine.blender) {
        case undefined:
            jeu.ajouteObjet(
                jeu.sprites.cuisine.blender,
                100,
                200,
                function(jeu) {
                    jeu.texte({"texte": "Le blender dont maman se sert pour faire des jus ou des soupes. Je n'ai plus le droit de m'en servir pour mes expériences, parce qu'après il est cassé et papa doit le réparer."});
                },
                function(jeu) {
                    jeu.model.cuisine.blender = "cailloux";
                }
            );
            break;
        case "cailloux":
            jeu.ajouteObjet(
                jeu.sprites.cuisine.blendercailloux,
                100,
                200,
                function(jeu) {
                    jeu.texte({"texte": "J'ai mis ma collection de cailloux dans le blender. S'il est assez puissant, cela va faire du sable. S'il ne l'est pas, il va probablement se casser. Dans les deux cas, ce sera amusant !"});
                },
                function(jeu) {
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
            );
            break;
        case "marche":
            jeu.ajouteObjet(
                jeu.sprites.cuisine.blendermarche,
                100,
                200
            );
            break;
        case "cassecailloux":
            jeu.ajouteObjet(
                jeu.sprites.cuisine.blendercassecailloux,
                100,
                200
            );
            break;
        case "casse":
            jeu.ajouteObjet(
                jeu.sprites.cuisine.blendercasse,
                100,
                200,
                function(jeu) {
                    jeu.texte({"texte": "Le blender est cassé, il va falloir que papa le répare à nouveau..."});
                }
            );
            break;
    }
    jeu.ajouteObjet(
        jeu.sprites.cuisine.bouilloirechaude,
        200,
        200,
        function(jeu) {

        },
        function() {

        }
    );
    if(jeu.model.carnet == null) {
        jeu.ajouteObjet(
            jeu.sprites.cuisine.carnet,
            300,
            200,
            function(jeu) {
                jeu.texte({"texte": "Hey, mais c'est le carnet de papa ! Il a du le ranger en même temps que les boîtes de thé."});
            },
            function(jeu) {
                jeu.texte({
                    "texte": "Je le prends, il y a le thé favori de maman noté dedans.", "cb": function(jeu) {
                        jeu.inventaireAjoute("carnet");
                        jeu.model.carnet = "trouve";
                    }
                });
            }
        );
    }
    jeu.ajouteObjet(
        jeu.sprites.cuisine.passoire,
        400,
        200,
        function(jeu) {
            if(jeu.model.etape === "recherche") {
                if(!jeu.inventaireContient("idee_passoire")) {
                    jeu.texte({"texte": "Cette passoire peut offrir une protection, elle a la bonne taille. C'est une idée."});
                    jeu.inventaireRemplace("idee", "idee_passoire");
                }
            } else {
                jeu.texte({"texte": "C'est une passoire."});
            }
        },
        function(jeu) {
            jeu.texte({"texte": "Je la prendrais si je veux me faire des pâtes."});
        }
    );
}
