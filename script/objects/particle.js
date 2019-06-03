function Particle(w, h, x, y) {
    //  Dimensions of the bullet object.
    this.dimension = new Dimension(w, h);

    // Location of the object (from top-left).
    this.position = new Position(x, y);

    // Speed of the bullet.
    this.s = random_float(0.01, 0.1);

    // Color of the object.
    var color_val = random_float(0.3, 1.0)
    this.color = new Color(color_val, color_val, color_val);
}

function generate_particles(num) {
    var p = [];
    var dim;
    for (var i = 0; i < num; i++) {
        dim = random_float(0.001, 0.01);
        p.push(new Particle(dim, dim,
            random_float(bounds_x, bounds_x2),
            random_float(bounds_y, bounds_y2)
        ));
    }
    return p;
}

function generate_particle() {
    var dim = random_float(0.001, 0.01);
    return new Particle(dim, dim, random_float(bounds_x, bounds_x2), bounds_y2);
}