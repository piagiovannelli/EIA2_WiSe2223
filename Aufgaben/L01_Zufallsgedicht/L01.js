/* Aufgabe: L01 Zufallsgedicht
Name: Pia Giovannelli
Matrikel: 271245
Datum: 12.10.2022
Quellen: Aanya Khetarpal, Julia Befus, Paula Jordans, Havva Kilic
*/
//Programmstruktur implementieren
var gedicht;
(function (gedicht) {
    //Arrays
    let s = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let p = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let o = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    console.log(s, p, o);
    //For-Schleife
    for (let index = 6; index >= 1; index--) {
        let letzterSatz = getVerse(s, p, o);
        console.log(letzterSatz);
        //console.log(index);
        //getVerse(s, p, o);
        //console.log(getVerse);
    }
    function getVerse(_s, _p, _o) {
        let randoms = Math.floor(Math.random());
        let randomp = Math.floor(Math.random());
        let randomo = Math.floor(Math.random());
        let verse = _s[randoms] + " " + _p[randomp] + " " + _o[randomo] + " .";
        _s.splice(randoms, 1);
        _p.splice(randomp, 1);
        _o.splice(randomo, 1);
        return verse;
    }
})(gedicht || (gedicht = {}));
//# sourceMappingURL=L01.js.map