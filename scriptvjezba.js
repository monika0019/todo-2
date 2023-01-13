'use strict';


var saveBtn = document.getElementById('save');


let todoArray=[];

function idGen(){

        const idArray = todoArray.map(todoObject => todoObject.id);
        let newId;
        if (idArray.length===0){
                newId=1;
        }else{
                newId=Math.max(...idArray)+1;  
        }
        return newId;
}

let deleteBtn = document.getElementById('delete')
console.log(deleteBtn)

deleteBtn.addEventListener('click', function(e){
        e.target.previousSibling.remove();
        todoArray.pop()


        if(todoArray.length === 0) {
                e.target.style.display = 'none';
        }

})
        
saveBtn.addEventListener('click', function(e){
        //get title and description of task
        let title = document.getElementById("title").value;
        let desc = document.getElementById("desc").value;
        let prio = document.querySelector('input[name="priror"]:checked').value;

        //get date when created
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}.${month}.${year}`;


        //create task and add on beggining
        let todoItem = document.createElement('div')

        let idGen1 = idGen();
        // toggle delete button visibility
        if (idGen1 === 1){
                deleteBtn.style.display = 'block';
        }
        todoItem.className = 'todo-item'
        todoItem.dataset.id = idGen1;
        const todoContent = `
                <div class="date">Created: ${currentDate}</div>
                <div class="Naslov" id="jedan">${title}</div>
                <div class="desc">${desc}</div>
                <input type="checkbox" class="oznaci" name="done">
                `;
        
        todoItem.innerHTML = todoContent;


        const todoObject = {
                title:title,
                description:desc,
                date:currentDate,
                priority:prio,
                id:idGen1
        }
        

        todoArray.push(todoObject)
        
        
        document.querySelectorAll('div')
        document.querySelector('.todo-wrapper').insertBefore(todoItem, document.querySelector('.todo-wrapper').firstChild);

        if (localStorage.getItem('todoObject') !== null) {
                console.log('moja todo lista');
                console.log(localStorage.getItem('todoObject'));
                const todoString = localStorage.getItem('todoObject')
                console.log(todoString);
                console.log(JSON.parse(todoString));
            } else   {
                console.log('moja todo lista');
                localStorage.setItem('todoObject', JSON.stringify(todoObject));
            }
  
})

        
//event delegation
document.addEventListener('click', function(e){
        console.log(e.target)
        const parentDiv=e.target.closest('.todo-item')

        if(e.target.className=="delete"){
                e.target.previousSibling.remove();
        }
})


var list = document.querySelector('div');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'todo-item') {
    ev.target.classList.toggle('checked');
  }
}, false);


// na klik dohvaca vrijednosti, i to treba i na window load

