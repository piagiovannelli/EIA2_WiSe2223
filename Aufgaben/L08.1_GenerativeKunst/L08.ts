/*
 Aufgabe:L08.1_Generative Kunst
 Name: Pia Giovannelli
 Matrikel: 271245
 Datum: 22.11.22
 Quellen: Aanya Khetarpal, Havva Kilic, Julia Befus, Paula Jordans
*/

namespace L08_GenerativeKunst {

    window.addEventListener("load", fillCanvas);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    function fillCanvas(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        crc2.clearRect(0, 0, canvas.width, canvas.height);

        // Hintergrundlinien
        let colorLines: string[] = ["purple", "silver", "olive"];

        for (let i: number = 0; i < colorLines.length; i++)
            for (let index: number = 0; index < 50; index++) {
                let a: number = randomNumber(0, canvas.width);
                let b: number = randomNumber(0, canvas.height);
                let c: number = randomNumber(0, canvas.width);
                let d: number = randomNumber(0, canvas.height);
                
                crc2.beginPath();
                crc2.strokeStyle = colorLines[i];
                crc2.moveTo(a, b);
                crc2.lineTo(c, d);
                crc2.closePath();
                crc2.stroke();
            }

        // Vordergrund Objekte
        let objectAmount: number = randomNumber(30, 300);
        for (let i: number = 0; i < objectAmount; i++) {
            drawRandomObject();
        }

        // Create new picture
        let newCanvas: HTMLElement = <HTMLElement>document.querySelector("button")!;
        newCanvas.addEventListener("click", fillCanvas);
    }

    function drawRandomObject(): void {
        // Zufällige Position innerhalb der Leinwand
        let x: number = randomNumber(0, canvas.width);
        let y: number = randomNumber(0, canvas.height);

        crc2.save();
        crc2.translate(x, y);

        crc2.fillStyle = randomColor();

        // Formen
        let objectShape: number = randomNumber(0, 3);
        switch (objectShape) {
            case 0:
                randomRectangle();
                break;
            case 1:
                randomCircle();
                break;
            case 2:
                randomPolygon();
                break;
        }

        crc2.restore();
    }

    // Rechteck zeichnen
    function randomRectangle(): void {
        let width: number = randomNumber(10, 100);
        let height: number = randomNumber(10, 100);

        crc2.fillRect(0, 0, width, height);
    }

    // Kreis zeichnen
    function randomCircle(): void {
        let size: number = randomNumber(1, 100);

        crc2.beginPath();
        crc2.arc(0, 0, size, 0, 360);
        crc2.closePath();
        crc2.fill();
    }

    // Polygon zeichnen
    function randomPolygon(): void {
        let points: number = randomNumber(3, 8);

        crc2.beginPath();
        for (let i: number = 0; i < points; i++) {
            let x: number = randomNumber(0, 100) - randomNumber(0, 100);
            let y: number = randomNumber(0, 100) - randomNumber(0, 100);
            crc2.lineTo(x, y);
        }
        crc2.closePath();
        crc2.fill();
    }

    // Zufallszahl zwischen einer minimalen und maximalen Eingabe
    function randomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Random Hex-Code für Farbe(n)
    function randomColor(): string {
        let letters: string = "0123456789ABCDEF";
        let color: string = "#";
        for (let i: number = 0; i < 8; i++) {
            color += letters[Math.floor(Math.random() * 12)];
        }
        return color;
    }
}