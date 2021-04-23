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
        
        themeSwitchElt.addEventListener('click', () => {
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
    const lightIcon = switchElt.childNodes[0];
    const darkIcon = switchElt.childNodes[1];
    switch (theme) {
        case 'light':
            darkIcon.style.display = "block";
            lightIcon.style.display = "none";
            break;
        case 'dark':
        default:
            darkIcon.style.display = "none";
            lightIcon.style.display = "block";
    }
    document.documentElement.setAttribute('data-theme', theme);
}