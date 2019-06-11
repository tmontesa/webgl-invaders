//
// object/bullet.js
// =========
// A bullet object for both player and enemy to spawn/shoot.
//

function Bullet(w, h, x, y, r, g, b) {
    //  Dimensions of the bullet object.
    this.dimension = new Dimension(w, h);

    // Location of the object (from top-left).
    this.position = new Position(x, y);

    // Speed of the bullet.
    this.s = CONFIG.BULLET_SPEED;

    // Color of the object.
    this.color = new Color(r, g, b);
}