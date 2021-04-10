(function() {
    /* events on posts */
    const posts = document.querySelectorAll('li.post-preview_');

    for (const p in posts) {
        posts[p].onclick = function(_) {
            window.location.href = posts[p].dataset.postUrl;
        }
    }
})();