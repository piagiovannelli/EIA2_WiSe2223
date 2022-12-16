var Aufgabe9;
(function (Aufgabe9) {
    class Tree extends Aufgabe9.DrawObject {
        draw(crc2) {
            crc2.lineWidth = 1;
            crc2.fillStyle = "#773f03";
            crc2.strokeStyle = "#5e3101";
            crc2.fillRect(0.375 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y, 0.250 * this.size.width, 0.375 * this.size.height);
            crc2.fillStyle = "#00b241";
            crc2.strokeStyle = "#005b22";
            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo(0 + this.position.x, this.size.height * 0.75 + this.position.y);
            crc2.lineTo(this.size.width + this.position.x, this.size.height * 0.75 + this.position.y);
            crc2.lineTo(this.size.width / 2 + this.position.x, this.size.height * 0.375 + this.position.y);
            crc2.closePath();
            crc2.fill();
            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo(this.size.width * 0.125 + this.position.x, this.size.height * 0.375 + this.position.y);
            crc2.lineTo(this.size.width * 0.875 + this.position.x, this.size.height * 0.375 + this.position.y);
            crc2.lineTo(this.size.width / 2 + this.position.x, this.position.y);
            crc2.closePath();
            crc2.fill();
        }
    }
    Aufgabe9.Tree = Tree;
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=Tree.js.map