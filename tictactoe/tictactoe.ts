enum PlayerState {
    None = 0,
    PlayerOne = 1,
    PlayerTwo = 2
}
class Player {
    isPlayerTurn: boolean
    playedPositions: Array<[number, number]>
    name: string
    playerWon: boolean = false
    winningCombinations = [

        [[0, 0], [0, 1], [0, 2]],// ROW
        [[1, 0], [1, 1], [1, 2]],// ROW
        [[2, 0], [2, 1], [2, 2]],// ROW

        [[0, 0], [1, 0], [2, 0]],// COL
        [[0, 1], [1, 1], [2, 1]],// COL
        [[0, 2], [1, 2], [2, 2]],// COL

        [[0, 0], [1, 1], [2, 2]],// DIAGONAL
        [[0, 2], [1, 1], [2, 0]],// DIAGONAL

    ]
    constructor(name: string, isPlayerTurn = false) {
        this.name = name
        this.isPlayerTurn = isPlayerTurn
        this.playedPositions = []
    }
    /**
     * @description The play function records the player's move, switches turns, and checks if the player has won.
     * @param {number} row - The `row` parameter represents the row number of the position where the
     * player wants to make a move on the game board.
     * @param {number} col - The `col` parameter represents the column number where the player wants to
     * make a move in a game. It is used in the `play` function to specify the column where the player
     * wants to place their game piece.
     */
    play(row: number, col: number) {
        this.playedPositions.push([row, col])
        this.isPlayerTurn = false
        this.playerWon = this.checkIfPlayerWon();
    }

    /**
     * @description The function `checkIfPlayerWon`  checks if the player has won by comparing the played
     * positions with the winning combinations.
     * @returns {Boolean} The `checkIfPlayerWon()` method returns a boolean value - `true` if the player has won
     * the game based on the played positions and winning combinations, and `false` if the player has not
     * won.
     */
    checkIfPlayerWon(): boolean {

        for (const combo of this.winningCombinations) {
            const hasWon = combo.every(
                ([r, c]) => this.playedPositions.some(([pr, pc]) => pr === r && pc === c)
            );
            if (hasWon) {
                return true
            }
        }
        return false
    }
}
class Game {
    board: Array<number[]>
    isGameOver: boolean = false;
    playerOne: Player
    playerTwo: Player
    positions: Array<[number, number]>
    constructor() {
        this.board = Array.from(Array(3), () => new Array(3).fill(PlayerState.None))
        this.playerOne = new Player('First Player', true)
        this.playerTwo = new Player('Second Player', false)
        this.positions = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
    }


    play(e: Event) {
        if (e?.target && e.target instanceof HTMLButtonElement) {
            const { row, col } = e.target.dataset

            const rowInt: number = parseInt(row!, 10)
            const colInt: number = parseInt(col!, 10)

            if (this.board[rowInt][colInt] !== PlayerState.None) {
                throw Error('Cant play there. Chose a different position')
            }
            // Ensure that if during the previous turn, someone won, return early
            if (this.playerOne.playerWon || this.playerTwo.playerWon) {
                return this.updatePlayerWonText()
            }

            if (this.playerOne.isPlayerTurn) {
                this.playerOne.play(rowInt, colInt)
                this.updateTicTacToeCellText(row!, col!, 'X')

                this.playerTwo.isPlayerTurn = true
                this.board[rowInt][colInt] = PlayerState.PlayerOne


            } else {
                this.playerTwo.play(rowInt, colInt)
                this.updateTicTacToeCellText(row!, col!, 'O')

                this.playerOne.isPlayerTurn = true
                this.board[rowInt][colInt] = PlayerState.PlayerTwo


            }

            this.updatePlayerTurnText()

            if (this.playerOne.playerWon || this.playerTwo.playerWon) {
                return this.updatePlayerWonText()
            }

        }
    }



    /**
     * The `createBoard` function creates a tic-tac-toe board by dynamically generating buttons for each
     * cell and appending them to the DOM.
     */
    createBoard() {
        const fragment = document.createDocumentFragment()

        this.positions.forEach(([row, col]) => {

            const button = document.createElement('button');

            button.classList.add('tic-tac-toe-cell')

            button.setAttribute('data-row', `${row}`)
            button.setAttribute('data-col', `${col}`)
            button.addEventListener('click', (e) => this.play(e)); // Add event listener here

            fragment.appendChild(button);
        })

        const boardSection = document.getElementById('board')

        if (boardSection && boardSection instanceof HTMLElement) {
            boardSection.appendChild(fragment)
        }

        this.updatePlayerTurnText()
    }

    /**
     * The function `updatePlayerTurnText` updates the text content of an HTML element based on the current
     * player's turn.
     */
    updatePlayerTurnText() {
        const playerTurnSpan = document.getElementById('player-turn');

        if (playerTurnSpan && playerTurnSpan instanceof HTMLElement) {
            if (this.playerOne.isPlayerTurn) {
                playerTurnSpan.textContent = this.playerOne.name
            } else {
                playerTurnSpan.textContent = this.playerTwo.name
            }
        }
    }

    updateTicTacToeCellText(row: string, col: string, playerText: string) {
        const cell = document.querySelector(`button[data-row="${row}"][data-col="${col}"]`);

        // Check if the element exists and do something with it
        if (cell && cell  instanceof HTMLElement) {
            // For example, change the button's text
            cell.textContent = playerText; // or any other action you want to perform
        }

    }

    /**
     * The function `updatePlayerWonText` updates the game description text to display the name of the
     * player who won the game.
     */
    updatePlayerWonText() {
        const gameDesc = document.querySelector("#game-decs")
        if (gameDesc && gameDesc  instanceof HTMLElement) {
            if (this.playerOne.playerWon) {
                gameDesc.textContent = `${this.playerOne.name} won the game`
            } else if (this.playerTwo.playerWon) {
                gameDesc.textContent = `${this.playerTwo.name} won the game`
            }
        }

    }
    startGame() {
        this.createBoard()
    }
}


const gamePlay = new Game()

gamePlay.startGame()
