
var shoppinglistA06;
(function (shoppinglistA06) {
    window.addEventListener("load", handleLoad);
    //lädt Liste und ruft loadData auf
    async function handleLoad() {
        let button = document.querySelector("button[id=but1]");
        let response = await fetch("https://webuser.hs-furtwangen.de/~aberleba/Database/index.php/?command=find&collection=data");
        let entry = await response.text();
        let data = JSON.parse(entry);
        console.log(data);
        console.log(data[0].Item);
        button.addEventListener("click", handleButton);
        // loadData(data);
        // clearInputs();
    }
    //managed die Buttons
    function handleButton() {
        sendData();
        loadInput();
    }
    //client austausch
    async function sendData() {
        let formData = new FormData(document.forms[0]);
        let json = {};
        //Umwandlung FormData in Json FormData
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));
        console.log(JSON.stringify(json));
        let response = await fetch("https://webuser.hs-furtwangen.de/~aberleba/Database/index.php?" + query.toString());
        // console.log(response);
        // console.log("data sent");
    }
    //lädt die Daten aus dem JSON Array in Variablen und gibt sie an loadItem weiter
    function loadData(data) {
        console.log("loadData");
        for (let index = 0; index < data.length; index++) {
            let item = data[index].Item;
            let amount = data[index].Amount;
            // let date: string = data[index].date;
            let comment = data[index].Area;
            // let purchase: string = data[index].purchase;
            console.log(item + amount + comment);
            loadItem(item, amount, comment);
        }
    }
    //lädt den Input in den Feldern in Variablen und übergibt es dann zur loadItem Funktion
    function loadInput() {
        let formData = new FormData(document.forms[0]);
        let item = formData.get("Item").toString();
        let amount = formData.get("Amount").toString();
        let date = new Date().toLocaleDateString();
        let comment = formData.get("Area").toString();
        //umwandlung nextPurchase von Input in string
        let purchaseCheckbox = formData.get("Checkbox");
        let purchase = "";
        if (purchaseCheckbox == null) {
            purchase = "";
        }
        else {
            purchase = " buy";
        }
        //generiere nun einen neuen Eintrag
        loadItem(item, amount, comment);
        //löscht Value von Inputs
        // clearInputs();
    }
    //Funktion zur generierung eines Item Felds im Output
    function loadItem(item, amount, comment) {
        let newDiv = document.createElement("div");
        newDiv.id = "createDiv";
        let parent = document.querySelector("#output");
        newDiv.className = "genoutput";
        newDiv.innerHTML = amount + " " + item + " " + comment;
        parent.appendChild(newDiv);
        let newContainer = document.createElement("div");
        newContainer.id = "containerIcons";
        newDiv.appendChild(newContainer);
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newContainer.appendChild(newCheckbox);
        let newEdit = document.createElement("div");
        newEdit.innerHTML = "<img id='edit' src='./pen-solid.svg'>";
        newContainer.appendChild(newEdit);
        let newTrash = document.createElement("div");
        newTrash.innerHTML = "<img id='trash' src='./trash-solid.svg'>";
        newCheckbox.id = "trash";
        newContainer.appendChild(newTrash);
        newEdit.addEventListener("click", function () {
            editItem(newDiv, item, amount, comment);
        });
        newTrash.addEventListener("click", function () {
            deleteItem(newDiv);
        });
    }
    //löscht ein Item bei click auf trash
    function deleteItem(newDiv) {
        newDiv.parentElement.removeChild(newDiv);
    }
    //editiert ein Item bei click auf edit
    function editItem(newDiv, item, amount, comment) {
        let itemx = document.querySelector("input#inputx");
        itemx.value = item;
        let amountx = document.querySelector("input#amountx");
        amountx.value = amount.toString();
        let commentx = document.querySelector("input#commentx");
        commentx.value = comment;
        deleteItem(newDiv);
    }
    // cleared die Input Felder
    function clearInputs() {
        let itemx = document.querySelector("input#inputx");
        itemx.value = "";
        let amountx = document.querySelector("input#amountx");
        amountx.value = "";
        let commentx = document.querySelector("input#commentx");
        commentx.value = "";
    }
})(shoppinglistA06 || (shoppinglistA06 = {}));
//# sourceMappingURL=L06.js.map