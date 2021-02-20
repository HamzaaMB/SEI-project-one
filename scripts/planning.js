/* SPACE INVADERS PLANNING.

1. Load one image of spaceship and one of alien in css. 
---for adding/removing spaceship on grid when moving left/right
---create objects for spaceship and aliens?


2. Creating grid through javascript and getting the main keys to work up,down,left,right (spacebar too but will need it later)
---test movemement
---requires space for ship movement for bottom grid
---top 4 grid rows for aliens


3.Testing the keys, set up boundaries for spaceship not to fall out of bounds
---match it with example given.


4. After spaceship can move left to right, implement spacebar for laser.
---create arrays? for column so laser can move freely, maybe if statements till it reaches the end of the array's length?
---multidimensional array, arrays can be declared as array[2][0] (src: stackoverflow) - requires more research.


5. Spawn alien/get it to delete after being shot with laser
---add image and remove image loop in path of laser? as grids go up by time +=10 condition?
---.pop array meht
---splice() to remove aliens once shot?


6. Spawn rows of aliens and implement movement as well as being shot with laser
---start with aliens filled at the top of the grid, once SHOT, remove element with splice() and move array left and right, if statement? till no items left in array


7. Implement points for every alien destroyed.
---grids with aliens present, assign value=100 in html?


8. Create logic to add points and display
---revisit points accumulation on 


9. Game starts again after ending, (while) loop?

10. Design - CSS
