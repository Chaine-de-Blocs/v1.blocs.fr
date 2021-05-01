const createRipple = (block, evt) => {
    const ripple = document.querySelector('.ripple');

    if (ripple) {
        ripple.remove();
    }

    const circle = document.createElement("span");
    const diameter = Math.max(block.clientWidth, block.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${evt.clientX - (block.offsetLeft + radius)}px`;
    circle.style.top = `${evt.clientY - (block.offsetTop + radius)}px`;
    circle.classList.add('ripple');

    if (block.appendChild) {
        block.appendChild(circle);
    }
}

(function() {
    /* events on posts */
    const posts = document.querySelectorAll('li.post-preview-selector');

    for (const p in posts) {
        posts[p].onclick = function(evt) {
            createRipple(posts[p], evt);
            setTimeout(() => window.location.href = posts[p].dataset.postUrl, 150);
        }
    }
})();