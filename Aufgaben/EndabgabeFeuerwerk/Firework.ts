namespace Feuerwerk {

// Zusammenfassung von Parametern für den Konstruktor von Firework
//Objekt wird durch vers Paramter hier sozusagen gebaut im interface 
    export interface FireworkConfig {
        color: string;
        numberOfParticles: number;
        positionX: number;
        positionY: number;
        speed: number;
    }

    export class Firework {
//Anhand dieser Paramter sind die Attribute, die wir in der Klasse gesetzt haben

        particles: Particle[]; //Partikel sind Array
        createdParticles: boolean;
        particleConfig: ParticleConfig;

        counter: number; // Anzahl der vergangenen Frames seit Erschaffung
        crc2: CanvasRenderingContext2D;

        color: string;
        numberOfParticles: number;
        position: Vector;
        speed: number;


// Kriegt seine eigene FireworkConfig übergeben, und die ParticleConfig für die Partikel, welche bei der Explosion erschaffen werden
// Mit constructor werden Instanzen geschaffen
//Wir holen uns über die config-Datei die Daten, die wir in den constructor überliefern (die Farbe einmal; die Anzahl der Partikel; den Vektor unserer Position über positon x u y dass es direkt ausgerechnet werden kan; speed, die wir uns hier generiert haben)
//Gleichzeitig tun wir hier in unserer Klasse die Partikel rauskonfigurieren, d.h. er baut uns direkt die Partikelconfig anhand der partikelconfig aus zeile 18 ca, die wir ihm auch überliefern
        constructor(config: FireworkConfig, particleConfig: ParticleConfig) {
            
            let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
            this.crc2 = <CanvasRenderingContext2D>canvas.getContext("2d"); //Eigenschaften der Klasse werden richtig zugewiesen und dargestellt
// Die Eigenschaften werden der Klasse zugewiesen/ / Sind Verpackung salopp gesagt auf denen Eigenschaften des Feuerwerks bzw. der Partikel stehen
    
            this.color = config.color; 
            this.numberOfParticles = config.numberOfParticles;
            this.position = new Vector(config.positionX, config.positionY); //Mausposition
            this.speed = config.speed;

            this.particleConfig = particleConfig;
            this.createdParticles = false;
            this.particles = []; //Anzahl der Partikel ist leeres Array

            // Falls die Farbe schwarz ist, wird eine zufällige Farbe gewählt
            //prüfen ob Farbe des Feuerwerks schwarz ist; wenn ja soll er eine zufällige Farbe setzen bzw. weiße Partikel sollen auftauchen funktioniert aber nicht
            if (this.color == "#000000") {
                this.color = "#fff";
            }
        }

//das war constructor der unsere Klasse/Feuerwerk zunächst mal baut



        draw(): void {
            // Alle Partikel aus dem Partikel Array werden einmal gezeichnet
            //geht in die Klasse von Partikel rein und holt sich die Methoden
            
            for (let particle of this.particles) {
                particle.draw();
            }

        }

        update(): void {
            // Selbe if bedingung wie in draw

            if (!this.createdParticles) {
                for (let i: number = 0; i < this.numberOfParticles; i++) {
                    // gibt dem neuen Partikel eine zufällige Richtung
                    // abhängig von "Ausbreitung der Partikel"
                    //Funktion: neue Position für die Partikel bei jedem neuen Klick
                    let startVelocity: Vector = new Vector(Math.random() * this.particleConfig.width - this.particleConfig.width / 2, Math.random() * 35 - 10); //Vektor wird über Mathrandom jedes Mal neu generiert

                    // Fügt das neue Partikel ins Partikel array hinzu.
                    // Es wird die Position der Rakete ans Partikel übergeben
                    this.particles.push(new Particle(this.particleConfig, this.position.copy(), startVelocity)); //Config Datei von unseren gesamtem Partikeln; neue Position der Partikel weil es fliegen nicht alle in selbe Richtung
                }
                this.createdParticles = true;  
                //Wenn kein Mausklick stattfindet, wird wahrscheinlich createdparticles auf false gesetzt
                //Wenn Mauklick dann auf true

                return;
            }

            // Updated alle Partikel
            for (let i: number = this.particles.length - 1; i >= 0; i--) {
                // Löscht tote Partikel
                if (!this.particles[i].alive) { //Wenn die Elemente noch am leben sind, dann will er die toten Partikel, die im Hintergrund nicht mehr zu sehen sind löschen und die splice Methode ruft die Löschung von den Partikeln an stelle i also die Anzahl
                    this.particles.splice(i, 1); //splice removed die Elemente von dem Array und die Anzahl der Elemente
                    continue;
                }
                this.particles[i].update();  //Löscht alle toten Partikel;holt sich Partikel aus Array raus und aus dem array löscht er dann alle Partikel an der Stelle i
            }
            //wir haben gesamte Länge an Arrays des Partikels und durchläuft sie von oben nach unten alle Partikel durch und löscht alle runter
            //i ist index des Partikels der entfernt werden soll & die 1 = Anzahl der Elemente
            //splice wird von ts bzw. js zur Verfügung gestellt
        }

           
        }


      

      
    }
