declare namespace Aufgabe9 {
    interface Point {
        x: number;
        y: number;
    }
    interface Size {
        width: number;
        height: number;
    }
    class Rectangle {
        position: Point;
        size: Size;
        constructor(_position: Point, _size: Size);
        randomPoint(): Point;
        isInRect(_point: Point): boolean;
    }
    interface IDrawable {
        draw: () => void;
    }
    abstract class DrawObject {
        position: Point;
        size: Size;
        velocity: Point;
        infinite: boolean;
        constructor(_x: number, _y: number, _width: number, _height: number);
        abstract draw(crc2: CanvasRenderingContext2D): void;
        move(_speed: number): void;
        faceTo(_target: Point): void;
    }
    class Vector {
        x: number;
        y: number;
        constructor(_x: number, _y: number);
        static fromPoints(_from: Point, _to: Point): Vector;
        scalarMultiply(_factor: number): Vector;
        length(): number;
        normalize(): Vector;
        toString: () => string;
    }
}