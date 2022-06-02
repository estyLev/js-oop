//בס"ד

//------------------------------
//classes
//------------------------------
class Product {
    name;
    code;
    categoryCode;
    price;
    units;

    constructor(name, code, categoryCode, price, units) {
        this.name = name;
        this.code = code;
        this.categoryCode = categoryCode;
        this.price = price;
        this.units = units;
    }

    get getName() { return this.name }
    set setName(name) {
        this.name = name;
    }

    set setPrice(price) {
        this.price = price;
    }

    set setUnits(units) {
        if (units >= 0)
            this.units = units;
    }

    addToStack = (sum) => {
        if (this.units + sum > 0)
            this.units += sum
    }

}


class ProducstList {

    productsList = []

    constructor() { };

    get getProducts() { return this.productsList }

    addProduct = (name, code, categoryCode, cost, units) => {

        let product = new Product(name, code, categoryCode, cost, units);
        this.productsList.push(product);

    }

    removeProduct = (code) => {

        let index = this.productsList.findIndex(x => x.code === code);
        this.productsList.splice(index, 1)

    }

    getProductByCode = (code) => {
        let index = this.productsList.findIndex(x => x.code === code);
        return this.productsList[index]
    }

    getProductByCategoryCode = (code) => {
        let index = this.productsList.findIndex(x => x.categoryCode === code);
        return this.productsList[index]
    }

    getProductByPrice = (price, range) => {
        let products = this.productsList.filter(x => x.price - price <= range && x.price - price >= -range);
        return products
    }
    getoutOfStackProducts = () => {
        let products = this.productsList.filter(x => x.units < 3);
        return products
    }
}

class Category {
    constructor(categoryCode, categoryName) {
        this.categoryCode = categoryCode;
        this.categoryName = categoryName;
    }
}
class CategoryList {

    categoryList = []
    addCategory = (categoryCode, categoryName) => {
        let category = new Category(categoryCode, categoryName);
        this.categoryList.push(category)
    }


}

class Manager {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    get getId() { return this.id };
    get getName() { return this.name }
}

//------------------------------
//fiels
//------------------------------
let producstList = new ProducstList();
let manager = new Manager(1234, "esty")
let categoryList = new CategoryList()

categoryList.addCategory(10, "computers")
categoryList.addCategory(20, "usb-drives")

producstList.addProduct("dell-computer", 001, 10, 3500, 30)
producstList.addProduct("lenovo-cocmputer-2000", 002, 10, 2500, 25)
producstList.addProduct("sandisk-usb 8gb", 003, 20, 30, 2)
producstList.addProduct("sandisk-usb 32gb", 004, 20, 45, 3)
producstList.addProduct("lenovo-cocmputer-2012", 005, 10, 3000, 10)
producstList.addProduct("dell-touch-cocmputer", 006, 10, 6000, 1)



//------------------------------
//logic functions
//------------------------------

const checkDetails = (e) => {

    let pass = document.getElementById("pass").value
    let name = document.getElementById("name").value

    if (pass == manager.getId && name == manager.getName)
        location.replace("file:///C:/%D7%90%D7%A1%D7%AA%D7%99%20%D7%9C%D7%91/Js-oop/html/store.html")
    else
        alert("you have no manager premition")


}

const addProductEvent = () => {
    //get the form elements from the dom and show them

    let details = document.getElementById("details")
    details.style.display = ""

    let name = document.getElementById('name')
    let code = document.getElementById("code")
    let categoryCode = document.getElementById("categoryCode")
    let price = document.getElementById("price")
    let units = document.getElementById("units")
    let addSubmit = document.getElementById("addSubmit")
    let cancel = document.getElementById("cancel")


    name.style.display = "block"
    code.style.display = "block"
    categoryCode.style.display = "block"
    price.style.display = "block"
    units.style.display = "block"
    addSubmit.style.display = "block"
    cancel.style.display = "block"


    let removeSubmit = document.getElementById("removeSubmit")
    removeSubmit.style.display = "none"


}
const addProduct = () => {

    let name = document.getElementById("name")
    let code = document.getElementById("code")
    let categoryCode = document.getElementById("categoryCode")
    let price = document.getElementById("price")
    let units = document.getElementById("units")
    let addSubmit = document.getElementById("addSubmit")
    let cancel = document.getElementById("cancel")


    name.style.display = "none"
    cancel.style.display = "none"
    code.style.display = "none"
    categoryCode.style.display = "none"
    price.style.display = "none"
    units.style.display = "none"
    addSubmit.style.display = "none"

    producstList.addProduct(name.value, code.value, categoryCode.value, price.value, units.value);
    console.log(producstList);


}

