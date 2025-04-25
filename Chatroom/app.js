const appState = {
    currentUser: null,
    currentGroup: null,
    isTyping: false
};

function initApp() {

    const tempUsername = sessionStorage.getItem('tempUsername');
    if (!tempUsername && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
        return;
    }


    appState.currentUser = tempUsername;
    appState.currentGroup = JSON.parse(sessionStorage.getItem('selectedGroup'));


    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-nav]')) {
            e.preventDefault();
            const target = e.target.getAttribute('data-nav');
            navigateTo(target);
        }
    });
}


function navigateTo(page) {
    switch(page) {
        case 'home':
            window.location.href = 'index.html';
            break;
        case 'profile':
            window.location.href = 'profile.html';
            break;
        case 'dashboard':
            window.location.href = 'dashboard.html';
            break;
        case 'chat':
            if (appState.currentGroup) {
                window.location.href = 'chat.html';
            }
            break;
        default:
            console.warn('Unknown navigation target:', page);
    }
}


document.addEventListener('DOMContentLoaded', initApp);


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appState,
        initApp,
        navigateTo
    };
}