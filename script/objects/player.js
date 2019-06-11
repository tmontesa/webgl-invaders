//
// object/enemies.js
// =========
// The player object that the player can move and spawn projectiles from.
//


function Player(w, h, x, y) {
    //  Dimensions of the player object.
    this.dimension = new Dimension(w, h);

    // Location of the object (from top-left).
    this.position = new Position(x, y);

    // Velocity of the object, and its speed when moving.
    this.vx = 0;
    this.vy = 0;
    this.s = CONFIG.PLAYER_SPEED;

    // Color of the object.
    this.color = new Color(CONFIG.PLAYER_COLOR_R, CONFIG.PLAYER_COLOR_G, CONFIG.PLAYER_COLOR_B);

    // Bullet spawn cooldown (in frames).
    // Player may only shoot every n frames.
    this.bullet_cooldown = 0;
    this.base_bullet_cooldown = CONFIG.PLAYER_BULLET_COOLDOWN;

    // Invincibility for debug.
    this.invincible = CONFIG.PLAYER_INVINCIBLE;
}