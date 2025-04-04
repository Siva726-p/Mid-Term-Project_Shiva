// Developer: Siva Prasad Ponna
// Addendum: This is a "Choose Your Own Adventure" game where the player makes decisions that affect the outcome of the story.

const storyStages = {
    page1: {
        text: "You wake up on a mysterious island. What will you do?",
        choices: [
            { text: "Explore the beach", consequence: "page2A" },
            { text: "Enter the jungle", consequence: "page2B" }
        ],
        image: "Images/page1.jpg"
    },
    page2A: {
        text: "You find a small boat on the shore. What do you do?",
        choices: [
            { text: "Take the boat", consequence: "page3A" },
            { text: "Look for food", consequence: "page3B" }
        ],
        image: "Images/page2.jpg"
    },
    page2B: {
        text: "You hear strange noises in the jungle. How do you react?",
        choices: [
            { text: "Investigate the noise", consequence: "page3C" },
            { text: "Climb a tree for safety", consequence: "page3D" }
        ],
        image: "Images/page3.jpg"
    },
    page3A: {
        text: "The boat leads to another island. You see a cave. What do you do?",
        choices: [
            { text: "Enter the cave", consequence: "page4A" },
            { text: "Stay on the shore", consequence: "page4B" }
        ],
        image: "Images/page4.jpg"
    },
    page3B: {
        text: "You find some berries but hear rustling behind you. What do you do?",
        choices: [
            { text: "Run away", consequence: "page4C" },
            { text: "Turn around slowly", consequence: "page4D" }
        ],
        image: "Images/page5.jpg"
    },
    page3C: {
        text: "You find an ancient temple in the jungle! What do you do?",
        choices: [
            { text: "Enter the temple", consequence: "page4E" },
            { text: "Walk around it", consequence: "page4F" }
        ],
        image: "Images/page6.jpg"
    },
    page3D: {
        text: "You climb a tree and spot smoke in the distance. What do you do?",
        choices: [
            { text: "Go towards the smoke", consequence: "page4G" },
            { text: "Stay hidden in the tree", consequence: "page4H" }
        ],
        image: "Images/page7.jpg"
    },
    page4A: {
        text: "The cave is dark and eerie. Do you proceed?",
        choices: [
            { text: "Go deeper", consequence: "gameOver" },
            { text: "Turn back", consequence: "gameOver" }
        ],
        image: "Images/page8.jpg"
    },
    page4B: {
        text: "You wait but nothing happens. What do you do next?",
        choices: [
            { text: "Explore further", consequence: "gameOver" },
            { text: "Stay put", consequence: "gameOver" }
        ],
        image: "Images/page9.jpg"
    },
    page4C: {
        text: "You run into another explorer! What do you do?",
        choices: [
            { text: "Talk to them", consequence: "gameOver" },
            { text: "Avoid them", consequence: "gameOver" }
        ],
        image: "Images/page10.jpg"
    },
    page4D: {
        text: "It's just a harmless animal. What do you do?",
        choices: [
            { text: "Follow it", consequence: "gameOver" },
            { text: "Ignore it", consequence: "gameOver" }
        ],
        image: "Images/page11.jpg"
    },
    page4E: {
        text: "Inside the temple, you see ancient artifacts. What do you do?",
        choices: [
            { text: "Examine them", consequence: "gameOver" },
            { text: "Leave quickly", consequence: "gameOver" }
        ],
        image: "Images/page12.jpg"
    },
    page4F: {
        text: "You walk around the temple and find an inscription. What do you do?",
        choices: [
            { text: "Try to read it", consequence: "gameOver" },
            { text: "Ignore it", consequence: "gameOver" }
        ],
        image: "Images/page13.jpg"
    },
    page4G: {
        text: "You move towards the smoke and find a campfire. What do you do?",
        choices: [
            { text: "Approach the fire", consequence: "gameOver" },
            { text: "Look for another path", consequence: "gameOver" }
        ],
        image: "Images/page14.jpg"
    },
    page4H: {
        text: "You stay hidden and wait. Hours pass, what do you do next?",
        choices: [
            { text: "Climb down", consequence: "gameOver" },
            { text: "Continue hiding", consequence: "gameOver" }
        ],
        image: "Images/page15.jpg"
    },
    gameOver: {
        text: "Game Over! Your adventure has ended.",
        choices: [],
        image: "Images/game_over.jpg"
    }
};

let currentStage = "page1";

function updatePage() {
    const stage = storyStages[currentStage];

    const storyTextElement = document.getElementById('story-text');
    const storyImageElement = document.getElementById('story-image');
    const choicesContainer = document.getElementById('choices-container');

    if (!storyTextElement || !storyImageElement || !choicesContainer) {
        console.error("Required elements not found in the document.");
        return;
    }

    storyTextElement.textContent = stage.text;
    storyImageElement.src = stage.image;
    choicesContainer.innerHTML = '';

    if (currentStage === "gameOver") {
        showGameOverPopup();
    } else {
        stage.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => choosePath(choice.consequence);
            choicesContainer.appendChild(button);
        });
    }
}

function showGameOverPopup() {
    // Create and show the Game Over popup
    const popup = document.createElement('div');
    popup.id = 'game-over-popup';
    popup.innerHTML = `
        <p>Game Over! Your adventure has ended.</p>
        <button id="restart-button">Start New Game</button>
    `;
    document.body.appendChild(popup);

    // Add functionality for the restart button
    document.getElementById('restart-button').onclick = () => {
        document.body.removeChild(popup);  // Remove the popup
        startGame();  // Restart the game
    };
}

function choosePath(path) {
    if (storyStages[path]) {
        currentStage = path;
        updatePage();
    } else {
        console.error(`Invalid stage: ${path}`);
    }
}

function startGame() {
    currentStage = "page1";  // Reset to the starting stage
    updatePage();
}

window.onload = startGame;

// Footer script for displaying the last modified date
var x = document.lastModified;
document.getElementById('lastModified').textContent = x;
