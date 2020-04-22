const Salon = function () {
    this.sprites = {
        "salon": null,
        "salon_porteatelier": null,
        "salon_portechambre": null,
        "salon_portecuisine": null
    };
}
Salon.prototype.nom = "salon";
Salon.prototype.getSprites = function() {
    return this.sprites;
}
Salon.prototype.affiche = function (jeu) {
    jeu.afficheFond(this.sprites.salon);
    jeu.ajouteObjet(
        this.sprites.salon_porteatelier,
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
        this.sprites.salon_portechambre,
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
        this.sprites.salon_portecuisine,
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