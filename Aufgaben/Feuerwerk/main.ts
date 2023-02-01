/*
 Aufgabe: Abschlussarbeit: Feuerwerk!
 Name: Pia Giovannelli
 Matrikel: 271245
 Datum: 29.01.2023
 Quellen: 
*/

namespace Feuerwerk {

    window.addEventListener("load", handleload);

    let crc2: CanvasRenderingContext2D;
    let fireworks: Firework[] = [];


    // Alle vom Benutzer einstellbaren Variablen
    let name: string = "Mein Feuerwerk";

    let color: string = "#ff0000";
    let red: number = 255;
    let green: number = 0;
    let blue: number = 0;
    
    let numberOfParticles: number = 50;
    let flightDuration: number = 50;
    let speed: number = 5;

    let downForce: number = -2;
    let size: number = 1;
    let width: number = 10;




    // Alle Inputs für die obigen Variablen
    let nameInput: HTMLInputElement = document.getElementById("name") as HTMLInputElement;

    let redInput: HTMLInputElement = document.getElementById("red") as HTMLInputElement;
    let greenInput: HTMLInputElement = document.getElementById("green") as HTMLInputElement;
    let blueInput: HTMLInputElement = document.getElementById("blue") as HTMLInputElement;

    let numberOfParticlesInput: HTMLInputElement = document.getElementById("numberOfParticles") as HTMLInputElement;
    let flightDurationInput: HTMLInputElement = document.getElementById("flightDuration") as HTMLInputElement;
    let speedInput: HTMLInputElement = document.getElementById("speed") as HTMLInputElement;

    let downForceInput: HTMLInputElement = document.getElementById("downForce") as HTMLInputElement;
    let sizeInput: HTMLInputElement = document.getElementById("size") as HTMLInputElement;
    let widthInput: HTMLInputElement = document.getElementById("width") as HTMLInputElement;




    // Gibt den obigen inputs die richtigen Event listener
    nameInput.addEventListener("change", changeName);

    redInput.addEventListener("change", changeRed);
    greenInput.addEventListener("change", changeGreen);
    blueInput.addEventListener("change", changeBlue);

    numberOfParticlesInput.addEventListener("change", changeNumberOfParticles);
    flightDurationInput.addEventListener("change", changeFlightDuration);
    speedInput.addEventListener("change", changeSpeed);

    downForceInput.addEventListener("change", changeDownForce);
    sizeInput.addEventListener("change", changeSize);
    widthInput.addEventListener("change", changeWidth);



    
    // Alle Funktionen für die obigen Event Listener,
    function changeName(): void {
        name = nameInput.value;
    }
    function updateColor(): void {
        let redColor: string = red.toString(16);
        if (redColor.length < 2) redColor = "0" + redColor;

        let greenColor: string = green.toString(16);
        if (greenColor.length < 2) greenColor = "0" + greenColor;

        let blueColor: string = blue.toString(16);
        if (blueColor.length < 2) blueColor = "0" + blueColor;

        color = "#" + redColor + greenColor + blueColor;
        document.getElementById("color").style.backgroundColor = color;
    }
    function changeRed(): void {
        red = parseInt(redInput.value);
        updateColor();
    }
    function changeGreen(): void {
        green = parseInt(greenInput.value);
        updateColor();
    }
    function changeBlue(): void {
        blue = parseInt(blueInput.value);
        updateColor();
    }
    function changeNumberOfParticles(): void {
        numberOfParticles = parseInt(numberOfParticlesInput.value);
    }
    function changeFlightDuration(): void {
        flightDuration = parseInt(flightDurationInput.value);
    }
    function changeSpeed(): void {
        speed = parseInt(speedInput.value);
    }
    function changeDownForce(): void {
        downForce = -parseInt(downForceInput.value);
    }
    function changeSize(): void {
        size = parseInt(sizeInput.value);
    }
    function changeWidth(): void {
        width = parseInt(widthInput.value);
    }









    
    // Wird ausgeführt wenn die Seite geladen ist
    function handleload(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) {
            console.log("No Canvas!");
            return;
        }
        canvas.addEventListener("click", handleClick);

        // Event Listener für das Speichern der Feuerwerke
        document.getElementById("save").addEventListener("click", saveFirework);

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");


        // Lädt die gespeicherten Feuerwerke aus der Datenbank
        loadFireworkNames();

