(function() {
    /* events on clipboard */
    const clipboards = document.querySelectorAll('.cliboard-action-selector');

    for (const cl in clipboards) {
        clipboards[cl].onclick = function(_) {
            const id = '#' + clipboards[cl].dataset.value;
            const selectID = document.querySelector(id);
            navigator.clipboard.writeText(selectID.innerHTML);
            if (document.body.createTextRange) {
                const range = document.body.createTextRange();
                range.moveToElementText(selectID);
                range.select();
            } else if (window.getSelection) {
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(selectID);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                return;
            }

            const copyRes = document.querySelector(id + '_copy-result');
            copyRes.classList.add('display_');
            window.setTimeout(() => copyRes.classList.remove('display_'), 3111);
        }
    }
})();