namespace Aufgabe9 {
    export class Sky extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#7fd7ef";

            crc2.fillRect(
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height );
        }
    }
}