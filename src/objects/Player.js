// src/objects/Player.js
import Phaser from 'phaser';

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.player = scene.physics.add.sprite(x, y, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.5);
    }

    update(cursors) {
        if (cursors.left.isDown) {
            this.player.x -= this.speed;
        } else if (cursors.right.isDown) {
            this.player.x += this.speed;
        }
    }

    shoot(bullets) {
        const bullet = bullets.create(this.player.x, this.player.y - 20, 'bullet');
        bullet.setVelocityY(-400);
        bullet.setScale(0.5);
    }
}
