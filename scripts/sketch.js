// I am the animator!

let bgimage;
let doco;
let dots = [];
let dotSpeed = 7;
let dotSize = 7;
let distance = 300;
let angle = 1.5;
let percentualLeadChange = 1;
let spawnMultiple = true;
let lineToClosest = false;
let steeringLines = false;
let framerate = 30;
let imageCocos = [];
let titleStartPoint;
let animations = [];
let animationsIndex = 0;

// performance parameters
p5.disableFriendlyErrors = true;

function setup() {
    // screen setup
    createCanvas(windowWidth, windowHeight);
    frameRate(framerate);

    doco = new DotContainer();

    let idleTime = 1500;
    let imageTime = 2000;
    let snakeTime = 10000;

    // setup animation sequences
    animations = [
        new Spawner(document.querySelector('#star'), 6, doco),
        new Idle(doco, imageTime, false),
        new Idle(doco, idleTime),
        new ImageMagicAnimator(document.querySelector('#janick'), 4, doco, new LayoutOptions(createVector(0, windowHeight * 0.3), true)),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime * 3),
        new ImageMagicAnimator(document.querySelector('#prog'), 3, doco, new LayoutOptions(createVector(0, windowHeight * 0.4), true)),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime),
        new ImageMagicAnimator(document.querySelector('#achi'), 5, doco, new LayoutOptions(createVector(windowWidth * 0.05, windowHeight * 0.4))),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime),
        new ImageMagicAnimator(document.querySelector('#skater'), 4, doco, new LayoutOptions(createVector(windowWidth * 0.25, windowHeight * 0.2))),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime),
        new SnakeAnimator(doco, snakeTime, 5),
        new ImageMagicAnimator(document.querySelector('#gaming'), 4, doco, new LayoutOptions(createVector(windowWidth * 0.5, windowHeight * 0.2))),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime),
        new SnakeAnimator(doco, snakeTime, 5),
        new ImageMagicAnimator(document.querySelector('#minion'), 4, doco, new LayoutOptions(createVector(windowWidth * 0.5, windowHeight * 0.3))),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime),
        new ImageMagicAnimator(document.querySelector('#tnj'), 5, doco, new LayoutOptions(createVector(windowWidth * 0.2, windowHeight * 0.3))),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime),
        new ImageMagicAnimator(document.querySelector('#swiss'), 2, doco, new LayoutOptions(createVector(0, windowHeight * 0.2), true)),
        new Idle(doco, imageTime, false),
        new CleanupAnimator(doco),
        new Idle(doco, idleTime),
        new SnakeAnimator(doco, snakeTime, 5),
        new Idle(doco)
    ]
    animations[animationsIndex].setup();
}

function draw() {
    background(0, 0, 0, 15);
    for (dot of doco.dots) {
        dot.update();
        doco.selectLeader(dot);
        dot.draw();
        doco.checkEdges(dot);
    }

    if (animations[animationsIndex].finished) {
        animationsIndex++;
        animations[animationsIndex].setup();
    }
    animations[animationsIndex].draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
