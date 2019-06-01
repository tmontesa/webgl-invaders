var vertex_offset = 0;

function game_render_player() {
    vertices = vertices.concat(
        get_box_vertices(player.position, player.dimension, player.color)
    );

    indices = indices.concat(
        get_box_indices(vertex_offset)
    );

    vertex_offset += box_vertices_length;
}

//
// Main Render Function
//

function game_render() {
    vertex_offset = 0;
    vertices = [];
    indices = [];

    game_render_player();

    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}