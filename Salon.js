const Salon = function(images) {
    this._fond = images["s_salon"];
    this._masque = images["s_salon.masque"];
}
Salon.prototype.nom = "salon";
Salon.prototype.affiche = function(jeuCtx, masqueCtx) {
    jeuCtx.drawImage(this._fond, 0, 0);
    masqueCtx.drawImage(this._masque, 0, 0);
};
Salon.prototype.getUseAction = function(color) {
    return "use";
};
Salon.prototype.seeAction = function(color, model) {
    switch(color) {
        case "ff0000": {
            jeu.afficheTexte("Un trou noir qui ramène à ma chambre.");
            break;
        }
    }
};
Salon.prototype.useAction = function(color, model) {
    switch(color) {
        case "ff0000": {
            jeu.afficheScene("chambre");
            break;
        }
    }
};