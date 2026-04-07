window.onLoad = function()
{
    modifyDiv("bananarama")
    getRandomWord()
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
        return response.json
    })
    .then((data) => {
        console.log(data)

        let isNotAlpha = /[^a-zA-Z]/
        if(isNotAlpha.test(data[0].word))
        {
            window.location.reload()
        }
        modifyDiv(data[0].word.toUpperCase)
    })
    .catch((error) => {
        console.log(error)
    })
}

function modifyDiv(word)
{
    let apiDiv = document.getElementById("myWord")
    apiDiv.innerHTML = word
}