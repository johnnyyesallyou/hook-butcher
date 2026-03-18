// src/objects/Enemy.js
import Phaser from 'phaser';

export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = Phaser.Math.Between(100, 200);
        this.enemy = scene.physics.add.sprite(x, y, 'enemy');
        this.enemy.setVelocityY(this.speed);
        this.enemy.setScale(0.5);
    }
}
