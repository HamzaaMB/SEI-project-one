function init() {
  
  console.log('content loaded')

  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []


  const ship = document.querySelector('.ship')


//grid

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
      console.log('CELL>>', cell)
    }

  }

  createGrid()


}
window.addEventListener('DOMContentLoaded', init)