function Polygon (points, fillcolor, stokecolor) {
    this.points = points;
    this.center = new Point(0, 0);
    this.fillcolor = fillcolor || '#555555';
    this.strokecolor = stokecolor || '#252525';
    this.updateCenter();
}

Polygon.prototype.render = function(ctx, fill, stroke) {
    // polygon path
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.closePath();

    // fill
    ctx.fillStyle = this.fillcolor || fill;
    ctx.fill();

    // stroke
    ctx.strokeStyle = this.strokecolor || stroke;
    ctx.stroke();
};

Polygon.prototype.updateCenter = function() {
    // zurücksetzen
    this.center.positionAt(0, 0);

    // alle Punkte durchlaufen
    for (var i = 0; i < this.points.length; i++) {
        this.center.add(this.points[i].x, this.points[i].y);
    }

    // mitteln
    this.center.multiply(1 / this.points.length);
};

Polygon.prototype.positionAt = function(x, y) {
    // vector zwischen (x,y) und zentrum berechnen
    var vx = x - this.center.x;
    var vy = y - this.center.y;

    // alle punkte um diesen vector verschieben
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].add(vx, vy);
    }
    
    // Zentrum neu berechnen
    this.center.add(vx, vy);
};

Polygon.prototype.move = function(x, y) {
    // alle punkte um diesen vector verschieben
    for (var i=0; i<this.points.length; i++) {
        this.points[i].add(x, y);
    }

    // Zentrum neu berechnen
    this.center.add(x, y);
};

Polygon.prototype.getMaxDistanceToPoint = function(point) {
    var maxDistance = 0;

    for (var i = 0; i < this.points.length; i++) {
        var distance = this.points[i].distance_to(point.x, point.y);

        if (distance >= maxDistance) {
            maxDistance = distance;
        }
    }

    return maxDistance;
};

Polygon.prototype.getMinDistanceToPoint = function(point) {
    var minDistance = 10000;

    for (var i = 0; i < this.points.length; i++) {
        var distance = this.points[i].distance_to(point.x, point.y);

        if (distance <= minDistance) {
            minDistance = distance;
        }
    }

    return minDistance;
};