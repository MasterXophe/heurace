const Salon = function (images) {
    this._fond = images["salon"];
    this._porteatelier = images["salon_porteatelier"];
    this._portechambre = images["salon_portechambre"];
    this._portecuisine = images["salon_portecuisine"];
}
Salon.prototype.nom = "salon";
Salon.prototype.affiche = function (jeu) {
    jeu.afficheFond(this._fond);
    jeu.ajouteObjet(
        this._porteatelier,
        575,
        75,
        function (jeu) {
            jeu.texte("L'atelier de mon père.");
        },
        function (jeu) {
            jeu.texte("Je ne peux pas y aller.");
        }
    );
    jeu.ajouteObjet(
        this._portechambre,
        300,
        100,
        function (jeu) {
            jeu.texte("Ma chambre.");
        },
        function (jeu) {
            jeu.scene("chambre");
        }
    );
    jeu.ajouteObjet(
        this._portecuisine,
        15,
        50,
        function (jeu) {
            jeu.texte("La cuisine.");
        },
        function (jeu) {
            jeu.texte("Je n'ai rien à y faire.");
        }
    );
};