// Variables
var player;
var thrownLog;
var birds = [];
var backgroundImg;
var backgroundSnd;
var birdSquishSnd;

function startGame() {
    console.log("game started!");
}


var gameArea = {

    // Get the Canvas
    canvas : document.getElementById("gameCanvas"),

    start : () => {
        // Set Resolution
        /* TODO
            - Make this variable to change to the viewers screen
        */
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.context = this.canvas.getCanvas("2d");

    },

    clear : () => {

    },

    stop : () => {

    }

}

function component(width, height, color, x, y, type) {
    this.type = this;
    if (this == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;

    }

    // Size
    this.width;
    this.height;

    // Position
    this.x = x;
    this.y = y;

    // Movement
    this.speedX = 0;
    this.speedY = 0;

    // Gravity
    this.gravity = 0.05
    this.gravitySpeed = 0;

    // Bounce - proby wont use
    this.bounce = 0.6;

    this.update = () => {
        ctx.gameArea.context;

        if (this.type == "text") {
            // ScoreBoard
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image" || type == "background") {
            // backgrounds and Image
            ctx.drawImage(this.image, this.x + this.y, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.Rect(this.x, this.y, this.width, this.height);
        }

    }

}