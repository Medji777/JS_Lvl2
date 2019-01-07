class PopUp extends Gallery{
    constructor(images){
        super();
        this.myClass = 'pop';
        this.images = images;
    }

    render(e){
        var result = `<div class = "${this.myClass}">`;
        var res = this.images;
        var z = e.target.getAttribute('data-img');
        res.forEach((node, i) => {
            if (z == i) {
                if(node instanceof PopUpCreate){
                    result += node.renderPopUp();
                }
            }
        });
        result += '<span class="close">X</span>';
        result += '</div>';
        return result;
    }
}

class PopUpCreate extends PopUp {
    constructor(imghref){
        super();
        this.images = '';
        this.imghref = imghref;
    }

    renderPopUp(){
        let s = document.querySelector('.box');
        s.style.display = 'block';
        s.addEventListener('click', closePopUp);
        return `<img src = "/Gallery/images${this.imghref}" alt = "">`;

    }
}

function closePopUp(){
    let s = document.querySelector('.box'),
        v = document.querySelector('.box img');
    v.remove();
    s.style.display = 'none';
}