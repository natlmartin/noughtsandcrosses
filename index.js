const state = {
    gameElement: document.querySelector('.game'),
    symbols: ['O', 'X'],
    // cells: [null, null, null, null, null, null, null, null, null]
    cells: Array(9).fill(null),
    winningCombinations: [
        [0,1,2], // top row
        [3,4,5], // middle row
        [6,7,8], // bottom row
        [0,3,6], // left column
        [1,4,7], // middle column
        [2,5,8], // right column
        [0,4,8], // left diagonal
        [2,4,6]  // right diagonal
    ],
    gameFinished: false
}

function drawBoard() {
    state.gameElement.innerHTML = ''

    for (let i = 0; i < state.cells.length; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        if (state.cells[i]) { // does the cell have an x or an o? if so, this code runs
            const cellSymbol = document.createElement('p') // <p class="symbol"></p>
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add('symbol')
            cell.append(cellSymbol)
        } else { //otherwise it must be empty, so run this next section
            cell.addEventListener('click', function () {
                if (state.gameFinished) {
                    return
                }

                state.symbols.reverse()
                const currentPlayerSymbol = state.symbols[0]
    
                state.cells[i] = currentPlayerSymbol
    
                drawBoard()

                if (checkForWinner()) {
                    drawMessage(`${state.symbols[0]} won!`)
                    state.gameFinished = true
                    return
                }

                if (checkForDraw()) {
                    drawMessage("It's a Draw!") // use double quotation if string contains speech mark
                    state.gameFinished = true
                }
            })
        }

        state.gameElement.append(cell)
    }
}

function checkForWinner() {
    return state.winningCombinations.some(combo => {
        const cells = combo.map(index => state.cells[index])
                                // the array does not have a null AND all of the values are the same

        return !(cells.includes(null)) && new Set(cells).size === 1 // Set gives back an array but just with unique values
    })
}

function checkForDraw() {
    return state.cells.every(cell => cell !== null)
}

function drawMessage(message) {
    const banner = document.createElement('div')
    banner.classList.add('banner')

    const h1 = document.createElement('h1')
    h1.innerHTML = message
    banner.append(h1)

    state.gameElement.append(banner)
}

drawBoard()
