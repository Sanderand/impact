function respond_to_collisions(polygon, objects, radius) {
	// check all edges of all objects
	for (var i = 0; i < objects.length; i++) {
		for (var j = 0; j < objects[i].points.length - 1; j++) {
			collide_with_edge(objects[i].points[j], objects[i].points[j+1], polygon, radius);
		}
		collide_with_edge(objects[i].points[objects[i].points.length-1], objects[i].points[0], polygon, radius);
	}
}

function collide_with_edge(a1, a2, polygon, radius) {
	if (lineFacingPoint(a1, a2, polygon.center)) { // not necessary but faster

		var dist = distanceLinePoint(a1, a2, polygon.center); 

		if (dist && dist < radius) {
			// normal vector of line
			var nv = new Point(-(a2.y - a1.y), (a2.x - a1.x));
			nv.normalize();

			// create second point from polygon.center with nv
			var b2 = new Point(nv.x, nv.y);
			b2.multiply(radius);
			b2.add(polygon.center.x, polygon.center.y);

			// do both lines intersect?
			var intersect = intersectLines(a1.x, a1.y, a2.x, a2.y, polygon.center.x, polygon.center.y, b2.x, b2.y);

			if (intersect.x && intersect.y) {
				// polygon.positionAt(polygon.center.x + (radius - dist) * (-nv.x), polygon.center.y + (radius - dist) * (-nv.y));
				polygon.positionAt(polygon.center.x + (radius - dist + 1.5) * (-nv.x), polygon.center.y + (radius - dist + 1.5) * (-nv.y));
				// document.getElementById("data0").innerHTML += "x";
			}
		}
	}
}


function get_raycast(b1, xv, yv, objects, distance) {
	// calculate raycasting point
	var b2 = new Point(xv, yv);
	b2.multiply(distance);
	b2.add(b1.x, b1.y);

	var ray = { x: b2.x, y: b2.y, max_d: distance, min_d: distance };

	// check all edges of all objects
	for (var i = 0; i < objects.length; i++) {
		for (var j = 0; j < objects[i].points.length - 1; j++) {
			check_ray(objects[i].points[j], objects[i].points[j+1], b1, b2, ray);
		}
		check_ray(objects[i].points[objects[i].points.length-1], objects[i].points[0], b1, b2, ray);
	}
	
	// return raycast point
	return {x: ray.x, y: ray.y};
}

function check_ray(a1, a2, b1, b2, ray) {
	if (lineFacingPoint(a1, a2, b1)) { // not necessary but faster
		// intersect two lines (a1, a2) (b1, b2)
		var intersect = intersectLines(a1.x, a1.y, a2.x, a2.y, b1.x, b1.y, b2.x, b2.y);

		// intersection?
		if (intersect.x && intersect.y) {
		    var dx = intersect.x - b1.x;
		    var dy = intersect.y - b1.y;
		    var dist = Math.sqrt(dx * dx + dy * dy);

		    if (dist < ray.min_d) {
		    	ray.min_d = dist;
		    	ray.x = intersect.x;
		    	ray.y = intersect.y;
		    }
		}
	}
}