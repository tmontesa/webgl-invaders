function Player(w, h, x, y) {
    //  Dimensions of the player object.
    this.dimension = new Dimension(w, h);

    // Location of the object (from top-left).
    this.position = new Position(x, y);

    // Velocity of the object, and its speed when moving.
    this.vx = 0;
    this.vy = 0;
    this.s = 0.025;

    // Color of the object.
    this.color = new Color(1, 0.6, 0.2);

}