import  {books} from "../data/data.js";

let selectedrow = null;
const tbody = document.getElementById("table-body");
const id = document.getElementById("id");
const name = document.getElementById("name");
const genre = document.getElementById("genre");
const available = document.getElementById("available");
const unavailable = document.getElementById("unavailable");
const form = document.getElementById("form");
const searchForm= document.querySelector(".search");
const searchInput = document.getElementById("inputSearch");

const print = (list, container) =>{
    container.innerHTML = "";
    list.forEach((item)=>{
        const row = document.createElement("tr");
        row.classList.add("table-row");
        row.innerHTML =`
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.genre}</td>
        <td>${item.status}</td>
        <td><button class="delete" name="${item.id}">Delete</button>
            <button class="edit" name="${item.id}">Update</button></td>
        `;
    container.appendChild(row);
    selectedrow = null;
    });
    found = [];
}


let found = [];
print(books, tbody);


searchForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    let inputValue = searchInput.value;
    let boolfound = false;

    if(inputValue!==""){
        books.forEach((book)=>{
            let idSearch = book.id;

            if(idSearch.match(inputValue)){
                found.push(book);
                boolfound = true;
                print(found, tbody);
            }
        })
        if(!boolfound){
            Swal.fire('Id does not exist, try again')
        } 
    }else{
        print(books, tbody);
    }
})

document.addEventListener("click",(event)=>{
    const { target } = event;

    if(target.classList.contains("delete")){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7f96ff',
            cancelButtonColor: '#d44b52',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const idBook = target.name;
                const position = books.findIndex(book=>book.id=idBook);
                books.splice(position,1);
              Swal.fire(
                'Deleted!',
                'This book has been deleted.',
                'success'
              )
              print(books,tbody);
            }
          })
    }
})