const Salon = function (images) {
    this._fond = images["s_salon"];
    this._masque = images["s_salon.masque"];
}
Salon.prototype.nom = "salon";
Salon.prototype.affiche = function (jeu) {
    jeu.afficheFond(this._fond, this._masque);
    jeu.definitObjet(
        "ff0000",
        null,
        function (jeu) {
            jeu.texte("Un trou noir qui ramène à ma chambre.");
        },
        function (jeu) {
            jeu.scene("chambre");
        }
    );
};