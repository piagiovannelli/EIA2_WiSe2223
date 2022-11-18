// *
// Aufgabe: L06 Shopping List - Client
// Name: Bastian Aberle
// Matrikel: 271166
// Datum: 11.11.2022
// Quellen: EIA2 - Videos, W3Schools, Lisa Blindenhöfer
// */

namespace shoppinglistA06 {

    window.addEventListener("load", handleLoad);

    //interface für die Daten in der JSON File


    interface TestData {
        Item: string;
        Amount: string;
        Area: string;
    }

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }


    //lädt Liste und ruft loadData auf
    async function handleLoad(): Promise<void> {
        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[id=but1]");

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~aberleba/Database/index.php/?command=find&collection=data");
        let entry: string = await response.text();
        let data: TestData[] = JSON.parse(entry);

        console.log(data);
        console.log(data[0].Item);


        button.addEventListener("click", handleButton);

        
        // loadData(data);
        // clearInputs();
    }

    //managed die Buttons
    function handleButton(): void {
        sendData();
        loadInput();
        
    }

    //client austausch
    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let json: FormDataJSON = {};

        //Umwandlung FormData in Json FormData
        for (let key of formData.keys())
        if (!json[key]) {
            let values: FormDataEntryValue[] = formData.getAll(key);
            json[key] = values.length > 1 ? values : values[0];
        }

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));  
        console.log(JSON.stringify(json));  
        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~aberleba/Database/index.php?" + query.toString());
        // console.log(response);
        // console.log("data sent");
    }


    //lädt die Daten aus dem JSON Array in Variablen und gibt sie an loadItem weiter
    function loadData(data: TestData[]): void {
        console.log("loadData");
        for (let index: number = 0; index < data.length; index++) {
            let item: string = data[index].Item;
            let amount: string = data[index].Amount;
            // let date: string = data[index].date;
            let comment: string = data[index].Area;
            // let purchase: string = data[index].purchase;
            console.log(item + amount + comment);
            loadItem(item, amount, comment);
        }
    }

    //lädt den Input in den Feldern in Variablen und übergibt es dann zur loadItem Funktion
    function loadInput(): void {
        let formData: FormData = new FormData(document.forms[0]);
        let item: string = formData.get("Item").toString();
        let amount: string = formData.get("Amount").toString();
        let date: string = new Date().toLocaleDateString();
        let comment: string = formData.get("Area").toString();

        //umwandlung nextPurchase von Input in string
        let purchaseCheckbox: FormDataEntryValue = formData.get("Checkbox");
        let purchase: string = "";
        if (purchaseCheckbox == null) {
            purchase = "";
        } else {
            purchase = " buy";
        }



        //generiere nun einen neuen Eintrag
        loadItem(item, amount, comment);

        //löscht Value von Inputs
        // clearInputs();
    }

    //Funktion zur generierung eines Item Felds im Output
    function loadItem(item: string, amount: string, comment: string): void {
        let newDiv: HTMLDivElement = document.createElement("div");
        newDiv.id = "createDiv";
        let parent: Element = document.querySelector("#output");
        newDiv.className = "genoutput";
        newDiv.innerHTML = amount + " " + item + " " + comment;
        parent.appendChild(newDiv);

        let newContainer: HTMLDivElement = document.createElement("div");
        newContainer.id = "containerIcons";
        newDiv.appendChild(newContainer);

        let newCheckbox: HTMLInputElement = document.createElement("input");
        newCheckbox.type = "checkbox";
        newContainer.appendChild(newCheckbox);

        let newEdit: HTMLDivElement = document.createElement("div");
        newEdit.innerHTML = "<img id='edit' src='./pen-solid.svg'>";
        newContainer.appendChild(newEdit);

        let newTrash: HTMLDivElement = document.createElement("div");
        newTrash.innerHTML = "<img id='trash' src='./trash-solid.svg'>";
        newCheckbox.id = "trash";
        newContainer.appendChild(newTrash);

        newEdit.addEventListener("click", function (): void {
            editItem(newDiv, item, amount, comment);
        });

        newTrash.addEventListener("click", function (): void {
            deleteItem(newDiv);
        });
    }

    //löscht ein Item bei click auf trash
    function deleteItem(newDiv: HTMLDivElement): void {
        newDiv.parentElement.removeChild(newDiv);
    }

    //editiert ein Item bei click auf edit
    function editItem(newDiv: HTMLDivElement, item: string, amount: string, comment: string): void {
        let itemx: HTMLInputElement = document.querySelector("input#inputx");
        itemx.value = item;
        let amountx: HTMLInputElement = document.querySelector("input#amountx");
        amountx.value = amount.toString();
        let commentx: HTMLInputElement = document.querySelector("input#commentx");
        commentx.value = comment;
        deleteItem(newDiv);
    }

    // cleared die Input Felder
    function clearInputs(): void {
        let itemx: HTMLInputElement = document.querySelector("input#inputx");
        itemx.value = "";
        let amountx: HTMLInputElement = document.querySelector("input#amountx");
        amountx.value = "";
        let commentx: HTMLInputElement = document.querySelector("input#commentx");
        commentx.value = "";
    }
}