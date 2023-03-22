import  {books} from "../data/data.js";

let selectedRow = null;
const tbody = document.getElementById("table-body");
const id = document.getElementById("id");
const name = document.getElementById("name");
const genre = document.getElementById("genre");
const available = document.getElementById("Available");
const unavailable = document.getElementById("Unavailable");
const form = document.getElementById("form");
const searchForm= document.querySelector(".search");
const searchInput = document.getElementById("inputSearch");
let found = [];
let targetName;

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
            <button class="update" name="${item.id}">Update</button></td>
        `;
    container.appendChild(row);
    selectedRow = null;
    });
    found = [];
}

const clearFields=(valuesForm)=>{
    valuesForm.forEach(input=>{
        if(input.id && input.classList!="radio"){
            input.value = "";
        }
        if(input.id=="Available"){
            input.checked = true;
        }
    })
}

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
        id.value = selectedRow.children[0].textContent;
        name.value = selectedRow.children[1].textContent;
        genre.value = selectedRow.children[2].textContent;
        if(selectedRow.children[3].textContent == "Available"){
            available.checked = true;
        }else{
            unavailable.checked = true;
        }

        targetName = target.name;
    }
})


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { target } = event;
   
    const valuesForm = Object.values(form);
    if(!selectedRow){
    if(name.value &&id.value &&genre.value){

        const newBook = {};

        valuesForm.forEach((input)=>{
            if(input.id){
                if(input.className=="radio" && input.checked){
                    newBook[input.name] = input.value;
                }
                if(input.id!=="Available" && input.id!=="Unavailable"){
                        newBook[input.id] = input.value;
                }   
            }
        });
    
        let search = books.find(book=>book.id==newBook.id);

        if(!search){
            books.push(newBook);
    
            Swal.fire('Book saved')
        }else{
            Swal.fire('Id already exists, try again')
        }
      
        clearFields(valuesForm);
        print(books, tbody);
    }else{
        Swal.fire('Fill all the inputs');
    }
   }else{
        books.forEach(book=>{
            if(targetName==book.id){
                let search = books.find(book=>book.id==id.value);

                if(book.id==id.value||(book.id!==id.value && !search)){
                    book.id = id.value;
                    book.name = name.value;
                    book.genre = genre.value;

                    if(available.checked){
                        book.status = available.value;
                    }else{
                        book.status = unavailable.value;
                    }
                    Swal.fire('Book successfully updated');
                }else{

                    if(search){
                        Swal.fire('Id already exists, try again');
                    }
                }
            }
        })
        
        print(books, tbody);

        clearFields(valuesForm);
       
   }
  });

