//Defining the required variables
const form = document.querySelector('form');
const groceryList = document.querySelector('ul.list-group');
const nameInput = document.querySelector('#itemName');
const quantityInput = document.querySelector('#itemQuantity');

loadEvents();


function loadEvents(){
    document.addEventListener('DOMContentLoaded', getItems);
    form.addEventListener('submit', addItem);
    groceryList.addEventListener('click', removeItem);
}

function getItems(){                                                                                            let items = [];
    if(localStorage.getItem('items') == null){
        return;
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
        items.forEach(element => {
            let li = document.createElement('li');
            li.className = "alert alert-warning";
            li.style.listStyle = "none";
            li.appendChild(document.createTextNode(element.itemName + "  :  " + element.itemQuantity));
            
            const deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-sm btn-danger float-right ml-2";
            deletebtn.appendChild(document.createTextNode("Delete"));
            li.appendChild(deletebtn);
            
            const correctButton = document.createElement('button');
            correctButton.className = "btn btn-sm btn-success float-right";
            correctButton.appendChild(document.createTextNode("Done"));
            li.appendChild(correctButton);

            groceryList.appendChild(li);
        });
    } 
}

function addItem(e){
    if(nameInput.value === "" || quantityInput.value === ""){
        alert("Please Enter values");
        return;
    }
    
    const li = document.createElement('li');
    li.className = "alert alert-warning";
    li.style.listStyle = "none";
    li.appendChild(document.createTextNode(nameInput.value + "  :  " + quantityInput.value));
    
    const deletebtn = document.createElement('button');
    deletebtn.className = "btn btn-sm btn-danger float-right ml-2";
    deletebtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(deletebtn);

    const correctButton = document.createElement('button');
    correctButton.className = "btn btn-sm btn-success float-right";
    correctButton.appendChild(document.createTextNode("Done"));
    li.appendChild(correctButton);
    
    storeLocally(nameInput.value, quantityInput.value);
    
    nameInput.value = "";
    quantityInput.value = "";
    groceryList.appendChild(li);


    e.preventDefault();
}

function storeLocally(item, quantity){
    let items;
    if(localStorage.getItem('items') == null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push({"itemName": item, "itemQuantity": quantity});
    localStorage.setItem('items', JSON.stringify(items));
}


function removeItem(e){
    if(e.target.classList.contains("btn-success")){
        e.target.parentElement.className = "alert alert-success";
        e.target.style.display = "none";
    }
    else if(e.target.classList.contains("btn-danger")){
        e.target.parentElement.remove();
        removeFromLocal(e.target.parentElement);
    }

}

function removeFromLocal(item){
    console.log(item.textContent);
    let content = item.textContent;
    content = content.split(":");
    content[0] = content[0].trim();
    content[1] = content[1].trim().slice(0, content[1].length - 12);
    let items;
    if(localStorage.getItem('items') == null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.forEach((element, index) => {
        if(content[0] === element['itemName']){
            items.splice(index, 1)
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}

