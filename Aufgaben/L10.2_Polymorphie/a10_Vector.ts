namespace a10_2_polymorphie  {

    export class Vector {
        x: number;
        y: number;
    
        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }
    
        set(_x: number, _y: number): void {
            let random1: number = Math.floor(Math.random() * (1000 - 1) + 1);
            let random2: number = Math.floor(Math.random() * (700 - 1) + 1);
            this.x = random1;
            this.y = random2;
        }
    
        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }
    
        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    
        random(_minLength: number, _maxLength: number): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = 1;
    
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }

        copy(): Vector {
            return new Vector(this.x, this.y);
        }
    }
    
}