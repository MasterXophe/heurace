const Chambre = function (images) {
    this._fond = images["s_chambre"];
    this._masque = images["s_chambre.masque"];
};
Chambre.prototype.nom = "chambre";
Chambre.prototype.affiche = function(jeuCtx, masqueCtx) {
    jeuCtx.drawImage(this._fond, 0, 0);
    masqueCtx.drawImage(this._masque, 0, 0);
};
Chambre.prototype.getUseAction = function(color, model) {
    return "use";
};
Chambre.prototype.seeAction = function(color, model) {
    switch(color) {
        case "ff0000": {
            jeu.afficheTexte("La fenêtre", function () {
                jeu.afficheTexte("Je ne vois rien d'intéressant dehors. Je ne vois rien d'intéressant dehors. Je ne vois rien d'intéressant dehors. Je ne vois rien d'intéressant dehors. Je ne vois rien d'intéressant dehors.");
            });
            break;
        }
        case "00ff00": {
            jeu.afficheTexte("Mon ordinateur.\nJe passe la moitié de mon temps à travailler dessus... et l'autre moitié à me divertir dessus.");
            break;
        }
        case "0000ff": {
            jeu.afficheTexte("Mais qu'est-ce que c'est que ce truc ?");
        }
    }
};
Chambre.prototype.useAction = function(color, model) {
    switch(color) {
        case "00ff00": {
            jeu.afficheChoix(
                "Mail", function () {
                    jeu.afficheChoix(
                        "Lire le mail", function () {
                            jeu.termineChoix();
                        },
                        "Écrire un mail", function () {
                            jeu._model.chambre.mail = true;
                            jeu.termineChoix();
                        },
                        "Non, rien...", function () {
                            jeu.termineChoix();
                        }
                    );
                },
                "Navigateur web", function () {
                    jeu._model.navigateur = true;
                    jeu.termineChoix();
                },
                "Aller au salon", function () {
                    jeu.afficheScene("salon");
                },
                "Non, rien...", function () {
                    jeu.termineChoix();
                });
            break;
        }
    }
};