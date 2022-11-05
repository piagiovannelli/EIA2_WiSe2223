namespace shoppinglistA04 {

    
    let item: string;
    let amount: number;
    let dateData: string;
    let comment: string;
    let nextPurchase: string;
    let amountItems: number = 0;

    
    window.addEventListener("load", loadList);

    
    function loadList(): void {
        document.querySelector("h2").addEventListener("click", loadInput);
        loadData();
    }

    
    function loadData(): void {
        for (let counter: number = 0; counter < savedInputs.length; counter++) {
            item = savedInputs[counter].savedItem;
            amount = savedInputs[counter].savedAmount;
            dateData = savedInputs[counter].savedDate;
            comment = savedInputs[counter].savedComment;

            
            let nextPurchaseString: string = savedInputs[counter].savedPurchase.toString();
            if (nextPurchaseString == "false") {
                nextPurchase = "";
            } else {
                nextPurchase = " buy";
            }
            
            loadItem();
        }

    }

     
    function loadInput(): void {

        let formData: FormData = new FormData(document.forms[0]);

        item = formData.get("Item").toString();
        amount = Number(formData.get("Amount"));
        dateData = new Date().toLocaleDateString();
        comment = formData.get("Area").toString();

       
        let nextPurchaseString: FormDataEntryValue = formData.get("Checkbox");

        if (nextPurchaseString == null) {
            nextPurchase = "";
        } else {
            nextPurchase = " buy";
        }
        
        loadItem();
    }

    
    function loadItem(): void {

        
        let newElement: HTMLDivElement = document.createElement("div");
        newElement.innerHTML = dateData + " " + amount + " " + item + " " + comment + " " + nextPurchase;
        let getElement: HTMLElement = document.querySelector("#output");
        getElement.appendChild(newElement);
        newElement.className = "outputItem" + amountItems;
        newElement.id = amountItems.toString();
        newElement.style.marginTop = "-10px";

       
        let newCheckbox: HTMLInputElement = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.name = "CheckboxName" + amountItems;
        getElement = document.querySelector("#output");
        getElement.appendChild(newCheckbox);
        newCheckbox.className = "checkbox" + amountItems;
        newCheckbox.id = "checkbox" + amountItems.toString();
        newCheckbox.name = "Checkbox" + amountItems.toString();
        
        newCheckbox.style.position = "relative";
        newCheckbox.style.left = "-85px";
        newCheckbox.style.top = "-14px";


       
        let newEdit: HTMLDivElement = document.createElement("div");
        newEdit.innerHTML = "<i class='fa-solid fa-pen fa-lg'></i>";
        getElement.appendChild(newEdit);
        newEdit.className = "edit" + amountItems;
        newEdit.id = "edit" + amountItems.toString();
        
        newEdit.style.position = "relative";
        newEdit.style.top = "-41px";
        newEdit.style.width = "20px";
        newEdit.style.left = "165px";

       
        let newTrash: HTMLDivElement = document.createElement("div");
        newTrash.innerHTML = "<img id='" + amountItems + "' " + "src='./trash-solid.svg'>";
        newElement.appendChild(newTrash);
        newTrash.className = "trash" + amountItems;
       
        newTrash.style.width = "15px";
        newTrash.style.position = "relative";
        newTrash.style.left = "250px";
        newTrash.style.top = "7px";
   
        
        document.querySelector(".trash" + amountItems).addEventListener("click", deleteItem);
        document.querySelector(".checkbox" +  amountItems).addEventListener("click", checkboxNextPurchase);
        document.querySelector(".edit" +  amountItems).addEventListener("click", editEntry);

        
        amountItems++;
    }

    //Funktion zum löschen eines Eintrags -> nimmt hier ID von dem jeweiligen Trash Element und löscht damit die zugehörigen Felder
    function deleteItem(_event: MouseEvent): void {
        console.log("delete");
        let x: string = (_event.target as Element).id;
        let outputElementId: HTMLElement = document.getElementById(x);
        let editElementId: HTMLElement = document.getElementById("edit" + x);
        let checkboxElementId: HTMLElement = document.getElementById("checkbox" + x);
        checkboxElementId.remove();
        outputElementId.remove();
        editElementId.remove();
    }

    //Funktion zum überprüfen ob etwas gekauft wurde oder nicht (für die checkbox unten) <- Funktioniert noch nicht
    function checkboxNextPurchase(_event: MouseEvent): void {
        console.log("Checkbox Liste: Click -> checkboxNextPurchase()");
        
    }

    //Funktion zum editieren von Einträgen
    function editEntry(): void {
        console.log("Edit click -> editEntry()");
    }
}