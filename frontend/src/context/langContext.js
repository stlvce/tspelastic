import { createContext } from "react";
import imgParamRu from "../assets/parameters-ru.png"
import imgParamEng from "../assets/parameters-eng.png"

export const LangContext = createContext();

export const langList = {
    ru: {
        lang: "РУС",
        pages: [
            {name: "Домой", link: "/"},
            {name: "Помощь", link: "/help"},
            {name: "Админ", link: "/admin"},
        ],
        scheme: "Схема",
        start: "Старт",
        stop: "Стоп",
        param: "Параметры",
        done: "Готово",
        product: "Продукты",
        addProduct: "Добавить продукты",
        addingProduct: "Добавление продуктов",
        search: "Найти...",
        categor: "Категории",
        description: "При нажатии на кнопку параметры появляется диалоговое окно с параметрами для вычисления эластичной нейронной сети. Можете их корректировать для лучшей скорости. По умолчанию установлены оптимальные значения.",
        imgParam: imgParamRu,
        tableParam: ["Название", "Начальное x", "Начальное y", "Конечное x", "Конечное y", "Действие"],
        edit: "Редактировать",
        save: "Сохранить"
    },
    en: {
        lang: "ENG",
        pages: [
            {name: "Home", link: "/"},
            {name: "Help", link: "/help"},
            {name: "Admin", link: "/admin"},
        ],
        scheme: "Scheme",
        start: "Start",
        stop: "Stop",
        param: "Parameters",
        done: "Done",
        product: "Products",
        addProduct: "Add products",
        addingProduct: "Adding products",
        search: "Search...",
        categor: "Categories",
        description: "When you click on the Parameters button, a dialog box appears with the parameters for calculating the elastic neural network. You can adjust them for better speed. By default, the optimal values are set.",
        imgParam: imgParamEng,
        tableParam: ["Name", "Start x", "Start y", "End x", "End y", "Action"],
        edit: "Edit",
        save: "Save"
    }
}