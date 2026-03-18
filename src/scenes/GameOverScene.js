// src/scenes/GameOverScene.js
import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.score = data.score;
        this.highScore = data.highScore;
    }

    create() {
        // Фон
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000).setOrigin(0);
        
        // Заголовок
        this.add.text(this.game.config.width / 2, 150, 'Игра окончена', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Счет
        this.add.text(this.game.config.width / 2, 250, `Счет: ${this.score}`, {
            fontSize: '36px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Рекорд
        this.add.text(this.game.config.width / 2, 300, `Рекорд: ${this.highScore}`, {
            fontSize: '36px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Кнопка повторить
        const restartButton = this.add.text(this.game.config.width / 2, 400, 'Играть снова', {
            fontSize: '36px',
            fill: '#00ff00',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: {
                left: 30,
                right: 30,
                top: 15,
                bottom: 15
            }
        }).setOrigin(0.5).setInteractive();
        
        restartButton.on('pointerover', () => {
            restartButton.setFill('#00ff00');
        });
        
        restartButton.on('pointerout', () => {
            restartButton.setFill('#00ff00');
        });
        
        restartButton.on('pointerdown', () => {
            this.scene.start('Game');
        });
        
        // Кнопка меню
        const menuButton = this.add.text(this.game.config.width / 2, 500, 'В главное меню', {
            fontSize: '36px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: {
                left: 30,
                right: 30,
                top: 15,
                bottom: 15
            }
        }).setOrigin(0.5).setInteractive();
        
        menuButton.on('pointerover', () => {
            menuButton.setFill('#ff0000');
        });
        
        menuButton.on('pointerout', () => {
            menuButton.setFill('#ff0000');
        });
        
        menuButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
