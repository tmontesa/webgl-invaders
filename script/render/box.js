// Each rendered object will contain a position,
// dimension, and color object. These will then
// be converted into a vertex for the VBO.

function Position(x, y) {
    this.x = x;
    this.y = y;
}

function Dimension(w, h) {
    this.w = w;
    this.h = h;
}

function Color(r, g, b) {
    this.r = r;
    this.b = b;
    this.g = g;
}

function get_box_vertices(p, d, c) {
    return [
        p.x,        p.y - d.h,  c.r, c.g, c.b,
        p.x,        p.y,        c.r, c.g, c.b,
        p.x + d.w,  p.y,        c.r, c.g, c.b,
        p.x + d.w,  p.y - d.h,  c.r, c.g, c.b,
    ];
}

// Each box has 4 vertices, and for each box,
// 6 indices will be called (2 triangles).

const box_vertices_length = 4;
function get_box_indices(offset) {
    // 1 2
    // 0 3
    return [
        0 + offset, 1 + offset, 2 + offset,
        0 + offset, 2 + offset, 3 + offset
    ];
}

