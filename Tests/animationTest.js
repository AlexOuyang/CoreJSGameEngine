var colorPalette = {
    black: 'black',
    green_darker: '#20777f',
    green_dark: '#609a97',
    green_light: '#a3c4a9',
    purple_dark: '#544a53',
    pants: '#3e1f05',
    cloth: '#3c2e12',
    skin: '#e0b85f',
    skin_shadow: '#ca9b47',
    hair: '#6d4510',
    hair_shadow: '#553209',
    hat: '#584c2d',
    hat_shadow: '#3c2e12',
    ground_bottom: '#212a29',
    ground_top: '#616566'
}

var width = 1200;
var height = 600;

var canvas = document.createElement("canvas");
canvas.id = "background";
canvas.style.backgroundColor = 'black';
document.body.appendChild(canvas);
var context = canvas.getContext('2d');
canvas.height = height;
canvas.width = width;




/*********************
	START THE GAME
*********************/

function init() {
    loop();
}

window.onload = function () {
    console.log("All elements are loaded!");
    init();
}


/*********************
	Testing
*********************/

function gameObject(x, y, width, height, dir) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dir = dir; // 1 to the right, -1 to the left
    this.collider = null;
    this.flip = function () {
        dir *= -1;
    }
}

gameObject.prototype.addAnimator = function (animations) {
    this.animator = new Animator(animations);
}


gameObject.prototype.addCollider = function (collider) {
    this.collider = collider;
}

gameObject.prototype.draw = function (ctx) {
    if (this.animator !== undefined) {
        if (Input.getKeyDown(KeyCode.W)) {
            this.animator.setCondition(player.animator.getCondition('jump'), true);
        } else if (Input.getKeyDown(KeyCode.A)) {
            this.dir = -1;
            player.animator.setCondition(player.animator.getCondition('run'), true);
            this.animator.setCondition(player.animator.getCondition('jump'), false);
        } else if (Input.getKeyDown(KeyCode.D)) {
            this.dir = 1;
            player.animator.setCondition(player.animator.getCondition('run'), true);
            this.animator.setCondition(player.animator.getCondition('jump'), false);
        } else {
            player.animator.setCondition(player.animator.getCondition('run'), false);
            player.animator.setCondition(player.animator.getCondition('jump'), false);
        }

        this.animator.playAnimation(ctx, this.x, this.y, this.width, this.height, this.dir * 1, 1);
    }
}

gameObject.prototype.drawCollider = function (ctx) {
    ctx.strokeStyle = 'white';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
}

function collider() {

}






var player = new gameObject(0, 0, 50, 50, 1); // Create player

var playerAnimations = [];

// Idle animation
var playerIdleSpriteSheet = new Image(); // Prepare new image for sprite sheet
playerIdleSpriteSheet.src = '../sprites/idle.png';

// Create sprite sheet
var idleFrames = [];
for (var i = 0; i < 10; i++) {
    idleFrames['idle_' + i] = new Sprite(playerIdleSpriteSheet, i * 22, 0, 22, 22);
}
// Prepare animation frame sequence
var playerIdleSequence = ['idle_0', 'idle_1', 'idle_2', 'idle_3', 'idle_4', 'idle_5', 'idle_6', 'idle_7', 'idle_8', 'idle_9'];
//player.addAnimationClip('idle', new Animation(idleFrames, playerIdleSequence, 6));
playerAnimations['idleAnimation'] = new Animation(idleFrames, playerIdleSequence, 6);

// Run animation
var playerRunSpriteSheet = new Image();
playerRunSpriteSheet.src = '../sprites/run.png';

var runFrames = [];
for (var i = 0; i < 8; i++) {
    runFrames['run_' + i] = new Sprite(playerRunSpriteSheet, i * 22, 0, 22, 22);
}
var playerRunSequence = ['run_0', 'run_1', 'run_2', 'run_3', 'run_4', 'run_5', 'run_6', 'run_7'];
//player.addAnimationClip('run', new Animation(runFrames, playerRunSequence, 12));
playerAnimations['runAnimation'] = new Animation(runFrames, playerRunSequence, 12);

// Jump Animation
var playerJumpAnimation = new Image();
playerJumpAnimation.src = '../sprites/jump.png';

var jumpFrames = [];
for (var i = 0; i < 6; i++) {
    jumpFrames['jump_' + i] = new Sprite(playerJumpAnimation, i * 22, 0, 22, 22);
}
var playerJumpSequence = ['jump_0', 'jump_1', 'jump_2', 'jump_3', 'jump_4', 'jump_5'];
//player.addAnimationClip('jump', new Animation(jumpFrames, playerJumpSequence, 6));
playerAnimations['jumpAnimation'] = new Animation(jumpFrames, playerJumpSequence, 6);

// Set up animation states
player.addAnimator(playerAnimations);
player.animator.addCondition('run');
player.animator.addCondition('jump');
player.animator.setAsInitialState(player.animator.getAnimationState('idleAnimation'));
// if run = true: idle -> run
player.animator.makeTransition(
    player.animator.getAnimationState('idleAnimation'),
    player.animator.getAnimationState('runAnimation'),
    player.animator.getCondition('run'),
    true
);
// if run = false: run -> idle
player.animator.makeTransition(
    player.animator.getAnimationState('runAnimation'),
    player.animator.getAnimationState('idleAnimation'),

    player.animator.getCondition('run'),
    false
);
// if jump = true: idle -> jump
player.animator.makeTransition(
    player.animator.getAnimationState('idleAnimation'),
    player.animator.getAnimationState('jumpAnimation'),
    player.animator.getCondition('jump'),
    true
); // if jump = false: jump -> idle
player.animator.makeTransition(
    player.animator.getAnimationState('jumpAnimation'),
    player.animator.getAnimationState('idleAnimation'),
    player.animator.getCondition('jump'),
    false
); // if jump = true: run -> jump
player.animator.makeTransition(
    player.animator.getAnimationState('runAnimation'),
    player.animator.getAnimationState('jumpAnimation'),
    player.animator.getCondition('jump'),
    true
); // if jump = false: jump -> run
player.animator.makeTransition(
    player.animator.getAnimationState('jumpAnimation'),
    player.animator.getAnimationState('runAnimation'),
    player.animator.getCondition('jump'),
    false
);

//player.animator.setCondition(player.animator.getCondition('run'), true); 
//player.animator.setCondition(player.animator.getCondition('run'), false); 
//player.animator.setCondition(player.animator.getCondition('jump'), true); 



//update things
function update() {

    player.draw(context);
    player.drawCollider(context);
}