const removeProductEvent = () => {

    let details = document.getElementById("details")
    details.style.display = ""

    let name = document.getElementById("name")
    let categoryCode = document.getElementById("categoryCode")
    let price = document.getElementById("price")
    let units = document.getElementById("units")
    let addSubmit = document.getElementById("addSubmit")
    let cancel = document.getElementById("cancel")


    name.style.display = "none"
    categoryCode.style.display = "none"
    price.style.display = "none"
    units.style.display = "none"
    addSubmit.style.display = "none"

    cancel.style.display = "block"



    let code = document.getElementById("code")
    let removeSubmit = document.getElementById("removeSubmit")

    code.style.display = "block"
    code.value = ""
    removeSubmit.style.display = "block"

}

const removeProduct = () => {
    let code = document.getElementById("code")
    let removeSubmit = document.getElementById("removeSubmit")
    let cancel = document.getElementById("cancel")



    cancel.style.display = "none"
    code.style.display = "none"
    removeSubmit.style.display = "none"

    let details = document.getElementById("details")
    details.style.display = "none"

    producstList.removeProduct(parseInt(code.value))
    console.log(producstList);
}

const editProduct = () => {

    let codeInput = document.createElement("input")
    codeInput.setAttribute("id", "code")
    codeInput.setAttribute("placeholder", "enter product code")
    codeInput.setAttribute("type", "number")

    codeInput.addEventListener("blur", (e) => {
        let code = parseInt(e.target.value)
        e.target.parentNode.removeChild(e.target)
        let product = producstList.getProductByCode(code)

        let form = document.createElement("form")
        form.setAttribute('id', 'editForm')

        let newValue = document.createElement("input")
        newValue.setAttribute('id', 'newValue')
        newValue.setAttribute('type', 'text')
        newValue.setAttribute('placeholder', 'enter new value')
        form.appendChild(newValue)

        let massege = document.createElement("p")
        massege.setAttribute('id', 'massege')
        form.appendChild(massege)


        let addToStack = document.createElement("input")
        addToStack.setAttribute('id', 'addToStack')
        addToStack.setAttribute('type', 'button')
        addToStack.value = "add to stack"
        addToStack.addEventListener("click", () => {

            if (newValue.value != "") {
                product.addToStack(parseInt(newValue.value))
              }
         massege.innerText = `the update for product ${product.code} units is ${product.units}`

        })
        form.appendChild(addToStack)

        let reducefromStack = document.createElement("input")
        reducefromStack.setAttribute('id', 'reducefromStack')
        reducefromStack.setAttribute('type', 'button')
        reducefromStack.value = "reduce from stack"
        reducefromStack.addEventListener("click", () => {

            if (newValue.value != "") {
                product.addToStack(-parseInt(newValue.value))
                }
         massege.innerText = `the update units for product ${product.code} units is ${product.units}`

        })
        form.appendChild(reducefromStack)

        let updatePrice = document.createElement("input")
        updatePrice.setAttribute('id', 'updatePrice')
        updatePrice.setAttribute('type', 'button')
        updatePrice.value = "update price"
        updatePrice.addEventListener("click", () => {

            if (newValue.value != "") {
                product.setPrice = parseInt(newValue.value)
            }
            massege.innerText = `the update price for product ${product.code}  is ${product.price}`

        })
        form.appendChild(updatePrice)


        let updateName = document.createElement("input")
        updateName.setAttribute('id', 'updateName')
        updateName.setAttribute('type', 'button')
        updateName.value = "update name"
        updateName.addEventListener("click", () => {

            if (newValue.value != "") {
                product.setName = newValue.value
                }
         massege.innerText = `the update name for product ${product.code} is ${product.name}`

        })
        form.appendChild(updateName)


        let closeBtn = document.createElement("input")
        closeBtn.setAttribute('id', 'close')
        closeBtn.setAttribute("type", "button")
        closeBtn.value = "close"
        closeBtn.addEventListener("click", () => {

            let editForm = document.getElementById("editForm")
            form.parentNode.removeChild(editForm)
        })
        form.appendChild(closeBtn)

        document.body.appendChild(form)

    })
    document.body.appendChild(codeInput)

}

