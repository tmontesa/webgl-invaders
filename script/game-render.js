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

function game_render_enemies() {
    for (var i = 0; i < enemies.length; i++) {
        for (var e = 0; e < enemies[i].length; e++) {

            vertices = vertices.concat(
                get_box_vertices(enemies[i][e].position, enemies[i][e].dimension, enemies[i][e].color)
            );

            indices = indices.concat(
                get_box_indices(vertex_offset)
            );

            vertex_offset += box_vertices_length;
        }
    }
}

function game_render_player_bullets() {
    for (var i = 0; i < player_bullets.length; i++) {
        vertices = vertices.concat(
            get_box_vertices(player_bullets[i].position, player_bullets[i].dimension, player_bullets[i].color)
        );
    
        indices = indices.concat(
            get_box_indices(vertex_offset)
        );
    
        vertex_offset += box_vertices_length;
    }
}

function game_render_enemy_bullets() {
    for (var i = 0; i < enemy_bullets.length; i++) {
        vertices = vertices.concat(
            get_box_vertices(enemy_bullets[i].position, enemy_bullets[i].dimension, enemy_bullets[i].color)
        );
    
        indices = indices.concat(
            get_box_indices(vertex_offset)
        );
    
        vertex_offset += box_vertices_length;
    }
}

//
// Main Render Function
//

function game_render() {
    vertex_offset = 0;
    vertices = [];
    indices = [];

    game_render_player();
    game_render_enemies();
    game_render_player_bullets();
    game_render_enemy_bullets();

    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}