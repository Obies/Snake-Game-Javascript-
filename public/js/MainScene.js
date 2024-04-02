import Snake from './Snake.js'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    //creates snake image when the game starts
    create() {
        this.snake = new Snake(this);
    }

    //Called all the time during gameplay
    update(time) {
        this.snake.update(time);
    }
}