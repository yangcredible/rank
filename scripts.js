// Import the dictionaryOfObjects from the characters.js file
import dictionaryOfObjects from './characters';

// Function to update leaderboard in the DOM
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear existing content

    const rankedObjects = rankObjects(dictionaryOfObjects);

    rankedObjects.forEach(obj => {
        const listItem = document.createElement('li');
        listItem.textContent = `Rank ${obj.rank}: ${obj.name} - Score: ${obj.score} - Wins: ${obj.wins} - Losses: ${obj.losses} - Draws: ${obj.draws}`;
        leaderboardList.appendChild(listItem);
    });
}

// Function to rank objects
function rankObjects(dictionaryOfObjects) {
    // Convert the dictionary to an array of objects for easier sorting
    const arrayOfObjects = Object.entries(dictionaryOfObjects).map(([name, details]) => ({ name, ...details }));

    // Sort the array of objects based on the scores in descending order
    arrayOfObjects.sort((a, b) => b.score - a.score);

    // Add a rank property to each object
    arrayOfObjects.forEach((obj, index) => {
        obj.rank = index + 1; // Ranks start from 1
    });

    // Return the ranked array of objects
    return arrayOfObjects;
}

// Function to calculate Elo ratings
function calculateEloRating(winnerRating, loserRating) {
    const kFactor = 32; // Adjust this based on your desired sensitivity
    const expectedScoreWinner = 1 / (1 + 10 ** ((loserRating - winnerRating) / 400));
    const expectedScoreLoser = 1 / (1 + 10 ** ((winnerRating - loserRating) / 400));

    const newWinnerRating = winnerRating + kFactor * (1 - expectedScoreWinner);
    const newLoserRating = loserRating + kFactor * (0 - expectedScoreLoser);

    return { newWinnerRating, newLoserRating };
}

// Function to handle option selection
function selectOption(selectedOption) {
    const optionA = 'optionA';
    const optionB = 'optionB';

    if (selectedOption === optionA || selectedOption === optionB) {
        const winner = dictionaryOfObjects[selectedOption];
        const loser = dictionaryOfObjects[selectedOption === optionA ? optionB : optionA];

        const { newWinnerRating, newLoserRating } = calculateEloRating(winner.score, loser.score);

        // Update scores in the dictionary
        dictionaryOfObjects[selectedOption].score = Math.round(newWinnerRating);
        dictionaryOfObjects[selectedOption === optionA ? optionB : optionA].score = Math.round(newLoserRating);

        // Update wins and losses
        dictionaryOfObjects[selectedOption].wins++;
        dictionaryOfObjects[selectedOption === optionA ? optionB : optionA].losses++;

        // Update the leaderboard in the DOM
        updateLeaderboard();

        // Select new random options for the next matchup
        selectRandomOptions();
    } else if (selectedOption === 'draw') {
        // Implement draw logic if needed
        console.log('Draw selected');

        // Update draws
        dictionaryOfObjects[optionA].draws++;
        dictionaryOfObjects[optionB].draws++;

        // Update the leaderboard in the DOM
        updateLeaderboard();

        // Select new random options for the next matchup
        selectRandomOptions();
    }
}

// Function to select random options for the matchup
function selectRandomOptions() {
    const optionKeys = Object.keys(dictionaryOfObjects);
    
    // Randomly select two different options
    let randomIndexA, randomIndexB;
    
    do {
        randomIndexA = Math.floor(Math.random() * optionKeys.length);
        randomIndexB = Math.floor(Math.random() * optionKeys.length);
    } while (randomIndexB === randomIndexA);

    const optionA = optionKeys[randomIndexA];
    const optionB = optionKeys[randomIndexB];

    // Display the current matchup
    const optionAElement = document.getElementById('optionA');
    const optionBElement = document.getElementById('optionB');

    optionAElement.textContent = dictionaryOfObjects[optionA].name;
    optionBElement.textContent = dictionaryOfObjects[optionB].name;

    // Clear the matchup display after a brief delay
    setTimeout(() => {
        optionAElement.textContent = '';
        optionBElement.textContent = '';
    }, 3000); // Adjust the delay as needed
}

// Call the function to initially update the leaderboard and start the first matchup
updateLeaderboard();
selectRandomOptions();
