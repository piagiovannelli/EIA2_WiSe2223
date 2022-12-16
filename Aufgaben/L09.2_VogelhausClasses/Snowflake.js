var Aufgabe9;
(function (Aufgabe9) {
    class Snowflake extends Aufgabe9.DrawObject {
        draw(crc2) {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';
            let centerX = this.position.x + this.size.width / 2;
            let centerY = this.position.y + this.size.height / 2;
            crc2.beginPath();
            crc2.arc(centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.stroke();
        }
    }
    Aufgabe9.Snowflake = Snowflake;
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=Snowflake.js.map