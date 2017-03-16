function Player(x, y, acceleration, maxspeed, name) {
    this.acceleration = acceleration || 1;
    this.name = name || "noname";

    this.speed = { x: 0, y: 0 };
    this.acceleration = acceleration || 1;
    this.maxspeed = maxspeed || 1.30;
    this.slope = 0.7,

    this.obj = dict.player;
    this.obj.positionAt(x, y);

    this.direction = 0;
    this.flashlightActive = true;

    this.collision_radius = 7;
    this.raycast;
}

Player.prototype.toggleFlashlight = function () {
    this.flashlightActive = !this.flashlightActive;
};

Player.prototype.move = function (scene) {
    // handle key input
    if (keyW && (-this.speed.y < this.maxspeed))
        this.speed.y -= this.acceleration;

    if (keyS && (this.speed.y < this.maxspeed))
        this.speed.y += this.acceleration;
    
    if (keyA && (-this.speed.x < this.maxspeed))
        this.speed.x -= this.acceleration;
    
    if (keyD && (this.speed.x < this.maxspeed))
        this.speed.x += this.acceleration;

    // cap speed
    this.speed.x = restrictRange(this.speed.x, -this.maxspeed, this.maxspeed);
    this.speed.y = restrictRange(this.speed.y, -this.maxspeed, this.maxspeed);

    // slow down
    if (!keyA && !keyD)
        this.speed.x *= this.slope;
    if (!keyW && !keyS)
        this.speed.y *= this.slope;
    
    // slow down if going diagonally
    // todo
    
    // move
    this.obj.move(this.speed.x * epsilon, this.speed.y * epsilon);

    // check collisions
    respond_to_collisions(this.obj, scene.objects, this.collision_radius);
};

Player.prototype.positionAt = function (x, y) {
    this.obj.positionAt(x, y);
};

Player.prototype.pointTo = function (x, y) {
    var deltaX = x - this.obj.center.x;
    var deltaY = y - this.obj.center.y;

    var tmp = Math.atan2(deltaY, deltaX);
    if (tmp < 0)
        tmp += 2 * Math.PI;

    this.direction = tmp;
};

Player.prototype.castRay = function (objects, distance) {
    this.raycast = get_raycast(this.obj.center, Math.cos(this.direction), Math.sin(this.direction), objects, distance);
};