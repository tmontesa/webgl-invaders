function random_float(min, max) {
    return min + (Math.random() * (max - min));
}

function random_int(min, max) {
    return Math.floor(min + (Math.random() * (max - min)));
}

function contain_number(n, min, max) {
    if (n < min) { return min; }
    if (n > max) { return max; }
    return n;
}

function collision(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw &&
            ax + aw > bx &&
            ay < by + bh &&
            ah + ay > by;
}