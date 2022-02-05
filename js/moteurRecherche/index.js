$(document).on('keyup', '#input_recherche', throttle(function () {
    if ($(this).val() !== '') {
        let arrayMotsCles = $(this).val().split(' ');
        let definitions = chercherMotCle(arrayMotsCles);
        afficherDefinitionTrouve(definitions);
    } else {
        $('.container_proposition').removeClass('afficher').addClass('cacher');

    }
}));

afficherDefinitionTrouve = (arrayDefinition) => {
    let htmlDefinition = '';
    
    $(arrayDefinition).each((key, definition) => {
        htmlDefinition = htmlDefinition + '<button type="button" class="list-group-item list-group-item-action">'+definition+'</button>'
    });
    let containerDefinition = $('.container_proposition');
    $(containerDefinition).html(htmlDefinition).removeClass('cacher').addClass('afficher');

}





/**
     * Test si le texte contient au moin un mot clé ou un synonyme
     * Si le paramètre isTestSynonyme  est true alors la fonction permet de tester si le mot trouvé est un synonyme
     * @param texteTest
     * @param arrayMotsCles
     * @param isTestSynonyme
     * @returns {boolean}
     */
 isMotsDansTexteBrut = (texteTest, arrayMotsCles, isTestSynonyme) => {
    if (texteTest === undefined) return false;
    let isMotTrouve = false;
    let isSynonyme = false;

    // on boucle sur notre objet mots clés / synonymes
    for (const [motCle, synonyme] of Object.entries(arrayMotsCles)) {
        if (texteTest.innerHTML.indexOf(motCle) !== -1) {
            isMotTrouve = true;
        }
        // on boucle sur les synonymes
        synonyme.map((synonyme) => {
            /*  console.log('synonyme = '+synonyme)
              console.log('texte a tester = '+texteTest.innerHTML)*/
            if (texteTest.innerHTML.indexOf(synonyme) !== -1) {
                isMotTrouve = true;
                isSynonyme = true;
            }
        });
    }
    // si on veut savoir si le mot est un synonyme
    if (isTestSynonyme) {
        return isSynonyme;
    } else {
        return isMotTrouve;
    }
}

/**
 * Ajoute un hight light sur les mots d'un texte
 * @param texteBrut
 * @param arrayMotsCles
 * @returns {*}
 */
ajoutHighLightMotsTrouveDansTexte = (texteBrut, arrayMotsCles) => {
    // on place les '|'
    let texteTest = 'éclaires';
    isMotEntierDansTexte('éclaire', texteTest);
    texteBrut = texteBrut.replaceAll('<', '|<');

    texteBrut = texteBrut.replaceAll('>', '>|');

    // on construit notre tableau
    let arrayStringChuck = texteBrut.split('|');

    // on boucle sur notre tableau
    for (let i = 0; i < arrayStringChuck.length; i++) {
        // si le premier caractère de l'occurence n'est pas '<' on a bien du texte
        if (arrayStringChuck[i].charAt(0) !== '<') {
            let arrayMotARemplacer = arrayStringChuck[i].split(' ');
            for (let i = 0; i < arrayMotARemplacer.length; i++) {
                // on parcourir notre liste de mots clés
                for (const [motCle, synonyme] of Object.entries(arrayMotsCles)) {
                    arrayMotARemplacer[i] = rechercheAndReplaceAllWordVersion(synonyme, arrayMotARemplacer[i], false);
                   
                    console.log(arrayMotARemplacer[i]);
                }
            }
            arrayStringChuck[i] = arrayMotARemplacer.join(' ');
        }
    }
    return arrayStringChuck.join('');

}

/**
 * Retourne true si le mot est un mot entier dans le texte
 * @param mot
 * @param texte
 */
isMotEntierDansTexte = (mot, texte) => {
    if (
        (texte.substr(texte.indexOf(mot) -1 ,  1) === '' && texte.substr(texte.indexOf(mot) + mot.length ,  1) === '') // si il n'ya ni lettre précédente ni lettre suivante
        // ou que la lettre suivante est une lettre autorisée ('e', 'es')
        || (texte.indexOf(mot) === 0 && (texte.substr(texte.indexOf(mot) + mot.length ,  1) === '' || isLettreSuivanteAutorise(mot, texte)))
        // ou que la lettre suivante est autorisé et que la taille du mot est égale à la taille du texte
        || ((texte.substr(texte.indexOf(mot) -1 ,  1) === '' || isLettreSuivanteAutorise(mot, texte)) && texte.indexOf(mot)+mot.length === texte.length)
    ) {
        return true;
    } else {
        return false;
    }
}

/**
 * Retourne true si la lettre suivante du mot dans le texte est une lettre autorisée
 * @param mot
 * @param texte
 */
