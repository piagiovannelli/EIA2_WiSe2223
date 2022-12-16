namespace Aufgabe9 {
    export class Sun extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "HSLA(60, 100%, 90%, 1)";
            crc2.strokeStyle = "HSLA(60, 100%, 60%, 0)";

            let centerX: number = this.position.x + this.size.width / 2;
            let centerY: number = this.position.y + this.size.height / 2;

            crc2.beginPath();
            crc2.arc( centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
        }
    }
}


