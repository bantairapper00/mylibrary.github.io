function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {
    
}

Display.prototype.add = function (bookObj) {
    tableBOdy = document.getElementById("table-body");
    tableBOdy.innerHTML = "";
    Array.from(bookObj).forEach(function (element,index) {
        tableBOdy.innerHTML +=
        `<tr class="table-content">
            <td>${index+1}</td>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><img onClick="deleteBook(${index})" src="./images/delete.png" class="deleteBtn"></td>
        </tr>`
    });
}

function deleteBook(index){
    console.log("clicked")
    let bookObj = JSON.parse(localStorage.getItem("book"));
    bookObj.splice(index, 1);
    localStorage.setItem("book", JSON.stringify(bookObj));
    display.add(bookObj);
}

Display.prototype.validate = function(myBook){
    if(myBook.name.length < 2 || myBook.author.length < 2 || myBook.type == undefined){
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.clear = function () {
    let libraryform = document.getElementById("library-form");
    libraryform.reset();
}


let oldBook = JSON.parse(localStorage.getItem("book"));
let display = new Display;
if(oldBook != null)
    display.add(oldBook);

let addBtn = document.getElementById("addbookBtn");
addBtn.addEventListener("click", function () {
    console.log("harry");
    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let fiction = document.getElementById("fic");
    let cp = document.getElementById("cp");
    let manga = document.getElementById("manga");
    let cooking = document.getElementById("cooking");
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (cp.checked) {
        type = cp.value;
    }
    else if (manga.checked) {
        type = manga.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let oldBook = localStorage.getItem("book");

    if (oldBook == null) {
        bookObj = [];
    }
    else {
        bookObj = JSON.parse(oldBook);
    }
    
    let myBook = new Book(name, author, type);
    let display = new Display();
    if(display.validate(myBook)){
        bookObj.push(myBook);
        localStorage.setItem("book", JSON.stringify(bookObj));
        display.add(bookObj);
    }
    else{
        alert("Wrong input!")
    }
    
    display.clear();
})


let search = document.getElementById("searchBox");
search.addEventListener("input", function(){
    console.log("hello");
    let input = search.value;
    console.log(input)
    let tableContent = document.getElementsByClassName("table-content");
    Array.from(tableContent).forEach(function(element, index){
        let num = element.getElementsByTagName("td")[0].innerText;
        let name = element.getElementsByTagName("td")[1].innerText;
        let author = element.getElementsByTagName("td")[2].innerText;
        let type = element.getElementsByTagName("td")[3].innerText;

        if(num.includes(input) || name.includes(input) || author.includes(input) || type.includes(input)){
            element.style.display = "table-row"
        }
        else{
            element.style.display = "none";
        }
    })

})


