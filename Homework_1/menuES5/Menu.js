function Menu(myId, myClass, myItems) {
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
}

Menu.prototype.render = function () {
    var result = `<ul class="${this.className}" id="${this.id}">`;

    //Сами пункты меню
    for (var i = 0; i < this.items.length; i++){
        result += this.items[i].renderItem();
    }

    result += '</ul>';
    return result;
};

//TODO: удаление меню
Menu.prototype.remove = function () {
    //document
	var rem = document.getElementById(this.id);
	rem.parentNode.removeChild(rem); //ES5
	};