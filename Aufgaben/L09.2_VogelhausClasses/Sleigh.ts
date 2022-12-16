namespace Aufgabe9 {
    export class Sleigh extends DrawObject {

        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#5b3600";
            crc2.strokeStyle = "#472a01";

            if ( this.velocity.y > 0 ) {
                crc2.fillRect(
                    0 + this.position.x,
                    0.875 * this.size.height + this.position.y,
                    this.size.width,
                    0.125 * this.size.height );

                crc2.fillRect(
                    0 + this.position.x,
                    0.625 * this.size.height + this.position.y,
                    0.125 * this.size.width,
                    0.250 * this.size.height );
            } else {
                crc2.fillRect(
                    0 + this.position.x - this.size.width,
                    0.875 * this.size.height + this.position.y,
                    this.size.width,
                    0.125 * this.size.height );

                let tx: number = 0.875 * this.size.width + this.position.x - this.size.width;
                let ty: number = 0.625 * this.size.height + this.position.y;

                crc2.fillRect(
                    tx,
                    ty,
                    0.125 * this.size.width,
                    0.250 * this.size.height );

                crc2.beginPath();
                crc2.strokeStyle = "#472a01";
                crc2.lineWidth = 2;
                crc2.moveTo( tx, ty );
                crc2.lineTo( tx + 25, ty - 18 );
                crc2.stroke();
            }
        }
    }
}