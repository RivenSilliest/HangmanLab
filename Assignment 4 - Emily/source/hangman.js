//Loads the game when windows load
window.onload = function(){
    console.log("Working");
    getRandomWord()
}

    var secretWord = "bananarama".toUpperCase()
    var displayedWord = ""
    var shots = ""
    var shotsUsedList = ""
    var wrongShots = 0
    var maxShots = 6
    var guessedLetters = ""
    var gameOver = false

//loads the game
function loadGame()
{  
    loadImage(wrongShots)
    assignButton()
    setGuessWord()
}

//loads the hangman image and updates per wrong answer
function loadImage(number)
{
    let imageName = `Hangman${number}.png`
    let imageDiv = document.getElementById("isHeDeadYet")
    let imageTag = `<img src="assets/${imageName}" alt="Image of the Hanged Person">`
    imageDiv.innerHTML = imageTag
}

//assigns the button and calls changeCase to prevent lowercase and special characters
function assignButton()
{
    let input = document.getElementById("enterShot")
    input.setAttribute("maxlength", "1")
    input.setAttribute("oninput", "changeCase(this)")

    let myButton = document.getElementById("submitShot")
    myButton.setAttribute("onclick", "checkShot()")

    input.addEventListener("keypress", function(event){
    if (event.key === "Enter")
    {
        event.preventDefault();
        checkShot()
    }
    });

   
}

//makes lowercase letters uppercase
function changeCase(instance)
{
    let isAlpha = /[a-zA-Z]/
    if(isAlpha.test(instance.value))
    {
    instance.value = instance.value.toUpperCase()
    }
    else
    {
        instance.value = ""
    }
}

//checks what's inputted
function checkShot()
{
    if (gameOver == false)
    {
        let inputLetter = document.getElementById("enterShot").value
        iterateThrough(inputLetter)
        document.getElementById("enterShot").value = ""
    }
}

//sets up the secretword boxes & the word itself
function setGuessWord()
{
    let guessDiv = document.getElementById("shotsTaken")
    let displayedWordDiv = `<div id="displayShots">`
    let usedLettersDiv = `<div id ="usedLetters"><div>`

    for(let ii = 0; ii < secretWord.length; ii++)
    {
        displayedWord += "_"
        displayedWordDiv += "<span>_</span>"
    }

    displayedWordDiv += "</div>"
    displayedWordDiv += usedLettersDiv
    guessDiv.innerHTML = displayedWordDiv
}

//updates the letter where needed via index and letter
function updateDisplayLetter(index, letters)
{
    if (index < displayedWord.length)
    {
        displayedWord = displayedWord.replaceAt(index, letters)
        let parentDiv = document.getElementById("displayShots")
        parentDiv.children[index].innerHTML = letters
    }
}

//JS REPLACE STRING CODE https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-specific-index-in-javascript
String.prototype.replaceAt = function(index, replacement)
{
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

//iterates through the secret word & check for wins/losses
function iterateThrough(letter)
{
    letterMatch = false
    
    for (let ii = 0; ii < secretWord.length; ii++)
    {
        if (secretWord[ii] == letter)
        {
            letterMatch = true
            updateDisplayLetter(ii, letter)
        }
    }

    if (letterMatch == false)
    {
        wrongShots = wrongShots + 1
        loadImage(wrongShots)

        let lettersDiv = document.getElementById("usedLetters")
        lettersDiv.innerHTML = guessedLetters += letter + " "

        if (wrongShots == maxShots)
        {
            gameOver = true
            Loser(letter)
        }
    }
    
    else if (secretWord == displayedWord)
    {
        gameOver = true
        Winner()
    }
}

//calls when the player wins
function Winner()
{
    console.log("Winner Called")

    var winnerScript = "You won, the word was indeed:"
    let winDiv = document.getElementById("gameOver")
    winDiv.innerHTML = winnerScript

    //Creating a button in js: https://altcademy.com/blog/how-to-create-a-button-in-javascript/
    const winButton = document.createElement('button')
    winButton.textContent = "Try Again"

    winButton.setAttribute("onclick", "window.location.reload()")
    document.body.appendChild(winButton)
}

//calls when the player loses
function Loser()
{
    console.log("Loser Called")
   
    for (let ii = 0; ii < secretWord.length; ii++)
    {
        updateDisplayLetter(ii, secretWord[ii])
    }
    console.log(displayedWord)

    var loserScript = "You lost, the word was:"
    let loseDiv = document.getElementById("gameOver")
    loseDiv.innerHTML = loserScript
    
    //Creating a button in js: https://altcademy.com/blog/how-to-create-a-button-in-javascript/
    const loseButton = document.createElement('button')
    loseButton.textContent = "Try Again"

    loseButton.setAttribute("onclick", "window.location.reload()")
    document.body.appendChild(loseButton)
}

function getRandomWord()
{
    let randNum = Math.floor(Math.random() * 9) + 2

    window.fetch(`https://random-words-api.kushcreates.com/api?language=en&words=1&length=${randNum}`)
    .then((response) => {
        if (!response.ok)
        {
            throw new Error (`HPPT error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then((data) => {
        console.log(data)

        let isNotAlpha = /[^a-zA-Z]/
        if(isNotAlpha.test(data[0].word))
        {
            window.location.reload()
        }
        secretWord = data[0].word.toUpperCase();
        loadGame()
    })
    .catch((error) => {
        console.log(error)
    })
}