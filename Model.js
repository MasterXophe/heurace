const MODEL = {
    etape: "recherche", // recherche, collecte, fabrication
    debut: true,
    atelier: {
        moustikiller: null, // null, tole, pret, tire
        casiersDeranges: false,
        masqueBouge: false
    },
    salon: {
        aspiCherche: false,
        robotSousMeuble: true,
        robotDecoince: false,
        mamanChanson: null, // null, quoi, groupe, chanson, titre, trouve, joue
        mamanThe: null, // null, quoi, recette, ok
        mamanDort: false
    },
    chambre: {
        terrarium: null, // null, tole, tolefourmi
        fenetreRegardee: false,
        litOuvert: false,
        tiroirCherche: false
    },
    cuisine: {
        porteouverte: false,
        potmielpris: false,
        blender: null, // null, comment, explication, cailloux, marche, cassecailloux, casse
        bouilloire: null, // null, pleine, chaude
        potmiel: null, // null, pris
        tasse: null // null, prise
    },
    papa: null, // casiers, cuisine
    crayon: null, // null, pris, miel
    carnet: null, // null, recherche, trouve, pris, rendu
    tole: null // null, miel, fourmis, decoupee
}
