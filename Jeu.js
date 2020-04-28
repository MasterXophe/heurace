const Jeu = function(jeuCanvas, scenes, objects, quiDefaut, initCb) {
    let that = this;
    this._jeuCanvas = jeuCanvas;
    this.sprites = {
        "curseur_seea": null,
        "curseur_usea": null
    };
    this.sprites[quiDefaut] = null;
    this.objects = {};
    let object;
    for(let i = 0, l = objects.length; i < l; i++) {
        object = objects[i];
        this.objects[object.nom] = object;
        this.sprites[object.nom] = null;
    }
    this.quiDefaut = quiDefaut;
    this._scenes = {};
    this._scene = null;
    this._actions = {};
    this._mode = "see"; // "see" ou "use"
    this._texte = null;
    this._choix = null;
    this._model = {
        "inventaire": [],
        "inventairePage": 0
    }
    let spritesToLoad = [this.sprites];
    let scene;
    for(let i = 0, l = scenes.length; i < l; i++) {
        scene = scenes[i];
        this._scenes[scene.nom] = scene;
        this._model[scene.nom] = {};
        spritesToLoad.push(scene.getSprites());
    }
    this.loadSprites(spritesToLoad, function() {
        // créé le masque
        that._masqueCanvas = document.createElement("canvas");
        that._masqueCanvas.width = that._jeuCanvas.width;
        that._masqueCanvas.height = that._jeuCanvas.height;

        // récupère les contextes
        that._jeuCtx = that._jeuCanvas.getContext('2d');
        that._jeuCtx.font = '17px serif';
        that._jeuCtx.textBaseline = "top";
        that._masqueCtx = that._masqueCanvas.getContext('2d');

        // écoute les événements
        that._jeuCanvas.addEventListener("mousemove", that._mouseMoveCb.bind(that), false);
        that._jeuCanvas.addEventListener("click", that._mouseClickCb.bind(that), false);

        initCb(that);
    });
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
    if(action == null) {
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
            cb(this);
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
            this.texte({"texte": "Ça ne fait rien."});
        }
    }
    this._affiche();
}
Jeu.prototype.texte = function(texte) {
    if(!texte.texte) {
        console.error("Le texte n'a pas la propriété 'texte'");
    }
    if(!texte.qui) {
        texte.qui = this.sprites[this.quiDefaut];
    }
    this._texte = texte;
}
Jeu.prototype.choix = function(choix) {
    if(!choix.qui) {
        choix.qui = this.sprites[this.quiDefaut];
    }
    this._choix = choix;
}
Jeu.prototype.scene = function(sceneNom) {
    this._texte = null;
    this._choix = null;
    this._scene = this._scenes[sceneNom];
    this._model.scene = sceneNom;
    this._affiche();
}
Jeu.prototype._choixCbHelper = function(cbNom) {
    let that = this;
    return function() {
        let cb = that["_choix"][cbNom];
        that._choix = null;
        if(cb != null) {
            cb(that);
        } else {
            that._affiche();
        }
    }
}
Jeu.prototype._afficheTexte = function() {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 480, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeRect(4, 488, 64, 64);
    this._jeuCtx.drawImage(this._texte.qui, 0, 0, this._texte.qui.width, this._texte.qui.height, 6, 490, 60, 60);
    this._jeuCtx.fillStyle = "black";
    this.fillText(this._texte.texte, 80, 480, 556);
    this._jeuCtx.fillStyle = "gray";
    this._jeuCtx.fillText("(cliquer pour continuer)", 460, 540);
}
Jeu.prototype._afficheChoix = function() {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 480, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeRect(4, 488, 64, 64);
    this._jeuCtx.drawImage(this._choix.qui, 0, 0, this._choix.qui.width, this._choix.qui.height, 6, 490, 60, 60);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.fillText("> " + this._choix.texte1, 80, 480);
    this._masqueCtx.fillStyle = "#ffff80";
    this._masqueCtx.fillRect(80, 480, 630, 20);
    let cb = this._choixCbHelper("cb1");
    this.definitObjet("ffff80", cb, cb, function() {
        return "usea";
    });
    if(this._choix.texte2) {
        this._jeuCtx.fillText("> " + this._choix.texte2, 80, 500);
        this._masqueCtx.fillStyle = "#ffff90";
        this._masqueCtx.fillRect(80, 500, 630, 20);
        let cb = this._choixCbHelper("cb2");
        this.definitObjet("ffff90", cb, cb, function() {
            return "usea";
        });
    }
    if(this._choix.texte3) {
        this._jeuCtx.fillText("> " + this._choix.texte3, 80, 520);
        this._masqueCtx.fillStyle = "#ffffa0";
        this._masqueCtx.fillRect(80, 520, 630, 20);
        let cb = this._choixCbHelper("cb3");
        this.definitObjet("ffffa0", cb, cb, function() {
            return "usea";
        });
    }
    if(this._choix.texte4) {
        this._jeuCtx.fillText("> " + this._choix.texte4, 80, 540);
        this._masqueCtx.fillStyle = "#ffffb0";
        this._masqueCtx.fillRect(80, 540, 630, 20);
        let cb = this._choixCbHelper("cb4");
        this.definitObjet("ffffb0", cb, cb, function() {
            return "usea";
        });
    }
}
Jeu.prototype._afficheInventaire = function() {
    let that = this;
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 480, 640, 79);
    this._texte = null;
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeRect(4, 488, 64, 64);
    if(this._mode === "see") {
        this.ajouteObjet(this.sprites.curseur_usea, 6, 490, function() {
            that._mode = "use";
        }, function() {
        }, function() {
            return "usea";
        }, true);
    } else {
        this.ajouteObjet(this.sprites.curseur_seea, 6, 490, function() {
        }, function() {
            that._mode = "see";
        }, function() {
            return "seea";
        }, true);
    }
    let item;
    for(let i = 0; i < 11; i++) {
        this._jeuCtx.strokeRect(80 + (i * 50), 488, 50, 50);
        if(i < this._model.inventaire.length) {
            item = this._model.inventaire[i];
            this.ajouteObjet(this.sprites[item.nom], 82 + (i * 50), 490, item.seeCb, item.useCb, null, true);
        }
    }
}
Jeu.prototype._affiche = function() {
    this._actions = {};
    this._scene.affiche(this);
    this._masqueCtx.fillStyle = "black";
    this._masqueCtx.fillRect(0, 560, 640, 80);
    if(this._texte != null) {
        this._afficheTexte();
    } else if(this._choix != null) {
        this._afficheChoix();
    } else {
        this._afficheInventaire();
    }
    this._masque = this._masqueCtx.getImageData(0, 0, 640, 560).data;
    // décommenter pour voir le masque
    //this._jeuCtx.putImageData(this._masqueCtx.getImageData(0, 0, 640, 560), 0, 0);
}
Jeu.prototype.inventaireContient = function(item) {
    return (this._model.inventaire.findIndex(function(i) {
        return (i.nom === item);
    }) !== -1);
}
Jeu.prototype.inventaireAjoute = function(item) {
    return this._model.inventaire.push(this.objects[item]);
}
Jeu.prototype.inventaireAjouteUnique = function(item) {
    if(!this.inventaireContient(item)) {
        return this._model.inventaire.push(this.objects[item]);
    }
}
Jeu.prototype.inventaireRetire = function(item) {
    let index = this._model.inventaire.findIndex(function(i) {
        return (i.nom === item);
    });
    if(index === -1) {
        return;
    }
    return this._model.inventaire.splice(index, 1);
}
Jeu.prototype.afficheFond = function(fond) {
    this._jeuCtx.drawImage(fond, 0, 0);
}
Jeu.prototype.definitObjet = function(couleur, seeCb, useCb, curseurCb) {
    this._actions[couleur] = {
        "curseurCb": curseurCb,
        "seeCb": seeCb,
        "useCb": useCb
    }
}
Jeu.prototype.ajouteObjet = function(sprite, x, y, seeCb, useCb, curseurCb, inclutTransparent) {
    if(inclutTransparent == null) {
        inclutTransparent = false;
    }
    // choisit une couleur et enregistre l'action
    let r = Math.floor(Math.random() * 256);
    let v = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let couleur = this._toHex(r, v, b);
    this._actions[couleur] = {
        "curseurCb": curseurCb,
        "seeCb": seeCb,
        "useCb": useCb
    }
    this._jeuCtx.drawImage(sprite, x, y);
    // recopie le sprite dans le masque avec la couleur choisie
    let spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = sprite.width;
    spriteCanvas.height = sprite.height;
    let spriteCtx = spriteCanvas.getContext("2d");
    spriteCtx.drawImage(sprite, 0, 0);
    let spriteData = spriteCtx.getImageData(0, 0, sprite.width, sprite.height).data;
    let masqueData = this._masqueCtx.getImageData(0, 0, 640, 560);
    let masqueDataData = masqueData.data;
    for(let sx = 0; sx < sprite.width; sx++) {
        for(let sy = 0; sy < sprite.height; sy++) {
            if(inclutTransparent || spriteData[(sy * sprite.width * 4) + (sx * 4) + 3] !== 0) {
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
    if(width <= 0) {
        this._jeuCtx.fillText(texte, x, y);
        return;
    }
    let words = texte.replace(/\n/g, " \n ");
    words = words.split(" ");
    let currentLine = 0;
    let idx = 1;
    while(words.length > 0 && idx <= words.length) {
        if(words[idx] === "\n") {
            this._jeuCtx.fillText(words.slice(0, idx).join(' '), x, y + (20 * currentLine));
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
            this._jeuCtx.fillText(words.slice(0, idx - 1).join(' '), x, y + (20 * currentLine));
            currentLine++;
            words = words.splice(idx - 1);
            idx = 1;
        } else {
            idx++;
        }
    }
    if(idx > 0) {
        this._jeuCtx.fillText(words.join(' '), x, y + (20 * currentLine));
    }
}
Jeu.prototype.loadSprites = function(spritesList, cb) {
    let that = this;
    let sprites = spritesList.shift();
    let count = 0;
    let imageLoaded = function() {
        count--;
        if(count === 0) {
            if(spritesList.length > 0) {
                that.loadSprites(spritesList, cb);
                return;
            }
            cb();
        }
    };
    for(let image in sprites) {
        if(!sprites.hasOwnProperty(image)) {
            continue;
        }
        count++;
        let i = new Image();
        i.addEventListener("load", imageLoaded, false);
        i.src = "sprites/" + image + ".png";
        i.setAttribute("crossOrigin", "");
        sprites[image] = i;
    }
}

Jeu.prototype.noop = function() {
}
Jeu.prototype.CURSEURS = {
    "see": "url(sprites/curseur_see.png) 32 32, pointer",
    "seea": "url(sprites/curseur_seea.png) 32 32, pointer",
    "use": "url(sprites/curseur_use.png) 24 14, pointer",
    "usea": "url(sprites/curseur_usea.png) 24 14, pointer"
}
