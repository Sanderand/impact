var mouse = {x: 0, y: 0};

var keyDown = false;
var keyUp = false;
var keyLeft = false;
var keyRight = false;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

function onKeyDown(e){
	if (e.keyCode == 87) keyW = true;
	if (e.keyCode == 65) keyA = true;
	if (e.keyCode == 83) keyS = true;
	if (e.keyCode == 68) keyD = true;
}

function onKeyReleased(e) {
	if (e.keyCode == 87) keyW = false;
	if (e.keyCode == 65) keyA = false;
	if (e.keyCode == 83) keyS = false;
	if (e.keyCode == 68) keyD = false;
}

function onMouseMove(e) {
	mouse.x = e.clientX - canvas.offsetLeft;
	mouse.y = e.clientY - canvas.offsetTop;
}

function onMouseDown(e) {
	if (e.button === 0) {
		// leftclick
	} else if (e.button == 2) {
		// rightclick
		player.toggleFlashlight();
	}
}