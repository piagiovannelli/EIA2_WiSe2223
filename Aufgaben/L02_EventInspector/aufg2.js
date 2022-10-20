var EventsInspector;
(function (EventsInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let body = document.body;
        let div0 = document.querySelector("#div0");
        let div1 = document.querySelector("#div1");
        let button = document.querySelector("button");
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
    function setInfoBox(_event) {
        let x = _event.clientX;
        let y = _event.clientY;
        let target = _event.target;
        let span = document.querySelector("span");
        let offset = 10;
        span.style.left = (x + offset) + "px";
        span.style.top = (y + offset) + "px";
        span.innerHTML = "x: " + x + "<br>" + "y: " + y + "<br>" + "target: " + target;
    }
    function logInfo(_event) {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
    }
    function customEvent(_event) {
        let button = _event.target;
        // bubbles sorgt dafür, dass das Customevent im Dom Tree aufsteigt
        let newEvent = new CustomEvent("petTheCat", { bubbles: true });
        button.dispatchEvent(newEvent);
    }
})(EventsInspector || (EventsInspector = {}));
//# sourceMappingURL=aufg2.js.map