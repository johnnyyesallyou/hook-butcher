// src/scenes/PreloaderScene.js
import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // Панель загрузки
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Загрузка...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // События загрузки
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText('Загрузка ресурса: ' + file.key);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.scene.start('MainMenu');
        });

        // Загрузка ресурсов
        this.load.image('player', 'src/assets/images/player.png');
        this.load.image('enemy', 'src/assets/images/enemy.png');
        this.load.image('bullet', 'src/assets/images/bullet.png');
        this.load.image('background', 'src/assets/images/background.png');
        this.load.image('logo', 'src/assets/images/logo.png');
        this.load.audio('shoot', 'src/assets/sounds/shoot.mp3');
        this.load.audio('explosion', 'src/assets/sounds/explosion.mp3');
        this.load.audio('music', 'src/assets/sounds/music.mp3');
    }
}
