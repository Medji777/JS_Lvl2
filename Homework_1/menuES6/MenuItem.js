//Класс для пункта меню
class MenuItem {
    constructor(href, title)
    {
        this.href = href;
        this.title = title;
    }

    //Метод возвращает html код для конкретного пункта
    renderItem () {
        //return '<li><a href="' + this.href + '">' + this.title + '</a></li>'; //ES5
        return `<li><a href="${this.href}">${this.title}</a></li>`; //ES6
    }
}