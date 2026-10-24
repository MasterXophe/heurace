const ATELIER_OBJETS = {
    "atelier": function(jeu) {
        return {
            "nom": "atelier",
            "sprite": jeu.sprites.atelier.fond,
            "x": 0,
            "y": 0
        }
    },
    "tolefourmis": function(jeu) {
        if(jeu.model.atelier.moustikiller == null) {
            return null;
        }
        return {
            "nom": "tolefourmis",
            "sprite": jeu.sprites.atelier.tolefourmis,
            "x": 403,
            "y": 378
        }
    },
    "perceuse": function(jeu) {
        return {
            "nom": "perceuse",
            "sprite": jeu.sprites.atelier.perceuse,
            "x": 547,
            "y": 369,
            "seeCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_droit, 490, 300);
                if(jeu.model.etape === "recherche") {
                    if(jeu.inventaireContient("idee_perceuse")) {
                        jeu.texte({"texte": "Une perceuse, avec la bonne mèche, ça peut faire du dégât."});
                    } else {
                        jeu.texte({"texte": "Une perceuse, avec la bonne mèche, ça peut faire du dégât. C'est une idée."});
                        jeu.inventaireRemplace("idee", "idee_perceuse");
                    }
                }
            },
            "useCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_droit, 490, 300);
                if(jeu.model.etape === "recherche") {
                    jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
                } else {
                    jeu.texte({"texte": "Je n'ai pas le temps de faire des petits trous, je dois construire mon robot."});
                }
            }
        }
    },
    "affiche": function(jeu) {
        return {
            "nom": "affiche",
            "sprite": jeu.sprites.atelier.affiche,
            "x": 393,
            "y": 108,
            "seeCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_dos, 420, 250);
                jeu.texte({"texte": "Toutes les consignes de sécurité que je ne respecte pas dans l'atelier."});
            }
        }
    },
    "carton": function(jeu) {
        return {
            "nom": "carton",
            "sprite": jeu.sprites.atelier.carton,
            "x": 394,
            "y": 269,
            "seeCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_dos, 420, 250);
                jeu.texte({"texte": "Un vieux carton vide. Ce n'est pas assez solide pour servir de blindage."});
            }
        }
    },
    "tole": function(jeu) {
        return {
            "nom": "tole",
            "sprite": jeu.inventaireContient("tole") || jeu.inventaireContient("toledecoupee") ? jeu.sprites.atelier.toles2 : jeu.sprites.atelier.toles3,
            "x": 462,
            "y": 293,
            "seeCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_droit, 420, 250);
                if(jeu.inventaireContient("idee_tole")) {
                    jeu.texte({"texte": "Des tôles en acier. Elles sont assez lourdes, et dures à découper.",});
                } else {
                    jeu.texte({"texte": "Des tôles en acier. C'est une idée.",});
                    jeu.inventaireRemplace("idee", "idee_tole");
                }
            },
            "useCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_droit, 420, 250);
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
        }
    },
    "casiers": function(jeu) {
        return {
            "nom": "casiers",
            "sprite": jeu.sprites.atelier.casiers,
            "x": 178,
            "y": 156,
            "seeCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_dos, 230, 250);
                jeu.texte({"texte": "Mon père passe des heures à ranger les vis, les boulons, les écrous et autres trucs bien chacun dans sa petite case."});
            },
            "useCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_dos, 230, 250);
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
        }
    },
    "masque": function(jeu) {
        if(jeu.model.atelier.masqueBouge) {
            return {
                "nom": "masque",
                "sprite": jeu.sprites.atelier.masque,
                "x": 322,
                "y": 211,
                "seeCb": function(jeu) {
                    jeu.hero(jeu.sprites.personnages.heurace_dos, 280, 250);
                    jeu.texte({"texte": "C'est le masque qui sert avec le chalumeau pour la soudure."});
                }
            }
        } else {
            return {
                "nom": "masque",
                "sprite": jeu.sprites.atelier.masque,
                "x": 304,
                "y": 219,
                "seeCb": function(jeu) {
                    jeu.hero(jeu.sprites.personnages.heurace_dos, 280, 250);
                    jeu.texte({"texte": "C'est un masque qui sert avec le chalumeau pour la soudure, mais je ne sais pas où est le chalumeau."});
                },
                "useCb": function(jeu) {
                    jeu.hero(jeu.sprites.personnages.heurace_dos, 280, 250);
                    jeu.model.atelier.masqueBouge = true;
                }
            }
        }
    },
    "chalumeau": function(jeu) {
        if(jeu.model.atelier.masqueBouge) {
            return {
                "nom": "chalumeau",
                "sprite": jeu.sprites.atelier.chalumeau,
                "x": 302,
                "y": 228,
                "seeCb": function(jeu) {
                    jeu.hero(jeu.sprites.personnages.heurace_dos, 280, 250);
                    if(jeu.model.etape === "recherche" && !jeu.inventaireContient("idee_chalumeau")) {
                        jeu.texte({"texte": "Oh le beau chalumeau, comme il a l'air dangereux ! C'est une idée."});
                        jeu.inventaireRemplace("idee", "idee_chalumeau");
                    } else {
                        jeu.texte({"texte": "Un beau chalumeau, bien dangereux !"});
                    }
                },
                "useCb": function(jeu) {
                    jeu.hero(jeu.sprites.personnages.heurace_dos, 280, 250);
                    if(jeu.model.etape === "recherche") {
                        jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
                    } else {
                        jeu.texte({"texte": "Je pense que je pourrais découper les tôles avec, mais je ne sais pas m'en servir... Il va falloir que je trouve un autre moyen !"});
                    }
                }
            }
        } else {
            return null;
        }
    },
    "moustikiller": function(jeu) {
        let x, y, sprite;
        switch(jeu.model.atelier.moustikiller) {
            case "pret":
                x = 516;
                y = 253;
                sprite = jeu.sprites.atelier.moustikillerpret;
                break;
            case "tire":
                x = 416;
                y = 253;
                sprite = jeu.sprites.atelier.moustikillertire;
                break;
            default:
                x = 516;
                y = 253;
                sprite = jeu.sprites.atelier.moustikiller;
                break;
        }
        return {
            "nom": "moustikiller",
            "sprite": sprite,
            "x": x,
            "y": y,
            "seeCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_droit, 490, 320);
                jeu.texte({
                    "texte": "Le Moustikiller, la dernière invention de mon père. Il a couplé un détecteur de mouvement très sensible avec un laser très puissant. Son rôle est de réperer et de cramer les moustiques...",
                    "cb": function(jeu) {
                        jeu.texte({
                            "texte": "Le problème, c'est que le détecteur ne distingue pas un moustique d'un chat, et que le laser est suffisamment puissant pour tuer un chat... C'est pour ça qu'on a plus de chat.",
                            "cb": function(jeu) {
                                if(jeu.model.etape === "recherche") {
                                    if(!jeu.inventaireContient("idee_moustikiller")) {
                                        jeu.texte({"texte": "Le contrôleur du Moustikiller est programmé pour détecter et tuer. C'est une idée."});
                                        jeu.inventaireRemplace("idee", "idee_moustikiller");
                                    }
                                } else {
                                    jeu.texte({"texte": "Je me demande si le laser ne serait pas assez puissant pour découper une tôle..."});
                                }
                            }
                        });
                    }
                });
            },
            "useCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_droit, 490, 320);
                jeu.texte({"texte": "Sérieusement, je préfère ne pas y toucher !"});
            }
        }
    },
    "planches": function(jeu) {
        return {
            "nom": "planches",
            "sprite": jeu.sprites.atelier.planches,
            "x": 231,
            "y": 313,
            "seeCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_dos, 230, 250);
                if(jeu.model.etape === "recherche" && !jeu.inventaireContient("idee_planches")) {
                    jeu.texte({"texte": "Avec du bois, je pourrais faire une protection pour mon robot. C'est une idée."});
                    jeu.inventaireRemplace("idee", "idee_planches");
                } else {
                    jeu.texte({"texte": "Du bois, j'en prends parfois pour bricoler des cabanes. J'en prends aussi pour bricoler des trébuchets pour détruire les cabanes."});
                }
            },
            "useCb": function(jeu) {
                jeu.hero(jeu.sprites.personnages.heurace_dos, 230, 250);
                if(jeu.model.etape === "recherche") {
                    jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
                } else {
                    jeu.texte({"texte": "Je n'en ai pas besoin."});
                }
            }
        }
    },
    "scie": function(jeu) {
        if(!jeu.inventaireContient("scie")) {
            return {
                "nom": "scie",
                "sprite": jeu.sprites.atelier.scie,
                "x": 112,
                "y": 308,
                "seeCb": function(jeu) {
                    jeu.hero(jeu.sprites.personnages.heurace_dos, 160, 250);
                    if(jeu.model.etape === "recherche" && !jeu.inventaireContient("idee_scie")) {
                        jeu.texte({"texte": "Une scie circulaire. Ça découpe n'importe quoi, souvent même ce qu'on ne veut pas. C'est une idée."});
                        jeu.inventaireRemplace("idee", "idee_scie");
                    } else {
                        jeu.texte({"texte": "Une scie circulaire. Ça découpe n'importe quoi, souvent même ce qu'on ne veut pas."});
                    }
                },
                "useCb": function(jeu) {
                    jeu.hero(jeu.sprites.personnages.heurace_dos, 160, 250);
                    if(jeu.model.etape === "recherche") {
                        jeu.texte({"texte": "Je cherche juste des idées, je ne prends rien pour l'instant."});
                    } else {
                        if(jeu.model.papa == null || jeu.model.papa === "casiers") {
                            jeu.texte({"qui": jeu.sprites.qui.papa, "texte": "Ne touche pas à ça, c'est dangereux !"});
                        } else {
                            jeu.texte({"texte": "Ah, maintenant je peux prendre la scie circulaire ! Comme elle est belle ! Comme elle est... dangereuse !!!"});
                            jeu.inventaireRemplace("objectif_scie", "scie");
                            COMMON.isCollecteTerminee(jeu);
                        }
                    }
                }
            }
        }
    },
    "porte": function(jeu) {
        return {
            "nom": "porte",
            "sprite": jeu.sprites.atelier.porte,
            "x": 16,
            "y": 78,
            "useCb": function(jeu) {
                jeu.scene("salon");
                jeu.hero(jeu.sprites.personnages.heurace_gauche, 500, 240);
            }
        }
    }
}
