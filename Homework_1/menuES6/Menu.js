class Menu {
    constructor(myId, myClass, myItems)
    {
        this.id = myId;
        this.className = myClass;
        this.items = myItems;
    }

    render () {
        var result = `<ul class="${this.className}" id="${this.id}">`;

        //Сами пункты меню
        for (var i = 0; i < this.items.length; i++){
            result += this.items[i].renderItem();
        }

        result += '</ul>';
        return result;
    }

    //TODO: удаление меню
    remove()
    {
        //document
		var rem = document.getElementById(this.id);
		rem.remove(); //ES6
    }
}
