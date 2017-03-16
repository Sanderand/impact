function Scene () {
    this.objects = [];
    this.lights = [];
}

Scene.prototype.createObjects = function() {
    var data = new Polygon([new Point(20, 20), new Point(140, 20)]);
    this.objects.push(data);

    data = new Polygon([new Point(20, 20), new Point(20, 140)]);
    this.objects.push(data);

    data = new Polygon([new Point(20, 140), new Point(140, 140)]);
    this.objects.push(data);

    data = new Polygon([new Point(160, 100), new Point(140, 140), new Point(140, 100)]);
    this.objects.push(data);

    data = new Polygon([new Point(160, 60), new Point(140, 60), new Point(140, 20)]);
    this.objects.push(data);

    data = new Polygon([new Point(200, 200),new Point(250, 200),new Point(250, 250),new Point(200, 250)]);
    this.objects.push(data);

    data = new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]);
    data.positionAt(400, 100);
    this.objects.push(data);

    data = new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]);
    data.positionAt(450, 100);
    this.objects.push(data);

    data = new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]);
    data.positionAt(450, 150);
    this.objects.push(data);

    data = new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]);
    data.positionAt(400, 150);
    this.objects.push(data);

    data = new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]);
    data.positionAt(400, 200);
    this.objects.push(data);

    data = new Polygon([new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)]);
    data.positionAt(450, 200);
    this.objects.push(data);

    dict.player = new Polygon([new Point(0, -7), new Point(7, 0), new Point(0, 7), new Point(-7, 0)]);
    dict.player.positionAt(75, 75);
    this.objects.push(dict.player);

    dict.enemy1 = new Polygon([new Point(-7, 0), new Point(7, 0), new Point(0, 10)]);
    dict.enemy1.positionAt(75, 75);
    this.objects.push(dict.enemy1);
};

Scene.prototype.createLights = function() {
    dict.playerLight = new Light(150, 150, 90, "#888844", true, 'spot');
    this.lights.push(dict.playerLight);

    // dict.siren1 = new Light(450, 100, 170, "#2072f9", true, 'spot');
    // dict.siren1.angle = Math.PI / 6;
    // dict.siren1.direction = Math.PI;
    // this.lights.push(dict.siren1);

    // dict.siren2 = new Light(450, 100, 170, "#f95220", true, 'spot');
    // dict.siren2.angle = Math.PI / 6;
    // dict.siren2.direction = Math.PI * 2;
    // this.lights.push(dict.siren2);

    this.lights.push(new Light(300, 150, 500, "#440000", true));
    this.lights.push(new Light(100, 100, 200, "#224400", true));
    this.lights.push(new Light(500, 400, 400, "#0088ff", true));
};