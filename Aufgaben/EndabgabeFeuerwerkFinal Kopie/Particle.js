var Feuerwerk;
(function (Feuerwerk) {
    class Particle {
        alive;
        lifetime = 20;
        position;
        velocity;
        crc2;
        color;
        size;
        constructor(config, position, startVelocity) {
            this.position = position;
            this.velocity = startVelocity;
            this.color = config.color;
            this.size = config.size;
            this.alive = true;
            if (this.color == "#000000") {
                this.color = "#" + Math.floor(Math.random() * 8000000 + 8000000).toString(16);
            }
            let canvas = document.querySelector("canvas");
            this.crc2 = canvas.getContext("2d");
        }
        update() {
            this.position.add(this.velocity);
            this.lifetime -= 1;
            if (this.lifetime <= 0)
                this.alive = false;
        }
        draw() {
            if (!this.alive)
                return;
            this.crc2.beginPath();
            this.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
            this.crc2.fillStyle = "#fffff";
            this.crc2.fill();
            this.crc2.lineWidth = 1;
            this.crc2.strokeStyle = this.color;
            this.crc2.stroke();
        }
    }
    Feuerwerk.Particle = Particle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Particle.js.map