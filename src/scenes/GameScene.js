// src/scenes/GameScene.js
import Phaser from 'phaser';
import Player from '../objects/Player.js';
import Enemy from '../objects/Enemy.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore') || '0');
        this.player = null;
        this.enemies = null;
        this.bullets = null;
        this.cursors = null;
        this.spaceKey = null;
        this.scoreText = null;
        this.gameOver = false;
    }

    create() {
        // Создание игрока
        this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 100);
        
        // Группы объектов
        this.enemies = this.physics.add.group();
        this.bullets = this.physics.add.group();
        
        // Управление
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Счет
        this.scoreText = this.add.text(16, 16, 'Счет: 0', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        
        // Фон
        this.add.image(0, 0, 'background').setOrigin(0);
        
        // Таймер для создания врагов
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        
        // Физика
        this.physics.add.collider(this.bullets, this.enemies, this.collisionHandler, null, this);
        this.physics.add.collider(this.player, this.enemies, this.gameOverHandler, null, this);
    }

    update() {
        if (this.gameOver) return;
        
        // Управление игроком
        this.player.update(this.cursors);
        
        // Стрельба
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.player.shoot(this.bullets);
        }
        
        // Обновление врагов
        this.enemies.children.iterate((child) => {
            if (child.y > this.game.config.height) {
                child.destroy();
            }
        });
        
        // Обновление пуль
        this.bullets.children.iterate((child) => {
            if (child.y < 0) {
                child.destroy();
            }
        });
    }

    spawnEnemy() {
        if (this.gameOver) return;
        
        const x = Phaser.Math.Between(50, this.game.config.width - 50);
        const enemy = new Enemy(this, x, 0);
        this.enemies.add(enemy);
    }

    collisionHandler(bullet, enemy) {
        bullet.destroy();
        enemy.destroy();
        this.score += 10;
        this.scoreText.setText('Счет: ' + this.score);
        
        // Создание эффекта взрыва
        const explosion = this.add.particles('explosion').createEmitter({
            x: enemy.x,
            y: enemy.y,
            speed: { min: -100, max: 100 },
            quantity: 20,
            lifespan: 500,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });
        
        explosion.explode();
    }

    gameOverHandler(player, enemy) {
        this.gameOver = true;
        player.destroy();
        enemy.destroy();
        
        // Остановка врагов
        this.enemies.children.iterate((child) => {
            child.destroy();
        });
        
        // Сохранение рекорда
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
        }
        
        // Показать экран окончания игры
        setTimeout(() => {
            this.scene.start('GameOver', { score: this.score, highScore: this.highScore });
        }, 1000);
    }
}
