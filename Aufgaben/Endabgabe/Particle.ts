namespace Feuerwerk {

    // Zusammenfassung von Parametern für den Konstruktor von Particle
    export interface ParticleConfig {
        color: string;
        size: number;
        width: number;
    }

    export class Particle {
        alive: boolean;
        lifetime: number = 20;
        position: Vector;
        velocity: Vector;
        crc2: CanvasRenderingContext2D;
        color: string;

        // Quasi das gewicht, bestimmt wie stark die Partikel nach unten gezogen werden. Sollte immer negativ sein.
        downForce: number;
        size: number;


        constructor(config: ParticleConfig, position: Vector, startVelocity: Vector) {
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
            let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
            this.crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        }

        update(): void {
            this.position.add(this.velocity);
            this.lifetime -= 1;
            if (this.lifetime <= 0) this.alive = false; // Wenn das Partikel eine bestimme geschwindigkeit nach unten erreicht hat, wird es gelöscht
        }

        draw(): void {
            if (!this.alive) return;

            // malt einen Kreis von den einzelnen partikel bzw von einem einzigen partikel
            this.crc2.beginPath();
            this.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
            this.crc2.fillStyle = "#fffff";
            this.crc2.fill();
            this.crc2.lineWidth = 1;
            this.crc2.strokeStyle = this.color;
            this.crc2.stroke();
        }
    }
}