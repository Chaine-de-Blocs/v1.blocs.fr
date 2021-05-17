(function() {
    const cards = document.querySelectorAll('.card-link');

    for (const c in cards) {
        cards[c].onclick = function(_) {
            window.open(cards[c].dataset.cardHref, '_blank');
        }
    }
})();