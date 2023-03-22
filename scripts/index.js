import  {books} from "../data/data.js";

let selectedRow = null;
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
    selectedRow = null;
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
                const position = books.findIndex(book=>book.id==idBook);
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

    if(target.classList.contains("update")){
        selectedRow = target.parentElement.parentElement;
        console.log(selectedRow);
    }
})


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { target } = event;
   
    const valuesForm = Object.values(form);
   if(!selectedrow){
    if(name.value!==""&&id.value!==""&&genre.value!==""){
        const newBook = {};
        valuesForm.forEach((input)=>{
            if(input.id){
                if(input.className=="radio" && input.checked){
                    newBook[input.name] = input.value;
                }
                if(input.id!=="available" && input.id!=="unavailable"){
                        newBook[input.id] = input.value;
                }   
            }
        });
    
        let idExists = false;
        books.forEach(book => {
            if(book.id==newBook.id){
                idExists = true;
            }
        })
        if(!idExists){
            books.push(newBook);
            console.log(genre.value);
            Swal.fire('Book saved')
        }else{
            Swal.fire('Id already exists, try again')
        }
      
        valuesForm.forEach(input=>{
            if(input.id && input.classList!="radio"){
                input.value = "";
            }
            if(input.id=="available"){
                input.checked = true;
            }
        })
        print(books, tbody);
    }else{
        Swal.fire('Fill al the inputs')
    }
   }else{

   }
  });