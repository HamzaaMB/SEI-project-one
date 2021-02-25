function init() {
  

  const grid = document.querySelector('.grid')
  const width = 16
  const height = 10
  const cellCount = width * height
  const cells = []
  let timerId = null

  const shipClass = 'ship'
  let shipCurrentPosition = 151
  
  const alienClass = 'alien'
  let alienArray = [13, 14, 15, 16, 17, 18, 19]
  let alienStartingPosition = 12
  let laserAvailable = true
  let movement = 0
  let points = 0


  const laserClass = 'laser'
  let laserPosition = 0


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
  }
  createGrid()

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
  addShip()
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
        cells[laserPosition].classList.remove('alien')
        removeLaser()
        alienArray = alienArray.filter(alien => {
          return alien !== (laserPosition - alienStartingPosition) 
        })
      }
      if (laserPosition < width) {
        clearInterval(timerId)
        removeLaser()
        laserAvailable = true
      }
    }, 400)
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
      if (movement === 4) {
        moveAliensDown()
        pushLeft = !pushLeft
        movement = 0
      } 
      console.log(alienStartingPosition)
      if (alienStartingPosition > 86) {
        clearInterval(timerId)
        removeAliens()
      }
    
    }, 1000)
  }

/* COLLISION */

  // function collisionLogic() {
  //   console.log('collision active')
  //   if (cells[laserPosition].classList.contains('alien') && laserAvailable) {
  //     console.log('if')
  //     cells[laserPosition].classList.remove('alien')
  //   }
  // }
  // collisionLogic()


  /*EVENT LISTENERS*/

  document.addEventListener('keydown', shipControls)
  // function laserKeys () {
  //   for (let i = 0; i < shootArray.length; i++) 
  //     shootArray[i].addEventListener('keyup', moveLaser)
  // }
  // laserKeys()


}


window.addEventListener('DOMContentLoaded', init)

// for collision, classes need to be the same - remove/add image of explosion
// set interval for moving aliens
// declaring a variable to track 
// track our movement sideways and down (both separately)
// multiple checks for our movement






