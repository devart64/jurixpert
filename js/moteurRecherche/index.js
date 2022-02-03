$(document).on('keyup', '#input_recherche', throttle(function () {
    if ($(this).val() !== '') {
        let definitions = chercherMotCle($(this).val());
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