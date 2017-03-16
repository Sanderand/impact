function intersectLines(ax, ay, bx, by, cx, cy, dx, dy) {
	// calculate the direction vectors
	bx -= ax;
	by -= ay;
	dx -= cx;
	dy -= cy;

	// are they parallel?
	var denominator = by * dx - bx * dy;
	if (denominator === 0) return false;

	// calculate point of intersection
	var r = (dy * (ax - cx) - dx * (ay - cy)) / denominator;
	var s = (by * (ax - cx) - bx * (ay - cy)) / denominator;

	// return
	if ((s >= 0) && (s <= 1) && (r >= 0) && (r <= 1)) {
		return {x: (ax + r * bx), y: (ay + r * by)};
	} else {
		return false;
   }
}

function lineFacingPoint(p1, p2, point) {
	var lineV = {x: (p2.x - p1.x), y: (p2.y - p1.y)};
	var pointV = {x: (p1.x - point.x), y: (p1.y - point.y)};

	// dotproduct less than zero / greater zero
	return ((lineV.x * pointV.y) - (lineV.y * pointV.x) > 0);
}

function distanceLinePoint(p1, p2, point) {
	return (Math.abs((p2.x - p1.x) * (p1.y - point.y) - (p1.x - point.x) * (p2.y - p1.y)) / Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)));
}

function restrictRange (value, min, max) {
    if (value > max) value = max;
    if (value < min) value = min;
	return value;
}