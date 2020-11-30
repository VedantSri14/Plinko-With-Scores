var Engine = Matter.Engine,
	World = Matter.World,
	Events = Matter.Events,
	Bodies = Matter.Bodies;

var particle;
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var turn = 0;
var count = 0;
var score = 0;
var gameState = "START";

function setup() {
	createCanvas(800, 800);
	engine = Engine.create();
	world = engine.world;
	ground = new Ground(width / 2, height, width, 20);

	for (var k = 0; k <= width; k = k + 80) {
		divisions.push(
			new Divisions(k, height - divisionHeight / 2, 10, divisionHeight)
		);
	}

	for (var j = 25; j <= width; j = j + 50) {
		plinkos.push(new Plinko(j, 75));
	}

	for (var j = 50; j <= width - 10; j = j + 50) {
		plinkos.push(new Plinko(j, 175));
	}

	for (var j = 25; j <= width; j = j + 50) {
		plinkos.push(new Plinko(j, 275));
	}

	for (var j = 50; j <= width - 10; j = j + 50) {
		plinkos.push(new Plinko(j, 375));
	}
}

function draw() {
	background("black");
	textSize(35);
	fill("cyan");
	text("Score : " + score, 20, 40);
	textSize(30);
	text("500", 15, 780);
	text("500", 95, 780);
	text("500", 175, 780);
	text("500", 255, 780);
	text("100", 335, 780);
	text("100", 415, 780);
	text("100", 495, 780);
	text("200", 575, 780);
	text("200", 655, 780);
	text("200", 735, 780);
	Engine.update(engine);

	for (var i = 0; i < plinkos.length; i++) {
		plinkos[i].display();
	}
	if (frameCount % 60 === 0) {
		particles.push(
			new Particle(random(width / 2 - 30, width / 2 + 30), 10, 10)
		);
		score++;
	}

	for (var j = 0; j < particles.length; j++) {
		particles[j].display();
	}
	for (var k = 0; k < divisions.length; k++) {
		divisions[k].display();
	}
	if (particle != null) {
		particle.display();
		if (particle.body.position.y > 760) {
			if (particle.body.position.x < 300) {
				score = score + 500;
				particle = null;
				if (count >= 5) {
					gameState = "END";
				}
			}
		} else if (
			particle.body.position.x < 301 &&
			particle.body.position.x > 600
		) {
			score = score + 100;
			particle = null;
			if (count >= 5) {
				gameState = "END";
			}
		} else if (
			particle.body.position.x < 601 &&
			particle.body.position.x > 900
		) {
			score = score + 200;
			particle = null;
			if (count >= 5) {
				gameState = "END";
			}
		}
	}

	//drawSprites();
}
function mousePressed() {
	if (gameState !== "END") {
		count++;
		particle = new Particle(mouseX, 10, 1, 10);
	}
}