//function tha creat a table and show all the products
const viewProducts = () => {
    let myTable = document.getElementById("myTable")
    myTable.parentNode.removeChild(myTable)
    creatTable()
    let table = document.getElementById("myTable")
    table.style.display = ""

    let details = document.getElementById("details")
    details.style.display = "none"

}

const searchEvent = () => {

    let myInput = document.getElementById("myInput")
    myInput?.parentNode.removeChild(myInput)
    let range = document.getElementById("range")
    range.style.display = "none"


    let selected = document.getElementById("search").value
    let input = document.createElement("input")
    input.setAttribute("id", "myInput")
    input.setAttribute("placeholder", "search...")

    if (selected == "name")
        input.addEventListener("keyup", searchByName)
    else if (selected == "category")
        input.addEventListener("keyup", searchByCategory)
    else if (selected == "price") {
        input.addEventListener("keyup", searchByPrice)
        let range = document.getElementById("range")
        range.style.display = ""
    }

    viewProducts()


    if (selected == "out of stack") {
        searchOutOfStack()
        input.style.display = "none"
    }

    let parentSearch = document.getElementById("parentSearch")
    parentSearch.appendChild(input)

}
const searchByName = () => {

    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}
const searchByCategory = () => {

    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = parseInt(input.value)
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = parseInt(td.innerText);
            if (txtValue == producstList.getProductByCategoryCode(filter)?.categoryCode) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

const searchByPrice = () => {

    // Declare variables
    let input, filter, table, tr, td, i, txtValue, range;
    input = document.getElementById("myInput");
    filter = parseInt(input.value)
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    range = document.getElementById("range").value

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = parseInt(td.innerText);
            let products = producstList.getProductByPrice(filter, range)
            let flag = 0
            for (let j = 0; j < products.length; j++) {
                const product = products[j];
                if (txtValue == product.price) {
                    tr[i].style.display = "";
                    flag = 1
                }
            }
            if (!flag)
                tr[i].style.display = "none";


        }
    }

}
const searchOutOfStack = () => {

    // Declare variables
    let input, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");

    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = parseInt(td.innerText);
            let products = producstList.getoutOfStackProducts()
            let flag = 0
            for (let j = 0; j < products.length; j++) {
                const product = products[j];
                if (txtValue == product.code) {
                    tr[i].style.display = "";
                    flag = 1
                }
            }
            if (!flag)
                tr[i].style.display = "none";


        }
    }


}
//creating a form to get the details from the manager
const creatFormElements = () => {

    let header = document.getElementById("header")
    header.innerText = `wellcome ${manager.getName}`

    let details = document.createElement("div")
    details.setAttribute("id", "details")

    let nameInput = document.createElement("input")
    nameInput.setAttribute("id", "name")
    nameInput.setAttribute("placeholder", "enter product name")
    nameInput.style.display = "none"
    nameInput.setAttribute("type", "text")
    details.appendChild(nameInput)

    let codeInput = document.createElement("input")
    codeInput.setAttribute("id", "code")
    codeInput.setAttribute("placeholder", "enter product code")
    codeInput.style.display = "none"
    codeInput.setAttribute("type", "number")
    details.appendChild(codeInput)


    let categoryInput = document.createElement("input")
    categoryInput.setAttribute("id", "categoryCode")
    categoryInput.setAttribute("placeholder", "enter product category code")
    categoryInput.style.display = "none"
    categoryInput.setAttribute("type", "number")
    details.appendChild(categoryInput)

    let priceInput = document.createElement("input")
    priceInput.setAttribute("id", "price")
    priceInput.setAttribute("placeholder", "enter product price")
    priceInput.style.display = "none"
    priceInput.setAttribute("type", "number")
    details.appendChild(priceInput)

    let unitsInput = document.createElement("input")
    unitsInput.setAttribute("id", "units")
    unitsInput.setAttribute("placeholder", "enter product units")
    unitsInput.style.display = "none"
    unitsInput.setAttribute("type", "number")
    details.appendChild(unitsInput)

    //creating a submit button with addEventListiner thet refer to the addProduct()
    let addSubmit = document.createElement("input")
    addSubmit.setAttribute("id", "addSubmit")
    addSubmit.setAttribute("value", "OK")
    addSubmit.setAttribute("type", "button")
    addSubmit.style.display = "none"
    addSubmit.addEventListener("click", addProduct)
    details.appendChild(addSubmit)

    //creating a submit button with addEventListiner thet refer to the removeProduct()
    let removeSubmit = document.createElement("input")
    removeSubmit.setAttribute("id", "removeSubmit")
    removeSubmit.setAttribute("value", "OK")
    removeSubmit.setAttribute("type", "button")
    removeSubmit.style.display = "none"
    removeSubmit.addEventListener("click", removeProduct)
    details.appendChild(removeSubmit)

    //creating a cancel button 
    let cancel = document.createElement("input")
    cancel.setAttribute("id", "cancel")
    cancel.setAttribute("value", "CANCEL")
    cancel.setAttribute("type", "button")
    cancel.style.display = "none"
    cancel.addEventListener("click", () => {
        let details = document.getElementById("details")
        details.style.display = "none"
    })
    details.appendChild(cancel)

    let range = document.getElementById("range")
    range.style.display = "none"

    details.style.display = "none"

    document.body.appendChild(details);
    creatTable()
}

