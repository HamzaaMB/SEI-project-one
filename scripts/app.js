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
  let alienStartingPosition = 16

  const laserClass = 'laser'
  


/* CREATING GRID */

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createGrid()

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

  function alienControls() {
    // console.log('alien alive')
    cells[alienStartingPosition].classList.add(alienClass)
  }
  alienControls()


  function laserControls(event) {
    const key = event.keyCode
    if (key === 32) {
      for (let i = 1; i <= height - 2; i++) {
        cells[shipCurrentPosition - width * i].classList.add(laserClass)
      }
      for (let i = 0 ; i <= height - 3; i++) {
        cells[shipCurrentPosition - width * i].classList.remove(laserClass)
      }
    }

  }


  /*EVENT LISTENERS*/

  document.addEventListener('keyup', laserControls)
  document.addEventListener('keydown', shipControls)

  // FOR LOOP FOR LASER MOVEMENT
// const laserMove = shipCurrentPosition - width
// For (let i = 1; i <= height - 1; i++) {
  // console.log(i)
  // cells[laserMove * i].classList.add(laserClass)
}


window.addEventListener('DOMContentLoaded', init)

