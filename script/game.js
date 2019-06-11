//
// game.js
// =========
// Initializes game-specific objects, constants, and functions that will be used outside of 
// rendering and game updates.
//

// Create listeners for keyboard & mouse input.
document.addEventListener("keydown", handlerKeyDown, false);
document.addEventListener("keyup", handlerKeyUp, false);
document.addEventListener("mousedown", handlerMouseDown, false);
document.addEventListener("mouseup", handlerMouseUp, false);

// Determine bounds, and dimensions, of the camera.
const bounds_x = -1;
const bounds_x2 = 1;
const bounds_y = -1;
const bounds_y2 = 1;
const bounds_w = 2;
const bounds_h = 2;

// This time will be the "score" of the game.
// Lowest time is best.
var gameplay_time = 0;

// Create instance of player.
var player = new Player(CONFIG.PLAYER_SIZE_W, CONFIG.PLAYER_SIZE_H, 0, bounds_y + CONFIG.PLAYER_SIZE_H);

// Create multiple instances of enemies.
var enemies = generate_enemies(CONFIG.ENEMY_SIZE_W, CONFIG.ENEMY_SIZE_H, CONFIG.ENEMY_NUM_ROWS, CONFIG.ENEMY_NUM_COLS, CONFIG.ENEMY_SIZE_H + CONFIG.ENEMY_VERTICAL_PADDING);

// Create an array for player and enemy bullets.
var player_bullets = [];
var enemy_bullets = [];

// Create multiple instances of particles.
var particles = generate_particles(CONFIG.PARTICLE_AMOUNT);

//
// Quit, Restart, Lose, Win
//

function game_quit() {
    alert("You have quit the game.");
    window.close();
}

function game_restart() {
    player = new Player(CONFIG.PLAYER_SIZE_W, CONFIG.PLAYER_SIZE_H, 0, bounds_y + CONFIG.PLAYER_SIZE_H);
    enemies = generate_enemies(CONFIG.ENEMY_SIZE_W, CONFIG.ENEMY_SIZE_H, CONFIG.ENEMY_NUM_ROWS, CONFIG.ENEMY_NUM_COLS, CONFIG.ENEMY_SIZE_H + CONFIG.ENEMY_VERTICAL_PADDING);
    player_bullets = [];
    enemy_bullets = [];
    gameplay_time = 0;
    return;
}

function game_lose() {
    AUDIO.PLAYER_DIE.cloneNode().play();

    alert("You lose!");
    game_restart();
    
    // For some reason, keys pressed while losing
    // is still pressed after the alert is removed.
    // So, manually setting the keys to false.
    key.UP = false;
    key.DOWN = false;
    key.LEFT = false;
    key.RIGHT = false;
    key.MOUSE_1 = false;
    return;
}

function game_win() {
    alert("You win!\nYour score (lowest is best) is: " + gameplay_time);
    game_restart();
}

//
// Game Loop
//

function game_loop() {
    if (key.Q) { game_quit(); }
    if (key.R) { game_restart(); }
    game_update();
    game_render();
    gameplay_time++;
}