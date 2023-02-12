namespace Feuerwerk {


    export interface FireworkConfig {
        color: string;
        numberOfParticles: number;
        positionX: number;
        positionY: number;
        speed: number;
    }

    export class Firework {

        particles: Particle[]; 
        createdParticles: boolean;
        particleConfig: ParticleConfig;

        counter: number; 
        crc2: CanvasRenderingContext2D;

        color: string;
        numberOfParticles: number;
        position: Vector;
        speed: number;




        constructor(config: FireworkConfig, particleConfig: ParticleConfig) {
            
            let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
            this.crc2 = <CanvasRenderingContext2D>canvas.getContext("2d"); 
            this.color = config.color; 
            this.numberOfParticles = config.numberOfParticles;
            this.position = new Vector(config.positionX, config.positionY); //Mausposition
            this.speed = config.speed;

            this.particleConfig = particleConfig;
            this.createdParticles = false;
            this.particles = []; 

            if (this.color == "#000000") {
                this.color = "#fff";
            }
        }



           draw(): void {
            
            
            for (let particle of this.particles) {
                particle.draw();
            }

        }

        update(): void {
            

            if (!this.createdParticles) {
                for (let i: number = 0; i < this.numberOfParticles; i++) {
                    
                    let startVelocity: Vector = new Vector(Math.random() * this.particleConfig.width - this.particleConfig.width / 2, Math.random() * 35 - 10); //Vektor wird über Mathrandom jedes Mal neu generiert

                    
                    this.particles.push(new Particle(this.particleConfig, this.position.copy(), startVelocity)); //Config Datei von unseren gesamtem Partikeln; neue Position der Partikel weil es fliegen nicht alle in selbe Richtung
                }
                this.createdParticles = true;  
                

                return;
            }

            
            for (let i: number = this.particles.length - 1; i >= 0; i--) {
                
                if (!this.particles[i].alive) {  
                    this.particles.splice(i, 1); 
                    continue;
                }
                this.particles[i].update();  
            }
             
        }

           
        }


 }
