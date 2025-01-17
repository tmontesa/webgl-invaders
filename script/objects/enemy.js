//
// object/enemy.js
// =========
// Enemies that appear on top of the screen that players shoot at.
//

function Enemy(w, h, x, y) {
    //  Dimensions of the Enemy object.
    this.dimension = new Dimension(w, h);

    // Location of the object (from top-left).
    this.position = new Position(x, y);

    // Velocity of the object, and its speed when moving.
    this.vx = 0;
    this.vy = 0;
    this.s = random_float(CONFIG.ENEMY_SPEED_MIN, CONFIG.ENEMY_SPEED_MAX);

    // Color of the object.
    this.color = new Color(1, 0, 0);

    // A cooldown (in frames), for each movement.
    this.movement_cooldown = random_int(CONFIG.ENEMY_MOVEMENT_COOLDOWN_MIN, CONFIG.ENEMY_MOVEMENT_COOLDOWN_MAX);

    // Enemy health. Must be shot this many times to disappear.
    this.base_health = CONFIG.ENEMY_HEALTH;
    this.health = this.base_health;
    
}

function generate_enemies(w, h, rows, cols, pady) {
    var array_of_enemies = [];

    var enemy_x = 0;
    var enemy_y = 0;

    for (var r = 0; r < rows; r++) {
        array_of_enemies.push([]);
        enemy_y = bounds_y2 - (pady * r);

        for (var c = 0; c < cols; c++) {
            enemy_x = ((bounds_w/(cols+1)) * (c + 1)) - (w/2) - bounds_x2;
            array_of_enemies[r].push(new Enemy(w, h, enemy_x, enemy_y));
        }
    }

    return array_of_enemies;
}