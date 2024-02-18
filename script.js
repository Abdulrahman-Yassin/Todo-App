let them = document.querySelector("img")
let darkThem = document.querySelector(".img")
let head = document.querySelector(".head");
let create = document.querySelector(".Create");
let ul = document.querySelector("ul");
let all = document.querySelector(".All");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");
let clear = document.querySelector(".clear");
let button = document.querySelector("button");
let task = document.querySelectorAll(".task");
let drag = null;

them.addEventListener("click", () => {
    all.classList.toggle("them")
    darkThem.style.display = "block"
    them.style.display = "none"
})

darkThem.addEventListener("click", () => {
    all.classList.toggle("them")
    darkThem.style.display = "none"
    them.style.display = "block"
})

create.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (create.value.trim() === '') {
            return
        } else {
            var newTask = document.createElement("li");
            newTask.className = "task";
            newTask.setAttribute("draggable", "true");

            var span = document.createElement("span");
            span.textContent = create.value;
            newTask.appendChild(span);

            var img = document.createElement("img"); 
            img.src = "./img/cancel.png"; 
            img.alt = "OK Icon"; 
            img.className = "image"

            newTask.appendChild(img); 

            ul.insertAdjacentElement("afterbegin", newTask);
            create.value = "";

            img.addEventListener("click", function () {
                newTask.remove(); 
            });

            newTask.addEventListener("click", function () {
                this.classList.add("check");
                this.style.listStyleImage = "url('./img/ok-16.jpg')";

                var spanElement = this.querySelector("span");
                if (spanElement) {
                    spanElement.classList.add("check");
                }
            });

            clear.addEventListener("click", () => {
                newTask.classList.replace("check", "delete");
            });

            draggableItems();
        }
    }
});

function draggableItems() {
    let items = document.querySelectorAll(".task");
    items.forEach(item => {
        item.addEventListener('dragstart', function (e) {
            drag = item;
            e.dataTransfer.setData('text/plain', null);
            item.style.opacity = '0.5';
        });

        item.addEventListener('dragend', function () {
            drag = null;
            item.style.opacity = '1';
        });

        ul.addEventListener('dragover', function (e) {
            e.preventDefault(); 
        });

        ul.addEventListener('drop', function (e) {
            e.preventDefault(); 
            const afterElement = getDragAfterElement(ul, e.clientY);
            ul.insertBefore(drag, afterElement); // 
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function filterTasks(type) {
    var tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        if (type === "all" || 
            (type === "active" && !task.classList.contains("check")) ||
            (type === "completed" && task.classList.contains("check"))) {
            task.style.display = "block";
            if (task.classList.contains("check")) {
                task.style.listStyleImage = "url('./img/ok-16.jpg')";
            } else {
                task.style.listStyleImage = " url('./img/oval.png')";
            }
        } else {
            task.style.display = "none";
        }
    });
}

all.addEventListener("click", function() {
    filterTasks("all");
});

active.addEventListener("click", function() {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        if (task.classList.contains("check")) {
            task.style.display = "none";
        } else {
            task.style.display = "block";
            task.style.listStyleImage = "url('./img/oval.png')";
        }
    });
});

completed.addEventListener("click", function() {
    const completedTasks = document.querySelectorAll(".check");
    if (completedTasks.length > 0) {
        filterTasks("completed");
    }
});

clear.addEventListener("click", function() {
    const completedTasks = document.querySelectorAll(".check");
    if (completedTasks.length > 0) {
        completedTasks.forEach(task => {
            task.remove();
        });
    }
});

resetEvents();