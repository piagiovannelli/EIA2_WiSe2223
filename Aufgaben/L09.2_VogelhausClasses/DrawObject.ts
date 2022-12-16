namespace Aufgabe9 {
    export interface Point {
        x: number;
        y: number;
    };

    export interface Size {
        width: number;
        height: number;
    };

    export class Rectangle {
        position: Point;
        size: Size;

        public constructor( _position: Point, _size: Size ) {
            this.position = _position;
            this.size = _size;
        }

        public randomPoint(): Point {
            let rx: number = Math.random() * this.size.width + this.position.x;
            let ry: number = Math.random() * this.size.height + this.position.y;

            console.log( "random point in rect: " + "x=" + this.position.x + " y=" + this.position.y + " w=" + this.size.width + " h=" + this.size.height );
            console.log( "random point:         " + "x=" + rx + " y=" + ry );
            return { x: rx, y: ry };
        }

        public isInRect( _point: Point ): boolean {
            return _point.x >= this.position.x && _point.x <= this.position.x + this.size.width
                && _point.y >= this.position.y && _point.y <= this.position.y + this.size.height;
        }
    }

    export interface IDrawable {
        draw: () => void;
    }

    export abstract class DrawObject {
        position: Point;
        size: Size;
        velocity: Point;
        infinite: boolean;
        constructor( _x: number, _y: number, _width: number, _height: number ) {
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
        };

        public abstract draw( crc2: CanvasRenderingContext2D ): void;

        public move( _speed: number ): void {
            this.position.x += this.velocity.x * _speed;
            this.position.y += this.velocity.y * _speed;

            if ( this.infinite ) {
                if ( this.position.x > 320 )
                    this.position.x = -this.size.width;
                if ( this.position.y > 640 )
                    this.position.y = -this.size.height;
            }
        }

        public faceTo( _target: Point ): void {
            let vec: Vector = Vector.fromPoints( this.position, _target );
            console.log( "target:    " + "x=" + _target.x + " y=" + _target.y );
            console.log( "direction: " + vec );
            this.velocity = vec.normalize(); // Vector und Point haben die gleichen Attribute
        }
    }

    export class Vector {
        x: number;
        y: number;

        public constructor( _x: number, _y: number ) {
            this.x = _x;
            this.y = _y;
        }

        public static fromPoints( _from: Point, _to: Point ): Vector {
            console.log( "point from: " + "x=" + _from.x + " y=" + _from.y );
            console.log( "point to:   " + "x=" + _to.x + " y=" + _to.y );
            let result: Vector = new Vector( _to.x - _from.x, _to.y - _from.y );
            console.log( "vector:     " + result );
            return result;
        }

        public scalarMultiply( _factor: number ): Vector {
            return new Vector( this.x * _factor, this.y * _factor );
        }

        public length(): number {
            return Math.sqrt( this.x * this.x + this.y * this.y );
        }

        public normalize(): Vector {
            return this.scalarMultiply( 1 / this.length() );
        }

        public toString = (): string => {
            return "x=" + this.x + " y=" + this.y;
        }
    }
}