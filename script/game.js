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
var player = new Player(0.1, 0.1, 0, 0);

// Create multiple instances of enemies.
var enemies = generate_enemies(0.1, 0.1, 2, 4, 0.15);

// Create an array for player and enemy bullets.
var player_bullets = [];
var enemy_bullets = [];

// Create multiple instances of particles.
var particles = generate_particles(32);

//
// Quit, Restart, Lose, Win
//

function game_quit() {
    alert("You have quit the game.");
    window.close();
}

function game_restart() {
    player = new Player(0.1, 0.1, 0, 0);
    enemies = generate_enemies(0.1, 0.1, 4, 8, 0.15);
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