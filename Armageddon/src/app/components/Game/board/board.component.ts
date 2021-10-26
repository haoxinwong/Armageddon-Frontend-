import { Component, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [
  ]
})
export class BoardComponent implements OnInit {

  userGrid: any
  computerGrid: any
  displayGrid: any
  ships: any
  destroyer: any
  submarine: any
  cruiser: any
  battleship: any
  carrier: any
  userSquares: any
  computerSquares: any
  width: any
  isHorizontal: any
  isGameOver: any
  currentPlayer: any
  shipArray: any
  direction: any
  selectedShipNameWithIndex: any
  draggedShip: any
  draggedShipLength: any
  childNodes: any
  selectedShipIndex: any;
  startButton: any
  turnDisplay: any
  infoDisplay: any
  destroyerCount: any
  submarineCount: any
  cruiserCount: any
  battleshipCount: any
  carrierCount: any
  cpuDestroyerCount: any
  cpuSubmarineCount: any
  cpuCruiserCount: any
  cpuBattleshipCount: any
  cpuCarrierCount: any

  constructor() { }

  ngOnInit(): void {
    this.userGrid = document.querySelector('.grid-user')
    this.computerGrid = document.querySelector('.grid-computer')
    this.displayGrid = document.querySelector('.grid-display')

    this.ships = document.querySelectorAll('.ship')
    this.destroyer = document.querySelector('.destroyer-container')
    this.submarine = document.querySelector('.submarine-container')
    this.cruiser = document.querySelector('.cruiser-container')
    this.battleship = document.querySelector('.battleship-container')
    this.carrier = document.querySelector('.carrier-container')

    this.startButton = document.querySelector('#start')
    this.turnDisplay = document.querySelector('#whose-go')
    this.infoDisplay = document.querySelector('#info')

    this.userSquares = []
    this.computerSquares = []
    this.width = 10

    this.isHorizontal = true
    this.isGameOver = false
    this.currentPlayer = 'user'

    this.destroyerCount = 0
    this.submarineCount = 0
    this.cruiserCount = 0
    this.battleshipCount = 0
    this.carrierCount = 0

    this.cpuDestroyerCount = 0
    this.cpuSubmarineCount = 0
    this.cpuCruiserCount = 0
    this.cpuBattleshipCount = 0
    this.cpuCarrierCount = 0

    this.shipArray = [
      {
        name: 'destroyer',
        directions: [
          [0, 1],
          [0, this.width]
        ]
      },
      {
        name: 'submarine',
        directions: [
          [0, 1, 2],
          [0, this.width, this.width * 2]
        ]
      },
      {
        name: 'cruiser',
        directions: [
          [0, 1, 2],
          [0, this.width, this.width * 2]
        ]
      },
      {
        name: 'battleship',
        directions: [
          [0, 1, 2, 3],
          [0, this.width, this.width * 2, this.width * 3]
        ]
      },
      {
        name: 'carrier',
        directions: [
          [0, 1, 2, 3, 4],
          [0, this.width, this.width * 2, this.width * 3, this.width * 4]
        ]
      },
    ]

    this.createBoard(this.userGrid, this.userSquares)
    this.createBoard(this.computerGrid, this.computerSquares)

    this.generateUser(this.shipArray[0])
    this.generateUser(this.shipArray[1])
    this.generateUser(this.shipArray[2])
    this.generateUser(this.shipArray[3])
    this.generateUser(this.shipArray[4])

    this.generate(this.shipArray[0])
    this.generate(this.shipArray[1])
    this.generate(this.shipArray[2])
    this.generate(this.shipArray[3])
    this.generate(this.shipArray[4])

    this.ships.forEach((ship: any) => ship.addEventListener('dragstart', this.dragStart))
    this.userSquares.forEach((square: any) => square.addEventListener('dragstart', this.dragStart))
    this.userSquares.forEach((square: any) => square.addEventListener('dragover', this.dragOver))
    this.userSquares.forEach((square: any) => square.addEventListener('dragenter', this.dragEnter))
    this.userSquares.forEach((square: any) => square.addEventListener('dragleave', this.dragLeave))
    this.userSquares.forEach((square: any) => square.addEventListener('drop', this.dragDrop))
    this.userSquares.forEach((square: any) => square.addEventListener('dragend', this.dragEnd))

    this.ships.forEach((ship: any) => ship.addEventListener('mousedown', ((e: any) => {
      this.selectedShipNameWithIndex = e.target.id
      // console.log(this.selectedShipNameWithIndex)
    })))
  }