isLettreSuivanteAutorise = (mot, texte) => {
    let isLettreSuivanteIsS = texte.substr(texte.indexOf(mot) + mot.length ,  1) === 's' && texte.substr(texte.indexOf(mot) + mot.length + 1 ,  1) === ''; // la lettre suivante est-elle un 's'
    let isLettreSuivanteIsE = texte.substr(texte.indexOf(mot) + mot.length ,  1) === 'e' && texte.substr(texte.indexOf(mot) + mot.length + 1 ,  1) === '';// la lettre suivante est-elle un 'e'
    // la lettre suivante est-elle un 'es'
    let isLettreSuivanteIsES = texte.substr(texte.indexOf(mot) + mot.length ,  1) === 'e' && texte.substr(texte.indexOf(mot) + mot.length + 1 ,  1) === 's' && texte.substr(texte.indexOf(mot) + mot.length + 2 ,  1) === '';
   if (isLettreSuivanteIsS || isLettreSuivanteIsE || isLettreSuivanteIsES) { // dans l'un des trois cas c'est vrai
       return true;
   } else {
       return false;
   }
}

/**
 * Retourne true si il existe une autre version du mot dans le texte
 * @param motCle
 * @param texte
 */
isOtherWordVersionExistanteTrouverDansTexte = (motCle, texte) => {

    if (texte.indexOf(motCle) !== -1 || texte.indexOf(motCle.toLowerCase()) !== -1 || texte.toLowerCase().indexOf(motCle) !== -1) { // si le mot clé brut est trouvé
        return true;
    } else if (texte.indexOf(cleanUpSpecialChars(motCle)) !== -1 || texte.indexOf(cleanUpSpecialChars(motCle.toLowerCase())) !== -1) { // si le mot clé sans accent est trouvé
        return true;
    } else if (cleanUpSpecialChars(texte).indexOf(motCle) !== -1) { // si le mot clé brut est trouvé dans le texte sans accent
        return true;
    } else {
        return false;
    }
}

/**
 * Recherche, remplace toutes les versions d'un mot dans le texte (sans accent, féminin, féminin pluriel) et retourne le texte mis à jour.
 * @param motCle
 * @param texte
 * @param isSynonyme
 */
rechercheAndReplaceAllWordVersion = (motCle, texte, isSynonyme) => {
    let motARemplacer = '';
    // cas simple on cherche le mot original

    // mot clé = "encore"
    // texte = "Encore"
    if (texte.indexOf(motCle) !== -1 || texte.indexOf(motCle.toLowerCase()) !== -1 || texte.toLowerCase().indexOf(motCle) !== -1) {
        if (texte.indexOf(motCle.toLowerCase()) !== -1) {
            motARemplacer = motCle.toLowerCase();
        } else if (texte.toLowerCase().indexOf(motCle) !== -1) {
            motARemplacer = texte;
        } else {
            motARemplacer = motCle;
        }

        console.log(motARemplacer)

        // sinon on cherche le mot clé sans accent
    } else if (texte.indexOf(cleanUpSpecialChars(motCle)) !== -1 || texte.indexOf(cleanUpSpecialChars(motCle.toLowerCase())) !== -1) {
        if (texte.indexOf(cleanUpSpecialChars(motCle.toLowerCase())) !== -1) {
            motARemplacer = cleanUpSpecialChars(motCle.toLowerCase());
        } else {
            motARemplacer = cleanUpSpecialChars(motCle);
        }

        // sinon on cherche le mot clé dans le texte sans accent
    } else if (cleanUpSpecialChars(texte).indexOf(motCle) !== -1) {

        motARemplacer = texte;


    } else if (texte.toLowerCase().indexOf(motCle) !== -1) {
        motARemplacer = texte.toLowerCase();
    }

  
    return texte.replace(motARemplacer, ajoutHighLightSurMot(motARemplacer, false));
}


  /**
     * Permet de retirer les accents
     * @param str
     * @returns {*}
     */
   cleanUpSpecialChars = (str) => // éclair ou eclair
   {
       str = str.replace(/é|è|ê|ë/g, "e");
       str = str.replace(/â/g, "a");
       return str;
}
   
ajoutHighLightSurMot = (mot, isSynonyme) => {
    let classHighLight = '';
    // on récupère le modèle dans la vue
    let modeleHtmlHightLight = $('#modele_architecture_highlight').html();
    // on le clone
    let clone = $(modeleHtmlHightLight).clone();

    // si le mot est un synonyme
    if (isSynonyme) {
        classHighLight = $('#marqueur_constante_class_highlight_synonyme').val(); // on place le background en orange

    } else {
        classHighLight = $('#marqueur_constante_class_highlight_mot_cle').val(); // sinon en jaune
    }
    $(clone).addClass(classHighLight); // on insert la classe de coloration
    $(clone).text(mot); // on insert le mot dans le span du highlight
    // on retourne l'objet 'stringifié'
    return $(clone).prop('outerHTML');
}

////////////////// UTILS ////////////////////:


/**
 * fonction qui met un temps d'attente avant d'excuter une fonction (500 ms)
 * @param f
 * @param delay
 * @returns {function(...[*]=)}
 */
 function throttle(f, delay) {
    let timer = null;
    return function () {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = window.setTimeout(function () {
                f.apply(context, args);
            },
            delay || 500);
    };
}