const GLOBAL_OBJETS = {
    "papa": function(jeu) {
        if(jeu.model.papa == null || jeu.model.papa === "casiers") {
            return {
                "sprite": jeu.sprites.atelier.papa,
                "x": jeu.model.papa === "casiers" ? 199 : 532,
                "y": jeu.model.papa === "casiers" ? 171 : 258,
                "seeCb": function(jeu) {
                    jeu.texte({"texte": "Mon papa, il est inventeur."});
                },
                "talkCb": function(jeu) {
                    jeu.choix({
                        "choix": [{
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
                        }, {
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
                                if(jeu.model.mamanChanson === "quoi") {
                                    choix.push({
                                        "texte": "Tu connais sa chanson préférée ?",
                                        "cb": function(jeu) {
                                            jeu.texte({
                                                "qui": jeu.sprites.qui.papa,
                                                "texte": "C'est une chanson d'un groupe norvégien, Morgen quelque chose..."
                                            });
                                            jeu.model.mamanChanson = "groupe";
                                        }
                                    });
                                }
                                if(jeu.model.mamanChanson === "chanson") {
                                    choix.push({
                                        "texte": "Tu connais sa chanson préférée ? C'est de Mørgen band.",
                                        "cb": function(jeu) {
                                            jeu.texte({
                                                "qui": jeu.sprites.qui.papa,
                                                "texte": "Ah oui, Mørgen band, ça me revient ! C'est une chanson qui parle d'un couple qui se balade dans un fjord, je crois..."
                                            });
                                            jeu.model.mamanChanson = "titre";
                                        }
                                    });
                                }
                                if(jeu.model.mamanThe === "quoi") {
                                    choix.push({
                                        "texte": "Tu connais son thé préféré ?",
                                        "cb": function(jeu) {

                                        }
                                    });
                                }
                                jeu.choix({"choix": choix});
                            }
                        }, {
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
                        }, {
                            "texte": "Non, rien."
                        }]
                    });
                }
            }
        }
    }
}