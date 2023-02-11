var Feuerwerk;
(function (Feuerwerk) {
    class Firework {
        particles;
        createdParticles;
        particleConfig;
        counter; // Anzahl der vergangenen Frames seit erschaffung,
        crc2;
        color;
        numberOfParticles;
        position;
        speed;
        // Kriegt seine eigene FireworkConfig übergeben, und die ParticleConfig für die Partikel, welche bei der Explosion erschaffen werden
        // Mit constructor werden Instanzen geschaffen
        constructor(config, particleConfig) {
            let canvas = document.querySelector("canvas");
            this.crc2 = canvas.getContext("2d");
            // Die Eigenschaften werden der Klasse zugewiesen/ / Sind Verpackung salopp gesagt auf denen Eigenschaften des Feuerwerks bzw. der Partikel stehen
            this.color = config.color;
            this.numberOfParticles = config.numberOfParticles;
            this.position = new Feuerwerk.Vector(config.positionX, config.positionY);
            this.speed = config.speed;
            this.particleConfig = particleConfig;
            this.createdParticles = false;
            this.particles = [];
            // Falls die Farbe schwarz ist, wird eine zufällige Farbe gewählt
            if (this.color == "#000000") {
                this.color = "#fff";
            }
        }
        draw() {
            // Alle Partikel aus dem Partikel Array werden einmal gezeichnet
            for (let particle of this.particles) {
                particle.draw();
            }
        }
        update() {
            // Selbe if bedingung wie in draw
            if (!this.createdParticles) {
                for (let i = 0; i < this.numberOfParticles; i++) {
                    // gibt dem neuen Partikel eine zufällige Richtung
                    // abhängig von "Ausbreitung der Partikel"
                    let startVelocity = new Feuerwerk.Vector(Math.random() * this.particleConfig.width - this.particleConfig.width / 2, Math.random() * 35 - 10);
                    // Fügt das neue Partikel ins Partikel array hinzu.
                    // Es wird die Position der Rakete ans Partikel übergeben
                    this.particles.push(new Feuerwerk.Particle(this.particleConfig, this.position.copy(), startVelocity));
                }
                this.createdParticles = true;
                return;
            }
            // Updated alle Partikel
            for (let i = this.particles.length - 1; i >= 0; i--) {
                // Löscht tote Partikel
                if (!this.particles[i].alive) {
                    this.particles.splice(i, 1);
                    continue;
                }
                this.particles[i].update();
            }
        }
    }
    Feuerwerk.Firework = Firework;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Firework.js.map