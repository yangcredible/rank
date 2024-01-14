const dictionaryOfObjects = {
    ross: { name: "Ross", score: 1000, picture: "./assets/ross.jpg", wins: 0, losses: 0, draws: 0 },
    chandler: { name: "Chandler", score: 1000, picture: "./assets/chandler.jpg", wins: 0, losses: 0, draws: 0 },
    joey: { name: "Joey", score: 1000, picture: "./assets/joey.jpg", wins: 0, losses: 0, draws: 0 },
    phoebe: { name: "Phoebe", score: 1000, picture: "./assets/phoebe.jpg", wins: 0, losses: 0, draws: 0 },
    monica: { name: "Monica", score: 1200, picture: "./assets/monica.jpg", wins: 0, losses: 0, draws: 0 },
    rachel: { name: "Rachel", score: 1000, picture: "./assets/rachel.jpg", wins: 0, losses: 0, draws: 0 }
};

function getRandomFriend() {
    const friendNames = Object.keys(dictionaryOfObjects);
    const randomIndex = Math.floor(Math.random() * friendNames.length);
    return dictionaryOfObjects[friendNames[randomIndex]];
}

function update1v1Showdown() {
    const friend1 = getRandomFriend();
    let friend2 = getRandomFriend();

    // Make sure friend2 is different from friend1
    while (friend2 === friend1) {
        friend2 = getRandomFriend();
    }

    // Update HTML with friend1 and friend2 details
    const block1 = document.querySelector('.items-1.item.block-1');
    const block2 = document.querySelector('.items-1.item.block-2');

    block1.innerHTML = `<img src="${friend1.picture}" alt="${friend1.name}"><h3>${friend1.name}</h3><p>${friend1.description}</p>`;
    block2.innerHTML = `<img src="${friend2.picture}" alt="${friend2.name}"><h3>${friend2.name}</h3><p>${friend2.description}</p>`;
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    const rankedObjects = rankObjects(dictionaryOfObjects);

    rankedObjects.forEach(obj => {
        const listItem = document.createElement('li');
        listItem.textContent = `Rank ${obj.rank}: ${obj.name} - Score: ${obj.score} (Wins: ${obj.wins}, Losses: ${obj.losses}, Draws: ${obj.draws})`;
        leaderboardList.appendChild(listItem);
    });
}

// Function to handle the result of a 1v1 showdown
function handleShowdownResult(winner, loser) {
    winner.wins++;
    loser.losses++;

    // Update elo scores
    const kFactor = 32; // You can adjust this value based on your preferences
    const expectedWinProbability = 1 / (1 + 10 ** ((loser.score - winner.score) / 400));
    winner.score += kFactor * (1 - expectedWinProbability);
    loser.score -= kFactor * expectedWinProbability;

    updateLeaderboard();
}

// Event listeners for buttons
document.querySelector('.items-2.item button:nth-child(1)').addEventListener('click', () => {
    const friend1 = getRandomFriend();
    const friend2 = getRandomFriend();
    handleShowdownResult(friend1, friend2);
    update1v1Showdown();
});

document.querySelector('.items-2.item button:nth-child(2)').addEventListener('click', () => {
    const friend1 = getRandomFriend();
    const friend2 = getRandomFriend();
    friend1.draws++;
    friend2.draws++;
    updateLeaderboard();
    update1v1Showdown();
});

document.querySelector('.items-2.item button:nth-child(3)').addEventListener('click', () => {
    const friend1 = getRandomFriend();
    const friend2 = getRandomFriend();
    handleShowdownResult(friend2, friend1);
    update1v1Showdown();
});

// Initial setup
updateLeaderboard();
update1v1Showdown();
