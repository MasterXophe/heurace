const GLOBAL_OBJETS = {
    "papa": function(jeu) {
        const talkCb = function(jeu) {
            let choix = [];
            if(jeu.model.papa !== "cuisine") {
                choix.push({
                    "texte": "À propos de tes casiers de rangement...",
                    "cb": function(jeu) {
                        let choix = [{
                            "texte": "Tu veux que je t'aide à les ranger ?",
                            "cb": function(jeu) {
                                if(jeu.model.papa === "casiers") {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.papa,
                                        "texte": "Noooooon ! Ne touche pas à mes casiers ! Ils sont déjà parfaitement rangés."
                                    });
                                } else {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.papa,
                                        "texte": "Non merci, je préfère m'en occuper moi-même."
                                    });
                                }
                            },
                        }];
                        if(jeu.model.atelier.casiersDeranges && jeu.model.papa == null) {
                            choix.push({
                                "texte": "Je vois un boulon dans les écrous et une vis dans les rondelles.",
                                "cb": function(jeu) {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.papa,
                                        "texte": "Quoi !?! Laisse-moi voir ça...",
                                        "cb": function(jeu) {
                                            jeu.model.papa = "casiers";
                                        }
                                    });
                                }
                            });
                        }
                        jeu.choix({"choix": choix});
                    }
                });
                choix.push({
                    "texte": "À propos de la cuisine...",
                    "cb": function(jeu) {
                        let choix = [{
                            "texte": "Tu ne veux pas aller te faire un jus de fruit à la cuisine ?",
                            "cb": function(jeu) {
                                jeu.texte({"qui": jeu.sprites.qui.papa, "texte": "Non, je n'ai pas soif."});
                            }
                        }];
                        if(jeu.model.cuisine.blender === "casse") {
                            choix.push({
                                "texte": "Le blender est cassé, il faut que tu le répares !",
                                "cb": function(jeu) {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.papa,
                                        "texte": "Encore !?! Ce n'est pas encore une de tes expériences j'espère ! Bon... je vais voir ce qu'il a.",
                                        "cb": function(jeu) {
                                            jeu.model.papa = "cuisine";
                                        }
                                    });
                                }
                            });
                        }
                        jeu.choix({
                            "choix": choix
                        });
                    }
                });
            }
            choix.push({
                "texte": "À propos de maman...",
                "cb": function(jeu) {
                    let choix = [{
                        "texte": "Elle est dans le salon, tu ne veux pas aller la voir ?",
                        "cb": function(jeu) {
                            jeu.texte({
                                "qui": jeu.sprites.qui.papa,
                                "texte": "J'irai la voir tout à l'heure, je dois d'abord finir ça."
                            });
                        }
                    }];
                    if(jeu.model.salon.mamanChanson === "quoi") {
                        choix.push({
                            "texte": "Tu connais sa chanson préférée ?",
                            "cb": function(jeu) {
                                jeu.texte({
                                    "qui": jeu.sprites.qui.papa,
                                    "texte": "C'est une chanson d'un groupe norvégien, Morgen quelque chose..."
                                });
                                jeu.model.salon.mamanChanson = "groupe";
                            }
                        });
                    }
                    if(jeu.model.salon.mamanChanson === "chanson") {
                        choix.push({
                            "texte": "Tu connais sa chanson préférée ? C'est de Mørgen band.",
                            "cb": function(jeu) {
                                jeu.texte({
                                    "qui": jeu.sprites.qui.papa,
                                    "texte": "Ah oui, Mørgen band, ça me revient ! C'est une chanson qui parle d'un couple qui se balade dans un fjord, je crois..."
                                });
                                jeu.model.salon.mamanChanson = "titre";
                            }
                        });
                    }
                    if(jeu.model.salon.mamanThe === "quoi") {
                        choix.push({
                            "texte": "Tu connais son thé préféré ?",
                            "cb": function(jeu) {
                                if(jeu.model.carnet !== "rendu") {
                                    jeu.texte({
                                        "qui": jeu.sprites.qui.papa,
                                        "texte": "Oh c'est compliqué, j'ai noté la recette dans mon carnet, mais je ne sais plus où je l'ai mis."
                                    });
                                    jeu.model.carnet = "recherche";
                                    return;
                                }
                                jeu.texte({
                                    "qui": jeu.sprites.qui.papa,
                                    "texte": "Attends, c'est dans mon carnet... c'est pas ça... c'est pas ça... ah voila ! Son thé favori est le Rooibos-cannelle-gingembre."
                                });
                                jeu.model.salon.mamanThe = "recette";
                            }
                        });
                    }
                    jeu.choix({"choix": choix});
                }
            });
            choix.push({
                "texte": "Non, rien."
            });
            jeu.choix({"choix": choix});
        }
        if(jeu.model.papa == null && jeu.model.scene === "atelier") {
            return {
                "nom": "papa",
                "sprite": jeu.sprites.atelier.papa,
                "x": 532,
                "y": 258,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "Mon papa, il est inventeur."});
                },
                "talkCb": talkCb
            }
        }
        if(jeu.model.papa === "casiers" && jeu.model.scene === "atelier") {
            return {
                "nom": "papa",
                "sprite": jeu.sprites.atelier.papa,
                "x": 199,
                "y": 171,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "Mon papa, il est inventeur."});
                },
                "talkCb": talkCb
            }
        }
        if(jeu.model.papa === "cuisine" && jeu.model.scene === "cuisine") {
            return {
                "nom": "papa",
                "sprite": jeu.sprites.atelier.papa,
                "x": 165,
                "y": 230,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "Mon papa, il est inventeur."});
                },
                "talkCb": talkCb
            }
        }
        return null;
    }
}