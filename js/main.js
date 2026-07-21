import { ShowList } from "./storage.js";
import { AddTask, UpdateTaskCount } from "./task.js";

document.getElementById("add-btn").addEventListener("click", AddTask);

ShowList();
UpdateTaskCount();