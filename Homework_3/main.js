class Container {
    constructor(){
        this.id = null;
        this.class = null;
        this.text = '';
    }

    render(){
        return this.text;
    }
}

class Form extends Container {
    constructor(myId, myClass, myText){
        super();
        this.id = myId;
        this.class = myClass;
        this.text = myText;
    }

    render() {
        return this.text;
    }

    result(){
        let value = this.text;
        // Первое задание
        //value = value.replace(/'/g, '"');
        // Второе задание
            //Легкий вариант
        value = value.replace(/\B'|'\B/g, '"');
            //Сложный вариант
        //value = value.replace(/[\s]'/g, ' "');
        //value = value.replace(/'[\s]/g, '" ');
        //value = value.replace(/('(?![\w|\d])|\b'(?=[\s|;])|^'|'$|\b'(?=[.|,]))/g,'"');
        return value;
    }
}
document.querySelector('.form_text_load').addEventListener('click', function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './db.json', true);
    xhr.onreadystatechange = function (){
        if(xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            console.log('Error', xhr.status, xhr.statusText);
        } else {
            console.log('Ok', xhr.responseText);
            let items = JSON.parse(xhr.responseText);
            items.forEach(function (node) {
                let resultForm = new Form('formId', 'formClass', node.text);
                let textArea = document.querySelector('.form_text');
                textArea.value = resultForm.render();
            })
        }
    };
    xhr.send();
});

document.querySelector('form').addEventListener('submit', submit);

function submit(e) {
    e.preventDefault();
    let textArea = document.querySelector('.form_text').value,
        formId = document.getElementById('form'),
        resultForm = new Form(formId, 'formClass', textArea),
        tab = resultForm.result();
    if (tab != null && tab != ''){
        let body = document.querySelector('.result');
        body.appendChild(document.createElement('textarea')).innerHTML = tab;
        let tagTextArea = document.querySelectorAll('.result textarea');
        if(tagTextArea[1]){
            tagTextArea[0].remove();
        }
    }
}