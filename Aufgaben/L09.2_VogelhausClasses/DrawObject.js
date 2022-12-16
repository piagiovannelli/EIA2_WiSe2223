var Aufgabe9;
(function (Aufgabe9) {
    ;
    ;
    class Rectangle {
        position;
        size;
        constructor(_position, _size) {
            this.position = _position;
            this.size = _size;
        }
        randomPoint() {
            let rx = Math.random() * this.size.width + this.position.x;
            let ry = Math.random() * this.size.height + this.position.y;
            console.log("random point in rect: " + "x=" + this.position.x + " y=" + this.position.y + " w=" + this.size.width + " h=" + this.size.height);
            console.log("random point:         " + "x=" + rx + " y=" + ry);
            return { x: rx, y: ry };
        }
        isInRect(_point) {
            return _point.x >= this.position.x && _point.x <= this.position.x + this.size.width
                && _point.y >= this.position.y && _point.y <= this.position.y + this.size.height;
        }
    }
    Aufgabe9.Rectangle = Rectangle;
    class DrawObject {
        position;
        size;
        velocity;
        infinite;
        constructor(_x, _y, _width, _height) {
            this.position = {
                x: _x,
                y: _y
            };
            this.size = {
                width: _width,
                height: _height
            };
            this.velocity = {
                x: 0,
                y: 0
            };
            this.infinite = false;
        }
        ;
        move(_speed) {
            this.position.x += this.velocity.x * _speed;
            this.position.y += this.velocity.y * _speed;
            if (this.infinite) {
                if (this.position.x > 320)
                    this.position.x = -this.size.width;
                if (this.position.y > 640)
                    this.position.y = -this.size.height;
            }
        }
        faceTo(_target) {
            let vec = Vector.fromPoints(this.position, _target);
            console.log("target:    " + "x=" + _target.x + " y=" + _target.y);
            console.log("direction: " + vec);
            this.velocity = vec.normalize(); // Vector und Point haben die gleichen Attribute
        }
    }
    Aufgabe9.DrawObject = DrawObject;
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        static fromPoints(_from, _to) {
            console.log("point from: " + "x=" + _from.x + " y=" + _from.y);
            console.log("point to:   " + "x=" + _to.x + " y=" + _to.y);
            let result = new Vector(_to.x - _from.x, _to.y - _from.y);
            console.log("vector:     " + result);
            return result;
        }
        scalarMultiply(_factor) {
            return new Vector(this.x * _factor, this.y * _factor);
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        normalize() {
            return this.scalarMultiply(1 / this.length());
        }
        toString = () => {
            return "x=" + this.x + " y=" + this.y;
        };
    }
    Aufgabe9.Vector = Vector;
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=DrawObject.js.map