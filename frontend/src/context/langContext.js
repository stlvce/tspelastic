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
        tableProdLabel: "Таблица продуктов",
        tableProd: ["Название", "Id категории", "Описание", "Действие"],
        tableParamLabel: "Таблица категорий",
        tableParam: ["Название", "Начальное x", "Начальное y", "Конечное x", "Конечное y", "Действие"],
        edit: "Редактировать",
        save: "Сохранить",
        parmDescript: {
            alpha: "Относительная сила точки",
            beta: "Относительная сила соседних точек",
            initialK: "Коэффициент приближения",
            epsilon: "Эпсилон",
            kAlpha: "Коэффициент приближения для точки",
            kUpdatePeriod: "Обновление периода приближения",
            maxNumIter: "Максимальное число итераций",
            numPointsFactor: "Коэффициент числа точек",
            radius: "Радиус вокруг центра тяжести продукта",
        }
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
        tableProdLabel: "Product table",
        tableProd: ["Name", "Id category", "Description", "Action"],
        tableParamLabel: "Category table",
        tableParam: ["Name", "Start x", "Start y", "End x", "End y", "Action"],
        edit: "Edit",
        save: "Save",
        parmDescript: {
            alpha: "Relative strength of point of view",
            beta: "Relative strength of neighboring points",
            initialK: "Approximation factor",
            epsilon: "Epsilon",
            kAlpha: "Point proximity factor",
            kUpdatePeriod: "Zoom period update",
            maxNumIter: "Maximum number of iterations",
            numPointsFactor: "Number of points factor",
            radius: "Radius around the center of gravity of the product",
        }
    }
}