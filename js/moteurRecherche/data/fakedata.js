const definition = [
    {
        'motCle': 'accident', 
        'definition': [
            "Événement fortuit qui a des effets plus ou moins dommageables pour les personnes ou pour les choses : Accident de la route.",
            "Événement inattendu, non conforme à ce qu'on pouvait raisonnablement prévoir, mais qui ne le modifie pas fondamentalement."
        ]
    },
    {
        'motCle': 'constat',
        'definition': [
            "Procès-verbal par lequel un huissier procède, à la demande du juge ou d'une personne physique ou morale, à des constatations purement matérielles, exclusives de tout avis sur les conséquences de fait ou de droit qui peuvent en résulter.",
            "Examen objectif des résultats d'une action, d'une période, d'une situation.",
            "Constat amiable, document contradictoire établi par les parties à l'occasion d'un accident matériel de la circulation et sur lequel s'appuient les compagnies d'assurance pour déterminer les responsabilités."
        ]
    },
    {
        'motCle': 'assurance',
        'definition': [
            "Affirmation, promesse formelle que quelque chose est vrai, certain, sûr : Recevoir l'assurance qu'un délai sera respecté.",
            "Garantie donnée au sujet de quelque chose ; preuve de quelque chose (souvent pluriel) : Avoir des assurances suffisantes sur la solvabilité d'un acheteur.",
            "Confiance en soi : Cet échec lui a fait perdre toute son assurance.",
            "S'emploie dans des formules de politesse à la fin d'une lettre : Veuillez croire à l'assurance de ma considération.",
            "Contrat par lequel l'assureur s'engage à indemniser l'assuré, moyennant une prime ou une cotisation, de certains risques ou sinistres éventuels.",
        ]
    },
]
const reponse = [
    "<p>Constat amiable : Votre véhicule est endommagé suite à un accrochage avec une voiture ou un autre véhicule et vous vous demandez comment faire un constat ? La réalisation de ce constat amiable voiture servira de base à l'assureur pour vous indemniser. Pour ne pas être pris au dépourvu et savoir que faire en cas d’accident de voiture ou plus globalement d’accident de la circulation, découvrez tous les éléments que doit comporter votre constat :</p><ul><li>les caractéristiques de l'accident (date, localisation, etc.).</li> <li>les dommages matériels et corporels.</li> <li>les témoins.</li> <li>les personnes et conducteurs impliqués.</li> <li>les coordonnées des sociétés d'assurance.</li> <li>la nature de l'accident et son croquis.</li> <li>la signature des conducteurs.</li></ul><p>Découvrez tous les conseils de la Macif pour remplir votre constat amiable dans les règles de l’art et pour savoir comment agir une fois le constat amiable rempli.</p>"
];

chercherMotCle = (motCle) => {
    let arrayDefinition = new Array();
    $(definition).each(function(key, obj){
        if(obj.motCle.indexOf(motCle) !== -1) {
            console.log('mot clé trouvé: '+motCle);
            
            if(motCle === obj.motCle) {
                $(obj.definition).each((index, definition) => {
                    arrayDefinition.push(definition);
                })
                
            } else {
                let motCleDef = obj.motCle;
                console.log(motCleDef.slice(0, motCle.length))
                console.log(motCleDef.slice(motCle.length, motCleDef.length))
                let motFinal= '<span class="highlight_keyword">'+motCleDef.slice(0, motCle.length)+'</span>'+motCleDef.slice(motCle.length, motCleDef.length);
                arrayDefinition.push(motFinal);
            }
           
        }
    });
    console.log(arrayDefinition)
    return arrayDefinition;
}