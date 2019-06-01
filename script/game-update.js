function game_update_player() {
    player.vx /= 1.60;
    player.vy /= 1.60;

    if (key.LEFT)   { player.vx = -player.s }
    if (key.RIGHT)  { player.vx =  player.s }
    if (key.DOWN)   { player.vy = -player.s }
    if (key.UP)     { player.vy =  player.s }
    
    player.position.x += player.vx;
    player.position.y += player.vy;
}

//
// Main Update Function
//

function game_update() {
    game_update_player();
}