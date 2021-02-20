function init() {
  

  const grid = document.querySelector('.grid')
  const width = 11
  const height = 10
  const cellCount = width * height
  const cells = []

  let shipStartingPosition = 104
  let shipCurrentPosition = 0
  const shipClass = 'ship'
  


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
    console.log('ship>>', cells[position])
    cells[position].classList.add(shipClass)
  }

  

  document.addEventListener('keyup', controls)
}
window.addEventListener('DOMContentLoaded', init)