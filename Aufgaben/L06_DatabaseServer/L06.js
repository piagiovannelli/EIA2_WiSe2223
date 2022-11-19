/*
 Aufgabe:L06_DatabaseServer
 Name: Pia Giovannelli
 Matrikel: 271245
 Datum: 19.11.22
 Quellen: Bastian Aberle, Aanya Khetarpal, Lisa Blindenhöfer, Cindy Nguyen., w3schools
*/
var a06_shoppinglist;
(function (a06_shoppinglist) {
    window.addEventListener("load", handleload);
    async function handleload() {
        document.querySelector("#add").addEventListener("click", handleaddbutton);
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php/?command=find&collection=data");
        let report = await response.text();
        let inputs = JSON.parse(report);
        loaddata(inputs);
    }
    function handleaddbutton() {
        submitbutton();
        addList();
    }
    //sendet
    async function submitbutton() {
        let formData = new FormData(document.forms[0]);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));
        console.log("data sent");
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        console.log(response);
        alert("sent");
    }
    function loaddata(inputs) {
        console.log("load data");
        let newlist = [];
        for (let index in inputs.data) {
            newlist.push(index);
            console.log(index + "index");
        }
        for (let counter of newlist) {
            console.log(inputs.data[counter].Product);
            let amount = inputs.data[counter].Amount;
            let product = inputs.data[counter].Product;
            let comment = inputs.data[counter].Comment;
            let element = document.getElementById("checkboxdate");
            let nextpurchase;
            if (element.checked) {
                nextpurchase = " buy";
            }
            else {
                nextpurchase = " ";
            }
            let dateoftoday = new Date();
            let nextelement = document.createElement("div");
            nextelement.classList.add("inputData");
            nextelement.innerHTML = dateoftoday.toLocaleDateString() + "   " + product + "   " + amount + "   " + comment + "   " + nextpurchase;
            var getelement = document.querySelector("#alloutputs");
            getelement.appendChild(nextelement);
            let listcheck = document.createElement("input");
            listcheck.type = "checkbox";
            listcheck.name = "Checkbox1";
            listcheck.className = "checkbox1";
            nextelement.appendChild(listcheck);
            let listtrash = document.createElement("div");
            listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
            nextelement.appendChild(listtrash);
            let listedit = document.createElement("div");
            listedit.className = "edit";
            listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
            nextelement.appendChild(listedit);
            listtrash.addEventListener("click", function () {
                deletelistelement(nextelement, counter);
            });
            listedit.addEventListener("click", function () {
                editlistelement(nextelement, product, amount, comment, counter);
            });
            listcheck.addEventListener("click", function () {
                daterefresh(nextelement, product, amount, comment, nextpurchase, counter);
            });
        }
    }
    function addList() {
        let data = new FormData(document.forms[0]);
        let product = data.get("Product")?.toString();
        let amount = Number(data.get("Amount"));
        let comment = data.get("Comment")?.toString();
        let dateoftoday = new Date();
        let element = document.getElementById("checkboxdate");
        let nextpurchase;
        if (element.checked) {
            nextpurchase = " buy";
        }
        else {
            nextpurchase = " ";
        }
        let nextelement = document.createElement("div");
        nextelement.classList.add("inputData");
        nextelement.innerHTML = dateoftoday.toLocaleDateString() + "   " + product + "   " + amount + "   " + comment + "   " + nextpurchase;
        var getelement = document.querySelector("#alloutputs");
        getelement.appendChild(nextelement);
        let listcheck = document.createElement("input");
        listcheck.type = "checkbox";
        listcheck.name = "Checkbox1";
        listcheck.className = "checkbox1";
        nextelement.appendChild(listcheck);
        let listtrash = document.createElement("div");
        listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
        nextelement.appendChild(listtrash);
        let listedit = document.createElement("div");
        listedit.className = "edit";
        listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
        nextelement.appendChild(listedit);
        listtrash.addEventListener("click", function () {
            deletelistelement(nextelement, counter);
        });
        listedit.addEventListener("click", function () {
            editlistelement(nextelement, product, amount, comment, counter);
        });
        listcheck.addEventListener("click", function () {
            daterefresh(nextelement, product, amount, comment, nextpurchase, counter);
        });
        let inputproductname = document.getElementById("inputproduct");
        inputproductname.value = "";
        let inputamount = document.getElementById("amount");
        inputamount.value = "";
        let inputcomment = document.getElementById("inputcomment");
        inputcomment.value = "";
        setTimeout(function () {
            location.reload();
        }, 2000);
    }
    async function daterefresh(nextelement, product, amount, comment, nextpurchase, counter) {
        console.log("date");
        let dateoftodaynew = new Date();
        nextelement.innerHTML = dateoftodaynew.toLocaleDateString() + "   " + product + "   " + amount + "   " + comment + "   " + nextpurchase;
        let listcheck = document.createElement("input");
        listcheck.type = "checkbox";
        listcheck.name = "Checkbox1";
        listcheck.className = "checkbox1";
        nextelement.appendChild(listcheck);
        let listtrash = document.createElement("div");
        listtrash.innerHTML = "<i id='trash' class='fa-solid fa-trash-can'></i>";
        nextelement.appendChild(listtrash);
        let listedit = document.createElement("div");
        listedit.className = "edit";
        listedit.innerHTML = "<i id ='edit' class='fa-regular fa-pen-to-square'></i>";
        nextelement.appendChild(listedit);
        listtrash.addEventListener("click", function () {
            deletelistelement(nextelement, counter);
        });
        listedit.addEventListener("click", function () {
            editlistelement(nextelement, product, amount, comment, counter);
        });
        listcheck.addEventListener("click", function () {
            daterefresh(nextelement, product, amount, comment, nextpurchase, counter);
        });
        let newdate = dateoftodaynew.toLocaleDateString();
        let json = { newdate };
        let query = new URLSearchParams();
        query.set("command", "update");
        query.set("collection", "data");
        query.set("data", JSON.stringify(json));
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        console.log("date refreshed");
    }
    async function deletelistelement(nextelement, counter) {
        nextelement.parentElement.removeChild(nextelement);
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "data");
        query.set("id", counter.toString());
        let response = await fetch("https://webuser.hs-furtwangen.de/~giovanne/Database/index.php?" + query.toString());
        console.log("delete");
    }
    function editlistelement(nextelement, product, amount, comment, counter) {
        console.log("edit list element");
        let input1 = document.querySelector("input#inputproduct");
        input1.value = product;
        let input2 = document.querySelector("input#amount");
        input2.value = amount.toString();
        let input3 = document.querySelector("input#inputcomment");
        input3.value = comment;
        deletelistelement(nextelement, counter);
    }
})(a06_shoppinglist || (a06_shoppinglist = {}));
//# sourceMappingURL=L06.js.map