// src/scenes/MainMenuScene.js
import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Фон
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000).setOrigin(0);
        
        // Логотип
        const logo = this.add.image(this.game.config.width / 2, 150, 'logo');
        logo.setScale(0.5);
        
        // Заголовок
        this.add.text(this.game.config.width / 2, 250, 'Космический Шутер', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Кнопка играть
        const playButton = this.add.text(this.game.config.width / 2, 350, 'Играть', {
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

        playButton.on('pointerover', () => {
            playButton.setFill('#00ff00');
        });

        playButton.on('pointerout', () => {
            playButton.setFill('#00ff00');
        });

        playButton.on('pointerdown', () => {
            this.scene.start('Game');
        });

        // Кнопка выхода
        const exitButton = this.add.text(this.game.config.width / 2, 450, 'Выход', {
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

        exitButton.on('pointerover', () => {
            exitButton.setFill('#ff0000');
        });

        exitButton.on('pointerout', () => {
            exitButton.setFill('#ff0000');
        });

        exitButton.on('pointerdown', () => {
            window.close();
        });

        // Анимация
        this.tweens.add({
            targets: [playButton, exitButton],
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: 'Power2'
        });
    }
}
