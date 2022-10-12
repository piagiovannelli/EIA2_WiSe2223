//Programmstruktur implementieren
var zufallsgedicht;
(function (zufallsgedicht) {
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
        let randoms = Math.floor(Math.random() * _s.length);
        let randomp = Math.floor(Math.random() * _s.length);
        let randomo = Math.floor(Math.random() * _s.length);
        let verse = _s[randoms] + " " + _p[randomp] + " " + _o[randomo] + " .";
        _s.splice(randoms, 1);
        _p.splice(randomp, 1);
        _o.splice(randomo, 1);
        return verse;
    }
})(zufallsgedicht || (zufallsgedicht = {}));
//# sourceMappingURL=L01.js.map