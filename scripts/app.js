function init() {
  

  const grid = document.querySelector('.grid')
  const introMessage = document.createElement('h2')
  const width = 16
  const height = 10
  const cellCount = width * height
  const cells = []
  let timerId = null

// Adding content to elements


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
    const h2 = document.querySelector('h2')
    h2.parentNode.removeChild(h2)
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
  // createGrid()

  //ALIEN - Create and Remove//

  
  
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
        removeLaser() //ask about why this is here.
      }
      if (cells[laserPosition].classList.contains('alien')) {
        laserAvailable = true
        removeLaser()
        clearInterval(timerId)
        cells[laserPosition].classList.remove('alien')
        score += 1000
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
    }, 3)
    if (alienArray.length === 0) {
      winGame()
    }
  }



  
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
    }, 50)
  }


  function loseGame() {
    removeAliens()
    removeShip()
    removeLaser()
    document.removeEventListener('keydown', shipControls)
    const finalScore = score
    console.log('my final score>>', finalScore)
  }

  function winGame() {
    console.log('won! final score>>', score)
  }

  /*EVENT LISTENERS*/
  document.addEventListener('keyup', beginGame)
  document.addEventListener('keydown', shipControls)
  document.addEventListener('keyup', createIntro)
  // function laserKeys () {
  //   for (let i = 0; i < shootArray.length; i++) 
  //     shootArray[i].addEventListener('keyup', moveLaser)
  // }
  // laserKeys()


}


window.addEventListener('DOMContentLoaded', init)







