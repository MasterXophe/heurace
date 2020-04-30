const Jeu = function(jeuCanvas, sprites, scenes, objects, initCb) {
    let that = this;
    this._jeuCanvas = jeuCanvas;
    this._jeuCanvas.width = 640;
    this._jeuCanvas.height = 560;
    this.sprites = sprites;
    this.sprites.see = null;
    this.sprites.use = null;
    this.sprites.talk = null;
    this.objects = {};
    let object;
    for(let i = 0, l = objects.length; i < l; i++) {
        object = objects[i];
        this.objects[object.nom] = object;
    }
    this._scenes = {};
    this._scene = null;
    this._actions = {};
    this._texte = null;
    this._choix = null;
    this._mode = null;
    this.model = {
        "inventaire": [],
        "inventairePage": 0
    }
    let scene;
    for(let i = 0, l = scenes.length; i < l; i++) {
        scene = scenes[i];
        this._scenes[scene.nom] = scene;
        this.model[scene.nom] = {};
    }
    this.loadSprites("", this.sprites, function() {
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
Jeu.prototype.setDefautQui = function(quiDefaut) {
    this.quiDefaut = quiDefaut;
}
Jeu.prototype._mouseMoveCb = function(e) {
    let mouseX, mouseY;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    this._jeuCanvas.style.cursor = "default";
    let color = this._getMasqueColor(mouseX, mouseY);
    let action = this._actions[color];
    if(action == null) {
        return;
    }
    this._jeuCanvas.style.cursor = (action.curseurCb != null ? action.curseurCb() : "pointer");
}
Jeu.prototype._mouseClickCb = function(e) {
    let mouseX, mouseY;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    let color = this._getMasqueColor(mouseX, mouseY);
    let action = this._actions[color];
    if(action == null) {
        return;
    }
    if(action.cb == null) {
        return;
    }
    action.cb(this, mouseX, mouseY);
    this._affiche();
}
/**
 * Affiche un dialogue
 * @param texte objet avec "qui" (sprite, "quiDefaut" si aucun) et "texte" (string)
 */
Jeu.prototype.texte = function(texte) {
    if(!texte.texte) {
        console.error("Le texte n'a pas la propriété 'texte'");
    }
    if(!texte.qui) {
        texte.qui = this.quiDefaut;
    }
    this._texte = texte;
}
/**
 * Affiche jusqu'à 4 choix
 * @param choix objet avec "qui" (sprite, "quiDefaut" si aucun) et choix (tableau d'objets avec "texte" (string) et "cb" (function))
 */
Jeu.prototype.choix = function(choix) {
    if(!choix.choix) {
        console.error("Le choix n'a pas la propriété 'choix'");
    }
    if(!choix.qui) {
        choix.qui = this.quiDefaut;
    }
    this._choix = choix;
}
Jeu.prototype.scene = function(sceneNom) {
    this._texte = null;
    this._choix = null;
    this._scene = this._scenes[sceneNom];
    this.model.scene = sceneNom;
    this._affiche();
}
Jeu.prototype._afficheTexte = function() {
    let that = this;
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 480, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeRect(4, 488, 64, 64);
    this._jeuCtx.drawImage(this._texte.qui, 0, 0, this._texte.qui.width, this._texte.qui.height, 6, 490, 60, 60);
    this._jeuCtx.fillStyle = "black";
    this.fillText(this._texte.texte, 80, 480, 556);
    this._jeuCtx.fillStyle = "gray";
    this._jeuCtx.fillText("(cliquer pour continuer)", 460, 540);
    this._masqueCtx.fillStyle = "#ffff00";
    this._masqueCtx.fillRect(0, 0, 640, 560);
    this._actions["ffff00"] = {
        "curseurCb": function() {
            return "text";
        },
        "cb": function() {
            let cb = that._texte.cb;
            that._texte = null;
            if(cb != null) {
                cb(that);
            }
            that._jeuCanvas.style.cursor = "default";
        }
    }
    this._jeuCanvas.style.cursor = "text";
}
Jeu.prototype._choixCbHelper = function(cb) {
    let that = this;
    return function() {
        that._choix = null;
         if(cb != null) {
            cb(that);
        }
    }
}
Jeu.prototype._afficheChoix = function() {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 480, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeRect(4, 488, 64, 64);
    this._jeuCtx.drawImage(this._choix.qui, 0, 0, this._choix.qui.width, this._choix.qui.height, 6, 490, 60, 60);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.fillText("> " + this._choix.choix[0].texte, 80, 480);
    this._masqueCtx.fillStyle = "#000000";
    this._masqueCtx.fillRect(0, 0, 640, 560);
    this._masqueCtx.fillStyle = "#ffff80";
    this._masqueCtx.fillRect(80, 480, 630, 20);
    this._actions["ffff80"] = {
        "cb": this._choixCbHelper(this._choix.choix[0].cb)
    };
    if(this._choix.choix.length > 1) {
        this._jeuCtx.fillText("> " + this._choix.choix[1].texte, 80, 500);
        this._masqueCtx.fillStyle = "#ffff90";
        this._masqueCtx.fillRect(80, 500, 630, 20);
        this._actions["ffff90"] = {
            "cb": this._choixCbHelper(this._choix.choix[1].cb)
        }
    }
    if(this._choix.choix.length > 2) {
        this._jeuCtx.fillText("> " + this._choix.choix[2].texte, 80, 520);
        this._masqueCtx.fillStyle = "#ffffa0";
        this._masqueCtx.fillRect(80, 520, 630, 20);
        this._actions["ffffa0"] = {
            "cb": this._choixCbHelper(this._choix.choix[2].cb)
        }
    }
    if(this._choix.choix.length > 3) {
        this._jeuCtx.fillText("> " + this._choix.choix[3].texte, 80, 540);
        this._masqueCtx.fillStyle = "#ffffb0";
        this._masqueCtx.fillRect(80, 540, 630, 20);
        this._actions["ffffb0"] = {
            "cb": this._choixCbHelper(this._choix.choix[3].cb)
        }
    }
}
Jeu.prototype._afficheMode = function() {
    let that = this;

    // vide le masque pour l'affichage du click
    this._masqueCtx.fillStyle = "black";
    this._masqueCtx.fillRect(0, 0, 640, 560);
    this._actions["000000"] = {
        "curseurCb": function() {
            return "default";
        },
        "cb": function() {
            that._mode = null;
        }
    };

    // cas particulier : si useCb mais pas seeCb, alors c'est "direct use"
    if(this._mode.seeCb == null && this._mode.useCb != null) {
        let cb = this._mode.useCb;
        this._mode = null;
        cb(this);
        this._jeuCanvas.style.cursor = "default";
        return;
    }

    // afficher le click see
    if(this._mode.seeCb != null) {
        this._jeuCtx.beginPath();
        this._jeuCtx.arc(this._mode.mouseX - 25, this._mode.mouseY, 20, 0, Math.PI * 2, true);
        this._jeuCtx.fillStyle = "white";
        this._jeuCtx.fill();
        this._jeuCtx.fillStyle = "black";
        this._jeuCtx.stroke();
        this._jeuCtx.drawImage(this.sprites.see, this._mode.mouseX - 45, this._mode.mouseY - 20);
        this._masqueCtx.beginPath();
        this._masqueCtx.arc(this._mode.mouseX - 25, this._mode.mouseY, 20, 0, Math.PI * 2, true);
        this._masqueCtx.fillStyle = "#ffff00";
        this._masqueCtx.fill();
        this._actions["ffff00"] = {
            "cb": function() {
                that._mode.seeCb(that);
                that._mode = null;
                that._jeuCanvas.style.cursor = "default";
            }
        };
    }

    // afficher le click use/talk
    if(this._mode.useCb != null || this._mode.talkCb != null) {
        this._jeuCtx.beginPath();
        this._jeuCtx.arc(this._mode.mouseX + 25, this._mode.mouseY, 20, 0, Math.PI * 2, true);
        this._jeuCtx.fillStyle = "white";
        this._jeuCtx.fill();
        this._jeuCtx.fillStyle = "black";
        this._jeuCtx.stroke();
        this._jeuCtx.drawImage(this._mode.useCb != null ? this.sprites.use : this.sprites.talk, this._mode.mouseX + 5, this._mode.mouseY - 20);
        this._masqueCtx.beginPath();
        this._masqueCtx.arc(this._mode.mouseX + 25, this._mode.mouseY, 20, 0, Math.PI * 2, true);
        this._masqueCtx.fillStyle = "#ffff10";
        this._masqueCtx.fill();
        this._actions["ffff10"] = {
            "cb": function() {
                if(that._mode.useCb != null) {
                    that._mode.useCb(that);
                } else {
                    that._mode.talkCb(that);
                }
                that._mode = null;
                that._jeuCanvas.style.cursor = "default";
            }
        };
    }
}
Jeu.prototype._afficheInventaire = function() {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 480, 640, 79);
    this._texte = null;
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeRect(4, 488, 64, 64);
    let item;
    for(let i = 0; i < 11; i++) {
        this._jeuCtx.strokeRect(80 + (i * 50), 488, 50, 50);
        if(i < this.model.inventaire.length) {
            item = this.model.inventaire[i];
            this.ajouteObjet(this.sprites.inventaire[item.nom], 82 + (i * 50), 490, item.seeCb, item.useCb, null, true);
        }
    }
}
Jeu.prototype._affiche = function() {
    this._masqueCtx.fillStyle = "black";
    this._masqueCtx.fillRect(0, 0, 640, 560);
    this._actions = {};
    this._scene.affiche(this);
    if(this._texte != null) {
        this._afficheTexte();
    } else if(this._choix != null) {
        this._afficheChoix();
    } else if(this._mode != null) {
        this._afficheMode();
    } else {
        this._afficheInventaire();
    }
    this._masque = this._masqueCtx.getImageData(0, 0, 640, 560).data;
    // décommenter pour voir le masque
//    this._jeuCtx.putImageData(this._masqueCtx.getImageData(0, 0, 640, 560), 0, 0);
}
Jeu.prototype.inventaireContient = function(item) {
    return (this.model.inventaire.findIndex(function(i) {
        return (i.nom === item);
    }) !== -1);
}
Jeu.prototype.inventaireAjoute = function(item) {
    return this.model.inventaire.push(this.objects[item]);
}
Jeu.prototype.inventaireRetire = function(item) {
    let index = this.model.inventaire.findIndex(function(i) {
        return (i.nom === item);
    });
    if(index === -1) {
        return;
    }
    return this.model.inventaire.splice(index, 1);
}
Jeu.prototype.inventaireRemplace = function(oldItem, newItem) {
    let index = this.model.inventaire.findIndex(function(i) {
        return (i.nom === oldItem);
    });
    if(index === -1) {
        return;
    }
    return this.model.inventaire.splice(index, 1, this.objects[newItem]);
}
Jeu.prototype.afficheFond = function(fond) {
    this._jeuCtx.drawImage(fond, 0, 0);
}
Jeu.prototype.ajouteObjet = function(sprite, x, y, seeCb, useCb, talkCb, inclutTransparent) {
    let that = this;
    if(inclutTransparent == null) {
        inclutTransparent = false;
    }
    // choisit une couleur et enregistre l'action
    let r = Math.floor(Math.random() * 256);
    let v = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let couleur = this._toHex(r, v, b);
    this._actions[couleur] = {
        "cb": function(jeu, mouseX, mouseY) {
            that._mode = {
                "seeCb": seeCb,
                "useCb": useCb,
                "talkCb": talkCb,
                "mouseX": mouseX,
                "mouseY": mouseY
            }
        },
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
Jeu.prototype.loadSprites = function(directory, sprites, cb) {
    let count = 0;
    let imageLoaded = function() {
        count--;
        if(count === 0) {
            cb();
        }
    };
    for(let image in sprites) {
        if(!sprites.hasOwnProperty(image)) {
            continue;
        }
        count++;
        if(sprites[image] != null) {
            // sous-object
            this.loadSprites(directory + image + "/", sprites[image], imageLoaded);
        } else {
            // image
            let i = new Image();
            i.addEventListener("load", imageLoaded, false);
            i.src = "sprites/" + directory + image + ".png";
            i.setAttribute("crossOrigin", "");
            sprites[image] = i;
        }
    }
}
Jeu.flattenObject = function(ob) {
    let toReturn = {};
    for(let i in ob) {
        if(!ob.hasOwnProperty(i)) {
            continue;
        }
        if((typeof ob[i]) == 'object') {
            let flatObject = this.flattenObject(ob[i]);
            for(let x in flatObject) {
                if(!flatObject.hasOwnProperty(x)) {
                    continue;
                }
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};
