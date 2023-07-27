let form=document.getElementById("form");
let textInput=document.getElementById("textInput");
let msg=document.getElementById("msg");
let dateInput=document.getElementById("dateInput");
let textarea=document.getElementById("textarea");
let tasks=document.getElementById("tasks");
let add=document.getElementById("add")



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formValidation()
})


let formValidation =()=>{
    if(textInput.value === ""){
        console.log('failure');
        msg.innerHTML="Task Can't be blank.";
    }else{
        console.log('success');
        msg.innerHTML="";
        acceptData();
        add.setAttribute("data-dismiss","modal");
        add.click();

        (()=>{
            add.setAttribute("data-dismiss","");
        })
        ()
    }
};

let data=[{}];


// Collecting the data from inputs and pushing it into data Object
let acceptData=() => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));  //(key(can be anything),value(from data[]))
    
    console.log(data);
    createTasks();
};

//Using data Object to output it on the screen
let createTasks = () => {
    tasks.innerHTML = "";

    data.map((x,y) => {
        return  (tasks.innerHTML += `
        <div id=${y}>
            <span>${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
                <i onClick="editTask(this)" data-toggle="modal" data-target="#form" class="fas fa-edit"></i>
                <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    })
    
    resetForm();
};



//Delete the task
let deleteTask= (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

//Edit the task
let editTask = (e)=>{
    let selectedTask=e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

//Reset the form to blank again
let resetForm = () =>{
     textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

//IIFE
(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
    console.log(data);
})()