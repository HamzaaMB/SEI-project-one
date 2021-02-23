function init() {
  

  const grid = document.querySelector('.grid')
  const width = 11
  const height = 10
  const cellCount = width * height
  const cells = []

  const shipClass = 'ship'
  let shipStartingPosition = 104
  let shipCurrentPosition = 104
  
  const alienClass = 'alien'
  let alienStartingPosition = 0


  const laserClass = 'laser'
  let laserPosition 


/* CREATING GRID and ALIENS */

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createGrid()

  let alienArray = []
  alienArray = cells.slice(12,21)

  function createAliens () {
    alienArray.forEach(alien => {
      return alien.classList.add(alienClass)
    
    })
  }
  createAliens()
  
  function removeAliens () {
    alienArray.forEach(alien => {
      return alien.classList.remove(alienClass)
    })
  }


  let laserArray = []
  laserArray = cells.slice(99,110)

  // function createLaser() {
  //   laserArray.forEach(laser => {
  //     return laser.classList.toggle(laserClass)
  //   })
  // }
  // console.log(laserArray)

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



  function laserControls(event) {
    laserPosition = shipCurrentPosition - width
    const key = event.keyCode
    const timerId = setInterval(() => {
      if (key === 32) {
        console.log('laser moving')
        moveLaser()
      } else {
        clearInterval(timerId)
      }
    }, 200)
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

  }

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









  // let laserArray = []
  // laserArray = cells.slice(99,110)
  // function shootLaser() {
  //   laserArray.forEach(laser => {
  //     return Number(laser.innerText) - width
  //   })
  // }
  // shootLaser()

 // function laserControls(event) {
  //   const key = event.keyCode
  //   let laserCurrentPosition = shipCurrentPosition
  //   if (key === 32) {
  //     for (let i = 1; i <= height - 2; i++) {
  //       const timerId = setInterval(() => {
  //         cells[laserCurrentPosition - width * i].classList.add(laserClass)
  //         console.log('going up')
  //         clearInterval(timerId)
  //       }, 300 * i)
  //     }
  //   } else {
  //     console.log('not working')
  //   }
  // }


  // FOR LOOP FOR LASER MOVEMENT
// const laserMove = shipCurrentPosition - width
// For (let i = 1; i <= height - 1; i++) {
  // console.log(i)
  // cells[laserMove * i].classList.add(laserClass)m