  createBoard(grid: any, squares: any) {
    for (let i = 0; i < this.width * this.width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i.toString()
      grid.appendChild(square)
      squares.push(square)
    }
  }

  generateUser(ship: any) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) this.direction = 1
    if (randomDirection === 1) this.direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * this.userSquares.length - (ship.directions[0].length * this.direction)))

    const isTaken = current.some((index: any) => this.userSquares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some((index: any) => (randomStart + index) % this.width === this.width - 1)
    const isAtLeftEdge = current.some((index: any) => (randomStart + index) % this.width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach((index: any) => this.userSquares[randomStart + index].classList.add('taken', ship.name))
    else this.generateUser(ship)
  }

  generate(ship: any) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) this.direction = 1
    if (randomDirection === 1) this.direction = 10
    let randomStart = Math.abs(Math.floor(Math.random() * this.computerSquares.length - (ship.directions[0].length * this.direction)))

    const isTaken = current.some((index: any) => this.computerSquares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some((index: any) => (randomStart + index) % this.width === this.width - 1)
    const isAtLeftEdge = current.some((index: any) => (randomStart + index) % this.width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach((index: any) => this.computerSquares[randomStart + index].classList.add('taken', ship.name))
    else this.generate(ship)
  }

  rotate() {
    console.log(this.isHorizontal)
    if (this.isHorizontal) {
      this.destroyer.classList.toggle('destroyer-container-vertical')
      this.submarine.classList.toggle('submarine-container-vertical')
      this.cruiser.classList.toggle('cruiser-container-vertical')
      this.battleship.classList.toggle('battleship-container-vertical')
      this.carrier.classList.toggle('carrier-container-vertical')
      this.isHorizontal = false
      return
    }
    else if (!this.isHorizontal) {
      this.destroyer.classList.toggle('destroyer-container-vertical')
      this.submarine.classList.toggle('submarine-container-vertical')
      this.cruiser.classList.toggle('cruiser-container-vertical')
      this.battleship.classList.toggle('battleship-container-vertical')
      this.carrier.classList.toggle('carrier-container-vertical')
      this.isHorizontal = true
      return
    }
  }

  dragStart(e: any) {
    this.draggedShip = e.target.id
    console.log(e.target)
    this.draggedShipLength = this.childNodes.length
    console.log("drag start")
    console.log(this.draggedShip)
    console.log(this)
  }

  dragOver(e: any) {
    e.preventDefault()
  }

  dragEnter(e: any) {
    e.preventDefault()
  }

  dragLeave() {
    console.log('drag leave')
  }

  dragDrop(e: Event) {
    console.log(this.draggedShip)
    console.log(this)
    let shipNameWithLastId = this.draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0, -2)
    console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    let shipLastId = lastShipIndex
    //+ parseInt(this.dataset.id)
    console.log(shipLastId)
    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
    const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

    this.selectedShipIndex = parseInt(this.selectedShipNameWithIndex.substr(-1))

    shipLastId = shipLastId - this.selectedShipIndex
    console.log(shipLastId)

    if (this.isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        this.userSquares[/*parseInt(this.dataset.id) - */this.selectedShipIndex + i].classList.add('taken', shipClass)
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!this.isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < this.draggedShipLength; i++) {
        this.userSquares[/*parseInt(this.dataset.id) - */this.selectedShipIndex + this.width * i].classList.add('taken', shipClass)
      }
    } else return

    this.displayGrid.removeChild(this.draggedShip)
    console.log('drag drop')
  }

  dragEnd() {
    console.log('dragend')
  }

  playGame() {
    if (this.isGameOver) {
      console.log("game broke")
      return
    }
    else if (this.currentPlayer === 'user') {
      console.log("my turn")
      this.turnDisplay.innerHTML = 'Your Turn'
      this.computerSquares.forEach((square: any) => square.addEventListener('click', (e: any) => {
        this.revealSquare(square)
      }))
    }
    else if (this.currentPlayer === 'computer') {
      this.turnDisplay.innerHTML = 'Computers Turn'
      setTimeout(this.computerGo, 1000)
    }
  }

  revealSquare(square: any) {
    if (!square.classList.contains('hit')) {
      if (square.classList.contains('destroyer')) this.destroyerCount++
      else if (square.classList.contains('submarine')) this.submarineCount++
      else if (square.classList.contains('cruiser')) this.cruiserCount++
      else if (square.classList.contains('battleship')) this.battleshipCount++
      else if (square.classList.contains('carrier')) this.carrierCount++
    }
    else if (square.classList.contains('taken')) {
      square.classList.add('hit')
    }
    else {
      square.classList.add('miss')
    }

    this.checkForWins()
    this.currentPlayer = 'computer'
    this.playGame()
  }

  computerGo() {
    let random = Math.floor(Math.random() * this.userSquares.length)
    if (!this.userSquares[random].classList.contains('hit')) {
      this.userSquares[random].classList.add('hit')
      if (this.userSquares[random].classList.contains('destroyer')) this.cpuDestroyerCount++
      if (this.userSquares[random].classList.contains('submarine')) this.cpuSubmarineCount++
      if (this.userSquares[random].classList.contains('cruiser')) this.cpuCruiserCount++
      if (this.userSquares[random].classList.contains('battleship')) this.cpuBattleshipCount++
      if (this.userSquares[random].classList.contains('carrier')) this.cpuCarrierCount++
      this.checkForWins()
    } else this.computerGo()
    this.currentPlayer = 'user'
    this.turnDisplay.innerHTML = 'Your Go'
  }

  checkForWins() {
    if (this.destroyerCount === 2) {
      this.infoDisplay.innerHTML = 'You sunk the computers destroyer'
      this.destroyerCount = 10
    }
    if (this.submarineCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers submarine'
      this.submarineCount = 10
    }
    if (this.cruiserCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers cruiser'
      this.cruiserCount = 10
    }
    if (this.battleshipCount === 4) {
      this.infoDisplay.innerHTML = 'You sunk the computers battleship'
      this.battleshipCount = 10
    }
    if (this.carrierCount === 5) {
      this.infoDisplay.innerHTML = 'You sunk the computers carrier'
      this.carrierCount = 10
    }
    if (this.cpuDestroyerCount === 2) {
      this.infoDisplay.innerHTML = 'You sunk the computers Destroyer'
      this.cpuDestroyerCount = 10
    }
    if (this.cpuSubmarineCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers Submarine'
      this.cpuSubmarineCount = 10
    }
    if (this.cpuCruiserCount === 3) {
      this.infoDisplay.innerHTML = 'You sunk the computers Cruiser'
      this.cpuCruiserCount = 10
    }
    if (this.cpuBattleshipCount === 4) {
      this.infoDisplay.innerHTML = 'You sunk the computers Battleship'
      this.cpuBattleshipCount = 10
    }
    if (this.cpuCarrierCount === 5) {
      this.infoDisplay.innerHTML = 'You sunk the computers Carrier'
      this.cpuCarrierCount = 10
    }
    if ((this.destroyerCount + this.submarineCount + this.cruiserCount + this.battleshipCount + this.carrierCount) === 50) {
      this.infoDisplay.innerHTML = "YOU WIN"
      this.gameOver()
    }
    if ((this.cpuDestroyerCount + this.cpuSubmarineCount + this.cpuCruiserCount + this.cpuBattleshipCount + this.cpuCarrierCount) === 50) {
      this.infoDisplay.innerHTML = "COMPUTER WINS"
      this.gameOver()
    }
  }

  gameOver() {
    this.isGameOver = true
    this.startButton.removeEventListener('click', this.playGame)
  }
}