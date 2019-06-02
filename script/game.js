// Create listeners for keyboard input.
document.addEventListener("keydown", handlerKeyDown, false);
document.addEventListener("keyup", handlerKeyUp, false);

// Determine bounds, and dimensions, of the camera.
const bounds_x = -1;
const bounds_x2 = 1;
const bounds_y = -1;
const bounds_y2 = 1;
const bounds_w = 2;
const bounds_h = 2;

// Create instance of player.
var player = new Player(0.1, 0.1, 0, 0);

// Create multiple instances of enemies.
var enemies = generate_enemies(0.1, 0.1, 2, 8, 0.2);


//
// Game Loop
//

function game_loop() {
    game_update();
    game_render();
}