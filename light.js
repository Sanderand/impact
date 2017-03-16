var OMNI_LIGHT = 'omni';
var SPOT_LIGHT = 'spot';

function Light(x, y, radius, color, castShadows, type) {
    this.position = new Point(x, y);
    this.color = color || "#ffffff";
    this.radius = radius || 25;
    this.castShadows = castShadows;
    this.type = type || OMNI_LIGHT;

    this.direction = 0;
    this.angle = 30;
    this.active = true;
}

Light.prototype.render = function (ctx, objects) {
    ctx.clearRect(0, 0,  ctx.canvas.width, ctx.canvas.height);
    this.renderShadows(ctx, objects);

    var grd = ctx.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.radius);
    grd.addColorStop(0, this.color);
    grd.addColorStop(1, "#000000");

    switch (this.type) {
        case SPOT_LIGHT:
            ctx.moveTo(this.position.x, this.position.y);
            ctx.arc(this.position.x, this.position.y, this.radius, (this.direction - this.angle), (this.direction + this.angle), false);

            ctx.fillStyle = grd;
            ctx.fill();
            ctx.closePath();
            break;

        default: 
            ctx.beginPath();
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.closePath();
            break;
    }
};

Light.prototype.renderShadows = function(ctx, objects) {
    if (this.castShadows) {
        for (var i = 0; i < objects.length; i++) {
            this.renderObjectShadow(ctx, this.position, objects[i]);
        }
        this.renderObjectShadow(ctx, this.position, player.obj);
    }
};

Light.prototype.renderObjectShadow = function(ctx, lightPosition, obj) {
    // only render shadows for objects that might be affected by light
    if (obj.getMinDistanceToPoint(this.position) > this.radius) {
        return;
    }
    
    // render shadows for all lines of the object
    for (var i = 0; i < obj.points.length - 1; i++) {
        this.renderLineShadow(ctx, obj.points[i], obj.points[i + 1], lightPosition);
    }

    // abschlusslinie ziehen
    this.renderLineShadow(ctx, obj.points[obj.points.length - 1], obj.points[0], lightPosition);
};

Light.prototype.renderLineShadow = function(ctx, p1, p2, lightPosition) {
    if (lineFacingPoint(p1, p2, lightPosition)) {
        // get vector from light to p1/p2
        var p1v = new Point(p1.x - lightPosition.x, p1.y - lightPosition.y);
        var p2v = new Point(p2.x - lightPosition.x, p2.y - lightPosition.y);

        // normalize vectors
        p1v.normalize();
        p2v.normalize();

        // multiply with shadow length
        p1v.multiply(10000);
        p2v.multiply(10000);

        // calculate shadow position
        p1v.add(p1.x, p1.y);
        p2v.add(p2.x, p2.y);

        // render shadow
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p1v.x, p1v.y);
        ctx.lineTo(p2v.x, p2v.y);
        ctx.lineTo(p2.x, p2.y);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
};