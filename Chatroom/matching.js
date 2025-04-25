const peerGroups = [
    { id: 'group1', topic: 'Anxiety Peer Support', mood: 'anxious', tags: ['coping', 'self-care'], members: 3, capacity: 8 },
    { id: 'group2', topic: 'Depression Peer Support', mood: 'depressed', tags: ['relationships', 'self-care'], members: 2, capacity: 6 },
    { id: 'group3', topic: 'Stress Management Peer Chat', mood: 'stressed', tags: ['work', 'coping'], members: 5, capacity: 10 },
    { id: 'group4', topic: 'General Peer Support', mood: 'okay', tags: ['relationships', 'work'], members: 1, capacity: 12 }
];

function calculateMatchScore(userProfile, group) {
    let score = 0;

    if (userProfile.mood === group.mood) {
        score += 50;
    }


    const matchingTopics = userProfile.topics.filter(topic => 
        group.tags.includes(topic)
    ).length;
    score += (matchingTopics / userProfile.topics.length) * 30;


    score += (1 - (group.members / group.capacity)) * 20;

    return Math.round(score);
}

function findMatchingGroups(userProfile) {
    return peerGroups
        .map(group => ({
            ...group,
            matchScore: calculateMatchScore(userProfile, group)
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .filter(group => group.matchScore > 40); 
}

document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const userProfile = {
        mood: formData.get('mood'),
        topics: Array.from(formData.getAll('topics'))
    };
    
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    const matchedGroups = findMatchingGroups(userProfile);
    sessionStorage.setItem('matchedGroups', JSON.stringify(matchedGroups));
    
    window.location.href = 'dashboard.html'; 
});