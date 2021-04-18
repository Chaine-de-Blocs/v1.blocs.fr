var storageKey = 'blocs-data-theme';
(function() {
    document.addEventListener("DOMContentLoaded", function() { 
        let currentTheme = localStorage.getItem(storageKey);
        const themeSwitchElt = document.querySelector('#theme-switch');
        if (themeSwitchElt) {
            activateTheme(currentTheme, themeSwitchElt);
            
            themeSwitchElt.addEventListener('click', function () {
                switch (currentTheme) {
                    case 'dark':
                        currentTheme = 'light';
                        break;
                    default:
                        currentTheme = 'dark';
                }
                localStorage.setItem(storageKey, currentTheme);
                activateTheme(currentTheme, themeSwitchElt)
            });
        }
    });
})();

function activateTheme(theme, switchElt) {
    switch (theme) {
        case 'light':
            switchElt.innerHTML = 'Activer le mode sombre';
            document.documentElement.setAttribute('data-theme', 'light');
            break;
        case 'dark':
        default:
            switchElt.innerHTML = 'Activer le mode clair';
            document.documentElement.setAttribute('data-theme', 'dark');
    }
}