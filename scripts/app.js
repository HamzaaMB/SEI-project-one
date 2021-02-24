function init() {
  

  const grid = document.querySelector('.grid')
  const width = 11
  const height = 10
  const cellCount = width * height
  const cells = []
  let timerId = null

  const shipClass = 'ship'
  let shipStartingPosition = 104
  let shipCurrentPosition = 104
  
  const alienClass = 'alien'
  let alienStartingPosition = 12
  let laserAvailable = true
  let movement = 0


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
    moveAllAliens()
  }
  createGrid()

  // let alienArray = cells.slice(13,20)

  let alienArray = [13, 14, 15, 16, 17, 18, 19]
  
  function createAliens () {
    alienArray.forEach(alien => {
      cells[alienStartingPosition + alien].classList.add(alienClass)
    })
  }
  createAliens()

  function removeAliens () {
    alienArray.forEach(alien => {
      cells[alienStartingPosition + alien].classList.remove(alienClass)
    })
  }


/*ADDING and REMOVING SHIP*/

  addShip(shipStartingPosition)

  function addShip(position) {
    cells[position].classList.add(shipClass)
  }

  function removeShip(position) {
    cells[position].classList.remove(shipClass)
  }

  /* CONTROLS FOR THE GAME */

  function shipControls(event) {
    
    const key = event.keyCode
    removeShip(shipCurrentPosition)

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
    addShip(shipCurrentPosition)
  }



  function createLaser() {
    cells[laserPosition].classList.add('laser')
  }
  function removeLaser() {
    cells[laserPosition].classList.remove('laser')
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

    const timerId = setInterval(() => {
      removeLaser()
      if (laserMovingUp) {
        moveLaser()
      } else {
        removeLaser()
      }
      if (laserPosition < width) {
        clearInterval(timerId)
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

// moving aliens 
// boolean pushLeft (start it at true) 
// setinterval 
// write a condition, which will check if the boolean is true, if it is true, it will move left, if it is false it will move right
// variable to track our movements (add one)
// write another condition, which will check our variable, call our move down function, flip the boolean, reset our variable back 0 
// write a condition to check when you have reached cell 100 clear the interval 
// multiple checks on our movements (sideways and down)

// collision 
// checking classes of aliens and laser

  

  function moveAllAliens() {
    let pushLeft = true 
    console.log('hello')
    timerId = setInterval(() => {
      console.log('time active')
      if (pushLeft) {
        moveAliensLeft()
      } else {
        moveAliensRight()
      }
      movement++
      
      if (movement === 2) {
        moveAliensDown()
        pushLeft = !pushLeft
        movement = 0
      } 

      if (alienStartingPosition >= 99) {
        clearInterval(timerId)
      }
    
    }, 1000)
  }
  

/* COLLISION */

  // function collisionLogic() {

  //     console.log('collision active')
  //   }
  // }
  // collisionLogic()


  /*EVENT LISTENERS*/

  document.addEventListener('keyup', laserControls)
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






