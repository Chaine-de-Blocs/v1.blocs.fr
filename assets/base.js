const storageKey = 'blocs-data-theme';


document.addEventListener("DOMContentLoaded", function() { 
    const userPrefersDark = window.matchMedia
        && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let currentTheme = window.localStorage.getItem(storageKey);
    if (!currentTheme) {
        currentTheme = userPrefersDark ? 'dark' : 'light';
    }
    
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
            window.localStorage.setItem(storageKey, currentTheme);
            activateTheme(currentTheme, themeSwitchElt)
        });
    }
});

const activateTheme = (theme, switchElt) => {
    switch (theme) {
        case 'light':
            switchElt.innerHTML = 'Activer le mode sombre';
            break;
        case 'dark':
        default:
            switchElt.innerHTML = 'Activer le mode clair';
    }
    document.documentElement.setAttribute('data-theme', theme);
}