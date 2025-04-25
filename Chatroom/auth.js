function generateTempUsername() {
    const adjectives = ['Calm', 'Brave', 'Hopeful', 'Kind', 'Strong'];
    const nouns = ['Listener', 'Friend', 'Supporter', 'Helper', 'Peer'];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${randomNum}`;
}

function initSession() {
    const joinBtn = document.getElementById('join-btn');
    const usernameInput = document.getElementById('temp-username');

    joinBtn.addEventListener('click', () => {
        let username = usernameInput.value.trim();
        
        if (!username) {
            username = generateTempUsername();
            usernameInput.value = username;
        }

        sessionStorage.setItem('tempUsername', username);
        

        window.location.href = 'profile.html';
    });


    usernameInput.focus();
}

document.addEventListener('DOMContentLoaded', initSession);