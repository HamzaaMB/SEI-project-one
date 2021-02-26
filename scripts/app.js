function init() {
  
/* VARIABLES */

  const grid = document.querySelector('.grid')
  const introMessage = document.createElement('h1')
  const liveScore = document.querySelector('.live-score')
  const endGameMessage = document.createElement('h2')
  const finalScore = document.querySelector('.final-score')
  const width = 16
  const height = 10
  const cellCount = width * height
  const cells = []
  let timerId = null

  const shipClass = 'ship'
  let shipCurrentPosition = 151
  
  const alienClass = 'alien'
  let alienArray = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let alienStartingPosition = 0
  let laserAvailable = true
  let movement = 0
  let score = 0

  const laserClass = 'laser'
  let laserPosition = 135


  function createIntro (event) {
    introMessage.textContent = 'press any key to begin'
    grid.appendChild(introMessage)
    if (event) {
      removeIntro()
    }
  }  
  createIntro()

  function removeIntro() {
    const h1 = document.querySelector('h1')
    h1.parentNode.removeChild(h1)
  }

  function beginGame (event) {
    if (event) {
      document.removeEventListener('keyup', beginGame)
      createGrid()
    }
  }


/* CREATING GRID and ALIENS */

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    createAliens()
    moveAllAliens()
    addShip()
  }

  function createAliens () {
    alienArray.forEach(alien => {
      cells[alienStartingPosition + alien].classList.add(alienClass)
    })
  }
  function removeAliens () {
    alienArray.forEach(alien => {
      cells[alienStartingPosition + alien].classList.remove(alienClass)
    })
  }

/*ADDING and REMOVING SHIP*/

  function addShip() {
    cells[shipCurrentPosition].classList.add(shipClass)
  }
  function removeShip() {
    cells[shipCurrentPosition].classList.remove(shipClass)
  }

  /* CONTROLS FOR THE GAME */

  function shipControls(event) {
    
    const key = event.keyCode
    removeShip()

    if (key === 37 && shipCurrentPosition % width !== 0) {
      shipCurrentPosition--
    } else if (key === 38) {
      console.log('invalid key')
    } else if (key === 39 && shipCurrentPosition % width !== width - 1 ) {
      shipCurrentPosition++
    } else if (key === 40 && shipCurrentPosition + width <= width * height - 1) {
      shipCurrentPosition += width
    } else if  (key === 32) {
      laserControls()
    } else {
      // console.log('invalid key')
    }
    addShip()
  }

  function createLaser() {
    cells[laserPosition].classList.add(laserClass)
  }
  function removeLaser() {
    cells[laserPosition].classList.remove(laserClass)
  }
  
  function moveLaser() {
    removeLaser()
    laserPosition = laserPosition - width
    createLaser()
  }

  function laserControls() {
    if (!laserAvailable) {
      return 
    } 
    laserAvailable = false
    laserPosition = shipCurrentPosition - width
    let laserMovingUp = true 

    timerId = setInterval(() => {
      removeLaser()
      if (laserMovingUp) {
        moveLaser()
      } else {
        removeLaser()
      }
      if (cells[laserPosition].classList.contains('alien')) {
        laserAvailable = true
        removeLaser()
        clearInterval(timerId)
        cells[laserPosition].classList.remove('alien')
        score += 1000
        liveScore.innerHTML = 'Score: ' + score
        console.log('score', score)
        alienArray = alienArray.filter(alien => {
          return alien !== (laserPosition - alienStartingPosition) 
        })
      }
      if (laserPosition < width) {
        clearInterval(timerId)
        removeLaser()
        laserAvailable = true
      }
    }, 250)
    console.log('array', alienArray.length)
    if (alienArray.length === 1) {
      winGame()
    }
  }

/*MOVEMENT OF ALIENS*/

  function moveAliensRight() {
    removeAliens()
    alienStartingPosition++
    createAliens()
  }

  function moveAliensLeft() {
    removeAliens()
    alienStartingPosition--
    createAliens()  
  }

  function moveAliensDown() {
    removeAliens()
    alienStartingPosition += width
    createAliens()
  }

  function moveAllAliens() {
    let pushLeft = true 
    timerId = setInterval(() => {
      if (pushLeft) {
        moveAliensLeft()
      } else {
        moveAliensRight()
      }
      movement++
      if (movement === 3) {
        moveAliensDown()
        movement = 0
        pushLeft = !pushLeft
      } 
      console.log(alienStartingPosition)
      if (alienStartingPosition >= 128) {
        clearInterval(timerId)
        loseGame()
      }
    }, 6000)
  }
/*WIN/LOSE GAME*/

  function addLoseGame () {
    endGameMessage.textContent = 'You lose! Click here to play again'
    grid.appendChild(endGameMessage)
  }


  function loseGame(event) {
    document.removeEventListener('keydown', shipControls)
    document.addEventListener('click', loseGame)
    removeAliens()
    removeShip()
    removeLaser()
    addLoseGame()

    if (event) {
      location.reload()
    }
  }

  function addWinGame() {
    endGameMessage.textContent = 'You win! Click here to play again'
    grid.appendChild(endGameMessage)
  }
  function winGame(event) {
    document.removeEventListener('keydown', shipControls)
    document.addEventListener('click', winGame)
    removeAliens()
    removeShip()
    removeLaser()
    addWinGame()
    if (event) {
      location.reload()
    }
  }

  /*EVENT LISTENERS*/
  document.addEventListener('keyup', beginGame)
  document.addEventListener('keydown', shipControls)
  document.addEventListener('keyup', createIntro)




}


window.addEventListener('DOMContentLoaded', init)







