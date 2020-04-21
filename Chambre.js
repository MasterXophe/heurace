const Chambre = function (images) {
    this._fond = images["chambre"];
    this._fenetre = images["chambre_fenetre"];
    this._ordinateur = images["chambre_ordinateur"];
    this._table = images["chambre_table"];
};
Chambre.prototype.nom = "chambre";
Chambre.prototype.affiche = function (jeu) {
    jeu.afficheFond(this._fond);
    jeu.ajouteObjet(
        this._fenetre,
        260,
        90,
        function (jeu) {
            if (jeu._model.chambre.fenetreRegardee) {
                jeu.texte("Je ne vois rien d'intéressant dehors.");
            } else {
                jeu.texte("La fenêtre");
                jeu._model.chambre.fenetreRegardee = true;
            }
        },
        function (jeu) {
            jeu.texte("Je préfère ne pas l'ouvrir, qui sait ce qu'il y a dehors ?");
        }
    );
    jeu.ajouteObjet(
        this._ordinateur,
        20,
        200,
        function (jeu) {
            jeu.texte("Mon ordinateur.\nJe passe la moitié de mon temps à travailler dessus... et l'autre moitié à me divertir dessus.");
        },
        function (jeu) {
            jeu.choix(
                "Mail", function () {
                    jeu.choix(
                        "Lire le mail", null,
                        "Écrire un mail", function () {
                            jeu._model.chambre.mail = true;
                        },
                        "Non, rien...", null
                    );
                },
                "Navigateur web", function () {
                    jeu._model.navigateur = true;
                },
                "Aller au salon", function () {
                    jeu.scene("salon");
                },
                "Non, rien...", null
            );
        }
    );
    jeu.ajouteObjet(
        this._table,
        300,
        300,
        function (jeu) {
            jeu.texte("Une table");
        }
    );
};