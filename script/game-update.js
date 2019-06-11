//
// game-update.js
// =========
// Includes the necessary functions in order to calculate game-specific events.
//

function game_update_particle() {
    for (var i = 0; i < particles.length; i++) {
        particles[i].position.y -= particles[i].s;

        // If out of bounds (below camera), despawn and spawn 
        // another random particle. Keeps # of particles consistent.
        if (particles[i].position.y < bounds_y) {
            particles[i] = generate_particle();
        }
    }
}

function game_update_player_movement() {
    player.vx /= 1.60;
    player.vy /= 1.60;

    if (key.LEFT)   { player.vx = -player.s }
    if (key.RIGHT)  { player.vx =  player.s }
    if (key.DOWN)   { player.vy = -player.s }
    if (key.UP)     { player.vy =  player.s }
    
    player.position.x += player.vx;
    if (CONFIG.PLAYER_ALLOW_VERTICAL_MOVEMENT) {
        player.position.y += player.vy;
    }
}

function game_update_player_bullet_spawn() {
    // Reduce cooldown if exists.
    // Don't let player spawn bullet during this.
    if (player.bullet_cooldown > 0) {
        player.bullet_cooldown--;
        return;
    }

    // Proceed only if player has pressed the shoot button.
    if (!key.MOUSE_1 && !key.SPACE) { return; }

    // Append a new Bullet to player_bullets.
    player_bullets.push(new Bullet(
        CONFIG.PLAYER_BULLET_SIZE_W , CONFIG.PLAYER_BULLET_SIZE_H,
        player.position.x + (player.dimension.w/2) - (CONFIG.PLAYER_BULLET_SIZE_W/2),
        player.position.y,
        CONFIG.PLAYER_BULLET_COLOR_R, CONFIG.PLAYER_BULLET_COLOR_G, CONFIG.PLAYER_BULLET_COLOR_B
    ));
    AUDIO.PLAYER_SHOOT.cloneNode().play();

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
                enemies[i][e].s = random_float(CONFIG.ENEMY_SPEED_MIN, CONFIG.ENEMY_SPEED_MAX + ((2 - (enemies[i][e].position.y + 1))) / 30);

                // Set the velocity of the enemy.
                enemies[i][e].vx =  enemies[i][e].s * x_movement_direction;

                // Reinstate a (random) cooldown.
                // The farther down, the more often they move.
                enemies[i][e].movement_cooldown = random_int(CONFIG.ENEMY_MOVEMENT_COOLDOWN_MIN, CONFIG.ENEMY_MOVEMENT_COOLDOWN_MAX - ((2 - (enemies[i][e].position.y + 1)) * 140));
            }

            // Before moving the enemy, check if moving enemy will keep it in bounds.
            // If it will go out of bounds, reverse the velocity.
            if (enemies[i][e].position.x + enemies[i][e].vx < bounds_x ||
                enemies[i][e].position.x + enemies[i][e].vx + enemies[i][e].dimension.w > bounds_x2) {
                    enemies[i][e].vx = 0;
            }

            // Also check if it will collide with its neighbors.
            for (var other_enemy = 0; other_enemy < enemies[i].length; other_enemy++) {
            
                if (e == other_enemy) { continue; }
                if (collision(
                    enemies[i][e].position.x + enemies[i][e].vx, enemies[i][e].position.y, enemies[i][e].dimension.w, enemies[i][e].dimension.h,
                    enemies[i][other_enemy].position.x, enemies[i][other_enemy].position.y, enemies[i][other_enemy].dimension.w, enemies[i][other_enemy].dimension.h)) {
                    enemies[i][e].vx = 0;
                }

            }
          

            enemies[i][e].position.x += enemies[i][e].vx;
            enemies[i][e].position.y += -CONFIG.ENEMY_VERTICAL_SPEED; 

            // Check if enemy is in the bottom on the area.
            // Player loses if so!
            if (enemies[i][e].position.y - enemies[i][e].dimension.h < bounds_y) {
                game_lose();
                return;
            }

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
                        AUDIO.ENEMY_DIE.cloneNode().play();
                    } else {
                        enemies[i][e].color.r = enemies[i][e].health / enemies[i][e].base_health;  
                        AUDIO.ENEMY_HIT.cloneNode().play();
                    }

                }
            }
        }
    }
}

function game_update_enemy_bullet_spawn() {

    // Decide which row does the shooting.
    // Only the bottommost row can shoot.

    var row_shooting;
    for (var r = 0; r < enemies.length; r++) {
        if (enemies[r].length > 0) { row_shooting = r; }
    }
    if (row_shooting == null) {
        // All enemies should be wiped out now.
        game_win();
        return;
    }

    // Each enemy in that row has a chance to spawn a bullet.
    // Append that new Bullet to enemy_bullets.

    for (var e = 0; e < enemies[row_shooting].length; e++) {
        if (Math.random() <= CONFIG.ENEMY_BULLET_CHANCE) {
            enemy_bullets.push(new Bullet(
                CONFIG.ENEMY_BULLET_SIZE_W , CONFIG.ENEMY_BULLET_SIZE_H,
                enemies[row_shooting][e].position.x + (enemies[row_shooting][e].dimension.w/2) - (CONFIG.ENEMY_BULLET_SIZE_W/2),
                enemies[row_shooting][e].position.y - enemies[row_shooting][e].dimension.h,
                CONFIG.ENEMY_BULLET_COLOR_R, CONFIG.ENEMY_BULLET_COLOR_G, CONFIG.ENEMY_BULLET_COLOR_B
            ));
            AUDIO.ENEMY_SHOOT.cloneNode().play();
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
    // If player is invincible (debug), don't bother checking.
    if (player.invincible) { return; }
    
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
            game_lose();
            return;
        }
    }  
} 

//
// Main Update Function
//

function game_update() {
    game_update_particle();
    game_update_player_movement();
    game_update_player_bullet_spawn();
    game_update_player_bullet_movement();
    game_update_player_bullet_collision();
    game_update_enemy_movement();
    game_update_enemy_bullet_spawn();
    game_update_enemy_bullet_movement();
    game_update_enemy_bullet_collision();
}