/*
 Aufgabe: Abschlussarbeit: Feuerwerk!
 Name: Pia Giovannelli
 Matrikel: 271245
 Datum: 29.01.2023
 Quellen:
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleload);
    var crc2;
    var fireworks = [];
    // Alle vom Benutzer einstellbaren Variablen
    var name = "Mein Feuerwerk";
    var color = "#ff0000";
    var red = 255;
    var green = 0;
    var blue = 0;
    var numberOfParticles = 50;
    var flightDuration = 50;
    var speed = 5;
    var downForce = -2;
    var size = 1;
    var width = 10;
    // Alle Inputs für die obigen Variablen
    var nameInput = document.getElementById("name");
    var redInput = document.getElementById("red");
    var greenInput = document.getElementById("green");
    var blueInput = document.getElementById("blue");
    var numberOfParticlesInput = document.getElementById("numberOfParticles");
    var flightDurationInput = document.getElementById("flightDuration");
    var speedInput = document.getElementById("speed");
    var downForceInput = document.getElementById("downForce");
    var sizeInput = document.getElementById("size");
    var widthInput = document.getElementById("width");
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
    function changeName() {
        name = nameInput.value;
    }
    function updateColor() {
        var redColor = red.toString(16);
        if (redColor.length < 2)
            redColor = "0" + redColor;
        var greenColor = green.toString(16);
        if (greenColor.length < 2)
            greenColor = "0" + greenColor;
        var blueColor = blue.toString(16);
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
    function changeFlightDuration() {
        flightDuration = parseInt(flightDurationInput.value);
    }
    function changeSpeed() {
        speed = parseInt(speedInput.value);
    }
    function changeDownForce() {
        downForce = -parseInt(downForceInput.value);
    }
    function changeSize() {
        size = parseInt(sizeInput.value);
    }
    function changeWidth() {
        width = parseInt(widthInput.value);
    }
    // Wird ausgeführt wenn die Seite geladen ist
    function handleload() {
        var canvas = document.querySelector("canvas");
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
        var fireworkConfig = {
            color: color,
            numberOfParticles: numberOfParticles,
            flightDuration: flightDuration,
            positionX: e.offsetX,
            speed: speed
        };
        var particleConfig = {
            color: color,
            downForce: downForce,
            size: size,
            width: width
        };
        fireworks.push(new Feuerwerk.Firework(fireworkConfig, particleConfig));
    }
    // Malt den hintergrund (leicht Transparent damit die Raketen eine Spur hinterlassen)
    function drawBackground() {
        var gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#05050555"); //Das vierte Zahlenpaar (die 55) geben die Transparenz an
        gradient.addColorStop(0.62, "#00002255");
        gradient.addColorStop(1, "#00003355");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function update() {
        drawBackground();
        for (var i = fireworks.length - 1; i >= 0; i--) {
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
    function saveFirework() {
        return __awaiter(this, void 0, void 0, function () {
            var data, query, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
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
                        query = new URLSearchParams();
                        query.set("command", "insert");
                        query.set("collection", "Feuerwerke");
                        query.set("data", JSON.stringify(data));
                        return [4 /*yield*/, fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString())];
                    case 1:
                        response = _a.sent();
                        // Lädt anschließend die neue Feuerwerkliste nochmal vom Server runter
                        loadFireworkNames();
                        return [2 /*return*/];
                }
            });
        });
    }
    // Lädt die gespeicherten Feuerwerke vom Server runter und zeigt sie an
    function loadFireworkNames() {
        return __awaiter(this, void 0, void 0, function () {
            var query, response, raw, data, availables, key, newElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new URLSearchParams();
                        query.set("command", "find");
                        query.set("collection", "Feuerwerke");
                        return [4 /*yield*/, fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString())];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        raw = _a.sent();
                        data = JSON.parse(raw).data;
                        availables = document.getElementById("available");
                        // Löscht alle einträge bis auf die Template
                        while (availables.childElementCount > 1) {
                            availables.removeChild(availables.lastChild);
                        }
                        // Erstellt für jedes gespeicherte Feuerwerk ein HTML Element und fügt es der Seite hinzu 
                        for (key in data) {
                            newElement = availables.firstElementChild.cloneNode(true);
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
                        return [2 /*return*/];
                }
            });
        });
    }
    // Lädt das ausgewählte Feuerwerk in das Programm
    function loadFirework() {
        return __awaiter(this, void 0, void 0, function () {
            var query, response, raw, data, loadedConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new URLSearchParams();
                        query.set("command", "find");
                        query.set("collection", "Feuerwerke");
                        query.set("id", this.getAttribute("itemId"));
                        return [4 /*yield*/, fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString())];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        raw = _a.sent();
                        data = JSON.parse(raw).data;
                        loadedConfig = data[this.getAttribute("itemId")];
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
                        return [2 /*return*/];
                }
            });
        });
    }
    // Löscht Feuerwerke vom Server
    function deleteFirework() {
        return __awaiter(this, void 0, void 0, function () {
            var query, response, raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new URLSearchParams();
                        query.set("command", "delete");
                        query.set("collection", "Feuerwerke");
                        query.set("id", this.getAttribute("itemId"));
                        return [4 /*yield*/, fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString())];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        raw = _a.sent();
                        // Lädt anschließend die aktualisierte Liste der Feuerwerke runter
                        loadFireworkNames();
                        return [2 /*return*/];
                }
            });
        });
    }
})(Feuerwerk || (Feuerwerk = {}));
