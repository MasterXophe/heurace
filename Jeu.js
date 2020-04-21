const Jeu = function(jeuCanvas, images) {
    let that = this;
    this._jeuCanvas = jeuCanvas;
    this._iconeSee = images["seea"];
    this._iconeUse = images["usea"];
    this._scenes = {};
    this._scene = null;
    this._actions = {};
    this._mode = "see"; // "see" ou "use"
    this._texte = null;
    this._choix = null;
    this._model = {
        "navigateur": false,
        "chambre": {
            "mail": false,
            "fenetreRegardee": false
        }
    }

    // créé le masque
    this._masqueCanvas = document.createElement("canvas");
    this._masqueCanvas.width = this._jeuCanvas.width;
    this._masqueCanvas.height = this._jeuCanvas.height;

    // récupère les contextes
    this._jeuCtx = this._jeuCanvas.getContext('2d');
    this._jeuCtx.font = '18px serif';
    this._jeuCtx.textBaseline = "top";
    this._masqueCtx = this._masqueCanvas.getContext('2d');

    // écoute les événements
    that._jeuCanvas.addEventListener("mousemove", this._mouseMoveCb.bind(this), false);
    that._jeuCanvas.addEventListener("click", this._mouseClickCb.bind(this), false);
}
Jeu.prototype._mouseMoveCb = function(e) {
    let mouseX, mouseY;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    this._jeuCanvas.style.cursor = this.CURSEURS[this._mode];
    if(this._texte != null) {
        return;
    }
    let color = this._getMasqueColor(mouseX, mouseY);
    if(color === "000000") {
        return;
    }
    let action = this._actions[color];
    if (action == null) {
        return;
    }
    this._jeuCanvas.style.cursor = this.CURSEURS[action.curseurCb != null ? action.curseurCb(this._mode) : this._mode + "a"];
}
Jeu.prototype._mouseClickCb = function(e) {
    let mouseX, mouseY;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    if(this._texte != null) {
        let cb = this._texte.cb;
        this._texte = null;
        if(cb != null) {
            cb();
        }
        this._affiche();
        return;
    }
    let color = this._getMasqueColor(mouseX, mouseY);
    if(color === "000000") {
        return;
    }
    let action = this._actions[color];
    if(action == null) {
        return;
    }
    if(this._mode === "see") {
        action.seeCb(this);
    } else {
        if(action.useCb != null) {
            action.useCb(this);
        } else {
            this.texte("Ça ne fait rien.");
        }
    }
    this._affiche();
}
Jeu.prototype.texte = function(texte, cb) {
    this._texte = {
        "texte":texte,
        "cb":cb
    }
}
Jeu.prototype.choix = function(texte1, cb1, texte2, cb2, texte3, cb3, texte4, cb4) {
    this._choix = {
        "texte1":texte1,
        "cb1":cb1 || this.noop,
        "texte2":texte2,
        "cb2":cb2 || this.noop,
        "texte3":texte3,
        "cb3":cb3 || this.noop,
        "texte4":texte4,
        "cb4":cb4 || this.noop
    }
}
Jeu.prototype.scene = function(sceneNom) {
    this._texte = null;
    this._choix = null;
    this._scene = this._scenes[sceneNom];
    this._affiche();
}
Jeu.prototype._choixCbHelper = function(cbNom) {
    let that = this;
    return function() {
        console.log(cbNom);
        let cb = that["_choix"][cbNom];
        that._choix = null;
        cb(that);
    }
}
Jeu.prototype._afficheTexte = function() {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 481, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this.fillText(this._texte.texte, 10, 480, 640);
    this._jeuCtx.fillStyle = "gray";
    this._jeuCtx.fillText("(cliquer pour continuer)", 460, 540);
}
Jeu.prototype._afficheChoix = function() {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 481, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeStyle = "black";
    this._jeuCtx.fillText("> " + this._choix.texte1, 10, 480);
    this._masqueCtx.fillStyle = "#ffff80";
    this._masqueCtx.fillRect(10, 480, 630, 20);
    let cb = this._choixCbHelper("cb1");
    this.definitObjet("ffff80", cb, cb, function() { return "usea"; });
    if(this._choix.texte2) {
        this._jeuCtx.fillText("> " + this._choix.texte2, 10, 500);
        this._masqueCtx.fillStyle = "#ffff90";
        this._masqueCtx.fillRect(10, 500, 630, 20);
        let cb = this._choixCbHelper("cb2");
        this.definitObjet("ffff90", cb, cb, function() { return "usea"; });
    }
    if(this._choix.texte3) {
        this._jeuCtx.fillText("> " + this._choix.texte3, 10, 520);
        this._masqueCtx.fillStyle = "#ffffa0";
        this._masqueCtx.fillRect(10, 520, 630, 20);
        let cb = this._choixCbHelper("cb3");
        this.definitObjet("ffffa0", cb, cb, function() { return "usea"; });
    }
    if(this._choix.texte4) {
        this._jeuCtx.fillText("> " + this._choix.texte4, 10, 540);
        this._masqueCtx.fillStyle = "#ffffb0";
        this._masqueCtx.fillRect(10, 540, 630, 20);
        let cb = this._choixCbHelper("cb4");
        this.definitObjet("ffffb0", cb, cb, function() { return "usea"; });
    }
}
Jeu.prototype._afficheInventaire = function() {
    let that = this;
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 481, 640, 79);
    this._texte = null;
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeRect(8, 488, 72, 64);
    if(this._mode === "see") {
        this.ajouteObjet(this._iconeUse, 10, 490, function() { return "usea"; }, function() { that._mode = "use"; that._affiche(); }, function() {});
    } else {
        this.ajouteObjet(this._iconeSee, 10, 490, function() { return "seea"; }, function() {}, function() { that._mode = "see"; that._affiche(); });
    }
}
Jeu.prototype._affiche = function() {
    this._actions = {};
    this._scene.affiche(this);
    this._masqueCtx.fillStyle = "black";
    this._masqueCtx.fillRect(0, 480, 640, 80);
    if(this._texte != null) {
        this._afficheTexte();
    } else if(this._choix != null) {
        this._afficheChoix();
    } else {
        this._afficheInventaire();
    }
    this._masque = this._masqueCtx.getImageData(0, 0, 640, 560).data;
//    this._jeuCtx.putImageData(this._masqueCtx.getImageData(0, 0, 640, 560), 0, 0);
}
Jeu.prototype.addScene = function(scene) {
    this._scenes[scene.nom] = scene;
}
Jeu.prototype.afficheFond = function(fond, masque) {
    this._jeuCtx.drawImage(fond, 0, 0);
    this._masqueCtx.drawImage(masque, 0, 0);
}
Jeu.prototype.definitObjet = function(couleur, seeCb, useCb, curseurCb) {
    this._actions[couleur] = {
        "curseurCb": curseurCb,
        "seeCb": seeCb,
        "useCb": useCb
    }
}
Jeu.prototype.ajouteObjet = function(sprite, x, y, curseurCb, seeCb, useCb) {
    // choisit une couleur et enregistre l'action
    let r = Math.floor(Math.random()*256);
    let v = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let couleur = this._toHex(r, v, b);
    this._actions[couleur] = {
        "curseurCb": curseurCb,
        "seeCb": seeCb,
        "useCb": useCb
    }
    this._jeuCtx.drawImage(sprite, x, y);
    // recopie tout ce qui est visible du sprite dans le masque avec la couleur choisie
    let spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = sprite.width;
    spriteCanvas.height = sprite.height;
    let spriteCtx = spriteCanvas.getContext("2d");
    spriteCtx.drawImage(sprite, 0, 0);
    let spriteData = spriteCtx.getImageData(0, 0, sprite.width, sprite.height).data;
    let masqueData = this._masqueCtx.getImageData(0, 0, 640, 560);
    let masqueDataData = masqueData.data;
    for(let sx = 0 ; sx < sprite.width ; sx++) {
        for(let sy = 0 ; sy < sprite.height ; sy++) {
            if (spriteData[(sy * sprite.width * 4) + (sx * 4) + 3] !== 0) {
                masqueDataData[((y + sy) * 2560) + ((x + sx) * 4)] = r;
                masqueDataData[((y + sy) * 2560) + ((x + sx) * 4) + 1] = v;
                masqueDataData[((y + sy) * 2560) + ((x + sx) * 4) + 2] = b;
                masqueDataData[((y + sy) * 2560) + ((x + sx) * 4) + 3] = 255;
            }
        }
    }
    this._masqueCtx.putImageData(masqueData, 0, 0);
}
Jeu.prototype._toHex = function(r, v, b) {
    return "" + ((1 << 24) + (r << 16) + (v << 8) + b).toString(16).slice(1);
}
Jeu.prototype._getMasqueColor = function(mouseX, mouseY) {
    let r = this._masque[(mouseY * 2560 + mouseX * 4)];
    let v = this._masque[(mouseY * 2560 + mouseX * 4) + 1];
    let b = this._masque[(mouseY * 2560 + mouseX * 4) + 2];
    return this._toHex(r, v, b);
}
Jeu.prototype.fillText = function(texte, x, y, width) {
    width = width || 0;
    if (width <= 0) {
        this._jeuCtx.fillText(texte, x, y);
        return;
    }
    let words = texte.replace(/\n/g, " \n ");
    words = words.split(" ");
    let currentLine = 0;
    let idx = 1;
    while (words.length > 0 && idx <= words.length) {
        if(words[idx] === "\n") {
            this._jeuCtx.fillText(words.slice(0, idx).join(' '), x, y + (20 * currentLine) );
            currentLine++;
            words = words.splice(idx + 1);
            idx = 1;
            continue;
        }
        let str = words.slice(0, idx).join(' ');
        let w = this._jeuCtx.measureText(str).width;
        if(w > width) {
            if(idx === 1) {
                idx = 2;
            }
            this._jeuCtx.fillText(words.slice(0, idx - 1).join(' '), x, y + (20 * currentLine) );
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        } else {
            idx++;
        }
    }
    if(idx > 0) {
        this._jeuCtx.fillText(words.join(' '), x, y + (20 * currentLine));
    }
}
Jeu.prototype.noop = function() {
}
Jeu.prototype.CURSEURS = {
    "see":"url(curseur_see.png) 32 32, pointer",
    "seea":"url(curseur_seea.png) 32 32, pointer",
    "use":"url(curseur_use.png) 24 14, pointer",
    "usea":"url(curseur_usea.png) 24 14, pointer"
}
