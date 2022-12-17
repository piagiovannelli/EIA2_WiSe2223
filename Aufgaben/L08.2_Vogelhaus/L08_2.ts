/*
Aufgabe: L08.2_Vogelhaus
Name: Pia Giovannelli
Matrikel: 271245
Datum: 3.12.2022
Quellen:  Aanya Khetarpal, Arthur Aguair, Lisa Blindenhöfer, w3schools
*/

namespace Vogelhaus {

    interface Vector {
        x: number;
        y: number;
    }

    // Zufallszahl zwischen minimaler und maximaler Eingabe
    function randomNumber(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }

    window.addEventListener("load", createCanvas);

    let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    function createCanvas(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        window.addEventListener("resize", fillCanvas, false);
        window.addEventListener("orientationchange", fillCanvas, false);
        fillCanvas();
    }

    
    window.addEventListener("load", fillCanvas);  

    function fillCanvas(): void {

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas"); //Anpassung screen
        if (!canvas)
            return;
       
       
        let horizon: number = canvas.height * 0.38;
        let posMountains: Vector = { x: 0, y: horizon };

        drawBackground(horizon);
        drawSun({ x: canvas.width * 0.1, y: canvas.height * 0.12 });
        drawCloud({ x: canvas.width * 0.8, y: canvas.height * 0.15 }, { x: 90, y: 50 });
        drawCloud({ x: canvas.width * 0.4, y: canvas.height * 0.2 }, { x: 70, y: 40 });
        drawMountains(posMountains, canvas.height * 0.08, canvas.height * 0.15, "black", "white");
        drawMountains(posMountains, canvas.height * 0.05, canvas.height * 0.09, "#442b0b", "#c09682");
        drawTrees(0, 15);
        drawSnowman();
        drawhouse({ x: 800, y: 540 });
        drawbirdflying({ x: canvas.width , y: canvas.height });
        drawbird({ x: canvas.width , y: canvas.height });
        drawbirdsitting({ x: canvas.width , y: canvas.height });
        drawsnowflakes();


    }

    function drawBackground(_horizon: number): void {

        // Himmelfarbe
        let gradientSky: CanvasGradient = crc2.createLinearGradient(0, 0, 0, _horizon);
        gradientSky.addColorStop(0, "skyblue");
        gradientSky.addColorStop(1, "grey");

        crc2.fillStyle = gradientSky;
        crc2.fillRect(0, 0, canvas.width, _horizon);

        // Wiesenfarbe (voll mit Schnee)
        let gradientMeadow: CanvasGradient = crc2.createLinearGradient(0, _horizon, 0, canvas.height);
        gradientMeadow.addColorStop(0, "white");
        gradientMeadow.addColorStop(1, "grey");

        crc2.fillStyle = gradientMeadow;
        crc2.fillRect(0, _horizon, canvas.width, canvas.height);
    }

    function drawSun(_position: Vector): void {

        //Sonne und Sonnenstrahlen
        let r1: number = canvas.width * 0.02;
        let r2: number = canvas.width * 0.06;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 60%, 0)");

