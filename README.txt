CMPT 361: Assignment 1 - WebGL Space Invaders
Timothy James Montesa (301261623)
June 12, 2019

The game was made in accordance with the steps described. Some notes:
- Cosmetic additions were added, which includes a "starry background" using drawn objects and sound effects.
- The player may also move using WASD and shoot with SPACE.
- The movement of the enemies is through sudden occasional movements rather than constant uniform movements, to highlight the fact that they are aliens, and I assume aliens move weird as well.
- The bullet or projectile being spawned/shot is square, to more closely resemble a "cannonball" as described.
- The triangles are drawn using gl.DRAW_ELEMENTS with indices instead of just vertices, to reduce the amount of vertices being buffered.
- Game can be tweaked using the config.txt file (speed, number of enemies spawned, color, etc.). You may also change config through the browser console. You must restart the game before seeing any changees (by pressing R).
- The game algorithm is not very optimized at all, however it was not stated that it should be the most efficient.

Some information were taken from these sources:
- http://www.kamaron.me/webgl-tutorial/01-setup-and-triangle
- https://stackoverflow.com/questions/57854/how-can-i-close-a-browser-window-without-receiving-the-do-you-want-to-close-thi

Thanks and have fun! :-)