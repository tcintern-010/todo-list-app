import { ShowList } from "./storage.js";
import { AddTask } from "./task.js";

document.getElementById("add-btn").addEventListener("click", AddTask);

ShowList();