        // Zeichnung Sonne
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawCloud(_position: Vector, _size: Vector): void {

        // Basispartikel erstellen und färben
        let nParticles: number = 40;
        let radiusParticle: number = 60;
        let particle: Path2D = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.fillStyle = gradient;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        // Jedem Partikel zufällige Position innerhalb des Wolkenbereichs
        for (let drawn: number = 0; drawn < nParticles; drawn++) {

            crc2.save();

            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);

            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void { 

        // Abstand zwischen Berggipfeln und Tälern
        let stepMin: number = 10;
        let stepMax: number = 20;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        // Anfang Bergpfad auf linken Seite
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        // Zeichne Berge
        do {
            x += stepMin + randomNumber(stepMin, stepMax);
            let y: number = - randomNumber(_min, _max);
            crc2.lineTo(x, y);

        } while (x < canvas.width);

        // Ende Bergpfad auf der rechten Seite
        crc2.lineTo(x, 0);
        crc2.closePath();

        // Farbe Berge
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawTrees(_min: number, _max: number): void {

        // Abstand zwischen Bäumen
        let stepMin: number = 5;
        let stepMax: number = 15;
        let x: number = 0;

        // Zeichne jeden Baum
        do {
            let y: number = randomNumber(_min, _max);
            crc2.save();
            crc2.translate(x, y + (canvas.height * 0.39));

            let treeTrunk: number = -30; // Baumstammhöhe
            let treeTop: number = -150; // Baumgipfelhöhe
            let treeColor: string[] = ["#1d5d18", "#22691d", "#267121"]; // Grüntöne

            let treeSize: number = randomNumber(0.15, 0.2);

            crc2.scale(treeSize, treeSize);

            // Baumstamm
            crc2.fillStyle = "#6d502b"; // Farbe Baumstamm
            crc2.fillRect(0, 0, 15, treeTrunk);

            // Baumgipfel
            for (let color: number = 0; color < 3; color++) {

                // Dreieck zeichnen und mit Farbe füllen
                crc2.beginPath();
                crc2.moveTo(-50, treeTrunk);
                crc2.lineTo(60, treeTrunk);
                crc2.lineTo(10, treeTop);
                crc2.closePath();
                crc2.fillStyle = treeColor[color];
                crc2.fill();

                // Startposition des nächsten Dreiecks nach oben verschieben
                treeTrunk += -40;
                treeTop += -40;
            }

            x += stepMin + randomNumber(stepMin, stepMax);
            crc2.restore();

        } while (x < canvas.width);
    }

    function drawSnowman(): void {

        //Schneekugeln
        let radius: number = 40;
        let positionX: number = 300;
        let positionY: number = 350;

        for (let i: number = 0; i < 3; i++) {
            crc2.beginPath();
            crc2.arc(positionX, positionY, radius, 0, 2 * Math.PI);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.stroke();
            crc2.closePath();


            positionY = positionY + radius + 50;
            radius = radius + 10;


        }

        //Nase Linie
        crc2.beginPath();
        crc2.moveTo(300, 350);
        crc2.lineTo(305, 365);
        crc2.stroke();
        crc2.closePath();

        //Augen
        crc2.beginPath();
        crc2.arc(positionX - 10, positionY - 307, radius - 66, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(positionX + 8, positionY - 307, radius - 66, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        //Mund
        crc2.beginPath();
        crc2.arc(positionX + 3, positionY - 280, radius - 66, 0, 1 * Math.PI);
        crc2.stroke();
        crc2.closePath();

        //Knöpfe
        crc2.beginPath();
        crc2.arc(positionX + 1, positionY - 190, radius - 66, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(positionX + 1, positionY - 210, radius - 66, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(positionX + 1, positionY - 230, radius - 66, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();

        

    }


function drawsnowflakes(): void {
    console.log("snowflakes");

    for (let index: number = 0; index < 600; index++) {
        let randomx: number = Math.floor(Math.random() * (1000 - 1) + 1);
        let randomy: number = Math.floor(Math.random() * (700 - 1) + 1);
        let randomscale: number = Math.floor(Math.random() * (4 - 1) + 1);

        let r1: number = 1;
        let r2: number = 2;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(0, 0%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(240, 50%, 90%, 0)");

        crc2.save();
        crc2.scale(randomscale, randomscale);
        crc2.beginPath();
        crc2.translate(randomx, randomy);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }

}

function drawhouse(_position: Vector): void {
    console.log("Vogelhaus");

    //Oberer Teil des Hauses

    crc2.save();
    crc2.beginPath();
    crc2.translate(_position.x, _position.y);
    crc2.moveTo(-80, 0);
    crc2.lineTo(80, 0);
    crc2.lineTo(80, -120);
    crc2.lineTo(120, -120);
    crc2.lineTo(0, -180);
    crc2.lineTo(-120, -120);
    crc2.lineTo(-80, -120);
    crc2.fillStyle = "brown";
    crc2.fill();
    crc2.closePath();
    crc2.restore();

    //Unterer Teil des Hauses 
    crc2.save();
    crc2.beginPath();
    crc2.translate(_position.x, _position.y);
    crc2.moveTo(-8, 0);
    crc2.lineTo(8, 0);
    crc2.lineTo(8, 50);
    crc2.lineTo(30, 110);
    crc2.lineTo(26, 110);
    crc2.lineTo(8, 80);
    crc2.lineTo(5, 110);
    crc2.lineTo(-5, 110);
    crc2.lineTo(-8, 80);
    crc2.lineTo(-26, 110);
    crc2.lineTo(-30, 110);
    crc2.lineTo(-8, 50);
    crc2.fillStyle = "brown";
    crc2.fill();
    crc2.closePath();
    crc2.restore();

    let rhole: number = 32;
    crc2.save();
    crc2.beginPath();
    crc2.translate(_position.x, _position.y);
    crc2.fillStyle = "grey";
    crc2.arc(0, -60, rhole, 0, 2 * Math.PI);
    crc2.fill();
    crc2.closePath();
    crc2.restore();

}


function drawbirdflying(_position:Vector): void {

    for (let index: number = 0; index < 10; index++) {
        let positionx: number = Math.floor(Math.random() * (900 - 40) + 40);
        let positiony: number = Math.floor(Math.random() * (200 - 20) + 20);
        let randomscale: number = Math.floor(Math.random() * (3 - 0.5) + 0.5);

        crc2.save();
        crc2.beginPath();
        crc2.translate(positionx, positiony);
        crc2.scale(randomscale, randomscale);
        crc2.moveTo(1, 0);
        crc2.bezierCurveTo(8, -5, 15, -10, 20, -2);
        crc2.moveTo(-1, 0);
        crc2.bezierCurveTo(-8, -5, -15, -10, -20, -2);
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
    }
}

//Funktion für Vögel auf dem Boden
function drawbird(_position:Vector): void{
    for (let index: number = 0; index < 9; index++) {
        
        let maxWidth: number = 800;                      
        let minWidth: number = 100;
        let minHeight: number = 515;
        let maxHeight: number = 530;

        let positionx: number = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
        let positiony: number = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
        
        //Unterkörper
        let radius2: number = 15;
        crc2.beginPath();
        crc2.arc(positionx , positiony , radius2, 0, 2 * Math.PI);
        crc2.fillStyle = randomColor();
        crc2.fill();
        crc2.stroke();
        crc2.closePath();

        //Kopf
        let radius: number = 10;
        crc2.beginPath();
        crc2.arc(positionx - 10, positiony - 10, radius, 0, 2 * Math.PI);
        crc2.fillStyle = randomColor();
        crc2.fill();
        crc2.stroke();
        crc2.closePath();


        //Auge
        let radius3: number = 1;
        crc2.beginPath();
        crc2.arc(positionx - 11, positiony -11 , radius3, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.stroke();
        crc2.closePath();
      
        //Schnabel
        crc2.beginPath();
        crc2.moveTo(positionx -20, positiony - 10);
        crc2.lineTo(positionx -25, positiony -5);
        crc2.stroke();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(positionx -19, positiony -5);
        crc2.lineTo(positionx -25, positiony -5);
        crc2.stroke();
        crc2.closePath();
       

        //Bein
        crc2.beginPath();
        crc2.moveTo(positionx, positiony + 5);
        crc2.lineTo(positionx, positiony + 20);
        crc2.stroke();
        crc2.closePath();

        //Fuß
        crc2.beginPath();
        crc2.moveTo(positionx , positiony +20);
        crc2.lineTo(positionx - 5, positiony + 20);
        crc2.stroke();
        crc2.closePath();

        }
   

        }

function drawbirdsitting(_position:Vector): void {
   
    let positionx: number = 800;
    let positiony: number = 339;
    

    //Unterkörper
    let radius2: number = 12;
    crc2.beginPath();
    crc2.arc(positionx , positiony , radius2, 0, 2 * Math.PI);
    crc2.fillStyle = randomColor();
    crc2.fill();
    crc2.stroke();
    crc2.closePath();

    //Kopf
    let radius: number = 10;
    crc2.beginPath();
    crc2.arc(positionx - 10, positiony - 10, radius, 0, 2 * Math.PI);
    crc2.fillStyle = randomColor();
    crc2.fill();
    crc2.stroke();
    crc2.closePath();


    //Auge
    let radius3: number = 1;
    crc2.beginPath();
    crc2.arc(positionx - 11, positiony -11 , radius3, 0, 2 * Math.PI);
    crc2.fillStyle = "black";
    crc2.fill();
    crc2.stroke();
    crc2.closePath();
  
    //Schnabel
    crc2.beginPath();
    crc2.moveTo(positionx -20, positiony - 10);
    crc2.lineTo(positionx -25, positiony -5);
    crc2.stroke();
    crc2.closePath();

    crc2.beginPath();
    crc2.moveTo(positionx -19, positiony -5);
    crc2.lineTo(positionx -25, positiony -5);
    crc2.stroke();
    crc2.closePath();

    //Bein
    crc2.beginPath();
    crc2.moveTo(positionx, positiony + 5);
    crc2.lineTo(positionx, positiony + 20);
    crc2.stroke();
    crc2.closePath();

    //Fuß
    crc2.beginPath();
    crc2.moveTo(positionx , positiony +20);
    crc2.lineTo(positionx - 5, positiony + 20);
    crc2.stroke();
    crc2.closePath();


 }  

//Funktion zufällige Farbe 
 function randomColor(): string {
    let letters: string = "0123456789";
    let color: string = "#";
    for (let i: number = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 10)];
    }
    return color;




}

}

