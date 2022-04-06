let addButton = document.getElementById("add");
const updateLSData =()=>{

    const textAreaData = document.querySelectorAll('textarea'); // it is an array formate
    // console.log(textAreaData);
    const notes = [];
    textAreaData.forEach((elem)=>{
        notes.push(elem.value);
    });

    // console.log(notes);

    localStorage.setItem('myNotes',JSON.stringify(notes));
};

const addNewNote = (text = '')=>{

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    
    <div class="operation">
    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
</div>

<div class="main ${text ? "": "hidden"}"></div>
<textarea class="${text ? "hidden":""}"></textarea> `;

note.insertAdjacentHTML('afterbegin',htmlData);

// console.log(note);

// getting references

const editButton = note.querySelector('.edit');
const deleteButton = note.querySelector('.delete');
const mainDiv = note.querySelector('.main');
const textarea = note.querySelector('textarea');


// deleting a note

deleteButton.addEventListener('click',()=>{
    note.remove();
    updateLSData();
});

// edting a note
textarea.value= text;
mainDiv.innerHTML= text;

editButton.addEventListener('click',()=>{
    mainDiv.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
});

textarea.addEventListener('change',(event)=>{

    const val = event.target.value;
    mainDiv.innerHTML= val;

    updateLSData();

})


document.body.appendChild(note);

}


// Getting localStorage data back

const file = JSON.parse(localStorage.getItem('myNotes'));

if(file){
    file.forEach((elem)=> addNewNote(elem));
}

addButton.addEventListener('click',()=>addNewNote());