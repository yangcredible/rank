import dictionaryOfObjects from './characters.js'

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

// Function to update leaderboard in the DOM
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear existing content

    const rankedObjects = rankObjects(dictionaryOfObjects);

    rankedObjects.forEach(obj => {
        const listItem = document.createElement('li');
        listItem.textContent = `${obj.rank}. ${obj.name} (${obj.score})`;
        leaderboardList.appendChild(listItem);
    });
}

// Call the function to initially update the leaderboard when the script is loaded
updateLeaderboard();

const rankedObjects = rankObjects(dictionaryOfObjects);
console.log(rankedObjects);
