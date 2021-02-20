function init() {
  

  const grid = document.querySelector('.grid')
  const width = 11
  const height = 10
  const cellCount = width * height
  const cells = []

  const shipClass = 'ship'
  let shipStartingPosition = 104
  let shipCurrentPosition = 104
  


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

/*ADDING SHIP*/

  addShip(shipStartingPosition)

  function addShip(position) {
    cells[position].classList.add(shipClass)
  }

  function removeShip(position) {
    cells[position].classList.remove(shipClass)
  }

  function controls(event) {
    const key = event.keyCode

    removeShip(shipCurrentPosition)
    if (key === 37) {
      shipCurrentPosition--
      console.log('left', shipCurrentPosition)
    } else if (key === 38) {
      shipCurrentPosition -= width
      console.log('up', shipCurrentPosition)
    } else if (key === 39) {
      shipCurrentPosition++
      console.log('right', shipCurrentPosition)
    } else if (key === 40) {
      shipCurrentPosition += width
      console.log('down',shipCurrentPosition)
    } else {
      console.log('invalid key')
    }
    addShip(shipCurrentPosition)
  }


  document.addEventListener('keyup', controls)
}
window.addEventListener('DOMContentLoaded', init)