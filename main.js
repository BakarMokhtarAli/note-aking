const noteArea = document.querySelector('.note-area')
const noteTittle = document.querySelector('.tittle')
const noteTex = document.querySelector('.note-text')
const notes = document.querySelector('.notes')


const showNoteArea = () => {
    noteTex.style = 'display:block';
    noteTex.classList.add('note-now')
}

const hideNote = () =>{
    noteTex.style = 'display:none';
    noteTex.classList.remove('note-now')
}

const addNoteText = (tittle,text) => {
    notes.innerHTML += `
    <div class="note" id="note">
    <h3 class="tittle-tex" id="tittle-text">${tittle}</h3>
    <p class="note-blog">${text}</p>
    <i class="fa fa-trash-can"></i>
    </div>`;
    noteTittle.value = '';
    noteTex.value = '';

}


const addToLocalStorage = (note) => {
    if(note.length < 0){
        return;
    }
    let oldNote ;
    if(localStorage.getItem('notes')===null){
        oldNote = []
    }else{
        oldNote = JSON.parse(localStorage.getItem('notes'))
    }

    oldNote.push(note)
    localStorage.setItem('notes',JSON.stringify(oldNote))
}

const getLocalStorage = () => {
    let oldNote = [];
    if(localStorage.getItem('notes')===null){
        oldNote = []
    }else{
        oldNote = JSON.parse(localStorage.getItem('notes'))
    }

    oldNote.forEach( note => {
        notes.innerHTML +=`
        <div class="note" id="note">
        <h3 class="tittle-tex" id="tittle-text">${note[0]}</h3>
        <p class="note-blog">${note[1]}</p>
        <i class="fa fa-trash-can"></i>
        </div>`
    })

}

document.addEventListener('DOMContentLoaded',getLocalStorage)

noteTittle.addEventListener('click', (e) =>{
    e.preventDefault();
    showNoteArea();
})

document.addEventListener('click', (e)=>{
    if(!noteArea.contains(e.target)){
        hideNote();
        if(noteTittle.value || noteTex.value){
            addToLocalStorage([noteTittle.value,noteTex.value]);
            addNoteText(noteTittle.value,noteTex.value)
        }
        
    }
})

document.addEventListener('mouseover', (e) =>{
    if(e.target.classList.contains('note')){
        e.target.querySelector('i').classList.add('show')
    }
})

document.addEventListener('mouseout', (e) =>{
    if(e.target.classList.contains('note')){
        e.target.querySelector('i').classList.remove('show')
    }
})

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-trash-can')){
        e.target.parentElement.remove();
        deleteLocalStoragea(e.target.parentElement)
    }
})

function deleteLocalStoragea(e){
    let oldNote = [];
    if(localStorage.getItem('notes')===null){
        oldNote = []
    }else{
        oldNote = JSON.parse(localStorage.getItem('notes'))
    }

    oldNote.map( (note,index) =>{
        if(note[0] === e.children[0].textContent && note[1]===e.children[1].textContent){
            oldNote.splice(index,1)
            return oldNote
        }
    })

    localStorage.setItem('notes',JSON.stringify(oldNote))
    
}