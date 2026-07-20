import { InputBox, ListContainer } from "./dom.js";
import { SaveData } from "./storage.js";

export const AddTask = () => {
    if (InputBox.value === '') {
        alert("You must add some value !");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = InputBox.value;
        ListContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    InputBox.value = "";
    SaveData();
};

InputBox.addEventListener("keypress", ({ key }) => {
    if (key === "Enter") {
        AddTask();
    }
});

ListContainer.addEventListener("click", ({ target }) => {
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        SaveData();
    }
    else if (target.tagName === "SPAN") {
        target.parentElement.remove();
        SaveData();
    }
});