// variables
var last, epsilon;
var fps = 30;

// objects
var canvas, ctx;
var player, scene, camera;
var dict = {};

// include js files
include(["point.js", "math.js", "light.js", "polygon.js", "player.js", 'scene.js', "camera.js", "input.js", "collision.js"]);

function include(files) {
    // loads all files
    for (var i = 0; i < files.length; i++) {
        document.write("<script type='text/javascript' src='" + files[i] + "'></script>");
    }
}

function init() {
    init_canvas();
    init_scene();
    init_player();
    init_camera();
    init_event_listeners();

    last = Date.now();
    setInterval(loop, (1000 / fps));
}

function init_canvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    rescaleCanvas();
}

function init_event_listeners() {
    canvas.addEventListener("mousemove", onMouseMove, false);
    canvas.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener("keyup", onKeyReleased, true);
    window.addEventListener('resize', rescaleCanvas);
}

function init_player() {
    player = new Player(200, 75, 1, 1.70, "andre");
}

function init_scene() {
    scene = new Scene();
    scene.createObjects();
    scene.createLights();
}
function init_camera() {
    camera = new Camera(scene, ctx);
}

function loop() {
    var current = Date.now();
    epsilon = (current - last) / 20;

    player.move(scene);
    update_enemies();
    update_lights();
    camera.render(ctx);
    update_gui();

    last = current;
}

var evx = 0;
var evy = 0;

function update_enemies() {
    evx += Math.random() - 0.5;
    evy += Math.random() - 0.5;
    evx = restrictRange(evx, -2, 2);
    evy = restrictRange(evy, -2, 2);

    dict.enemy1.move(evx, evy);
    respond_to_collisions(dict.enemy1, scene.objects, 10);
}

function update_lights() {
    dict.playerLight.position.x = player.obj.center.x || 0;
    dict.playerLight.position.y = player.obj.center.y || 0;

    // dict.siren1.direction += 0.2;
    // dict.siren2.direction += 0.2;
}

function update_gui() {
    ctx.globalCompositeOperation = "source-over";
    render_cursor(2);
}

function render_cursor(size) {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, size * 1.75, Math.PI * 2, 0, true);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, size, Math.PI * 2, 0, true);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

function rescaleCanvas() {
    canvas.height = window.innerHeight;
    canvas.style.height = window.innerHeight + 'px';
    
    canvas.width = window.innerWidth;
    canvas.style.width = window.innerWidth + 'px';
}