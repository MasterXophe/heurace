const Jeu = function(jeuCanvas) {
    let that = this;
    this._jeuCanvas = jeuCanvas;
    this._scenes = {};
    this._scene = null;
    this._mode = "see"; // "see" ou "use"
    this._texte = null;
    this._choix = null;
    this._model = {
        "navigateur": false,
        "chambre": {
            "mail": false
        }
    };

    // créé le masque
    this._masqueCanvas = document.createElement("canvas");
    this._masqueCanvas.width = this._jeuCanvas.width;
    this._masqueCanvas.height = this._jeuCanvas.height;

    // récupère les contextes
    this._jeuCtx = this._jeuCanvas.getContext('2d');
    this._jeuCtx.font = '18px serif';
    this._masqueCtx = this._masqueCanvas.getContext('2d');

    that._jeuCanvas.addEventListener("mousemove", function(e) {
        let mouseX, mouseY;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        if(that._texte != null) {
            return;
        }
        if(that._choix != null) {
            if(mouseY > 540 && mouseY <= 560 && that._choix.cb4) {
                that._jeuCanvas.style.cursor = "pointer";
            } else if(mouseY > 520 && mouseY <= 540 && that._choix.cb3) {
                that._jeuCanvas.style.cursor = "pointer";
            } else if(mouseY > 500 && mouseY <= 520 && that._choix.cb2) {
                that._jeuCanvas.style.cursor = "pointer";
            } else if(mouseY > 480 && mouseY <= 500 && that._choix.cb1) {
                that._jeuCanvas.style.cursor = "pointer";
            } else {
                that._jeuCanvas.style.cursor = "default";
            }
            return;
        }
        let color = that._getMasqueColor(mouseX, mouseY);
        if(color === "ffffff") {
            that._jeuCanvas.style.cursor = "default";
            return;
        }
        that._jeuCanvas.style.cursor = "zoom-in";
    }, false);
    that._jeuCanvas.addEventListener("click", function(e) {
        let mouseX, mouseY;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        if(that._texte != null) {
            if(that._texte.cb != null) {
                that._texte.cb();
            } else {
                // callback par défaut : masquer texte
                that.afficheInventaire();
            }
            return;
        }
        if(that._choix != null) {
            if(mouseY > 540 && mouseY <= 560 && that._choix.cb4) {
                that._choix.cb4();
            } else if(mouseY > 520 && mouseY <= 540 && that._choix.cb3) {
                that._choix.cb3();
            } else if(mouseY > 500 && mouseY <= 520 && that._choix.cb2) {
                that._choix.cb2();
            } else if(mouseY > 480 && mouseY <= 500 && that._choix.cb1) {
                that._choix.cb1();
            }
            return;
        }
        let color = that._getMasqueColor(mouseX, mouseY);
        if(color === "ffffff") {
            return;
        }
        that._scene.seeAction(color, that._model);
    }, false);
};
Jeu.prototype.afficheInventaire = function() {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 481, 640, 79);
    this._texte = null;
    this._jeuCtx.fillStyle = "black";
    // TODO
    this._jeuCtx.fillText("inventaire", 10, 495);
};
Jeu.prototype.afficheTexte = function(texte, cb) {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 481, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this.fillText(texte, 10, 495, 640);
    this._texte = {"cb":cb};
    this._jeuCanvas.style.cursor = "default";
    this._jeuCtx.fillStyle = "gray";
    this._jeuCtx.fillText("(cliquer pour continuer)", 460, 555);
};
Jeu.prototype.afficheChoix = function(texte1, cb1, texte2, cb2, texte3, cb3, texte4, cb4) {
    this._jeuCtx.fillStyle = "white";
    this._jeuCtx.fillRect(0, 481, 640, 79);
    this._jeuCtx.fillStyle = "black";
    this._jeuCtx.strokeStyle = "black";
    this._jeuCtx.fillText("> " + texte1, 10, 495);
    if(texte2) {
        this._jeuCtx.fillText("> " + texte2, 10, 515);
    }
    if(texte3) {
        this._jeuCtx.fillText("> " + texte3, 10, 535);
    }
    if(texte4) {
        this._jeuCtx.fillText("> " + texte4, 10, 555);
    }
    this._choix = {"cb1":cb1, "cb2":cb2, "cb3":cb3, "cb4":cb4};
    this._jeuCanvas.style.cursor = "default";
};
Jeu.prototype.termineChoix = function() {
    this._choix = null;
    this._afficheScene();
};
Jeu.prototype.afficheScene = function(sceneNom) {
    this._choix = null;
    this._scene = this._scenes[sceneNom];
    this._afficheScene();
};
Jeu.prototype._afficheScene = function() {
    this.afficheInventaire();
    this._scene.affiche(this._jeuCtx, this._masqueCtx);
    this._masque = this._masqueCtx.getImageData(0, 0, 640, 480).data;
};
Jeu.prototype.addScene = function(scene) {
    this._scenes[scene.nom] = scene;
};
Jeu.prototype._getMasqueColor = function(mouseX, mouseY) {
    let r = this._masque[(mouseY * 2560 + mouseX * 4)];
    let v = this._masque[(mouseY * 2560 + mouseX * 4) + 1];
    let b = this._masque[(mouseY * 2560 + mouseX * 4) + 2];
    return "" + ((1 << 24) + (r << 16) + (v << 8) + b).toString(16).slice(1);
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