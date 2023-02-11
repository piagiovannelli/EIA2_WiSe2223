var Feuerwerk;
(function (Feuerwerk) {
    class Particle {
        alive;
        lifetime = 20;
        position;
        velocity;
        crc2;
        color;
        // Quasi das gewicht, bestimmt wie stark die Partikel nach unten gezogen werden. Sollte immer negativ sein.
        downForce;
        size;
        constructor(config, position, startVelocity) {
            this.position = position;
            this.velocity = startVelocity;
            this.color = config.color;
            this.size = config.size;
            this.alive = true;
            // Falls die Farbe schwarz ist, wird die Farbe zufällig gewählt
            if (this.color == "#000000") {
                this.color = "#" + Math.floor(Math.random() * 8000000 + 8000000).toString(16);
            }
            // speichert den canvas zur einfacheren benutzung
            let canvas = document.querySelector("canvas");
            this.crc2 = canvas.getContext("2d");
        }
        update() {
            this.position.add(this.velocity);
            this.lifetime -= 1;
            if (this.lifetime <= 0)
                this.alive = false; // Wenn das Partikel eine bestimme geschwindigkeit nach unten erreicht hat, wird es gelöscht
        }
        draw() {
            if (!this.alive)
                return;
            // malt einen Kreis
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