/**@typedef {Object} todo 
 * @property {string} value
 * @property {boolean} done //status if task is done or not
 * @property {number} id
*/

const form = document.getElementById("form");
const input = document.getElementById("input__input");
const clear_button = document.getElementById("clear_all");
const list = document.getElementById("list");
const remainings = document.getElementById("remainings");
const list_wrapper = document.getElementById("list__wrapper");

let todoItems = [];
let counter = 0;
let global_index = 0;

/**
 * 
 * @param {todo} todo
 * @returns {string} //Fragment of HTML code, that contains and displays current todo item
 */
function renderTODO(todo) {
    const button = todo.done? 'Revert': 'Done';
    const is_done = todo.done? 'Done': 'Undone';
    return (
    `<label class="todo_item todo_item__${is_done}" id="${todo.id}">
        ${todo.value}
        <button class="status list__button" id="status${todo.id}">${button}</button>
        <button class="remove list__button" id="remove${todo.id}">Remove</button>
    </label>`);
}

/**
 * For every item in list of todo items calls a function
 */
function renderList() {
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    list.innerHTML = todoItems.map((x) => renderTODO(x)).join('');
}

/**
 * 
 * @param {number} x //value of new number of remainings 
 */
function changeRemanings(x) {
    localStorage.setItem('savedRemainings', JSON.stringify(counter));
    const rem = x === 1? "remaning": "remainings";
    remainings.innerHTML = `(${x} ${rem})`;
}

/**
 * 
 * @param {string} text //Value of input
 * Function add a new todo item to the list of them
 * Additionally it changes number of remainings and render a new list
 */
function addTODO(text) {
    const todo = {
    value: text,
    done: false,
    id: global_index
  };
  global_index++;
  localStorage.setItem('savedIndex', JSON.stringify(global_index));
  counter++;
  changeRemanings(counter);

  todoItems.push(todo);
  renderList(); 
}

/**
 * Event of input submition
 */
form.addEventListener('submit', event => {
    event.preventDefault(); 
    addTODO(input.value);
    input.value = "";
})

/**
 * Function that clears the list of todo items
 */
function clearAll() {
    todoItems = [];
    counter = 0;
    changeRemanings(counter);
    renderList();
}

/**
 * 
 * @param {number} id 
 * Funtion gets and id and change a .done property of element that contains given id
 */
function changeStatus(id) {
    const index = todoItems.findIndex((item) => item.id === Number(id));
    todoItems[index].done = !todoItems[index].done;
    renderList();
}

/**
 * 
 * @param {number} id 
 * Deletes from list of todo items specific todo item (specified by id)
 */
function remove(id) {
    const index = todoItems.findIndex((item) => item.id === Number(id));
    todoItems.splice(index, 1);
    counter--;
    changeRemanings(counter);
    renderList();
}

/**
 * Event for both buttons in every label in list of todo items
 */
list.addEventListener('click', event => {   
    const target = event.target.parentElement.id;
    if(event.target.className[0] === "s") {
        changeStatus(target);
    }
    if(event.target.className[0] === "r") {
        remove(target);
    }
});

/**
 * Event handler that get data from the localStorage
 */
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
    }
    counter = Number(localStorage.getItem('savedRemainings'));
    global_index = Number(localStorage.getItem('savedIndex'));
    renderList();
    changeRemanings(counter);
  });