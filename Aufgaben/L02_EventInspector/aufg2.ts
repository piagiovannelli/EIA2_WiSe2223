/* Aufgabe: L02 Event Inspector
Name: Pia Giovannelli
Matrikel: 271245
Datum: 20.10.2022
Quellen: Aanya Khetarpal, Julia Befus, Paula Jordans, Havva Kilic
*/

namespace EventsInspector {

    window.addEventListener("load", handleLoad);


    function handleLoad(_event: Event): void {
        let body: HTMLElement = <HTMLElement>document.body;
        let div0: HTMLDivElement = <HTMLDivElement>document.querySelector("#div0");
        let div1: HTMLDivElement = <HTMLDivElement>document.querySelector("#div1");
        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");

        document.addEventListener("mousemove", setInfoBox);

        //Eventlistener an document, body und die divs gepackt
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);

        button.addEventListener("click", customEvent);
        document.addEventListener("petTheCat", logInfo);
    }

    function setInfoBox(_event: MouseEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let target: EventTarget = _event.target;

        let span: HTMLSpanElement = <HTMLSpanElement>document.querySelector("span");
        let offset: number = 10;
        span.style.left = (x + offset) + "px";
        span.style.top = (y + offset) + "px";
        span.innerHTML = "x: " + x + "<br>" + "y: " + y + "<br>" + "target: " + target;

    }

    function logInfo(_event: Event): void {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
    }

    function customEvent(_event: Event): void {
        let button: HTMLButtonElement = <HTMLButtonElement>_event.target;
        // bubbles sorgt dafür, dass das Customevent im Dom Tree aufsteigt
        let newEvent: CustomEvent = new CustomEvent("petTheCat", { bubbles: true });

        button.dispatchEvent(newEvent);
    }
}