        // updated den canvas alle 20 millisekunden
        setInterval(update, 20);
    }


    // Erschafft bei klicken auf den Canvas ein Feuerwerk
    function handleClick(e: PointerEvent): void {
        let fireworkConfig: FireworkConfig = {
            color: color,
            numberOfParticles: numberOfParticles,
            flightDuration: flightDuration,
            positionX: e.offsetX,
            speed: speed
        };

        let particleConfig: ParticleConfig = {
            color: color,
            downForce: downForce,
            size: size,
            width: width
        };
        
        fireworks.push(new Firework(fireworkConfig, particleConfig));
    }


    // Malt den hintergrund (leicht Transparent damit die Raketen eine Spur hinterlassen)
    function drawBackground(): void {
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#05050555"); //Das vierte Zahlenpaar (die 55) geben die Transparenz an
        gradient.addColorStop(0.62, "#00002255");
        gradient.addColorStop(1, "#00003355");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function update(): void {
        drawBackground();

        for (let i: number = fireworks.length - 1; i >= 0; i--) {
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




    // Alle Parameter welche auf dem Server Gespeichert werden als Objekt
    interface SaveConfig {
        name: string;
        color: string;
        red: number;
        green: number;
        blue: number;
        numberOfParticles: number;
        flightDuration: number;
        speed: number;
        downForce: number;
        size: number;
        width: number;
    }

    // Speichert ein Feuerwerk auf dem Server
    async function saveFirework(): Promise<void> {
        let data: SaveConfig = {
            name: name,
            color: color,
            red: red,
            green: green,
            blue: blue,
            numberOfParticles: numberOfParticles,
            flightDuration: flightDuration,
            speed: speed,
            downForce: downForce,
            size: size,
            width: width
        };

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Feuerwerke");
        query.set("data", JSON.stringify(data));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());

        // Lädt anschließend die neue Feuerwerkliste nochmal vom Server runter
        loadFireworkNames();
    }

    // Interface für die Antwort des Servers
    interface Items {
        [category: string]: SaveConfig;
    }


    // Lädt die gespeicherten Feuerwerke vom Server runter und zeigt sie an
    async function loadFireworkNames(): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Feuerwerke");

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        let raw: string = await response.text();

        let data: Items = JSON.parse(raw).data;

        // Liste der Feuerwerke im HTML
        let availables: HTMLElement = document.getElementById("available");

        // Löscht alle einträge bis auf die Template
        while (availables.childElementCount > 1) {
            availables.removeChild(availables.lastChild);
        }

        // Erstellt für jedes gespeicherte Feuerwerk ein HTML Element und fügt es der Seite hinzu 
        for (let key in data) {
            // Dupliziert das Template Element
            let newElement: HTMLElement = availables.firstElementChild.cloneNode(true) as HTMLElement;
            
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
    async function loadFirework(): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Feuerwerke");
        query.set("id", this.getAttribute("itemId"));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        let raw: string = await response.text();

        let data: Items = JSON.parse(raw).data;
        let loadedConfig: SaveConfig = data[this.getAttribute("itemId")];

        // Aktualisiert alle wichtigen Variablen
        name = loadedConfig.name;
        color = loadedConfig.color;
        red = loadedConfig.red;
        green = loadedConfig.green;
        blue = loadedConfig.blue;
        numberOfParticles = loadedConfig.numberOfParticles;
        flightDuration = loadedConfig.flightDuration;
        speed = loadedConfig.speed;
        downForce = loadedConfig.downForce;
        size = loadedConfig.size;
        width = loadedConfig.width;

        // Setzt die Slider auf die richtigen Werte
        nameInput.value = loadedConfig.name;
        redInput.value = loadedConfig.red.toString();
        greenInput.value = loadedConfig.green.toString();
        blueInput.value = loadedConfig.blue.toString();
        numberOfParticlesInput.value = loadedConfig.numberOfParticles.toString();
        flightDurationInput.value = loadedConfig.flightDuration.toString();
        speedInput.value = loadedConfig.speed.toString();
        downForceInput.value = (-loadedConfig.downForce).toString();
        sizeInput.value = loadedConfig.size.toString();
        widthInput.value = loadedConfig.width.toString();

        // Aktualisiert die Farbbox
        updateColor();
    }

    // Löscht Feuerwerke vom Server
    async function deleteFirework(): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Feuerwerke");
        query.set("id", this.getAttribute("itemId"));

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        let raw: string = await response.text();

        // Lädt anschließend die aktualisierte Liste der Feuerwerke runter
        loadFireworkNames();
    }
}