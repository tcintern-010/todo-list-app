import { ListContainer } from "./dom.js";

export const SaveData = () => {
    localStorage.setItem("data", ListContainer.innerHTML);
};

export const ShowList = () => {
    ListContainer.innerHTML = localStorage.getItem("data") || "";
};