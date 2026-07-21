import { InputBox, ListContainer, FilterButtons, PendingCount, CompletedCount } from "./dom.js";
import { SaveData } from "./storage.js";

export const AddTask = () => {
    if (InputBox.value.trim() === '') {
        alert("You must add some value !");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = InputBox.value;
    ListContainer.appendChild(li);

    let span = document.createElement("span");
    let crossSign = "\u00d7"
    span.innerHTML = `${crossSign}`;
    li.appendChild(span);
    InputBox.value = "";

    SaveData();
    UpdateTaskCount();
};

InputBox.addEventListener("keypress", ({ key }) => {
    if (key === "Enter") {
        AddTask();
    }
});

ListContainer.addEventListener("click", ({ target }) => {
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
    }
    else if (target.tagName === "SPAN") {
        target.parentElement.remove();
    }

    SaveData();
    UpdateTaskCount();

    let ActiveFilter = document.querySelector(".filter-btn.active");
    FilterTasks(ActiveFilter.dataset.filter);
});

ListContainer.addEventListener("dblclick", ({ target }) => {
    if (target.tagName !== "LI") return;

    let OldText = target.childNodes[0].textContent;
    let input = document.createElement("input");
    input.type = "text";
    input.value = OldText;
    input.className = "edit-input";

    target.childNodes[0].textContent = "";
    target.prepend(input);
    input.focus();

    const SaveEdit = () => {
        const newText = input.value.trim();
        input.remove();
        target.prepend(document.createTextNode(newText || OldText));
        SaveData();
    }

    input.addEventListener("blur", SaveEdit);
    input.addEventListener("keypress", ({ key }) => {
        if (key === "Enter") input.blur();
    });
});

export const UpdateTaskCount = () => {

    let tasks = ListContainer.querySelectorAll("LI");
    let Completed = 0;
    let Pending = 0;

    tasks.forEach(task => {
        if (task.classList.contains("checked")) {
            Completed++;
        } else {
            Pending++;
        }
    });

    PendingCount.textContent = `${Pending} pending`;
    CompletedCount.textContent = `${Completed} completed`;

}

export const FilterTasks = (filter) => {
    let tasks = ListContainer.querySelectorAll("li");

    tasks.forEach(task => {
        if (filter === "completed") {
            task.style.display = task.classList.contains("checked") ? "block" : "none";
        }
        else if (filter === "pending") {
            task.style.display = !task.classList.contains("checked") ? "block" : "none";
        }
        else {
            task.style.display = "block";
        }
    });
};

FilterButtons.forEach(button => {
    button.addEventListener("click", () => {
        FilterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        FilterTasks(button.dataset.filter);
    });
});