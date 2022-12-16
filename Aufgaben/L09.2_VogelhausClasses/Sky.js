var Aufgabe9;
(function (Aufgabe9) {
    class Sky extends Aufgabe9.DrawObject {
        draw(crc2) {
            crc2.fillStyle = "#7fd7ef";
            crc2.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
    Aufgabe9.Sky = Sky;
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=Sky.js.map