function Point (x, y, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || "#808080";
}

Point.prototype.toString = function() {
    return "(" + Math.round(this.x) + ", " + Math.round(this.y) + ")";
};

Point.prototype.positionAt = function (x, y) {
    this.x = x;
    this.y = y;
};

Point.prototype.render = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, Math.PI*2, 0, true);
    ctx.fill();
    ctx.closePath();
};

Point.prototype.clicked = function(x, y, threshold) {
    return (this.distance_to(x, y) < threshold);
};

Point.prototype.distance_to = function(x, y) {
    var xs = this.x - x;
    var ys = this.y - y;

    return Math.sqrt(xs * xs + ys * ys);
};

Point.prototype.normalize = function() {
    // länge berechnen
    var len = Math.sqrt((this.x * this.x) + (this.y * this.y));

    // koordinaten durch länge teilen
    this.multiply(1 / len);
};

Point.prototype.multiply = function(value) {
    this.x *= value;
    this.y *= value;
};

Point.prototype.add = function(x, y) {
    this.x += x;
    this.y += y;
};

Point.prototype.toString = function () {
    return '{ x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ' }';
}