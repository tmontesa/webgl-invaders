function Bullet(w, h, x, y, r, g, b) {
    //  Dimensions of the bullet object.
    this.dimension = new Dimension(w, h);

    // Location of the object (from top-left).
    this.position = new Position(x, y);

    // Speed of the bullet.
    this.s = 0.01;

    // Color of the object.
    this.color = new Color(r, g, b);
}