function Camera (scene, ctx) {
    this.scene = scene;
    this.ctx = ctx;

    this.offset = new Point(0, 0);
    this.ambientColor = "#060312";

    // shadow canvas
    this.help_cvs = document.createElement("canvas");
    this.help_cvs.width = this.ctx.canvas.width;
    this.help_cvs.height = this.ctx.canvas.height;
    this.help_ctx = this.help_cvs.getContext("2d");
    this.help_ctx.globalCompositeOperation = "destination-over";
}

Camera.prototype.render = function(ctx) {
    this.offset.positionAt(this.ctx.canvas.width / 2 - player.obj.center.x, this.ctx.canvas.height / 2 - player.obj.center.y);

    this.ctx.save();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.translate(this.offset.x, this.offset.y);

    // calculate angle and radius
    dict.playerLight.active = player.flashlightActive;

    if (player.flashlightActive) {
        var focusPoint = new Point(mouse.x - this.offset.x, mouse.y - this.offset.y);
        var distanceToCursor = player.obj.center.distance_to(focusPoint.x, focusPoint.y).toFixed(2);
        player.pointTo(focusPoint.x, focusPoint.y);

        dict.playerLight.active = true;
        dict.playerLight.direction = player.direction;
        dict.playerLight.radius = restrictRange(distanceToCursor, 50, 350);
        dict.playerLight.angle = restrictRange(distanceToCursor, 100, 200) / 350;

        var rnd = Math.random();
        dict.playerLight.active = rnd > 0.02;
    }

    // render lights
    this.ctx.globalCompositeOperation = "lighter"; // lighten // lighter
    for (var i = 0; i < this.scene.lights.length; i++) {
        if (this.scene.lights[i].active) {
            this.scene.lights[i].render(this.help_ctx, this.scene.objects);
            this.ctx.drawImage(this.help_cvs, 0, 0);
        }
    }

    // render objects
    for (var i = 0; i < this.scene.objects.length; i++) {
        this.scene.objects[i].render(this.ctx);
    }

    // perform & render raycast
    player.castRay(this.scene.objects, 250);
    this.render_ray(4);
    
    // restore
    this.ctx.restore();

    // add background color
    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.fillStyle = this.ambientColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

Camera.prototype.render_ray = function(size) {
    if (player.raycast) {
        this.ctx.beginPath();
        this.ctx.arc(player.raycast.x, player.raycast.y, size, Math.PI * 2, 0, true);
        this.ctx.strokeStyle = "#777777";
        this.ctx.stroke();
        this.ctx.closePath();
    }
};
