/*
Aufgabe: L08.2_Vogelhaus
Name: Pia Giovannelli
Matrikel: 271245
Datum: 30.11.2022
Quellen: In Zusammenarbeit mit Aanya Khetarpal, Julia Befus, Havva Kilic, Paula Jordans
*/
var Vogelhaus;
(function (Vogelhaus) {
    // Zufallszahl zwischen minimaler und maximaler Eingabe
    function randomNumber(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
    window.addEventListener("load", createCanvas);
    let canvas;
    function createCanvas(_event) {
        canvas = document.querySelector("canvas");
        Vogelhaus.crc2 = canvas.getContext("2d");
        window.addEventListener("resize", fillCanvas, false);
        window.addEventListener("orientationchange", fillCanvas, false);
        fillCanvas();
    }
    function fillCanvas() {
        // Leinwandgröße
        canvas.width = window.innerWidth * 0.95;
        canvas.height = window.innerHeight * 0.85;
        let horizon = canvas.height * 0.38;
        let posMountains = { x: 0, y: horizon };
        drawBackground(horizon);
        drawSun({ x: canvas.width * 0.1, y: canvas.height * 0.12 });
        drawCloud({ x: canvas.width * 0.8, y: canvas.height * 0.15 }, { x: 90, y: 50 });
        drawCloud({ x: canvas.width * 0.4, y: canvas.height * 0.2 }, { x: 70, y: 40 });
        drawMountains(posMountains, canvas.height * 0.08, canvas.height * 0.15, "black", "white");
        drawMountains(posMountains, canvas.height * 0.05, canvas.height * 0.09, "#442b0b", "#c09682");
        drawTrees(0, 15);
    }
    function drawBackground(_horizon) {
        // Himmekfarbe
        let gradientSky = Vogelhaus.crc2.createLinearGradient(0, 0, 0, _horizon);
        gradientSky.addColorStop(0, "skyblue");
        gradientSky.addColorStop(1, "white");
        Vogelhaus.crc2.fillStyle = gradientSky;
        Vogelhaus.crc2.fillRect(0, 0, canvas.width, _horizon);
        // Wiesenfarbe (voll mit Schnee)
        let gradientMeadow = Vogelhaus.crc2.createLinearGradient(0, _horizon, 0, canvas.height);
        gradientMeadow.addColorStop(0, "white");
        gradientMeadow.addColorStop(1, "white");
        Vogelhaus.crc2.fillStyle = gradientMeadow;
        Vogelhaus.crc2.fillRect(0, _horizon, canvas.width, canvas.height);
    }
    function drawSun(_position) {
        //Sonne und Sonnenstrahlen
        let r1 = canvas.width * 0.02;
        let r2 = canvas.width * 0.06;
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 60%, 0)");
        // Zeichnung Sonne
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawCloud(_position, _size) {
        // Basispartikel erstellen und färben
        let nParticles = 40;
        let radiusParticle = 20;
        let particle = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        let gradient = Vogelhaus.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        // Jedem Partikel zufällige Position innerhalb des Wolkenbereichs
        for (let drawn = 0; drawn < nParticles; drawn++) {
            Vogelhaus.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Vogelhaus.crc2.translate(x, y);
            Vogelhaus.crc2.fill(particle);
            Vogelhaus.crc2.restore();
        }
        Vogelhaus.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        // Abstand zwischen Berggipfeln und Tälern
        let stepMin = 10;
        let stepMax = 20;
        let x = 0;
        Vogelhaus.crc2.save();
        Vogelhaus.crc2.translate(_position.x, _position.y);
        // Anfang Bergpfad auf linken Seite
        Vogelhaus.crc2.beginPath();
        Vogelhaus.crc2.moveTo(0, 0);
        Vogelhaus.crc2.lineTo(0, -_max);
        // Zeichne Berge
        do {
            x += stepMin + randomNumber(stepMin, stepMax);
            let y = -randomNumber(_min, _max);
            Vogelhaus.crc2.lineTo(x, y);
        } while (x < canvas.width);
        // Ende Bergpfad auf der rechten Seite
        Vogelhaus.crc2.lineTo(x, 0);
        Vogelhaus.crc2.closePath();
        // Farbe Berge
        let gradient = Vogelhaus.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        Vogelhaus.crc2.fillStyle = gradient;
        Vogelhaus.crc2.fill();
        Vogelhaus.crc2.restore();
    }
    function drawTrees(_min, _max) {
        // Abstand zwischen Bäumen
        let stepMin = 5;
        let stepMax = 15;
        let x = 0;
        // Zeichne jeden Baum
        do {
            let y = randomNumber(_min, _max);
            Vogelhaus.crc2.save();
            Vogelhaus.crc2.translate(x, y + (canvas.height * 0.39));
            let treeTrunk = -30; // Baumstammhöhe
            let treeTop = -150; // Baumgipfelhöhe
            let treeColor = ["#1d5d18", "#22691d", "#267121"]; // Grüntöne
            let treeSize = randomNumber(0.15, 0.2);
            Vogelhaus.crc2.scale(treeSize, treeSize);
            // Baumstamm
            Vogelhaus.crc2.fillStyle = "#6d502b"; // Farbe Baumstamm
            Vogelhaus.crc2.fillRect(0, 0, 15, treeTrunk);
            // Baumgipfel
            for (let color = 0; color < 3; color++) {
                // Dreieck zeichnen und mit Farbe füllen
                Vogelhaus.crc2.beginPath();
                Vogelhaus.crc2.moveTo(-50, treeTrunk);
                Vogelhaus.crc2.lineTo(60, treeTrunk);
                Vogelhaus.crc2.lineTo(10, treeTop);
                Vogelhaus.crc2.closePath();
                Vogelhaus.crc2.fillStyle = treeColor[color];
                Vogelhaus.crc2.fill();
                // Startposition des nächsten Dreiecks nach oben verschieben
                treeTrunk += -40;
                treeTop += -40;
            }
            x += stepMin + randomNumber(stepMin, stepMax);
            Vogelhaus.crc2.restore();
        } while (x < canvas.width);
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=L08_2.js.map