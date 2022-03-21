import "../assets/css/style.css";

const app = document.getElementById("app");

app.innerHTML = `
  <div class="todos">
     <div class="todos-header">
       <h3 class="todos-title">Todo List</h3>
       <div>
        <p>You have <span class="todos-count"> </span>  items</p>
        <button class="todos-clear" style="display:none">Clear completed</button>
       </div>
     </div>

     <form class="todos-form" name="todos">
       <input type="text" id="input1" placeholder="what you want to add next?" name="todo">
     </form>

     <ul class="todos-list">
     </ul>
  </div>

`;

const form = document.forms.todos;
const input1 = form.elements.todo;
//
const root = document.querySelector(".todos");
const list = root.querySelector(".todos-list");
const count = root.querySelector(".todos-count");
const cler = root.querySelector(".todos-clear");

//      state management

let todos = [];

// console.log(todos.filter((todo)=>{todo.complet=== true ? true: false}));

//      add funcanality
// render funcanality
function renderTodos(todos) {
  let todosString = ``;

  todos.forEach((todo, index) => {
    todosString += `
    <li id="${index}" ${todo.complet ? "class='todos-complete'" : ""}> 
      <input type="checkbox" ${todo.complet ? "checked" : " "}>
        <span>
          ${todo.label}
        </span>
        <button></button>
    </li>
    `;
  });
  list.innerHTML = todosString;

  const countNumber = todos.filter((todo) => {
    if (todo.complet === false) {
      return true;
    }
  });
  count.innerText = countNumber.length;

  cler.style.display = todos.filter((item, index) => item.complet === true)
    .length
    ? "block"
    : "none";
}

// for creat funcanality
function addTodo(event) {
  event.preventDefault();
  const label = input1.value.trim(); // input1 is reference name of input tang whose name "todo"
  const complet = false;

  const todo = { label, complet };
  todos = [...todos, todo]; // we get brand new array of needed information in immutable way
  console.log(todos);

  input1.value = "";
  alert("one task sucessfully created"); // this for after you submit entered input then input window clear
  renderTodos(todos); // clearing the input window after submitting the field
}

// for update today chek funcanality
function updateTodo(event) {
  console.dir(event.target);
  const id = Number(event.target.parentNode.getAttribute("id"));
  //                                                                                                                                 we get attribute in string format
  console.log(id);

  todos = todos.map((todo, index) => {
    let complet = event.target.checked;
    if (id === index) {
      const updateTodo = { ...todo, complet: complet };
      //                                                                                                                                    old todos array are completly updated in unmutable way
      console.log(updateTodo);
      return updateTodo;
    }
    return todo;
  });
  console.log(todos);
  renderTodos(todos);
}

//delete list items
function deleteTodo(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  } else {
    const id = Number(event.target.parentNode.getAttribute("id"));
    todos = todos.filter((todo, index) => index !== id);

    console.log(todos);
    renderTodos(todos);
  }
}

// clerComple Todo
function clerCompleTodo() { 
  if(todos.filter((item) => item.complet).length === 0 ){
    return alert("first complet at least one task");
  }
  
  todos = todos.filter((todo)=>!todo.complet);
  renderTodos(todos);
}

function init() {
  form.addEventListener("submit", addTodo);
  list.addEventListener("change", updateTodo);
  list.addEventListener("click", deleteTodo);
  cler.addEventListener("click", clerCompleTodo);

  // console.log(todos.filter((todo)=>{todo.complet=== true ? true: false}));
}

//calling the init function

init();
