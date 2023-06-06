// Variables
var thrownLog;

var birds = [];
//var birds;
var birdSquishSnd;

var backgroundImg;
var backgroundMusic;

var scoreBoard = 0;

// gameplay variables
var gameSpeed = 1;
var spawnRate = 150; // lower is faster


function startGame() {
    // debug thing for no reason
    console.log("game started!");

    // Items
    thrownLog = new component(710, 80, "brown", 40, 600 - 120);
    backgroundImg = new component(800, 600, "resources/media/images/backgroundImg.jpg", 0, 0, "background");

    //start game
    gameCanvas.start();
}

var gameCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "gameCanvas";
        // Canvas Size | TODO make scale with screen size
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.context = this.canvas.getContext("2d");
        document.getElementById("gameArea").appendChild(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type, flip) {
    this.type = type;
    this.flip = flip;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }

    // Size
    this.width = width;
    this.height = height;

    // Position
    this.x = x;
    this.y = y;

    // Speed/Movement
    this.speedX = 0;
    this.speedY = 0;

    this.update = function() {
        ctx = gameCanvas.context;

        if (type == "image" || type == "background") {
            if (this.flip == true) {
                ctx.save();

                ctx.translate(this.x + this.width/2, this.y + this.width);
                ctx.scale(-1, 1);
                ctx.translate(-(this.x + this.width/2), -(this.y + this.width/2));

                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

                ctx.restore();

            } else {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

            }

            if (type == "background") {
                ctx.drawImage(this.image, this.x, this.y + -this.height, this.width, this.height);
     
            }

        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }

    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if ((this.y) >= (gameCanvas.canvas.height)) {
                //this.y = -this.height / 2;
                this.y = 0;
            }
        }
    }

    this.crashWith = function(otherobj) {
        // Player object?
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);

        // Any other item?
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);

        var crash = true;

        if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
            crash = false;

        }
        return crash;

    }
}

var playerMovment = {
    up : () => {
        thrownLog.speedY -= 1;
    },
    down : () => {
        thrownLog.speedY += 1;
    },
    left : () => {
        thrownLog.speedX -= 1;
    },
    right : () => {
        thrownLog.speedX += 1;
    },
    stop : () => {
        thrownLog.speedX = 0;
        thrownLog.speedY = 0;
    }
}


function birdSpawner(n) {
    /*
    dont forget to make the bird explode or
    delete bird from array after "birdsplosion"

    Birds either explode or get vaporized. maybe both if i can do it right.

    TODO:
        - bird hit log - done
        - bird explode
        - bird guts passes log
        - bird despawns off screen - done

    */

    // n is the number of birds to spawn

    for (i = 0; i <= n; i++) {

        // Random height size
        minHeight = 50;
        maxHeight = 60;
        height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);

        // Random width size
        minWidth = 45;
        maxWidth = 65;
        width = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);

        // random horizontal placement
        minH = 10;
        maxH = 750;
        posH = Math.floor(Math.random() * (maxH - minH) + minH);

        // random bird sprite
        birdImgList = ["resources/media/images/bird1.png", "resources/media/images/bird2.png", "resources/media/images/bird3.png", "resources/media/images/bird4.png", "resources/media/images/bird5.png"];
        birdMin = 0;
        birdMax = birdImgList.length;
        birdImg = birdImgList[(Math.floor(Math.random() * (birdMax - birdMin) + birdMin))];


        //birds.push(new component(height, width, colorPicker, posH, (0 - height)));
        birds.push(new component(height, width, birdImg, posH, (0 - height), "image", false));
        //birds.push(new component(48, 48, birdImg, posH, (0 - height), "image", false));

        lastBird = birds[(birds.length - 1)];

        // birds always fall (log is "flying up")
        lastBird.speedY = gameSpeed;
        // since im flipping the birds now i dont need to care about changing the speed
        lastBird.speedX = -1;

        // make birds go in different directions based on where they spawned
        if (lastBird.x > 400) {
            lastBird.speedX = -1;
            lastBird.flip = false;

        } else {
            lastBird.speedX = 1;
            lastBird.flip = true;

        }

    }

}


function birdSplosion(i) {
    // get an array of source images of bird guts - probly just paint spray from MSpaint
    // set image to something else

    console.log(birds[i] + " exploded");
    birds[i].image.src = "resources/media/images/bloodSplatter.png";
    birds[i].sploded = true;

}

function updateGameArea() {
    var x, y;

    for (i = 0; i < birds.length; i += 1) {
        if (thrownLog.crashWith(birds[i])) {
            if (birds[i].died) {
                // this if statement might be useless at some point. not decided yet
                // replace bird with bird guts? - make i mspaint?
                if (birds[i].sploded != true) {
                    birdSplosion(i);

                }

            } else {
                scoreBoard += 1;
                birds[i].died = true;

            }
            
        }
    }

    gameCanvas.clear();

    // background, has to be first so elements get drawns over it
    backgroundImg.speedY = gameSpeed;
    backgroundImg.newPos();
    backgroundImg.update();

    gameCanvas.frameNo += 1;
    if (gameCanvas.frameNo == 1 || everyinterval(spawnRate)) {
        x = gameCanvas.canvas.width;
        y = gameCanvas.canvas.height;

        birdSpawner(3);

    }

    for (i = 0; i < birds.length; i += 1) {
        // if statment to make bird turn around near edge of screen?
    
        if (birds[i].y > 600) {
            // despawn birds
            birds.splice(i, 1);
    
        } else {
            if (birds[i].x + birds[i].width > 750) {
                // to far right go left now
                birds[i].speedX = -1;
                birds[i].flip = false;
    
            } else if (birds[i].x < 40) {
                // to far left go right now
                birds[i].speedX = 1;
                birds[i].flip = true;
    
            }
        }

        birds[i].speedY = gameSpeed;
    
        birds[i].newPos();
        birds[i].update();
    }

    document.getElementById("currentScore").innerText = "Score: " + scoreBoard;
    document.getElementById("birdsCount").innerText = "Birds: " + birds.length;
    document.getElementById("frameNum").innerText = "frames: " + gameCanvas.frameNo;

    //thrownLog.y -= 1;

    thrownLog.newPos();
    thrownLog.update();
}

function sound(src) {
    this.sound = document.createElement(audio);
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = none;
    document.body.appendChild(this.sound);
    this.play = () => {
        this.sound.play();
    },
    this.stop = () => {
        this.sound.pause();
    }
}

function everyinterval(n) {
    if ((gameCanvas.frameNo / n) % 1 == 0) { 
        return true;

    }
    return false;

}