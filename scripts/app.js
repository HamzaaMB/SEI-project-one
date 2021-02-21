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
      console.log('left', shipCurrentPosition)
    } else if (key === 38) {
      console.log('invalid key', shipCurrentPosition)
    } else if (key === 39 && shipCurrentPosition % width !== width - 1 ) {
      shipCurrentPosition++
      console.log('right', shipCurrentPosition)
    } else if (key === 40 && shipCurrentPosition + width <= width * height - 1) {
      shipCurrentPosition += width
      console.log('down',shipCurrentPosition)
    } else {
      console.log('invalid key')
    }
    addShip(shipCurrentPosition)
  }

  function alienControls() {
    console.log('alien alive')
  }

  /*EVENT LISTENERS*/

  document.addEventListener('keydown', shipControls)
}
window.addEventListener('DOMContentLoaded', init)