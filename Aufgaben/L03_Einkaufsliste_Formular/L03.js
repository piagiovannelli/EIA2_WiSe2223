/*
 Aufgabe:<L03, Einkaufsliste>
 Name: <Aanya Khetarpal>
 Matrikel: <2711441>
 Datum: <29.10.2022>
 Quellen: <Paula Jordans, Julia Befus, Aanya Khetarpal, Havva Sümeyye Kilic>
*/
window.addEventListener("load", handleLoad);
function handleLoad() {
    document.querySelector("#trash").addEventListener("click", trash);
    document.querySelector("#check").addEventListener("click", check);
    document.querySelector("#newitem").addEventListener("click", item);
    document.querySelector("#edit").addEventListener("click", edit);
}
//Funktion fürs Löschen eines Items (durch Mülleimer)
function trash() {
    console.log("Item wird gelöscht von der Liste");
}
//Funktion fürs abhacken eines Items (durch checkbox)
function check() {
    console.log("Item wird abgehackt/wurde gekauft");
}
//Funktion für das hinzufügen eines Items (durch Plus)
function item() {
    console.log("Neues Item wird hinzugefügt");
}
//Funktion für das bearbeiten eines Items (durch Stift)
function edit() {
    console.log("Item kann bearbeitet werden");
}
//# sourceMappingURL=L03.js.map