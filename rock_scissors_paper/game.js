const options = { r: "rock", p: "paper", s: "scissors" }
const prompt = require("prompt-sync")()

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

class Player {
    constructor(name) {
        this.name = name
        this.points = 0
        this.choice = ""
    }

    getName() {
        return this.name
    }

    getPoints() {
        return this.points
    }

    getChoice() {
        return this.choice
    }

    addPoint() {
        this.points++
    }
}

class Human extends Player {
    constructor(name) {
        super(name)
    }

    playGame() {
        do {
            this.choice = prompt("Form? [r]ock, [p]aper or [s]cissors: ")
        } while (!Object.keys(options).includes(this.choice))
        console.log("Hand ready!")
    }
}

class Robot extends Player {
    constructor(name) {
        super(name)
    }

    playGame() {
        this.choice = Object.keys(options)[getRandomInt(0, 3)]
        console.log("Hand ready!")
    }
}

const game = () => {
    console.time("Total time")
    console.log("run:")
    const playerName = prompt("Human player's name? --> ")
    const pointsToWin = parseInt(
        prompt("How many points to get the game? --> ")
    )

    let player = new Human(playerName)
    let robot = new Robot("Robot")
    let winner = new Player()

    do {
        player.playGame()
        robot.playGame()
        console.log(`Robot plays ${options[robot.getChoice()]}`)

        if (player.getChoice() === robot.getChoice()) {
            console.log("It's a tie! :-/")
        } else if (
            (player.getChoice() === "r" && robot.getChoice() === "s") ||
            (player.getChoice() === "s" && robot.getChoice() === "p") ||
            (player.getChoice() === "p" && robot.getChoice() === "r")
        ) {
            console.log("You win! :-D")
            winner = player
            winner.addPoint()
        } else {
            console.log("You loose! :-(")
            winner = robot
            winner.addPoint()
        }

        console.log(
            `${player.getName()}: ${player.getPoints()} points.\n` +
                `Robot: ${robot.getPoints()} points.\n`
        )
    } while (winner.getPoints() !== pointsToWin)

    console.log(`${winner.getName().toUpperCase()} WINS THE GAME!!!`)
    console.log("BUILD SUCCESSFUL")
    console.timeEnd("Total time")
}

game()
