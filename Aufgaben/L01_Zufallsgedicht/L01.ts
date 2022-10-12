/* Aufgabe: L01 Zufallsgedicht
Name: Pia Giovannelli
Matrikel: 271245
Datum: 12.10.2022
Quellen: Aanya Khetarpal, Julia Befus, Paula Jordans
*/





//Programmstruktur implementieren
namespace zufallsgedicht {
    //Arrays
    let s: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let p: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let o: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

    console.log(s, p, o);

    //For-Schleife

    for (let index: number = 6; index >= 1; index--) {
        let letzterSatz: string = getVerse(s, p, o);
        console.log(letzterSatz);

        //console.log(index);
        //getVerse(s, p, o);
        //console.log(getVerse);

    }


    function getVerse(_s: string[], _p: string[], _o: string[]): string {
        let randoms: number = Math.floor(Math.random() * _s.length);
        let randomp: number = Math.floor(Math.random() * _s.length);
        let randomo: number = Math.floor(Math.random() * _s.length);

        let verse: string = _s[randoms] + " " + _p[randomp] + " " + _o[randomo] + " .";

        _s.splice(randoms, 1);
        _p.splice(randomp, 1);
        _o.splice(randomo, 1);

        return verse;
    }



}
