namespace Feuerwerk {

    // Zusammenfassung von Parametern für den Konstruktor von Particle
    export interface ParticleConfig {
        color: string;
        downForce: number;
        size: number;
        width: number;
    }

    export class Particle {
        alive: boolean;
        
        private position: Vector;
        private velocity: Vector;
        private acceleration: Vector;
        private crc2: CanvasRenderingContext2D;
        private color: string;

        // Quasi das gewicht, bestimmt wie stark die Partikel nach unten gezogen werden. Sollte immer negativ sein.
        private downForce: number;
        private size: number;


        constructor(config: ParticleConfig, position: Vector, startVelocity: Vector) {
            this.position = position;
            this.velocity = startVelocity;
            this.acceleration = new Vector(0, 0);
            this.color = config.color;
            this.size = config.size;
            this.alive = true;

            // Falls die Farbe schwarz ist, wird die Farbe zufällig gewählt
            if (this.color == "#000000") {
                this.color = "#" + Math.floor(Math.random() * 8000000 + 8000000).toString(16);
            }

            // Stellt sicher, dass die Downforce immer negativ ist
            this.downForce = config.downForce;
            if (this.downForce > -0.1) this.downForce = -0.1;

            // speichert den canvas zur einfacheren benutzung
            let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
            this.crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        }

        update(): void {
            this.acceleration.set(0, this.downForce); // fungiert als eine art gravitation
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.set(0, 0); // resetet die acceleration wieder jedes mal

            if (this.velocity.y <= -20) this.alive = false; // Wenn das Partikel eine bestimme geschwindigkeit nach unten erreicht hat, wird es gelöscht
        }

        draw(): void {
            if (!this.alive) return;

            // malt einen Kreis
            this.crc2.beginPath();
            this.crc2.arc(this.position.x, this.crc2.canvas.height - this.position.y, this.size, 0, 2 * Math.PI, false);
            this.crc2.fillStyle = this.color;
            this.crc2.fill();
            this.crc2.lineWidth = 1;
            this.crc2.strokeStyle = this.color;
            this.crc2.stroke();
        }
    }
}