/*
 Aufgabe:L05_Einkaufsliste_Client
 Name: Pia Giovannelli
 Matrikel: 271245
 Datum: 12.11.22
 Quellen: Bastian Aberle, Paula Jordans, Julia Befus, Aanya Khetarpal, Havva Sümeyye Kilic
*/


namespace shoppinglistA05 {

    window.addEventListener("load", handleLoad);

    //interface für die Daten in der JSON File
    export interface Input {
        item: string;
        amount: number;
        comment: string;
        date: string;
        purchase: string;
    }

    //lädt Liste und ruft loadData auf
    async function handleLoad(): Promise<void> {
        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        let response: Response = await fetch("data.json");
        let entry: string = await response.text();
        let data: Input[] = JSON.parse(entry);
        button.addEventListener("click", handleButton);
        clearInputs();
        loadData(data);
    }

    //managed die Buttons
    function handleButton(): void {
        loadInput();
        sendData();
    }

    //client austausch
    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("shoppinglist.html?" + query.toString());
        alert("Data sent");
    }

    //lädt die Daten aus dem JSON Array in Variablen und gibt sie an loadItem weiter
    function loadData(data: Input[]): void {
        for (let index: number = 0; index < data.length; index++) {
            let item: string = data[index].item;
            let amount: number = data[index].amount;
            let date: string = data[index].date;
            let comment: string = data[index].comment;
            let purchase: string = data[index].purchase;

            loadItem(item, amount, date, comment, purchase);
        }
    }

    //lädt den Input in den Feldern in Variablen und übergibt es dann zur loadItem Funktion
    function loadInput(): void {
        let formData: FormData = new FormData(document.forms[0]);
        let item: string = formData.get("Item").toString();
        let amount: number = Number(formData.get("Amount"));
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

        //löscht Value von Inputs
        clearInputs();

        //generiere nun einen neuen Eintrag
        loadItem(item, amount, date, comment, purchase);
    }

    //Funktion zur generierung eines Item Felds im Output
    function loadItem(item: string, amount: number, date: string, comment: string, purchase: string): void {
        let newDiv: HTMLDivElement = document.createElement("div");
        newDiv.id = "createDiv";
        let parent: Element = document.querySelector("#output");
        newDiv.className = "genoutput";
        newDiv.innerHTML = date + " " + amount + " " + item + " " + comment + " " + purchase;
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
    function editItem(newDiv: HTMLDivElement, item: string, amount: number, comment: string): void {
        let itemx: HTMLInputElement = document.querySelector("input#inputx");
        itemx.value = item;
        let amountx: HTMLInputElement = document.querySelector("input#amountx");
        amountx.value = amount.toString();
        let commentx: HTMLInputElement = document.querySelector("input#commentx");
        commentx.value = comment;
        deleteItem(newDiv);
    }

    //cleared die Input Felder
    function clearInputs(): void {
        let itemx: HTMLInputElement = document.querySelector("input#inputx");
        itemx.value = "";
        let amountx: HTMLInputElement = document.querySelector("input#amountx");
        amountx.value = "";
        let commentx: HTMLInputElement = document.querySelector("input#commentx");
        commentx.value = "";
    }
}