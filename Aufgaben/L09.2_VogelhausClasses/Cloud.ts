namespace Aufgabe9 {
    
    export class Cloud extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';

            let centerX: number = this.position.x + this.size.width / 2;
            let centerY: number = this.position.y + this.size.height / 2;

            crc2.beginPath();
            crc2.arc( centerX, centerY, this.size.width / 5, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc( centerX + 30, centerY + 20, this.size.width / 6, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc( centerX - 30, centerY + 10, this.size.width / 6, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
        }
    }
}