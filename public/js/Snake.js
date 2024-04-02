export default class Snake {
    constructor(scene) {
        //.add - adds objects to the scene
        this.scene = scene;
        this.lastMoveTime = 0;
        this.moveInterval = 400; //time is in milliseconds
        this.tileSize = 16;
        this.direction = Phaser.Math.Vector2.RIGHT; //direction of the snake image
        this.body = [];
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xff0000).setOrigin(0));
        //5 iterations are needed to be able to eat your own tail
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xffffff).setOrigin(0));
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xffffff).setOrigin(0));
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xffffff).setOrigin(0));
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xffffff).setOrigin(0));
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xffffff).setOrigin(0));
        //Add the apple to the scene
        this.apple = this.scene.add.rectangle(0, 0, this.tileSize, this.tileSize, 0x00ff00).setOrigin(0);

        //1 - Method to randomly pop up the apple in different places
        this.positionApple();

        //assigns key for control from keyboard
        scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        });
    }

    //2 - Method to randomly pop up the apple in different places
    //make it a multiple of 16 to fit in the grid size
    positionApple() {
        this.apple.x = Math.floor((Math.random() * this.scene.game.config.width) / this.tileSize) * this.tileSize;
        this.apple.y = Math.floor((Math.random() * this.scene.game.config.height) / this.tileSize) * this.tileSize;
    }

    //indicates keys pressed based on key number
    //direction changes based on the key
    keydown(event) {
        console.log(event);
        switch (event.keyCode) {
            case 37: //left
                if (this.direction !== Phaser.Math.Vector2.RIGHT)
                    this.direction = Phaser.Math.Vector2.LEFT;
                break;
            case 38: //up
                if (this.direction !== Phaser.Math.Vector2.DOWN)
                    this.direction = Phaser.Math.Vector2.UP;
                break;
            case 39: //right
                if (this.direction !== Phaser.Math.Vector2.LEFT)
                    this.direction = Phaser.Math.Vector2.RIGHT;
                break;
            case 40: //down
                if (this.direction !== Phaser.Math.Vector2.UP)
                    this.direction = Phaser.Math.Vector2.DOWN;
                break;
        }
    }

    update(time) {
        //call the move method
        if (time >= this.lastMoveTime + this.moveInterval) {
            this.lastMoveTime = time;
            this.move();
        }
    }
    move() {
        //includes body of the tail now
        //3rd segment included to add to the body
        //use a for-loop to semi-automate the function

        //finding where the head of the snake is
        let x = this.body[0].x + this.direction.x * this.tileSize;
        let y = this.body[0].y + this.direction.y * this.tileSize;

        //scenario when apple gets eaten by the snakes head
        //increase the body
        //reposition the apple
        if (this.apple.x === x && this.apple.y === y) {
            this.body.push(this.scene.add.rectangle(0, 0, this.tileSize, this.tileSize, 0xffffff).setOrigin(0));
            this.positionApple();
        }

        for (let index = this.body.length - 1; index > 0; index--) {
            this.body[index].x = this.body[index - 1].x;
            this.body[index].y = this.body[index - 1].y;
        }
        this.body[0].x = x;
        this.body[0].y = y;

        //snake dies if it moves outside of tileSize
        if (
            this.body[0].x < 0 ||
            this.body[0].x >= this.scene.game.config.width ||
            this.body[0].y < 0 ||
            this.body[0].y >= this.scene.game.config.height
        ) {
            //resets game if snake dies
            this.scene.scene.restart();
        }
        //snake dies when it eats its own tail
        //add segments to make it easy to eat your own tail
        let tail = this.body.slice(1);
        if (tail.filter(s => s.x === this.body[0].x && s.y === this.body[0].y).length > 0) {
            this.scene.scene.restart();
        }
    }
}