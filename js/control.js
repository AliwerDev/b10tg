import {addTask, showTask, removeTask,UpdateTask} from "./main.js";

//Const data
const userData = {
    userName: `AliwerDev`,
    image: "https://avatars.githubusercontent.com/u/94689030?v=4",
}

const getElement = (elementName, attrs = {}, father) => {
    const element = document.createElement(elementName);

    for (const attrsKey in attrs) {
        element[attrsKey] = attrs[attrsKey];
    }

    father && father.append(element);

    return element;
}

const getData = () => {
    return new Date().getHours().toString() + " : " + new Date().getMinutes().toString()
}

const addForm = document.querySelector('#addForm');
const imgFoot = document.querySelector("#imgfoot");
const mainSection = document.querySelector(".main");
imgFoot.src = userData.image;

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let task_text = addForm.task.value;
    addTask({text: task_text, user: userData.userName, img: userData.image, date: getData()}, addForm);
})

const taskListUl = document.querySelector('#taskList');

showTask(createList);

function createList(obj) {
    const tasks = Object.entries(obj);
    console.log(tasks);
    taskListUl.innerHTML = "";
    tasks.map((item ) => {
        console.log(item)
        let id = item[0];
        let task = item[1];
        const li = getElement("li",{className:"p-2 "}, taskListUl);
        const head = getElement("div", {className: " d-flex align-items-center"}, li);
        const img = getElement("img", {className: "userImg", src: task.img || "https://toppng.com/uploads/preview/male-user-filled-icon-man-icon-115533970576b3erfsss1.png"}, head);
        const infoUser = getElement("div", {className: "info"}, head)
        getElement("p", {className: "userName m-0", innerText: task.user || "Unknown User"}, infoUser)
        getElement("p", {className: "data m-0", innerText: task.date || "yoq"}, infoUser);

        const body = getElement("div", {className: "body d-flex align-items-end w-100"}, li);

        const message = getElement("div", {className: "message" || "yoq"}, body);
        const textArea = getElement("textarea",{className:"border-0",value:task.text,readOnly:true}, message);

        if(task.user === userData.userName){
            const right = getElement("div", {}, body);
            const editBtn = getElement("button", {
                className: "btn-edit bttn",
                innerHTML: `<i class="fas fa-pencil-alt"></i>`,
                onclick:()=>{
                    textArea.readOnly = false;
                    textArea.focus();
                    saveBtn.classList.remove("d-none")
                    editBtn.classList.add("d-none")

                }
            }, right)
            const saveBtn = getElement("button", {
                className: "btn-save bttn d-none",
                innerHTML: `<i class="fas fa-check"></i>`,
                onclick:()=>{
                    textArea.readOnly = true;
                    saveBtn.classList.add("d-none")
                    editBtn.classList.remove("d-none")
                    UpdateTask(id,{text:textArea.value});
                }
            }, right)
            const deleteBtn = getElement("button", {
                className: "btn-delete bttn",
                innerHTML: `<i class="far fa-trash-alt"></i>`,
                onclick:()=>{
                    removeTask(id)
                }
            }, right)
        }
    });
    addForm.children[0].focus();
    mainSection.scrollTop = mainSection.scrollHeight - mainSection.clientHeight;
    // window.scrollTo(0, 800);
}

window.removeTask = removeTask;
window.UpdateTask = UpdateTask;