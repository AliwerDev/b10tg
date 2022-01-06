import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

import {
    getDatabase, ref, set, onValue, push, remove, update,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDWQ1ysdszHnT6JPKO8x_qfCzD9H26aMXg",
    authDomain: "todo-4a830.firebaseapp.com",
    databaseURL: "https://todo-4a830-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-4a830",
    storageBucket: "todo-4a830.appspot.com",
    messagingSenderId: "996689501069",
    appId: "1:996689501069:web:12338a6ca645abfd457bc4",
    measurementId: "G-CYW348SYQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// databasega ulanish 
const db = getDatabase();

// databasega murojat
const dbRef = ref(db);

// malumot yozish
// set(ref, data)

// set(ref(db, 'users/' + 'temur'), {
//   firstname: 'Temurbek',
//   lastname: 'Suvonov',
// }).then(() => {
//   console.log("malumot qoshildi")
// })

// malumot o'qish
const temurRef = ref(db, 'users/' + 'temur')
// onValue(temurRef, (data) => {
//   console.log(data.val());
//   const obj = data.val() // val malumot chiqargani;
//   let name = obj.firstname;
//   let lastname = obj.lastname;
//   let p = document.createElement('p');
//   p.innerHTML = name + ' ' + lastname;
//   document.body.append(p)
// })

// to do funksiyalar
const addTask = (task, form) => {
    push(ref(db, 'task_list'), task)
        .then(() => {
            form.reset();
        });
}

const showTask = (callback) => {
    onValue(ref(db, 'task_list/'), (data) => {
        callback(data.val() || {});
    })
}

const UpdateTask = (id,obj) => {
    update(ref(db,'task_list/'+id),obj);
}

const removeTask = (id) => {
    remove(ref(db, 'task_list/' + id));
}

export {addTask, showTask, removeTask,UpdateTask}






