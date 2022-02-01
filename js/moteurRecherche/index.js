$(document).on('keyup', '#input_recherche', throttle(function () {
    if ($(this).val() !== '') {
        $('.container_proposition').removeClass('cacher').addClass('afficher');
    } else {
        $('.container_proposition').removeClass('afficher').addClass('cacher');

    }
}));

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