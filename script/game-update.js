function game_update_player_movement() {
    player.vx /= 1.60;
    player.vy /= 1.60;

    if (key.LEFT)   { player.vx = -player.s }
    if (key.RIGHT)  { player.vx =  player.s }
    if (key.DOWN)   { player.vy = -player.s }
    if (key.UP)     { player.vy =  player.s }
    
    player.position.x += player.vx;
    player.position.y += player.vy;
}

function game_update_enemy_movement() {
    var x_movement_direction = 0;

    for (var i = 0; i < enemies.length; i++) {
        for (var e = 0; e < enemies[i].length; e++) {
            will_collide = false;

            // For each enemy, it may only move if its cooldown
            // is depleted.
            if (enemies[i][e].movement_cooldown > 0) {
                enemies[i][e].movement_cooldown--;

            // If cooldown is depleted, make enemy move towards a direction.
            } else {
                // Choose a random direction in the x axis for the enemy to move.
                var x_movement_direction = (Math.random() > 0.5) ? 1 : -1;

                // Choose a random velocity for the enemy.
                // The farther down, the faster they move.
                enemies[i][e].s = random_float(0.005, 0.01 + ((2 - (enemies[i][e].position.y + 1))) / 30);

                // Set the velocity of the enemy.
                enemies[i][e].vx =  enemies[i][e].s * x_movement_direction;

                // Reinstate a (random) cooldown.
                // The farther down, the more often they move.
                enemies[i][e].movement_cooldown = random_int(10, 250 - ((2 - (enemies[i][e].position.y + 1)) * 140));
            }

            // Before moving the enemy, check if moving enemy will keep it in bounds.
            // In other words, if it collides with an object spanning the entire area.
            // If it will go out of bounds, reverse the velocity.
            if (!collision(
                bounds_x, bounds_y, 
                bounds_w, bounds_h,
                enemies[i][e].position.x + enemies[i][e].vx, enemies[i][e].position.y, 
                enemies[i][e].dimension.w, enemies[i][e].dimension.h)) {
                    enemies[i][e].vx *= -1;
            }

            enemies[i][e].position.x += enemies[i][e].vx;
            enemies[i][e].position.y += -0.0005; 

            enemies[i][e].vx /= 1.20;
        }
    }
}

//
// Main Update Function
//

function game_update() {
    game_update_player_movement();
    game_update_enemy_movement();
}