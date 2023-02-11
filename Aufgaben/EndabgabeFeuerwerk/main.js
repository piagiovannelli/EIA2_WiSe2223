/*
 Aufgabe: Abschlussarbeit: Feuerwerk!
 Name: Pia Giovannelli
 Matrikel: 271245
 Datum: 29.01.2023
 Quellen:
*/
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleload);
    let canvas;
    let crc2;
    let fireworks = [];
    let rect;
    // Alle vom Benutzer einstellbaren Variablen
    let name = "Mein Feuerwerk";
    let color = "#ff0000";
    let red = 255;
    let green = 0;
    let blue = 0;
    let numberOfParticles = 50;
    let speed = 5;
    let size = 1;
    let width = 10;
    // Alle Inputs für die obigen Variablen
    let nameInput = document.getElementById("name");
    let redInput = document.getElementById("red");
    let greenInput = document.getElementById("green");
    let blueInput = document.getElementById("blue");
    let numberOfParticlesInput = document.getElementById("numberOfParticles");
    let speedInput = document.getElementById("speed");
    let sizeInput = document.getElementById("size");
    let widthInput = document.getElementById("width");
    // Gibt den obigen inputs die richtigen Event listener
    nameInput.addEventListener("change", changeName);
    redInput.addEventListener("change", changeRed);
    greenInput.addEventListener("change", changeGreen);
    blueInput.addEventListener("change", changeBlue);
    numberOfParticlesInput.addEventListener("change", changeNumberOfParticles);
    speedInput.addEventListener("change", changeSpeed);
    sizeInput.addEventListener("change", changeSize);
    widthInput.addEventListener("change", changeWidth);
    // Alle Funktionen für die obigen Event Listener,
    function changeName() {
        name = nameInput.value;
    }
    function updateColor() {
        let redColor = red.toString(16);
        if (redColor.length < 2)
            redColor = "0" + redColor;
        let greenColor = green.toString(16);
        if (greenColor.length < 2)
            greenColor = "0" + greenColor;
        let blueColor = blue.toString(16);
        if (blueColor.length < 2)
            blueColor = "0" + blueColor;
        color = "#" + redColor + greenColor + blueColor;
        document.getElementById("color").style.backgroundColor = color;
    }
    function changeRed() {
        red = parseInt(redInput.value);
        updateColor();
    }
    function changeGreen() {
        green = parseInt(greenInput.value);
        updateColor();
    }
    function changeBlue() {
        blue = parseInt(blueInput.value);
        updateColor();
    }
    function changeNumberOfParticles() {
        numberOfParticles = parseInt(numberOfParticlesInput.value);
    }
    function changeSpeed() {
        speed = parseInt(speedInput.value);
    }
    function changeSize() {
        size = parseInt(sizeInput.value);
    }
    function changeWidth() {
        width = parseInt(widthInput.value);
    }
    // Wird ausgeführt wenn die Seite geladen ist
    function handleload() {
        canvas = document.querySelector("canvas");
        rect = canvas.getBoundingClientRect();
        if (!canvas) {
            console.log("No Canvas!");
            return;
        }
        canvas.addEventListener("click", handleClick);
        // Event Listener für das Speichern der Feuerwerke
        document.getElementById("save").addEventListener("click", saveFirework);
        crc2 = canvas.getContext("2d");
        // Lädt die gespeicherten Feuerwerke aus der Datenbank
        loadFireworkNames();
        // updated den canvas alle 20 millisekunden
        setInterval(update, 20);
    }
    // Erschafft bei klicken auf den Canvas ein Feuerwerk
    function handleClick(e) {
        let fireworkConfig = {
            color: color,
            numberOfParticles: numberOfParticles,
            positionX: e.clientX - rect.left,
            positionY: e.clientY - rect.top,
            speed: speed
        };
        let particleConfig = {
            color: color,
            size: size,
            width: width
        };
        fireworks.push(new Feuerwerk.Firework(fireworkConfig, particleConfig));
    }
    // Malt den hintergrund (leicht Transparent damit die Raketen eine Spur hinterlassen)
    function drawBackground() {
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#05050555"); //Das vierte Zahlenpaar (die 55) geben die Transparenz an
        gradient.addColorStop(0.62, "#00002255");
        gradient.addColorStop(1, "#00003355");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function update() {
        drawBackground();
        for (let i = fireworks.length - 1; i >= 0; i--) {
            // Löscht das Feuerwerk falls es schon explodiert ist und alle seine Partikel gelöscht hat            
            if (fireworks[i].createdParticles && fireworks[i].particles.length == 0) {
                fireworks.splice(i, 1);
                continue;
            }
            // Malt und updated jedes Feuerwerk
            fireworks[i].draw();
            fireworks[i].update();
        }
    }
    // Speichert ein Feuerwerk auf dem Server
    async function saveFirework() {
        let data = {
            name: name,
            color: color,
            red: red,
            green: green,
            blue: blue,
            numberOfParticles: numberOfParticles,
            speed: speed,
            size: size,
            width: width
        };
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Feuerwerke");
        query.set("data", JSON.stringify(data));
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        // Lädt anschließend die neue Feuerwerkliste nochmal vom Server runter
        loadFireworkNames();
    }
    // Lädt die gespeicherten Feuerwerke vom Server runter und zeigt sie an
    async function loadFireworkNames() {
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Feuerwerke");
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        let raw = await response.text();
        let data = JSON.parse(raw).data;
        // Liste der Feuerwerke im HTML
        let availables = document.getElementById("available");
        // Löscht alle einträge bis auf die Template
        while (availables.childElementCount > 1) {
            availables.removeChild(availables.lastChild);
        }
        // Erstellt für jedes gespeicherte Feuerwerk ein HTML Element und fügt es der Seite hinzu 
        for (let key in data) {
            // Dupliziert das Template Element
            let newElement = availables.firstElementChild.cloneNode(true);
            // Ändert den namen
            newElement.firstChild.textContent = data[key].name;
            // macht es sichtbar
            newElement.style.display = "";
            // fügt unten eine Trennlinie hinzu
            newElement.style.borderBottom = "1px solid black";
            // Speichert die ID des Datenbank eintrags auf dem Html element, damit sie in der Löschen und Laden funktion benutzt werden kann
            newElement.querySelector(".load").setAttribute("itemId", key);
            newElement.querySelector(".delete").setAttribute("itemId", key);
            newElement.querySelector(".load").addEventListener("click", loadFirework);
            newElement.querySelector(".delete").addEventListener("click", deleteFirework);
            // fügt das Element der Seite hinzu
            availables.appendChild(newElement);
        }
    }
    // Lädt das ausgewählte Feuerwerk in das Programm
    async function loadFirework() {
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Feuerwerke");
        query.set("id", this.getAttribute("itemId"));
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        let raw = await response.text();
        let data = JSON.parse(raw).data;
        let loadedConfig = data[this.getAttribute("itemId")];
        // Aktualisiert alle wichtigen Variablen
        name = loadedConfig.name;
        color = loadedConfig.color;
        red = loadedConfig.red;
        green = loadedConfig.green;
        blue = loadedConfig.blue;
        numberOfParticles = loadedConfig.numberOfParticles;
        speed = loadedConfig.speed;
        size = loadedConfig.size;
        width = loadedConfig.width;
        // Setzt die Slider auf die richtigen Werte
        nameInput.value = loadedConfig.name;
        redInput.value = loadedConfig.red.toString();
        greenInput.value = loadedConfig.green.toString();
        blueInput.value = loadedConfig.blue.toString();
        numberOfParticlesInput.value = loadedConfig.numberOfParticles.toString();
        speedInput.value = loadedConfig.speed.toString();
        sizeInput.value = loadedConfig.size.toString();
        widthInput.value = loadedConfig.width.toString();
        // Aktualisiert die Farbbox
        updateColor();
    }
    // Löscht Feuerwerke vom Server
    async function deleteFirework() {
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Feuerwerke");
        query.set("id", this.getAttribute("itemId"));
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        let raw = await response.text();
        // Lädt anschließend die aktualisierte Liste der Feuerwerke runter
        loadFireworkNames();
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map