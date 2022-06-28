const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));

}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
      <div class="operation"> 
            <button class="edit"> <i class="fas fa-edit">Edit</i> </button>
            <button class="delete"> <i class="fas fa-trash-alt">Delete</i> </button>
            <button class="complete"><i class="fa fa-check">Complete</i></button> 
      </div> 
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    const comButton = note.querySelector('.complete');

    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })

    comButton.addEventListener('click', () => {
        var n = mainDiv.innerHTML;
        console.log(n);
        note.remove();
        updateLSData();
        const comp = document.createElement('div');
        comp.classList.add('comp');
        const comhtml = `<div class="comope">
        </div>
        <div class="notecom"><p class="c">${n}</p></div>`;
        
        comp.insertAdjacentHTML("afterbegin",comhtml);
        console.log(comp);
        document.getElementById('com').appendChild(comp);

    });

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updateLSData();
    })
    document.getElementById('pen').appendChild(note);




}

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) { notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => addNewNote());