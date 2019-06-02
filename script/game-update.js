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

function game_update_player_bullet_spawn() {
    // Reduce cooldown if exists.
    // Don't let player spawn bullet during this.
    if (player.bullet_cooldown > 0) {
        player.bullet_cooldown--;
        return;
    }

    // Proceed only if player has pressed the shoot button.
    if (!key.SPACE) { return; }

    // Append a new Bullet to player_bullets.
    player_bullets.push(new Bullet(
        0.025 , 0.025,
        player.position.x + (player.dimension.w/2) - (0.025/2),
        player.position.y,
        1, 0.8, 0
    ));

    // Reinstate cooldown.
    player.bullet_cooldown = player.base_bullet_cooldown;
}

function game_update_player_bullet_movement() {
    // Move each bullet by bullet.s, upward for player.
    for (var i = 0; i < player_bullets.length; i++) {
        player_bullets[i].position.y += player_bullets[i].s;
    }
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

function game_update_player_bullet_collision() {
    for (var b = 0; b < player_bullets.length; b++) { 
        // Remove bullets offscreen (above the camera).
        if (player_bullets[b].position.y + player_bullets[b].dimension.h > bounds_y2) {
            player_bullets.splice(b, 1);
            continue;
        }

        // Check for collision with any enemies.
        // Remove bullet if so.
        // If hit, reduce its health, and color.
        // If health is 0, remove enemy from array.
        for (var i = 0; i < enemies.length; i++) {
            if (player_bullets[b] == null) { continue; }
            for (var e = 0; e < enemies[i].length; e++) {
                if (player_bullets[b] == null) { continue; }
                if (collision(
                    player_bullets[b].position.x, player_bullets[b].position.y,
                    player_bullets[b].dimension.w, player_bullets[b].dimension.h,
                    enemies[i][e].position.x, enemies[i][e].position.y,
                    enemies[i][e].dimension.w, enemies[i][e].dimension.h
                )) {
                    player_bullets.splice(b, 1);
                    enemies[i][e].health--;
                    if (enemies[i][e].health <= 0) {
                        enemies[i].splice(e, 1);
                    } else {
                        enemies[i][e].color.r = enemies[i][e].health / enemies[i][e].base_health;  
                    }

                }
            }
        }
    }
}

function game_update_enemy_bullet_spawn() {
    // Decide which row does the shooting.
    // Only the bottommost row can shoot.
    var row_shooting = -1;
    for (var r = 0; r < enemies.length; r++) {
        if (enemies[r].length > 0) { row_shooting = r; }
    }

    // Each enemy in that row has a chance to spawn a bullet.
    // Append that new Bullet to enemy_bullets.

    for (var e = 0; e < enemies[row_shooting].length; e++) {
        if (Math.random() <= 0.0075) {
            enemy_bullets.push(new Bullet(
                0.025 , 0.025,
                enemies[row_shooting][e].position.x + (enemies[row_shooting][e].dimension.w/2) - (0.025/2),
                enemies[row_shooting][e].position.y - enemies[row_shooting][e].dimension.h,
                0.6, 0, 0.2
            ));
        }
    }
}

function game_update_enemy_bullet_movement() {
    // Move each bullet by bullet.s, downward for enemy.
    for (var i = 0; i < enemy_bullets.length; i++) {
        enemy_bullets[i].position.y -= enemy_bullets[i].s;
    }
}

function game_update_enemy_bullet_collision() {
    for (var b = 0; b < enemy_bullets.length; b++) { 
        // Remove bullets offscreen (above the camera).
        if (enemy_bullets[b].position.y < bounds_y) {
            enemy_bullets.splice(b, 1);
            continue;
        }

        // Check for collision with player.
        // Set game over if so.
        if (collision(
            enemy_bullets[b].position.x, enemy_bullets[b].position.y,
            enemy_bullets[b].dimension.w, enemy_bullets[b].dimension.h,
            player.position.x, player.position.y,
            player.dimension.w, player.dimension.h
        )) {
            console.log("You lose!");
        }
    }  
} 

//
// Main Update Function
//

function game_update() {
    game_update_player_movement();
    game_update_player_bullet_spawn();
    game_update_player_bullet_movement();
    game_update_player_bullet_collision();
    game_update_enemy_movement();
    game_update_enemy_bullet_spawn();
    game_update_enemy_bullet_movement();
    game_update_enemy_bullet_collision();
}