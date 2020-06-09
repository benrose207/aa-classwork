const ul = document.querySelector(".todos");
const form = document.querySelector(".add-todo-form");

form.addEventListener("submit", addTodo);
ul.addEventListener("change", handleCheckboxChange)

const todos = JSON.parse(localStorage.getItem("todos")) || [];
populateList(todos);

function addTodo (event) {
    event.preventDefault();
    const input = form.querySelector("input[name=add-todo]")
    const newTodo = {
        value: input.value,
        done: false,
    };
    todos.push(newTodo);
    input.value = "";

    localStorage.setItem("todos", JSON.stringify(todos));

    populateList(todos);
}

function populateList (todos) {
    if (todos.length) clearList();

    todos.forEach((todo, idx) => {
        const label = document.createElement("label");
        const labelText = document.createTextNode(todo.value);
        
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("data-id", idx);
        checkbox.checked = todo.done;
        label.append(checkbox);
        label.append(labelText);
        
        const li = document.createElement("li");
        li.append(label);
        ul.append(li);
    });
}

function handleCheckboxChange () {
    const item = event.target;
    const idx = item.dataset.id
    todos[idx].done = !todos[idx].done;
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearList () {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}