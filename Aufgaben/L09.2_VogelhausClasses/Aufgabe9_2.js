/*
Aufgabe: L09.2_VogelhausClasses
Name: Pia Giovannelli
Matrikel: 271245
Datum: 16.12.2022
Quellen:  Aanya Khetarpal, Havva Kilic, Paula Jordans, Julia Befus
*/
var Aufgabe9;
(function (Aufgabe9) {
    window.addEventListener("load", init);
    let crc2;
    let backgroundImageData;
    let width = 320;
    let height = 640;
    let objects = [];
    let fps = 25;
    let animationSpeed = 1.6;
    // in diesen Bereich sollen die Kinder runter fahren
    let downHillTarget = new Aufgabe9.Rectangle({ x: 0, y: height }, { width: width / 2, height: 10 });
    // In diesen Bereich sollen die Kinder die Schlitten wieder hochziehen
    let upHillTarget = new Aufgabe9.Rectangle({ x: width, y: height * 0.25 }, { width: 10, height: height / 3 });
    function init(_event) {
        console.log("Canvas started");
        let canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        createBackgroundData(crc2);
        var cloud1 = new Aufgabe9.Cloud(80, 60, 140, 80);
        cloud1.velocity.x = 0.5;
        cloud1.infinite = true;
        objects.push(cloud1);
        var cloud2 = new Aufgabe9.Cloud(200, 90, 200, 120);
        cloud2.velocity.x = 0.3;
        cloud2.infinite = true;
        objects.push(cloud2);
        for (var i = 0; i < 10; i++) {
            var ry = Math.random() * 400;
            var speed = Math.random() * 2 + 1;
            var target = downHillTarget.randomPoint();
        }
        // 25 - 50 Zuläffige Schneeflocken
        var snowFlakeCount = Math.floor(Math.random() * 25) + 25;
        for (i = 0; i < snowFlakeCount; i++) {
            var tmpX = Math.floor(Math.random() * width);
            var tmpY = Math.floor(Math.random() * height);
            var size = Math.floor(Math.random() * 5) + 3;
            var flake = new Aufgabe9.Snowflake(tmpX, tmpY, size, size);
            flake.infinite = true;
            objects.push(flake);
            flake.velocity.x = Math.random() + 1;
            flake.velocity.y = Math.random() + 1;
        }
        update();
    }
    function update() {
        window.setTimeout(update, 1000 / fps);
        crc2.putImageData(backgroundImageData, 0, 0);
        for (var i = 0; i < objects.length; i++) {
            let obj = objects[i];
            obj.move(animationSpeed);
            // Hier prüfen wir ob die das Zielareal erreicht haben
            var target;
            var speed;
            if (upHillTarget.isInRect(obj.position)) {
                speed = Math.random() * 2 + 3;
                target = downHillTarget.randomPoint();
                obj.faceTo(target);
                obj.velocity.x *= speed;
                obj.velocity.y *= speed;
            }
            else if (downHillTarget.isInRect(obj.position)) {
                speed = Math.random() * 2 + 1;
                target = upHillTarget.randomPoint();
                obj.faceTo(target);
                obj.velocity.x *= speed;
                obj.velocity.y *= speed;
            }
            obj.draw(crc2);
        }
    }
    function createBackgroundData(_crc2) {
        new Aufgabe9.Sky(0, 0, 320, 640).draw(_crc2);
        new Aufgabe9.Sun(50, 30, 80, 80).draw(_crc2);
        new Aufgabe9.Hill(0, 0, 320, 640).draw(_crc2);
        var treeCount = Math.floor(Math.random() * 8) + 2;
        for (var i = 0; i < treeCount; i++) {
            var tmpX = Math.floor(Math.random() * width);
            var factor = Math.random() * 0.1 + 0.6;
            var tmpY = tmpX * (-1) + factor * height;
            new Aufgabe9.Tree(tmpX, tmpY, 100, 100).draw(_crc2);
        }
        backgroundImageData = _crc2.getImageData(0, 0, width, height);
    }
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=Aufgabe9_2.js.map