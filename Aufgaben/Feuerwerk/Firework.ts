namespace Feuerwerk {

    // Zusammenfassung von Parametern für den Konstruktor von Firework
    export interface FireworkConfig {
        color: string;
        numberOfParticles: number;
        flightDuration: number;
        positionX: number;
        speed: number;
    }

    export class Firework {
        particles: Particle[];
        createdParticles: boolean;
        private particleConfig: ParticleConfig;
        
        private counter: number; // Anzahl der vergangenen Frames seit erschaffung,
        private crc2: CanvasRenderingContext2D;
        
        private color: string;
        private flightDuration: number;
        private numberOfParticles: number;
        
        private position: Vector;
        private speed: number;
        

        // Kriegt seine eigene FireworkConfig übergeben, und die ParticleConfig für die Partikel, welche bei der Explosion erschaffen werden
        constructor(config: FireworkConfig, particleConfig: ParticleConfig) {
            this.counter = 0;
            let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
            this.crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

            this.color = config.color;
            this.flightDuration = config.flightDuration;
            this.numberOfParticles = config.numberOfParticles;
            this.position = new Vector(config.positionX, 0);
            this.speed = config.speed;

            this.particleConfig = particleConfig;
            this.createdParticles = false;
            this.particles = [];

            // Falls die Farbe schwarz ist, wird eine zufällige Farbe gewählt
            if (this.color == "#000000") {
                this.color = "#" + Math.floor(Math.random() * 8000000 + 8000000).toString(16);
            }
        }

        draw(): void {
            // malt den Flug, falls die flightDuration noch nicht überschritten wurde, malt ansonsten die Explosion
            // falls die Rakete sich dem oberen Rand des bildschirms bis auf 100 pixel nähert explodiert sie so oder so
            if (this.counter < this.flightDuration && this.position.y < this.crc2.canvas.height - 100) {
                this.drawFlight();
            } else {
                this.drawExplosion();
            }
        }

        update(): void {
            // Selbe if bedingung wie in draw
            if (this.counter < this.flightDuration && this.position.y < this.crc2.canvas.height - 100) {
                this.position.y += this.speed;
            } else {
                this.updateParticles();
            }

            this.counter++;
        }

        private drawFlight(): void {
            // malt eine gerade linie
            this.crc2.beginPath();
            this.crc2.moveTo(this.position.x, this.crc2.canvas.height - this.position.y - 5);
            this.crc2.lineTo(this.position.x, this.crc2.canvas.height - this.position.y + 5);
            this.crc2.lineWidth = 2;
            this.crc2.strokeStyle = this.color;
            this.crc2.stroke();
        }

        private drawExplosion(): void {
            for (let particle of this.particles) {
                particle.draw();
            }
        }

        private updateParticles(): void {
            // Falls die Partikel noch nicht erschaffen wurden, werden Partikel erschaffen
            if (!this.createdParticles) {
                for (let i: number = 0; i < this.numberOfParticles; i++) {
                    // gibt dem neuen Partikel eine zufällige Richtung
                    // abhängig von "Ausbreitung der Partikel"
                    let startVelocity: Vector = new Vector(Math.random() * this.particleConfig.width - this.particleConfig.width / 2, Math.random() * 35 - 10); 

                    // Fügt das neue Partikel ins Partikel array hinzu.
                    // Es wird die Position der Rakete ans Partikel übergeben
                    this.particles.push( new Particle(this.particleConfig, this.position.copy(), startVelocity));
                }
                this.createdParticles = true;
                return;
            }

            // Updated alle Partikel
            for (let i: number = this.particles.length - 1; i >= 0; i--) {
                // Löscht tote Partikel
                if (!this.particles[i].alive) {
                    this.particles.splice(i, 1);
                    continue;
                }
                this.particles[i].update();
            }
        }
    }
    
}