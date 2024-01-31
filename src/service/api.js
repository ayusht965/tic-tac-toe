export const computerGameplay = async (side) => {
    const urlParams = new URLSearchParams(window.location.search);
    let gameState = urlParams.get('gameState').split(",").map(el => el === '1' ? null : el)
    //     Detect player win
    const winMap = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]
    for (let i = 0; i < winMap.length; i++) {
        let winIndex = winMap[i]
        if(gameState[winIndex[0]] === gameState[winIndex[1]] && gameState[winIndex[1]] === gameState[winIndex[2]] && gameState[winIndex[0]] !== null) {
            document.dispatchEvent(new CustomEvent("win", {
                detail: {
                    winSequence: winIndex,
                    winner: gameState[winIndex[0]] === side ? "You" : "Computer"
                }
            }))
            return
        }
    }
    const resp = await fetch("https://hiring-react-assignment.vercel.app/api/bot", {
        method: "POST",
        body: JSON.stringify(gameState)
    })
    const data = await resp.text()
    gameState[data] = side === "X" ? "O" : "X";
    gameState = gameState.map(el => el === null ? '1' : el)
    const pageURl = "?gameState=" + gameState.join(",")
    window.history.replaceState("", "", pageURl)
    document.dispatchEvent(new CustomEvent("computerMove", {
        detail: {
            resp: data
        }
    }))

    //     Detect computer win
    for (let i = 0; i < winMap.length; i++) {
        let winIndex = winMap[i]
        if(gameState[winIndex[0]] === gameState[winIndex[1]] && gameState[winIndex[1]] === gameState[winIndex[2]] && gameState[winIndex[0]] !== "1") {
            document.dispatchEvent(new CustomEvent("win", {
                detail: {
                    winSequence: winIndex,
                    winner: gameState[winIndex[0]] === side ? "You" : "Computer"
                }
            }))
            return
        }
    }
}