const creatTable = () => {
    let table = document.createElement("table")
    table.setAttribute("id", "myTable")

    let header = document.createElement("tr")

    let name = document.createElement("th")
    name.innerText = "name"
    header.appendChild(name)
    let code = document.createElement("th")
    code.innerText = "code"
    header.appendChild(code)
    let categoryCode = document.createElement("th")
    categoryCode.innerText = "categoryCode"
    header.appendChild(categoryCode)
    let price = document.createElement("th")
    price.innerText = "price"
    header.appendChild(price)
    let units = document.createElement("th")
    units.innerText = "units"
    header.appendChild(units)

    table.appendChild(header)

    for (let i = 0; i < producstList.getProducts.length; i++) {

        const product = producstList.getProducts[i]
        let tr = document.createElement("tr")
        tr.setAttribute("class", "header")

        let tdName = document.createElement("td")
        tdName.innerText = product.getName
        tr.appendChild(tdName)

        let tdCode = document.createElement("td")
        tdCode.innerText = product.code
        tr.appendChild(tdCode)

        let tdCategory = document.createElement("td")
        tdCategory.innerText = product.categoryCode
        tr.appendChild(tdCategory)

        let tdPrice = document.createElement("td")
        tdPrice.innerText = product.price
        tr.appendChild(tdPrice)

        let tdUnits = document.createElement("td")
        tdUnits.innerText = product.units
        tr.appendChild(tdUnits)

        table.appendChild(tr)

    }


    let closeBtn = document.createElement("input")
    closeBtn.setAttribute("id", "close")
    closeBtn.setAttribute("type", "button")
    closeBtn.value = "close"
    closeBtn.addEventListener("click", () => {
        let table = document.getElementById("myTable")
        table.style.display = "none"
        let input = document.getElementById("myInput")
        input?.parentNode.removeChild(input)
        let range = document.getElementById("range")
        range.style.display = "none"
    })

    table.appendChild(closeBtn)
    table.style.display = "none"
    document.body.appendChild(table)

}