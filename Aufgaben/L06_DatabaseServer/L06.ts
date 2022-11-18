namespace shoppinglistA06 {

    window.addEventListener("load", handleLoad);

    //interface für die Daten in der JSON File

    let counter: number = 0;
    let globalBol: boolean = false;

    interface Item {
        Item: string;
        Amount: string;
        Checkbox: string;
        Area: string;
        NewDate: string;
    }

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    interface Entrys {
        [category: string]: Item[];
    }


    //lädt Liste und ruft loadData auf
    async function handleLoad(): Promise<void> {
        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[id=but1]");

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php/?command=find&collection=data");
        let entry: string = await response.text();
        let data: Entrys = JSON.parse(entry);


        button.addEventListener("click", handleButton);

        
        loadData(data);
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
        let newJSON: string = JSON.stringify(json);
        console.log(newJSON);
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", newJSON);  
        // console.log(JSON.stringify(json));  
        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        // console.log(response);
        console.log("data sent");
    }


    //lädt die Daten aus dem JSON Array in Variablen und gibt sie an loadItem weiter
    function loadData(newData: Entrys): void {
    
        let list: any[] = [];
        for (let test in newData.data) {
            list.push(test);
        }



        for (let index of list) {
            console.log(newData.data[index].Item);
            let item: string = newData.data[index].Item;
            let amount: string = newData.data[index].Amount;
            let date: string = newData.data[index].NewDate.toString();
            let comment: string = newData.data[index].Area;
            let purchaseCheckbox: string = newData.data[index].Checkbox;
            // console.log(purchaseCheckbox);
            let purchase: string;
            if (purchaseCheckbox == "on") {
                purchase = " buy";
                // console.log("purchase=" + purchase);
            } else {
                purchase = "";
            }
            loadItem(item, amount, comment, purchase, date, index);
            counter++;
          
        }
        // loadData(newData);
    }

    //lädt den Input in den Feldern in Variablen und übergibt es dann zur loadItem Funktion
    function loadInput(): void {
        let formData: FormData = new FormData(document.forms[0]);
        let item: string = formData.get("Item").toString();
        let amount: string = formData.get("Amount").toString();
        let date: string = formData.get("NewDate").toString();
        let comment: string = formData.get("Area").toString();
        let index: any;

        //umwandlung nextPurchase von Input in string
        let purchaseCheckbox: FormDataEntryValue = formData.get("Checkbox");
        let purchase: string = "";
        if (purchaseCheckbox == null) {
            purchase = "";
        } else {
            purchase = " buy";
        }



        //generiere nun einen neuen Eintrag
        loadItem(item, amount, comment, purchase, date, index);

        //löscht Value von Inputs
        // clearInputs();
    }

    //Funktion zur generierung eines Item Felds im Output
    function loadItem(item: string, amount: string, comment: string, purchase: string, date: string, index: any): void {
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
        newCheckbox.name = "Checkbox";
        newContainer.appendChild(newCheckbox);

        let newEdit: HTMLDivElement = document.createElement("div");
        newEdit.innerHTML = "<img id='edit' src='./pen-solid.svg'>";
        newContainer.appendChild(newEdit);

        let newTrash: HTMLDivElement = document.createElement("div");
        newTrash.innerHTML = "<img id='trash' src='./trash-solid.svg'>";
        newCheckbox.id = "trash";
        newContainer.appendChild(newTrash);

        newEdit.addEventListener("click", function (): void {
            editItem(newDiv, item, amount, comment, date, index);
        });

        newTrash.addEventListener("click", function (): void {
            deleteItem(newDiv, index);
        });

        newCheckbox.addEventListener("click", function (): void {
            updateDate(newDiv, index, item, amount, comment, date, purchase);
        });
    }

    async function updateDate(newDiv: HTMLDivElement, index: any, item: string, amount: string, comment: string, date: string, purchase: string): Promise<void> {
            console.log("checkbox");
            var dateObj: Date = new Date();
            var month: number = dateObj.getUTCMonth() + 1; //months from 1-12
            var day: number = dateObj.getUTCDate();
            var year: number = dateObj.getUTCFullYear();


            var NewDate: string = year + "-" + month + "-" + day;  
           
            newDiv.innerHTML = NewDate + " " + amount + " " + item + " " + comment + " " + purchase;

            let newContainer: HTMLDivElement = document.createElement("div");
            newContainer.id = "containerIcons";
            newDiv.appendChild(newContainer);
    
            let newCheckbox: HTMLInputElement = document.createElement("input");
            newCheckbox.type = "checkbox";
            newCheckbox.name = "Checkbox";
            newContainer.appendChild(newCheckbox);
    
            let newEdit: HTMLDivElement = document.createElement("div");
            newEdit.innerHTML = "<img id='edit' src='./pen-solid.svg'>";
            newContainer.appendChild(newEdit);
    
            let newTrash: HTMLDivElement = document.createElement("div");
            newTrash.innerHTML = "<img id='trash' src='./trash-solid.svg'>";
            newCheckbox.id = "trash";
            newContainer.appendChild(newTrash);
    
            newEdit.addEventListener("click", function (): void {
                editItem(newDiv, item, amount, comment, date, index);
            });
    
            newTrash.addEventListener("click", function (): void {
                deleteItem(newDiv, index);
            });
    
            newCheckbox.addEventListener("click", function (): void {
                updateDate(newDiv, index, item, amount, comment, date, purchase);
            });
            let json: FormDataJSON = {NewDate};
            let newJSON: string = JSON.stringify(json);
            
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "update");
            query.set("collection", "data");
            query.set("id", index);
            console.log(index + "index");  
            query.set("data", newJSON   );
            console.log(query);
        
            

            let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
            console.log("data sent");

    }
    //löscht ein Item bei click auf trash
    async function deleteItem(newDiv: HTMLDivElement, index: any): Promise<void> {
        newDiv.parentElement.removeChild(newDiv);
        let query: URLSearchParams = new URLSearchParams();
       
      
        query.set("command", "delete");
        query.set("collection", "data");
        query.set("id", index.toString());  

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());

        console.log("deletet");

    }

    //editiert ein Item bei click auf edit
    async function editItem(newDiv: HTMLDivElement, item: string, amount: string, comment: string, date: string, index: any): Promise<void> {
        let itemx: HTMLInputElement = document.querySelector("input#inputx");
        itemx.value = item;
        let amountx: HTMLInputElement = document.querySelector("input#amountx");
        amountx.value = amount.toString();
        let commentx: HTMLInputElement = document.querySelector("input#commentx");
        commentx.value = comment;
        let datex: Element = document.querySelector("input#datex");
        datex.value = date;

   

      
        deleteItem(newDiv, index); 



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

