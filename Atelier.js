const Atelier = function() {
}
Atelier.prototype.nom = "atelier";
Atelier.prototype.affiche = function(jeu) {
    jeu.afficheFond(jeu.sprites.atelier.fond);
    jeu.ajouteObjet(
        jeu.sprites.atelier.perceuse,
        547,
        369,
        function(jeu) {
            if(jeu.model.etape === "recherche") {
                if(jeu.inventaireContient("idee_perceuse")) {
                    jeu.texte({"texte": "Une perceuse, avec la bonne mèche, ça peut faire du dégât."});
                } else {
                    jeu.texte({"texte": "Une perceuse, avec la bonne mèche, ça peut faire du dégât. C'est une idée."});
                    jeu.inventaireRemplace("idee", "idee_perceuse");
                }
            }
        },
        function(jeu) {
            if(jeu.model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                jeu.texte({"texte": "Je n'ai pas le temps de faire des petits trous, je dois construire mon robot."});
            }
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.atelier.affiche,
        393,
        108,
        function(jeu) {
            jeu.texte({"texte": "Les consignes de sécurité qu'il faut respecter dans l'atelier."});
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.atelier.carton,
        394,
        269,
        function(jeu) {
            jeu.texte({"texte": "Un vieux carton vide. Ce n'est pas assez solide pour servir de blindage."});
        }
    );
    jeu.ajouteObjet(
        jeu.inventaireContient("tole") || jeu.inventaireContient("toledecoupee") ? jeu.sprites.atelier.toles2 : jeu.sprites.atelier.toles3,
        462,
        293,
        function(jeu) {
            if(jeu.inventaireContient("idee_tole")) {
                jeu.texte({"texte": "Des tôles en acier. Elles sont assez lourdes, et dures à découper.",});
            } else {
                jeu.texte({"texte": "Des tôles en acier. C'est une idée.",});
                jeu.inventaireRemplace("idee", "idee_tole");
            }
        },
        function(jeu) {
            if(jeu.model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                if(jeu.inventaireContient("tole") || jeu.inventaireContient("toledecoupee")) {
                    jeu.texte({"texte": "J'ai déjà ce qu'il faut."});
                } else {
                    jeu.texte({"texte": "J'en prends une."});
                    jeu.inventaireAjoute("tole");
                }
            }
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.atelier.casiers,
        178,
        156,
        function(jeu) {
            jeu.texte({"texte": "Mon père passe des heures à ranger les vis, les boulons, les écrous et autres trucs bien chacun dans sa petite case."});
        },
        function(jeu) {
            if(jeu.model.papa === "casiers") {
                jeu.texte({"qui": jeu.sprites.qui.papa, "texte": "Pas touche à mes casiers !"});
                return;
            }
            if(jeu.model.atelier.casiersDeranges) {
                jeu.texte({"texte": "J'y ai assez mis le bazar comme ça."});
                return;
            }
            jeu.choix({
                "choix": [{
                    "texte": "Et si je dérangeais un truc ?",
                    "cb": function(jeu) {
                        jeu.texte({
                            "texte": "Ok, c'est parti, revoyons légèrement le classement par mon ordre favori : l'ordre aléatoire !",
                            "cb": function(jeu) {
                                jeu.model.atelier.casiersDeranges = true;
                            }
                        });
                    }
                }, {
                    "texte": "Je préfère ne rien toucher... Et puis pourquoi faire ça ?"
                }]
            });
        }
    );
    if(jeu.model.atelier.masqueBouge) {
        jeu.ajouteObjet(
            jeu.sprites.atelier.masque,
            322,
            211,
            function(jeu) {
                jeu.texte({"texte": "C'est le masque qui sert avec le chalumeau pour la soudure."});
            }
        );
    }
    jeu.ajouteObjet(
        jeu.sprites.atelier.chalumeau,
        302,
        228,
        function(jeu) {
            if(jeu.model.etape === "recherche" && !jeu.inventaireContient("idee_chalumeau")) {
                jeu.texte({"texte": "Oh le beau chalumeau, comme il a l'air dangereux ! C'est une idée."});
                jeu.inventaireRemplace("idee", "idee_chalumeau");
            } else {
                jeu.texte({"texte": "Un beau chalumeau, bien dangereux !"});
            }
        },
        function(jeu) {
            if(jeu.model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                jeu.texte({"texte": "Je n'ai pas le temps de jouer, je dois construire mon robot."});
            }
        }
    );
    if(!jeu.model.atelier.masqueBouge) {
        jeu.ajouteObjet(
            jeu.sprites.atelier.masque,
            304,
            219,
            function(jeu) {
                jeu.texte({"texte": "C'est un masque qui sert avec le chalumeau pour la soudure, mais je ne sais pas où est le chalumeau."});
            },
            function(jeu) {
                jeu.model.atelier.masqueBouge = true;
            }
        );
    }
    jeu.ajouteObjet(
        jeu.sprites.atelier.moustikiller,
        516,
        253,
        function(jeu) {
            jeu.texte({
                "texte": "Le Moustikiller, la dernière invention de mon père. Il a couplé un détecteur de mouvement très sensible avec un laser très puissant. Son rôle est de réperer et de cramer les moustiques...",
                "cb": function(jeu) {
                    jeu.texte({
                        "texte": "Le problème, c'est que le détecteur ne distingue pas un moustique d'un chat, et que le laser est suffisamment puissant pour tuer un chat... C'est pour ça qu'on a plus de chat.",
                        "cb": function(jeu) {
                            if(!jeu.inventaireContient("idee_moustikiller")) {
                                jeu.texte({"texte": "Le contrôleur du Moustikiller est programmé pour détecter et tuer. C'est une idée."});
                                jeu.inventaireRemplace("idee", "idee_moustikiller");
                            }
                        }
                    });
                }
            });
        },
        function(jeu) {
            jeu.texte({"texte": "Sérieusement, je préfère ne pas y toucher !"});
        }
    );
    jeu.ajouteObjet(
        jeu.sprites.atelier.planches,
        231,
        313,
        function(jeu) {
            if(jeu.model.etape === "recherche") {
                if(jeu.inventaireContient("idee_planches")) {
                    jeu.texte({"texte": "Du bois, j'en prends parfois pour bricoler des cabanes. J'en prends aussi pour bricoler des trébuchets pour détruire les cabanes."});
                } else {
                    jeu.texte({"texte": "Avec du bois, je pourrais faire une protection pour mon robot. C'est une idée."});
                    jeu.inventaireRemplace("idee", "idee_planches");
                }
            }
        },
        function(jeu) {
            if(jeu.model.etape === "recherche") {
                jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
            } else {
                jeu.texte({"texte": "Je n'en ai pas besoin."});
            }
        }
    );
    if(!jeu.inventaireContient("scie")) {
        jeu.ajouteObjet(
            jeu.sprites.atelier.scie,
            112,
            308,
            function(jeu) {
                if(jeu.model.etape === "recherche" && !jeu.inventaireContient("idee_scie")) {
                    jeu.texte({"texte": "Une scie circulaire. Ça découpe n'importe quoi, souvent même ce qu'on ne veut pas. C'est une idée."});
                    jeu.inventaireRemplace("idee", "idee_scie");
                } else {
                    jeu.texte({"texte": "Une scie circulaire. Ça découpe n'importe quoi, souvent même ce qu'on ne veut pas."});
                }
            },
            function(jeu) {
                if(jeu.model.etape === "recherche") {
                    jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
                } else {
                    if(jeu.model.papa == null || jeu.model.papa === "casiers") {
                        jeu.texte({"qui": jeu.sprites.qui.papa, "texte": "Ne touche pas à ça, c'est dangereux !"});
                    } else {
                        jeu.texte({"texte": "Ah, maintenant je peux prendre la scie circulaire !"});
                        jeu.inventaireRemplace("objectif_scie", "scie");
                    }
                }
            }
        );
    }
    if(jeu.model.papa == null || jeu.model.papa === "casiers") {
        jeu.ajouteObjet(
            jeu.sprites.atelier.papa,
            jeu.model.papa === "casiers" ? 199 : 532,
            jeu.model.papa === "casiers" ? 171 : 258,
            function(jeu) {
                jeu.texte({"texte": "Mon papa, il est inventeur."});
            },
            null,
            function(jeu) {
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
        );
    }
    jeu.ajouteObjet(
        jeu.sprites.atelier.porte,
        16,
        78,
        null,
        function(jeu) {
            jeu.scene("salon");
        }
    );
}
