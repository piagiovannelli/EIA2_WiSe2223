namespace Aufgabe9 {
    export class Snowflake extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';

            let centerX: number = this.position.x + this.size.width / 2;
            let centerY: number = this.position.y + this.size.height / 2;

            crc2.beginPath();
            crc2.arc( centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.stroke();
        }
    }
}