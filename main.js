window.addEventListener("load", function () {
  todos = [];
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      done: false,
    };

    if (todo.content === "") {
      alert("Please enter a todo");
    } else {
      todos.push(todo);

      // localStorage.setItem("todos", JSON.stringify(todos));

      e.target.reset();
    }
    DisplayTodos();
  });
  // DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    const content = document.createElement("div");
    const actions = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    content.classList.add("todo-content");

    actions.classList.add("actions");
    editButton.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", function (e) {
      todo.done = e.target.checked;
      // localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      // DisplayTodos();
    });

    editButton.addEventListener("click", function (e) {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", function (e) {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        // localStorage.setItem("todos", JSON.stringify(todos));
        // DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", function (e) {
      e.target.parentElement.parentElement.remove()
      // todos = todos.filter(t => t != todo);
      // localStorage.setItem("todos", JSON.stringify(todos));
      // DisplayTodos();
    })
  });
}
